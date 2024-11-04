import React, { useState } from 'react';
import { Box, Button, Grid2, Modal, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import './categories.scss';

const Categories = () => {
  const [inputValue, setInputValue] = useState('');
  const [tabela, setTabela] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<string | null>(null);
  const [editInputValue, setEditInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (inputValue.trim() !== '') {
        addCategory();
        e.preventDefault();
      }
    }
  };

  const isSpecialRow = (index: number) => {
    return index % 2 !== 0;
  };

  const addCategory = () => {
    if (tabela.includes(inputValue.trim())) {
      setErrorMessage('O nome da categoria já existe.');
    } else {
      setTabela([...tabela, inputValue.trim()]);
      setInputValue('');
      setSuccessMessage('Categoria adicionada com sucesso!');
    }
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const handleOpenModal = (category: string) => {
    setCategoryToDelete(category);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCategoryToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (categoryToDelete) {
      setTabela(tabela.filter((category) => category !== categoryToDelete));
      handleCloseModal();
    }
  };

  const handleOpenEditModal = (category: string) => {
    setCategoryToEdit(category);
    setEditInputValue(category);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setCategoryToEdit(null);
    setEditInputValue('');
  };

  const handleEditCategory = () => {
    if (categoryToEdit && editInputValue.trim() !== '') {
      if (tabela.includes(editInputValue.trim())) {
        setErrorMessage('O nome da categoria já existe.');
      } else {
        setTabela(
          tabela.map((cat) =>
            cat === categoryToEdit ? editInputValue.trim() : cat,
          ),
        );
        setSuccessMessage('Categoria editada com sucesso!');
        handleCloseEditModal();
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      }
    }
  };

  const handleEditKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleEditCategory();
      e.preventDefault();
    }
  };

  return (
    <>
      <Grid2 className="container">
        <Typography variant="h5" className="gerenciamento-de-categorias">
          Gerenciamento de Categorias
        </Typography>

        <Typography variant="h6" className="novas-categorias">
          Novas Categorias
        </Typography>

        <Grid2 className="save-categorias">
          <Grid2 className="input-button-container">
            <input
              className="input"
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              placeholder="Nome da Categoria"
            />
            <button
              className="cadastra-button"
              onClick={addCategory}
              disabled={!inputValue.trim()}
            >
              Cadastrar
            </button>
          </Grid2>

          <Grid2 className="erro-repetido">
            {errorMessage && (
              <Typography color="error">{errorMessage}</Typography>
            )}
          </Grid2>
          <Grid2 className="sucesso-repetido">
            {successMessage && (
              <Typography className="sucesso-adicionado">
                {successMessage}
              </Typography>
            )}
          </Grid2>

          <thead className="cabecalho">
            <tr>
              <th>#</th>
            </tr>
            <tr className="cabecalho-categorias">
              <th>Categorias</th>
            </tr>
          </thead>
          <table>
            <tbody className="tabela">
              {tabela.map((item, index) => (
                <tr
                  key={index}
                  style={{
                    backgroundColor: isSpecialRow(index) ? '#d0b4f4' : 'white',
                  }}
                >
                  <td className="table-item-conter">{index + 1}</td>
                  <td className="table-item">
                    {item}

                    <div className="button-group">
                      <button
                        className="botao-editar"
                        onClick={() => handleOpenEditModal(item)}
                      >
                        <EditIcon />
                      </button>
                      <button
                        className="botao-remover"
                        onClick={() => handleOpenModal(item)}
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Grid2>
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box className="modal-box">
            <Typography id="modal-title" variant="h6" component="h2">
              Confirmar Exclusão
            </Typography>
            <Typography id="modal-description" sx={{ mt: 2 }}>
              Tem certeza de que deseja excluir a categoria &quot;
              {categoryToDelete}&quot;?
            </Typography>
            <Button
              className="confirmar"
              onClick={handleConfirmDelete}
              style={{
                height: '40px',
                borderRadius: '5px',
                marginRight: '10px',
                border: 'none',
                backgroundColor: 'var(--purple)',
                color: 'white',
              }}
            >
              Confirmar
            </Button>
            <Button
              onClick={handleCloseModal}
              color="secondary"
              style={{
                height: '40px',
                backgroundColor: 'var(--purple)',
                opacity: 0.7,
                color: 'white',
                borderRadius: '5px',
                border: 'none',
              }}
            >
              Cancelar
            </Button>
          </Box>
        </Modal>
        <Modal
          open={openEditModal}
          onClose={handleCloseEditModal}
          aria-labelledby="edit-modal-title"
          aria-describedby="edit-modal-description"
        >
          <Box className="modal-box">
            <Typography id="edit-modal-title" variant="h6" component="h2">
              Editar Categoria
            </Typography>
            <input
              type="text"
              value={editInputValue}
              onChange={(e) => {
                setEditInputValue(e.target.value);
                setErrorMessage('');
              }}
              onKeyDown={handleEditKeyPress}
              placeholder="Nome da Categoria"
            />

            <div style={{ marginTop: '10px' }}>
              {errorMessage && (
                <Typography color="error">{errorMessage}</Typography>
              )}
              <Button
                className="confirmar"
                onClick={handleEditCategory}
                disabled={editInputValue.trim() === categoryToEdit}
                style={{
                  height: '40px',
                  borderRadius: '5px',
                  marginRight: '10px',
                  border: 'none',
                  backgroundColor: 'var(--purple)',
                  color: 'white',
                }}
              >
                Confirmar
              </Button>
              <Button
                onClick={handleCloseEditModal}
                color="secondary"
                style={{
                  height: '40px',
                  backgroundColor: 'var(--purple)',
                  opacity: 0.7,
                  color: 'white',
                  borderRadius: '5px',
                  border: 'none',
                }}
              >
                Cancelar
              </Button>
            </div>
          </Box>
        </Modal>
      </Grid2>
    </>
  );
};

export default Categories;
