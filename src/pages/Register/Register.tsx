import React, { useState } from 'react';
import './Cadastro.scss';

// Componentes personalizados
import ProfilePicture from '../../components/profilePicture/ProfilePicture';
import UserSelect from '../../components/userSelect/userSelect';
import InstituicaoSelect from '../../components/instituicaoSelect/instituicaoSelect';
import EstadoSelect from '../../components/estadoSelect/estadoSelect';
import CidadeSelect from '../../components/cidadeSelect/cidadeSelect';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import ConfirmPassword from '../../components/PasswordInput/confirmPassword';
import PhoneInput from '../../components/PhoneInput/PhoneInput';
import InputCpfOrCnpj from '../../components/CPForCNPJInput/CPForCNPJInput'; // Importe o novo componente

// Material-UI
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { Box, Button } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import EmailInput from 'components/EmailInput/EmailInput';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  cpfcnpj: string | null;
  photoURL: string | ArrayBuffer | null;
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

  const isPasswordValid = (password: string): boolean => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLengthValid = password.length >= 8;
    return hasUpperCase && hasLowerCase && hasSpecialChar && isLengthValid;
  };

  const isFormValid = () => {
    // Verifica se todos os campos necessários estão preenchidos
    const isPasswordValidCheck = isPasswordValid(password);
    const isPasswordMatch = password === confirmPassword;
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPhoneValid = phone.replace(/\D/g, '').length === 11; // Verifica se o número tem exatamente 11 dígitos
    const isCpfCnpjValid = cpfCnpj.replace(/\D/g, '').length >= 11; // Ajuste a lógica de validação conforme necessário

    const isAllFieldsFilled =
      name &&
      email &&
      password &&
      confirmPassword &&
      cpfCnpj &&
      address &&
      number &&
      selectedOption1 &&
      selectedEstado &&
      selectedCidade &&
      selectedInstituicao &&
      phone &&
      isPasswordValidCheck &&
      isPasswordMatch &&
      isEmailValid &&
      isPhoneValid &&
      isCpfCnpjValid;

    return isAllFieldsFilled;
  };

  const handleConfirmClick = () => {
    if (isFormValid()) {
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
        address: `${address} ${number}`,
      };

      console.log(userData);
    }
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
            <Stack spacing={{ xs: 1, sm: 2 }} direction="row">
              <TextField
                placeholder="Nome Completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <EmailInput
                value={email}
                onChange={(newEmail) => setEmail(newEmail)}
              />
            </Stack>
          </Box>
          <Box sx={{ height: 70, width: 479 }}>
            <Stack spacing={{ xs: 6, sm: 2 }} direction="row">
              <PasswordInput password={password} setPassword={setPassword} />
              <ConfirmPassword
                password={password} // Passa a senha atual para o ConfirmPassword
                setPassword={setConfirmPassword} // Passa a função para atualizar a confirmação de senha
                confirmPassword={confirmPassword} // Passa a confirmação de senha para o ConfirmPassword
                setConfirmPassword={setConfirmPassword} // Passa a função para atualizar a confirmação de senha
              />
            </Stack>
          </Box>
          <Box sx={{ height: 70 }}>
            <Stack spacing={{ xs: 1, sm: 2 }} direction="row">
              <InputCpfOrCnpj
                value={cpfCnpj}
                onChange={(value) => setCpfCnpj(value)}
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
              <PhoneInput
                value={phone}
                onChange={(formattedValue) => setPhone(formattedValue)}
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
              onClick={handleConfirmClick}
              disabled={!isFormValid()} // Desabilita o botão se o formulário não for válido
            >
              CONFIRMAR
            </Button>
          </Stack>
        </>
      )}
      {selectedOption1 === 'aluno' && (
        <>
          <Box sx={{ height: 70 }}>
            <Stack spacing={{ xs: 1, sm: 2 }} direction="row">
              <TextField
                placeholder="Nome Completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <EmailInput
                value={email}
                onChange={(newEmail) => setEmail(newEmail)}
              />
            </Stack>
          </Box>
          <Box sx={{ height: 70, width: 479 }}>
            <Stack spacing={{ xs: 6, sm: 2 }} direction="row">
              <PasswordInput password={password} setPassword={setPassword} />
              <ConfirmPassword
                password={password} // Passa a senha atual para o ConfirmPassword
                setPassword={setConfirmPassword} // Passa a função para atualizar a confirmação de senha
                confirmPassword={confirmPassword} // Passa a confirmação de senha para o ConfirmPassword
                setConfirmPassword={setConfirmPassword} // Passa a função para atualizar a confirmação de senha
              />
            </Stack>
          </Box>
          <Box sx={{ height: 70 }}>
            <Stack spacing={{ xs: 1, sm: 2 }} direction="row">
              <InputCpfOrCnpj
                value={cpfCnpj}
                onChange={(value) => setCpfCnpj(value)}
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
              <PhoneInput
                value={phone}
                onChange={(formattedValue) => setPhone(formattedValue)}
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
              onClick={handleConfirmClick}
              disabled={!isFormValid()} // Desabilita o botão se o formulário não for válido
            >
              CONFIRMAR
            </Button>
          </Stack>
        </>
      )}
      {selectedOption1 === 'instituicao' && (
        <>
          <Box sx={{ height: 70 }}>
            <Stack spacing={{ xs: 1, sm: 2 }} direction="row">
              <TextField
                placeholder="Nome Completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <EmailInput
                value={email}
                onChange={(newEmail) => setEmail(newEmail)}
              />
            </Stack>
          </Box>
          <Box sx={{ height: 70, width: 479 }}>
            <Stack spacing={{ xs: 6, sm: 2 }} direction="row">
              <PasswordInput password={password} setPassword={setPassword} />
              <ConfirmPassword
                password={password} // Passa a senha atual para o ConfirmPassword
                setPassword={setConfirmPassword} // Passa a função para atualizar a confirmação de senha
                confirmPassword={confirmPassword} // Passa a confirmação de senha para o ConfirmPassword
                setConfirmPassword={setConfirmPassword} // Passa a função para atualizar a confirmação de senha
              />
            </Stack>
          </Box>
          <Box sx={{ height: 70 }}>
            <Stack spacing={{ xs: 1, sm: 2 }} direction="row">
              <InputCpfOrCnpj
                value={cpfCnpj}
                onChange={(value) => setCpfCnpj(value)}
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
              <PhoneInput
                value={phone}
                onChange={(formattedValue) => setPhone(formattedValue)}
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
              onClick={handleConfirmClick}
              disabled={!isFormValid()} // Desabilita o botão se o formulário não for válido
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
