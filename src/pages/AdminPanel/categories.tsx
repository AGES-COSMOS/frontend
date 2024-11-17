import React, { useEffect, useState } from 'react';
import { Box, Button, Grid2, Modal, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import './categories.scss';
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from 'services/categoryControlPanelService';
import { Category } from 'services/types';

const Categories = () => {
  const [inputValue, setInputValue] = useState('');
  const [tabela, setTabela] = useState<Category[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null,
  );
  const [openEditModal, setOpenEditModal] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);
  const [editInputValue, setEditInputValue] = useState('');
  const [categoryUpdated, setCategoryUpdated] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const allCategories = await getAllCategories();
        if (!allCategories) {
          throw new Error('Erro ao carregar as categorias.');
        }

        setTabela([...allCategories]);
      } catch (error) {
        setErrorMessage('Erro ao carregar as categorias');
      }
    };

    fetchCategories();
  }, [categoryUpdated]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (inputValue.trim() !== '') {
        addCategoryToTable();
        e.preventDefault();
      }
    }
  };

  const isSpecialRow = (index: number) => {
    return index % 2 !== 0;
  };

  const addCategoryToTable = async () => {
    if (
      tabela.filter((category) => category.name === inputValue.trim()).length >
      1
    ) {
      setErrorMessage('O nome da categoria já existe.');
    } else {
      try {
        await addCategory({
          name: inputValue.trim(),
          updatedBy: 'Admin',
        });
        setInputValue('');
        setSuccessMessage('Categoria adicionada com sucesso!');
        setCategoryUpdated((prev) => !prev);

        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      } catch (error) {
        setErrorMessage('Erro ao adicionar a categoria.');

        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      }
    }
  };

  const handleOpenModal = (category: Category) => {
    setCategoryToDelete(category);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCategoryToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (categoryToDelete) {
      try {
        await deleteCategory(categoryToDelete.id);
        setCategoryUpdated((prev) => !prev);
        setSuccessMessage('Categoria deletada com sucesso!');
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
        handleCloseModal();
      } catch (error) {
        setErrorMessage('Erro ao deletar a categoria.');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      }
    } else {
      return;
    }
  };

  const handleOpenEditModal = (category: Category) => {
    setCategoryToEdit(category);
    setEditInputValue(category.name);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setCategoryToEdit(null);
    setEditInputValue('');
  };

  const handleEditCategory = async () => {
    if (categoryToEdit && editInputValue.trim() !== '') {
      if (
        tabela.filter((category) => category.name === inputValue.trim())
          .length > 1
      ) {
        setErrorMessage('O nome da categoria já existe.');
      } else {
        try {
          await updateCategory({
            id: categoryToEdit.id,
            name: editInputValue.trim(),
            updatedBy: 'Admin',
          });

          setCategoryUpdated((prev) => !prev);

          setSuccessMessage('Categoria editada com sucesso!');
          handleCloseEditModal();

          setTimeout(() => {
            setSuccessMessage('');
          }, 3000);
        } catch (error) {
          setErrorMessage('Erro ao editar a categoria.');

          setTimeout(() => {
            setErrorMessage('');
          }, 3000);
        }
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
              onClick={addCategoryToTable}
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
              {tabela.map((category, index) => (
                <tr
                  key={index}
                  style={{
                    backgroundColor: isSpecialRow(index) ? '#d0b4f4' : 'white',
                  }}
                >
                  <td className="table-item-conter">{index + 1}</td>
                  <td className="table-item">
                    {category.name}

                    <div className="button-group">
                      <button
                        className="botao-editar"
                        onClick={() => handleOpenEditModal(category)}
                      >
                        <EditIcon />
                      </button>
                      <button
                        className="botao-remover"
                        onClick={() => handleOpenModal(category)}
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
              {categoryToDelete?.name}&quot;?
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
                disabled={editInputValue.trim() === categoryToEdit?.name}
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
