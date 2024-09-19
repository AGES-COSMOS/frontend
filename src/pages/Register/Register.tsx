import React, { useEffect, useState } from 'react';
import './Cadastro.scss';

import ProfilePicture from '../../components/profilePicture/ProfilePicture';
import UserSelect from '../../components/userSelect/userSelect';
import GenericInput from '../../components/genericInput/GenericInput';
import GenericSelect from 'components/genericSelect/GenericSelect';

import Stack from '@mui/material/Stack';
import { Box, Button } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import {
  formatCNPJ,
  formatCPF,
  isValidEmail,
  isValidPhone,
} from '@brazilian-utils/brazilian-utils';
import { isValidCPF } from '@brazilian-utils/brazilian-utils';
import { isValidCNPJ } from '@brazilian-utils/brazilian-utils';
import GenericButton from 'components/genericButton/GenericButton';

interface Option {
  value: string;
  label: string;
}

const selectOptions1: Option[] = [
  { value: 'professor', label: 'Professor' },
  { value: 'aluno', label: 'Aluno' },
  { value: 'instituicao', label: 'Instituição' },
];

const Register: React.FC = () => {
  const [selectedOption1, setSelectedOption1] = useState<string>('');
  const [selectedInstituicao, setSelectedInstituicao] = useState<string>('');
  const [isFormValid, setIsFormValid] = useState<boolean | any>(false);

  const [selectedState, setSelectedState] = useState<string | undefined>(
    undefined,
  );
  const [selectedCity, setSelectedCity] = useState<string | undefined>(
    undefined,
  );

  const handleStateChange = (value: string) => {
    setSelectedState(value);
    setSelectedCity(''); // Limpa a cidade quando um novo estado é selecionado
  };

  const handleInstituicaoChange = (value: string) => {
    setSelectedInstituicao(value);
    setSelectedInstituicao('');
  };

  const handleCityChange = (value: string) => {
    setSelectedCity(value);
  };

  const handleConfirm = () => {
    if (!isFormValid) {
      return;
    }

    // Coleta de dados
    const dadosColetados = {
      aluno:
        selectedOption1 === 'aluno'
          ? {
              name,
              email,
              password,
              confirmPassword,
              matricula,
              cpf,
              phone,
              estado: selectedState,
              cidade: selectedCity,
            }
          : undefined,

      professor:
        selectedOption1 === 'professor'
          ? {
              name,
              email,
              password,
              confirmPassword,
              cpf,
              phone,
              estado: selectedState,
              cidade: selectedCity,
            }
          : undefined,

      instituicao:
        selectedOption1 === 'instituicao'
          ? {
              name,
              email,
              password,
              confirmPassword,
              cnpj,
              phone,
              address,
            }
          : undefined,
    };

    return console.log(dadosColetados); // Retorna os dados coletados
  };

  // Adiciona estados para os campos do formulário
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] =
    useState<boolean>(false);
  const [cpf, setCPF] = useState<string>('');
  const [cpfError, setCPFError] = useState<boolean>(false);
  const [cnpj, setCNPJ] = useState<string>('');
  const [cnpjError, setCNPJError] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState<boolean>(false);

  const [address, setAddress] = useState<string>('');
  const [number, setNumber] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [photoURL, setPhotoURL] = useState<string | ArrayBuffer | null>(null);
  const [matricula, setMatricula] = useState<string>('');

  const handleSelectChange1 = (event: SelectChangeEvent<string>) => {
    setSelectedOption1(event.target.value);
  };

  const handleCancel = () => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setCPF('');
    setCNPJ('');
    setAddress('');
    setMatricula('');
    setNumber('');
    setSelectedCity('');
    setSelectedOption1('');
    setSelectedInstituicao('');
    setPhone('');
    setSelectedState('');
  };

  const handlePassword = (event: SelectChangeEvent<string>) => {
    const passwordValue = event.target.value;
    setPassword(event.target.value);
    setPassword(passwordValue);
    setPasswordError(!isPasswordValid(passwordValue));
  };

  const handleConfirmPassword = (event: SelectChangeEvent<string>) => {
    const confirmPasswordValue = event.target.value;
    setConfirmPassword(event.target.value);
    setConfirmPassword(confirmPasswordValue);
    setConfirmPasswordError(
      !isConfirmPasswordValid(password, confirmPasswordValue),
    );
  };

  const handleAddress = (event: SelectChangeEvent<string>) => {
    setAddress(event.target.value);
  };

  const handleNumber = (event: SelectChangeEvent<string>) => {
    setNumber(event.target.value);
  };

  const isPasswordValid = (password: string): boolean => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLengthValid = password.length >= 8;
    return hasUpperCase && hasLowerCase && hasSpecialChar && isLengthValid;
  };

  const isConfirmPasswordValid = (
    password: string,
    confirmPassword: string,
  ): boolean => {
    const hasUpperCase = /[A-Z]/.test(confirmPassword);
    const hasLowerCase = /[a-z]/.test(confirmPassword);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(confirmPassword);
    const isLengthValid = confirmPassword.length >= 8;
    const isEqual = password === confirmPassword;
    return (
      hasUpperCase && hasLowerCase && hasSpecialChar && isLengthValid && isEqual
    );
  };

  const handleMatricula = (e: React.ChangeEvent<HTMLInputElement>) => {
    const matriculaValue = e.target.value;
    setMatricula(matriculaValue);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setEmailError(!isValidEmail(emailValue)); // Utilize sua validação aqui
  };

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cpfValue = e.target.value;

    setCPF(formatCPF(cpfValue));
    setCPFError(!isValidCPF(cpfValue));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phoneValue = e.target.value;
    setPhone(phoneValue);
    setPhoneError(!isValidPhone(phoneValue));
  };

  const handleCNPJChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cnpjValue = e.target.value;
    setCNPJ(formatCNPJ(cnpjValue));
    setCNPJError(!isValidCNPJ(cnpjValue));
  };

  const validateForm = () => {
    const isValid =
      selectedOption1 === 'aluno'
        ? !!(
            name &&
            email &&
            password &&
            confirmPassword &&
            matricula &&
            cpf &&
            phone &&
            selectedState &&
            selectedCity &&
            !emailError &&
            !passwordError &&
            !confirmPasswordError &&
            !cpfError &&
            !phoneError
          )
        : selectedOption1 === 'professor'
          ? !!(
              name &&
              email &&
              password &&
              confirmPassword &&
              cpf &&
              phone &&
              selectedState &&
              selectedCity &&
              !emailError &&
              !passwordError &&
              !confirmPasswordError &&
              !cpfError &&
              !phoneError
            )
          : selectedOption1 === 'instituicao'
            ? !!(
                name &&
                email &&
                password &&
                confirmPassword &&
                cnpj &&
                phone &&
                address &&
                number &&
                !emailError &&
                !passwordError &&
                !confirmPasswordError &&
                cnpjError &&
                !phoneError
              )
            : false;

    setIsFormValid(isValid); // Agora isValid é sempre booleano
  };

  useEffect(() => {
    validateForm();
  }, [
    name,
    email,
    password,
    confirmPassword,
    matricula,
    cpf,
    phone,
    cnpj,
    address,
    selectedState,
    selectedCity,
    selectedOption1,
    emailError,
    passwordError,
    confirmPasswordError,
    cpfError,
    phoneError,
    cnpjError,
  ]);

  return (
    <>
      <h1 className="title">Preencha todos os Campos</h1>
      <div className="container">
        <Box sx={{ height: 80 }}>
          <Stack
            spacing={{ sm: 3 }}
            direction="column"
            sx={{ width: 160, position: 'relative', left: 150, paddingTop: 2 }}
          >
            <ProfilePicture onImageChange={setPhotoURL} />
            <UserSelect
              value={selectedOption1}
              onChange={handleSelectChange1}
              options={selectOptions1}
            />
          </Stack>
        </Box>
      </div>
      <div className="container">
        <br />
        <br />
        {selectedOption1 === 'professor' && (
          <>
            <Box sx={{ height: 80 }}>
              <Stack spacing={{ xs: 1, sm: 2 }} direction="row">
                <GenericInput
                  label="Nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Digite seu nome"
                  required
                />
                <GenericInput
                  label="Email"
                  value={email}
                  onChange={handleEmailChange}
                  type="email"
                  placeholder="Digite seu email"
                  required
                  error={emailError}
                  errorMessage="Email inválido"
                />
              </Stack>
            </Box>

            <Box sx={{ height: 80, width: 479 }}>
              <Stack spacing={{ xs: 6, sm: 2 }} direction="row">
                <GenericInput
                  label="Senha"
                  type="password"
                  value={password}
                  onChange={handlePassword}
                  placeholder="Digite sua Senha"
                  error={passwordError}
                  errorMessage="Senha inválida"
                  required
                />
                <GenericInput
                  label="Senha"
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmPassword}
                  placeholder="Confirme sua Senha"
                  error={confirmPasswordError}
                  errorMessage="As senhas diferem"
                  required
                />
              </Stack>
            </Box>
            <Box sx={{ height: 80 }}>
              <Stack spacing={{ xs: 1, sm: 2 }} direction="row"></Stack>
              <Box sx={{ height: 50, width: 225 }}>
                <GenericSelect
                  type="instituicao"
                  selectedValue={selectedInstituicao}
                  onChange={handleInstituicaoChange}
                />
              </Box>
            </Box>
            <Box sx={{ height: 80, width: 473 }}>
              <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap>
                <GenericInput
                  label="CPF"
                  value={cpf}
                  onChange={handleCPFChange}
                  placeholder="Digite seu CPF"
                  error={cpfError}
                  errorMessage="CPF inválido"
                  required
                />
                <GenericInput
                  label="Telefone"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="Digite seu Telefone"
                  error={phoneError}
                  errorMessage="Telefone inválido"
                  required
                />
              </Stack>
            </Box>
            <Box sx={{ height: 80, width: 473 }}>
              <Stack spacing={{ xs: 2, sm: 2 }} direction="row" useFlexGap>
                <GenericSelect
                  type="estado"
                  selectedValue={selectedState}
                  onChange={handleStateChange}
                />
                <GenericSelect
                  type="cidade"
                  selectedValue={selectedCity}
                  onChange={handleCityChange}
                  selectedState={selectedState}
                />
              </Stack>
            </Box>
            <Box sx={{ height: 80 }}>
              <Stack
                spacing={{ xs: 1, sm: 2 }}
                direction="row"
                useFlexGap
                sx={{ flexWrap: 'wrap' }}
              >
                {' '}
                <Stack
                  spacing={2}
                  direction="row"
                  sx={{ position: 'relative', left: 130 }}
                >
                  <GenericButton variant="cancelar" onClick={handleCancel}>
                    Cancelar
                  </GenericButton>
                  <GenericButton
                    variant="confirmar"
                    onClick={handleConfirm}
                    disabled={!isFormValid} // Desabilita o botão se o formulário não for válido
                  >
                    Confirmar
                  </GenericButton>
                </Stack>
              </Stack>
            </Box>
          </>
        )}
        {selectedOption1 === 'aluno' && (
          <>
            <Box sx={{ height: 80 }}>
              <Stack spacing={{ xs: 1, sm: 2 }} direction="row">
                <GenericInput
                  label="Nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Digite seu nome"
                  required
                />
                <GenericInput
                  label="Email"
                  value={email}
                  onChange={handleEmailChange}
                  type="email"
                  placeholder="Digite seu email"
                  required
                  error={emailError}
                  errorMessage="Email inválido"
                />
              </Stack>
            </Box>

            <Box sx={{ height: 80, width: 477 }}>
              <Stack spacing={{ xs: 4, sm: 2 }} direction="row">
                <GenericInput
                  label="Senha"
                  type="password"
                  value={password}
                  onChange={handlePassword}
                  placeholder="Digite sua Senha"
                  error={passwordError}
                  errorMessage="Senha inválida"
                  required
                />

                <GenericInput
                  label="Confirme sua senha"
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmPassword}
                  placeholder="Confirme sua Senha"
                  error={confirmPasswordError}
                  errorMessage="As senhas diferem"
                  required
                />
              </Stack>
            </Box>

            <Box sx={{ height: 80 }}>
              <Stack spacing={{ xs: 1, sm: 2 }} direction="row">
                <GenericInput
                  label="Matricula"
                  value={matricula}
                  onChange={handleMatricula}
                  placeholder="Digite sua Matrícula"
                  required
                />
                <Stack
                  spacing={{ xs: 4, sm: 2 }}
                  direction="row"
                  sx={{ width: 232 }}
                >
                  <GenericSelect
                    type="instituicao"
                    selectedValue={selectedInstituicao}
                    onChange={setSelectedInstituicao}
                  />
                </Stack>
              </Stack>
            </Box>
            <Box sx={{ height: 80 }}>
              <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap>
                <GenericInput
                  label="CPF"
                  value={cpf}
                  onChange={handleCPFChange}
                  placeholder="Digite seu CPF"
                  error={cpfError}
                  errorMessage="CPF inválido"
                  required
                />
                <GenericInput
                  label="Telefone"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="Digite seu Telefone"
                  error={phoneError}
                  errorMessage="Telefone inválido"
                  required
                />
              </Stack>
            </Box>
            <Box sx={{ height: 80, width: 473 }}>
              <Stack spacing={{ xs: 2, sm: 2 }} direction="row" useFlexGap>
                <GenericSelect
                  type="estado"
                  selectedValue={selectedState}
                  onChange={handleStateChange}
                />
                <GenericSelect
                  type="cidade"
                  selectedValue={selectedCity}
                  onChange={handleCityChange}
                  selectedState={selectedState}
                />
              </Stack>
            </Box>
            <Stack
              spacing={2}
              direction="row"
              sx={{ position: 'relative', left: 130 }}
            >
              <GenericButton variant="cancelar" onClick={handleCancel}>
                Cancelar
              </GenericButton>
              <GenericButton
                variant="confirmar"
                onClick={handleConfirm}
                disabled={!isFormValid} // Desabilita o botão se o formulário não for válido
              >
                Confirmar
              </GenericButton>
            </Stack>
          </>
        )}
        {selectedOption1 === 'instituicao' && (
          <>
            <Box sx={{ height: 80 }}>
              <Stack spacing={{ xs: 1, sm: 2 }} direction="row">
                <GenericInput
                  label="Nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Digite seu nome"
                  required
                />
                <GenericInput
                  label="Email"
                  value={email}
                  onChange={handleEmailChange}
                  type="email"
                  placeholder="Digite seu email"
                  required
                  error={emailError}
                  errorMessage="Email inválido"
                />
              </Stack>
            </Box>

            <Box sx={{ height: 80, width: 479 }}>
              <Stack spacing={{ xs: 6, sm: 2 }} direction="row">
                <GenericInput
                  label="Senha"
                  type="password"
                  value={password}
                  onChange={handlePassword}
                  placeholder="Digite sua senha"
                  error={passwordError}
                  errorMessage="Senha inválida"
                  required
                />
                <GenericInput
                  label="Confirme sua senha"
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmPassword}
                  placeholder="Confirme sua Senha"
                  error={confirmPasswordError}
                  errorMessage="As senhas diferem"
                  required
                />
              </Stack>
            </Box>
            <Box sx={{ height: 80 }}>
              <Stack spacing={{ xs: 1, sm: 2 }} direction="row"></Stack>
              <Box sx={{ height: 50, width: 225 }}>
                <GenericSelect
                  type="instituicao"
                  selectedValue={selectedInstituicao}
                  onChange={handleInstituicaoChange}
                />
              </Box>
            </Box>
            <Box sx={{ height: 80, width: 473 }}>
              <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap>
                <GenericInput
                  label="CNPJ"
                  value={cnpj}
                  onChange={handleCNPJChange}
                  placeholder="Digite o CNPJ"
                  error={cnpjError}
                  errorMessage="CNPJ inválido"
                  required
                />
                <GenericInput
                  label="Telefone"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="Digite seu Telefone"
                  error={phoneError}
                  errorMessage="Telefone inválido"
                  required
                />
              </Stack>
            </Box>

            <Box sx={{ height: 80 }}>
              <Stack spacing={{ xs: 8, sm: 2 }} direction={'row'}>
                <GenericInput
                  label="Endereço"
                  type="address"
                  value={address}
                  onChange={handleAddress}
                  placeholder="Endereço"
                  required
                />
                <GenericInput
                  label="Número"
                  type="number"
                  value={number}
                  onChange={handleNumber}
                  placeholder="Número"
                  required
                />
              </Stack>
            </Box>
            <Stack
              spacing={2}
              direction="row"
              sx={{ position: 'relative', left: 130 }}
            >
              <GenericButton variant="cancelar" onClick={handleCancel}>
                Cancelar
              </GenericButton>
              <GenericButton
                variant="confirmar"
                onClick={handleConfirm}
                disabled={!isFormValid} // Desabilita o botão se o formulário não for válido
              >
                Confirmar
              </GenericButton>
            </Stack>
          </>
        )}
      </div>
    </>
  );
};

export default Register;
