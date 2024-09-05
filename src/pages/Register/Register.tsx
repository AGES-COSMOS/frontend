// React e outros módulos
import React, { useState } from 'react';
import './Cadastro.scss';

// Componentes personalizados
import ProfilePicture from '../../components/profilePicture/ProfilePicture';
import UserSelect from '../../components/userSelect/userSelect';
import InstituicaoSelect from '../../components/instituicaoSelect/instituicaoSelect';
import EstadoSelect from '../../components/estadoSelect/estadoSelect';
import CidadeSelect from '../../components/cidadeSelect/cidadeSelect';

// Material-UI
import Stack from '@mui/material/Stack';
import { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { Box, Button } from '@mui/material';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  cpfcnpj: string | null;
  photoURL: string | null | ArrayBuffer | null;
  blocked: boolean;
  registration_number: string | null;
  institution_id: number;
  role_id: number;
  password: string;
  institution: string;
  role: number;
  address: string | null;
}

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

  // Adiciona estados para os campos do formulário
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [cpfCnpj, setCpfCnpj] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [number, setNumber] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [photoURL, setPhotoURL] = useState<string | ArrayBuffer | null>(null);

  const handleSelectChange1 = (event: SelectChangeEvent<string>) => {
    setSelectedOption1(event.target.value);
  };

  const handleSelectChangeEstado = (event: SelectChangeEvent<string>) => {
    const estadoValue = event.target.value;
    setSelectedEstado(estadoValue);

    const estado = selectEstado.find((e) => e.value === estadoValue);
    if (estado) {
      setCidades(estado.city.map((city) => ({ value: city, label: city })));
      setSelectedCidade('');
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

  const handleConfirmClick = () => {
    const userData: User = {
      id: 0, // Ou algum outro valor que faça sentido
      name,
      email,
      phone,
      cpfcnpj: cpfCnpj,
      photoURL,
      blocked: false,
      registration_number: null,
      institution_id: Number(selectedInstituicao),
      role_id:
        selectOptions1.find((option) => option.value === selectedOption1)
          ?.value === 'professor'
          ? 1
          : selectOptions1.find((option) => option.value === selectedOption1)
                ?.value === 'aluno'
            ? 2
            : 3,
      password,
      institution: selectedInstituicao,
      role:
        selectOptions1.find((option) => option.value === selectedOption1)
          ?.value === 'professor'
          ? 1
          : selectOptions1.find((option) => option.value === selectedOption1)
                ?.value === 'aluno'
            ? 2
            : 3,
      address,
    };

    console.log(userData);
  };

  return (
    <div className="container">
      <h1 className="title">Preencha todos os Campos</h1>
      <br />
      <Box sx={{ height: 150 }}>
        <ProfilePicture onImageChange={setPhotoURL} />
      </Box>
      <br />
      <Box sx={{ height: 90, width: 150, position: 'relative', left: '32%' }}>
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
                placeholder="Nome Completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                placeholder="Senha"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                placeholder="Confirme Sua Senha"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
                placeholder="CPF"
                type="text"
                value={cpfCnpj}
                onChange={(e) => setCpfCnpj(e.target.value)}
              />
              <Box sx={{ height: 50, width: 225 }}>
                <InstituicaoSelect
                  value={selectedInstituicao}
                  onChange={handleSelectChangeInstituicao}
                  options={instituicoesOptions}
                />
              </Box>
            </Stack>
          </Box>
          <Box sx={{ height: 70, width: 473 }}>
            <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap>
              <TextField
                type="phone"
                placeholder="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Stack>
          </Box>

          <Box sx={{ height: 70, width: 473 }}>
            <Stack spacing={{ xs: 2, sm: 2 }} direction="row" useFlexGap>
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
                sx={{ width: 355 }}
                placeholder="Endereço"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <TextField
                sx={{ width: 100 }}
                placeholder="Número"
                type="text"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </Stack>
          </Box>
          <Stack
            spacing={2}
            direction="row"
            sx={{ position: 'relative', left: 130 }}
          >
            <Button
              variant="outlined"
              sx={{
                backgroundColor: '#fafcfe',
                color: '#000',
                borderColor: '#7734e7',
                fontSize: 'small',
              }}
              onClick={() => {
                // Limpar os campos ou qualquer outra ação ao cancelar
                setName('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setCpfCnpj('');
                setAddress('');
                setNumber('');
                setSelectedOption1('');
                setSelectedEstado('');
                setSelectedCidade('');
                setSelectedInstituicao('');
                setPhone('');
                setCidades([]);
              }}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#7734e7',
                color: '#fafcfe',
                borderColor: 'none',
                fontSize: 'small',
              }}
              onClick={handleConfirmClick} // Chama a função ao clicar no botão Confirmar
            >
              CONFIRMAR
            </Button>
          </Stack>
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
              <TextField placeholder="Nome Completo" />
              <TextField type="email" placeholder="E-mail" />
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
              <Box sx={{ height: 50, width: 225 }}>
                <InstituicaoSelect
                  value={selectedInstituicao}
                  onChange={handleSelectChangeInstituicao}
                  options={instituicoesOptions}
                />
              </Box>
            </Stack>
          </Box>
          <Box sx={{ height: 70, width: 473 }}>
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
                sx={{ width: 355 }}
                id="outlined-password-input"
                placeholder="Endereço"
                type="text"
              />
            </Stack>
          </Box>
          <Stack
            spacing={2}
            direction="row"
            sx={{ position: 'relative', left: 130 }}
          >
            <Button
              variant="outlined"
              sx={{
                backgroundColor: '#fafcfe',
                color: '#000',
                borderColor: '#7734e7',
                fontSize: 'small',
              }}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#7734e7',
                color: '#fafcfe',
                borderColor: 'none',
                fontSize: 'small',
              }}
            >
              CONFIRMAR
            </Button>
          </Stack>
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
              <TextField placeholder="Nome Completo" />
              <TextField type="email" placeholder="E-mail" />
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
                placeholder="CNPJ"
                type="text"
                autoComplete="current-password"
              />
              <Box sx={{ height: 50, width: 225 }}>
                <InstituicaoSelect
                  value={selectedInstituicao}
                  onChange={handleSelectChangeInstituicao}
                  options={instituicoesOptions}
                />
              </Box>
            </Stack>
          </Box>
          <Box sx={{ height: 70, width: 473 }}>
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
                sx={{ width: 355 }}
                id="outlined-password-input"
                placeholder="Endereço"
                type="text"
              />
              <TextField
                sx={{ width: 100 }}
                id="outlined-password-input"
                placeholder="Número"
                type="text"
                autoComplete="Número"
              />
            </Stack>
          </Box>
          <Stack
            spacing={2}
            direction="row"
            sx={{ position: 'relative', left: 130 }}
          >
            <Button
              variant="outlined"
              sx={{
                backgroundColor: '#fafcfe',
                color: '#000',
                borderColor: '#7734e7',
                fontSize: 'small',
              }}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#7734e7',
                color: '#fafcfe',
                borderColor: 'none',
                fontSize: 'small',
              }}
            >
              CONFIRMAR
            </Button>
          </Stack>
        </>
      )}
    </div>
  );
};

export default Register;
