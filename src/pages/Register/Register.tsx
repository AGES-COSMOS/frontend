// components/Register.tsx
import React, { useState } from 'react';
import './Cadastro.scss';
import ProfilePicture from '../../components/profilePicture/ProfilePicture';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import UserSelect from '../../components/userSelect/userSelect';
import InstituicaoSelect from '../../components/instituicaoSelect/instituicaoSelect';
import EstadoSelect from '../../components/estadoSelect/estadoSelect';
import CidadeSelect from '../../components/cidadeSelect/cidadeSelect';
import { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';

interface Option {
  value: string;
  label: string;
}

interface Estado {
  value: string;
  label: string;
  city: string[];
}

const instituicoesOptions: Option[] = [
  { value: 'ufrgs', label: 'UFRGS' },
  { value: 'pucrs', label: 'PUCRS' },
  { value: 'uniritter', label: 'UNIRITTER' },
];

const selectOptions1: Option[] = [
  { value: 'professor', label: 'Professor' },
  { value: 'aluno', label: 'Aluno' },
  { value: 'instituicao', label: 'Instituição' },
];

const selectEstado: Estado[] = [
  {
    value: 'rio_grande_do_sul',
    label: 'Rio Grande do Sul',
    city: ['Porto Alegre', 'Santa Maria'],
  },
  { value: 'sao_paulo', label: 'São Paulo', city: ['São Paulo'] },
  { value: 'minas_gerais', label: 'Minas Gerais', city: ['Belo Horizonte'] },
  { value: 'santa_catarina', label: 'Santa Catarina', city: ['Florianópolis'] },
];

const Register: React.FC = () => {
  const [selectedOption1, setSelectedOption1] = useState<string>('');
  const [selectedEstado, setSelectedEstado] = useState<string>('');
  const [selectedCidade, setSelectedCidade] = useState<string>('');
  const [selectedInstituicao, setSelectedInstituicao] = useState<string>('');
  const [cidades, setCidades] = useState<Option[]>([]);

  const handleSelectChange1 = (event: SelectChangeEvent<string>) => {
    setSelectedOption1(event.target.value);
  };

  const handleSelectChangeEstado = (event: SelectChangeEvent<string>) => {
    const estadoValue = event.target.value;
    setSelectedEstado(estadoValue);

    // Filtra as cidades com base no estado selecionado
    const estado = selectEstado.find((e) => e.value === estadoValue);
    if (estado) {
      setCidades(estado.city.map((city) => ({ value: city, label: city })));
      setSelectedCidade(''); // Limpa a cidade selecionada quando o estado muda
    } else {
      setCidades([]);
      setSelectedCidade('');
    }
  };

  const handleSelectChangeCidade = (event: SelectChangeEvent<string>) => {
    setSelectedCidade(event.target.value);
  };

  const handleSelectChangeInstituicao = (event: SelectChangeEvent<string>) => {
    setSelectedInstituicao(event.target.value);
  };

  return (
    <div className="container">
      <h1 className="title">Preencha todos os Campos</h1>
      <br />
      <Box sx={{ height: 150 }}>
        <ProfilePicture />
      </Box>

      <br />
      <Box sx={{ height: 70 }}>
        <UserSelect
          value={selectedOption1}
          onChange={handleSelectChange1}
          options={selectOptions1}
        />
      </Box>

      {selectedOption1 === 'professor' && (
        <>
          <Box sx={{ height: 70 }}>
            <Stack
              spacing={{ xs: 1, sm: 2 }}
              direction="row"
              useFlexGap
              sx={{ flexWrap: 'wrap' }}
            >
              <TextField
                id="demo-helper-text-misaligned-no-helper"
                placeholder="Nome Completo"
              />
              <TextField
                id="demo-helper-text-misaligned-no-helper"
                type="email"
                placeholder="E-mail"
              />
            </Stack>
          </Box>
          <Box sx={{ height: 70 }}>
            <Stack
              spacing={{ xs: 1, sm: 2 }}
              direction="row"
              useFlexGap
              sx={{ flexWrap: 'wrap' }}
            >
              <TextField
                id="outlined-password-input"
                placeholder="Senha"
                type="password"
                autoComplete="current-password"
              />
              <TextField
                id="outlined-password-input"
                placeholder="Confirme Sua Senha"
                type="password"
                autoComplete="current-password"
              />
            </Stack>
          </Box>
          <Box sx={{ height: 70 }}>
            <Stack
              spacing={{ xs: 1, sm: 2 }}
              direction="row"
              useFlexGap
              sx={{ flexWrap: 'wrap' }}
            >
              <TextField
                id="outlined-password-input"
                placeholder="CPF"
                type="text"
                autoComplete="current-password"
              />
              <Box sx={{ height: 70 }}>
                <InstituicaoSelect
                  value={selectedInstituicao}
                  onChange={handleSelectChangeInstituicao}
                  options={instituicoesOptions}
                />
              </Box>
            </Stack>
          </Box>
          <Box sx={{ height: 70 }}>
            <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap>
              <EstadoSelect
                value={selectedEstado}
                onChange={handleSelectChangeEstado}
                options={selectEstado.map((estado) => ({
                  value: estado.value,
                  label: estado.label,
                }))}
              />
              <CidadeSelect
                value={selectedCidade}
                onChange={handleSelectChangeCidade}
                options={cidades}
              />
            </Stack>
          </Box>
          <Box sx={{ height: 70 }}>
            <Stack
              spacing={{ xs: 1, sm: 2 }}
              direction="row"
              useFlexGap
              sx={{ flexWrap: 'wrap' }}
            >
              <TextField
                id="outlined-password-input"
                placeholder="Senha"
                type="text"
                autoComplete="Endereço"
              />
              <TextField
                id="outlined-password-input"
                placeholder="Número"
                type="text"
                autoComplete="Número"
              />
            </Stack>
          </Box>
        </>
      )}
      {selectedOption1 === 'aluno' && (
        <>
          <Box sx={{ height: 70 }}>
            <Stack
              spacing={{ xs: 1, sm: 2 }}
              direction="row"
              useFlexGap
              sx={{ flexWrap: 'wrap' }}
            >
              <TextField
                id="demo-helper-text-misaligned-no-helper"
                placeholder="Nome Completo"
              />
              <TextField
                id="demo-helper-text-misaligned-no-helper"
                type="email"
                placeholder="E-mail"
              />
            </Stack>
          </Box>
          <Box sx={{ height: 70 }}>
            <Stack
              spacing={{ xs: 1, sm: 2 }}
              direction="row"
              useFlexGap
              sx={{ flexWrap: 'wrap' }}
            >
              <TextField
                id="outlined-password-input"
                placeholder="Senha"
                type="password"
                autoComplete="current-password"
              />
              <TextField
                id="outlined-password-input"
                placeholder="Confirme Sua Senha"
                type="password"
                autoComplete="current-password"
              />
            </Stack>
          </Box>
          <Box sx={{ height: 70 }}>
            <Stack
              spacing={{ xs: 1, sm: 2 }}
              direction="row"
              useFlexGap
              sx={{ flexWrap: 'wrap' }}
            >
              <TextField
                id="outlined-password-input"
                placeholder="CPF"
                type="text"
                autoComplete="current-password"
              />
              <Box sx={{ height: 70 }}>
                <InstituicaoSelect
                  value={selectedInstituicao}
                  onChange={handleSelectChangeInstituicao}
                  options={instituicoesOptions}
                />
              </Box>
            </Stack>
          </Box>
          <Box sx={{ height: 70 }}>
            <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap>
              <EstadoSelect
                value={selectedEstado}
                onChange={handleSelectChangeEstado}
                options={selectEstado.map((estado) => ({
                  value: estado.value,
                  label: estado.label,
                }))}
              />
              <CidadeSelect
                value={selectedCidade}
                onChange={handleSelectChangeCidade}
                options={cidades}
              />
            </Stack>
          </Box>
          <Box sx={{ height: 70 }}>
            <Stack
              spacing={{ xs: 1, sm: 2 }}
              direction="row"
              useFlexGap
              sx={{ flexWrap: 'wrap' }}
            >
              <TextField
                id="outlined-password-input"
                placeholder="Senha"
                type="text"
                autoComplete="Endereço"
              />
              <TextField
                id="outlined-password-input"
                placeholder="Número"
                type="text"
                autoComplete="Número"
              />
            </Stack>
          </Box>
        </>
      )}
      {selectedOption1 === 'instituicao' && (
        <>
          <Box sx={{ height: 70 }}>
            <Stack
              spacing={{ xs: 1, sm: 2 }}
              direction="row"
              useFlexGap
              sx={{ flexWrap: 'wrap' }}
            >
              <TextField
                id="demo-helper-text-misaligned-no-helper"
                placeholder="Nome Completo"
              />
              <TextField
                id="demo-helper-text-misaligned-no-helper"
                type="email"
                placeholder="E-mail"
              />
            </Stack>
          </Box>
          <Box sx={{ height: 70 }}>
            <Stack
              spacing={{ xs: 1, sm: 2 }}
              direction="row"
              useFlexGap
              sx={{ flexWrap: 'wrap' }}
            >
              <TextField
                id="outlined-password-input"
                placeholder="Senha"
                type="password"
                autoComplete="current-password"
              />
              <TextField
                id="outlined-password-input"
                placeholder="Confirme Sua Senha"
                type="password"
                autoComplete="current-password"
              />
            </Stack>
          </Box>
          <Box sx={{ height: 70 }}>
            <Stack
              spacing={{ xs: 1, sm: 2 }}
              direction="row"
              useFlexGap
              sx={{ flexWrap: 'wrap' }}
            >
              <TextField
                id="outlined-password-input"
                placeholder="CPF"
                type="text"
                autoComplete="current-password"
              />
              <Box sx={{ height: 70 }}>
                <InstituicaoSelect
                  value={selectedInstituicao}
                  onChange={handleSelectChangeInstituicao}
                  options={instituicoesOptions}
                />
              </Box>
            </Stack>
          </Box>
          <Box sx={{ height: 70 }}>
            <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap>
              <EstadoSelect
                value={selectedEstado}
                onChange={handleSelectChangeEstado}
                options={selectEstado.map((estado) => ({
                  value: estado.value,
                  label: estado.label,
                }))}
              />
              <CidadeSelect
                value={selectedCidade}
                onChange={handleSelectChangeCidade}
                options={cidades}
              />
            </Stack>
          </Box>
          <Box sx={{ height: 70 }}>
            <Stack
              spacing={{ xs: 1, sm: 2 }}
              direction="row"
              useFlexGap
              sx={{ flexWrap: 'wrap' }}
            >
              <TextField
                id="outlined-password-input"
                placeholder="Senha"
                type="text"
                autoComplete="Endereço"
              />
              <TextField
                id="outlined-password-input"
                placeholder="Número"
                type="text"
                autoComplete="Número"
              />
            </Stack>
          </Box>
        </>
      )}
      <Stack spacing={2} direction="row">
        <Button variant="outlined">Cancelar</Button>
        <Button variant="contained">CONFIRMAR</Button>
      </Stack>
    </div>
  );
};

export default Register;
