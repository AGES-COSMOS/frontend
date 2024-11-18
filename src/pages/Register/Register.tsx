import React, { useEffect, useState } from 'react';
import './Register.scss';

import ProfilePicture from '../../components/profilePicture/ProfilePicture';

import { getStates, getCities } from '@brazilian-utils/brazilian-utils';

import { ButtonComponent } from '../../components/Button/button';
import { TextField } from '../../components/TextFields/textfield';
import { Select } from 'components/Select/select';

import {
  formatCNPJ,
  formatCPF,
  isValidEmail,
  isValidPhone,
} from '@brazilian-utils/brazilian-utils';
import { isValidCPF } from '@brazilian-utils/brazilian-utils';
import { isValidCNPJ } from '@brazilian-utils/brazilian-utils';
import { CreateUser } from 'services/types';
import { createUser } from 'services/userService';
import ToastNotification from 'components/ToastNotification/ToastNotification';

interface Option {
  value: string;
  label: string;
  id: number;
}

const selectOptions1: Option[] = [
  { value: 'professor', label: 'Professor', id: 0 },
  { value: 'aluno', label: 'Aluno', id: 1 },
  { value: 'instituicao', label: 'Instituição', id: 2 },
];

const instituicoesOptionsArr = [
  { value: 'ufrgs', label: 'UFRGS', id: 2 },
  { value: 'pucrs', label: 'PUCRS', id: 1 },
];

const Register: React.FC = () => {
  const [stateOptions, setStateOptions] = useState<string[]>([]);

  const [selectedOption1, setSelectedOption1] = useState<string>('');
  const [selectedInstituicao, setSelectedInstituicao] = useState<
    string | number
  >('');
  const [isFormValid, setIsFormValid] = useState<boolean | any>(false);

  const [selectedState, setSelectedState] = useState<string | undefined>(
    undefined,
  );

  const [selectedCity, setSelectedCity] = useState<string | undefined>(
    undefined,
  );

  const handleInstituicaoChange = (selectedValue: string) => {
    const selectedOption = instituicoesOptionsArr.find(
      (option) => option.label === selectedValue,
    );

    if (selectedOption) {
      setSelectedInstituicao(selectedOption.id);
    } else {
      setSelectedInstituicao('');
    }
  };

  const handleUserChange = (selectedUser: string) => {
    if (typeof selectedUser === 'string') {
      let lowerCaseUser = selectedUser.toLowerCase();
      if (lowerCaseUser === 'instituição') {
        lowerCaseUser = 'instituicao';
      }
      setSelectedOption1(lowerCaseUser);
    }
  };

  useEffect(() => {
    const estados = getStates();
    const estadoNames = estados.map((estado) => estado.name);
    setStateOptions(estadoNames);
  }, []);

  const handleStateChange = (selectedOption: string) => {
    setSelectedState(selectedOption);
    setSelectedCity(' ');
  };

  const handleCityDisplay = (state: any) => {
    const cidades = getCities(state);
    return cidades.map((city) => city);
  };

  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<
    'success' | 'error' | 'warning' | 'info'
  >('info');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [cities, setCities] = useState<string[]>([]);
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
    setSelectedInstituicao('');
    setPhone('');
    setSelectedState('');
    setCPFError(false);
    setCNPJError(false);
    setPasswordError(false);
    setConfirmPasswordError(false);
    setEmailError(false);
    setPhoneError(false);
  };

  const handlePassword = (value: string) => {
    const passwordValue = value;
    setPassword(passwordValue);
    setPasswordError(!isPasswordValid(passwordValue));
  };

  const handleConfirmPassword = (value: string) => {
    const confirmPasswordValue = value;
    setConfirmPassword(confirmPasswordValue);
    setConfirmPasswordError(
      !isConfirmPasswordValid(password, confirmPasswordValue),
    );
  };

  const isPasswordValid = (password: string): boolean => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLengthValid = password.length >= 8;
    const hasNumber = /\d/.test(password);
    return (
      hasUpperCase &&
      hasLowerCase &&
      hasSpecialChar &&
      isLengthValid &&
      hasNumber
    );
  };

  const isConfirmPasswordValid = (
    password: string,
    confirmPassword: string,
  ): boolean => {
    const hasUpperCase = /[A-Z]/.test(confirmPassword);
    const hasLowerCase = /[a-z]/.test(confirmPassword);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(confirmPassword);
    const isLengthValid = confirmPassword.length >= 8;
    const hasNumber = /\d/.test(password);
    const isEqual = password === confirmPassword;
    return (
      hasUpperCase &&
      hasLowerCase &&
      hasSpecialChar &&
      isLengthValid &&
      isEqual &&
      hasNumber
    );
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setEmailError(!isValidEmail(value));
  };

  const handleCPFChange = (value: string) => {
    const cpfValue = value;

    setCPF(formatCPF(cpfValue));
    setCPFError(!isValidCPF(cpfValue));
  };

  const handlePhoneChange = (value: string) => {
    const phoneValue = value;
    setPhone(phoneValue);
    setPhoneError(!isValidPhone(phoneValue));
  };

  const handleCNPJChange = (value: any) => {
    const cnpjValue = value;
    setCNPJ(formatCNPJ(cnpjValue));
    setCNPJError(!isValidCNPJ(cnpjValue));
  };

  const options = instituicoesOptionsArr.map((option) => option.label);

  useEffect(() => {
    if (selectedState) {
      const citiesList = handleCityDisplay(selectedState);
      setCities(citiesList);
      setSelectedCity('');
    } else {
      setCities([]);
      setSelectedCity('');
    }
  }, [selectedState]);

  const validateForm = () => {
    let isValid = true;

    if (selectedOption1 === 'aluno' || selectedOption1 === 'professor') {
      isValid =
        !!name &&
        !!email &&
        !!password &&
        !!confirmPassword &&
        !!cpf &&
        !!phone &&
        !!selectedState &&
        !!selectedCity &&
        !emailError &&
        !passwordError &&
        !confirmPasswordError &&
        confirmPassword === password &&
        !cpfError &&
        !phoneError;
    }

    if (selectedOption1 === 'instituicao') {
      isValid =
        !!name &&
        !!email &&
        !!password &&
        !!confirmPassword &&
        confirmPassword === password &&
        !!cnpj &&
        !!phone &&
        !!address &&
        !!number &&
        !!selectedState &&
        !!selectedCity &&
        !emailError &&
        !passwordError &&
        !confirmPasswordError &&
        !cnpjError &&
        !phoneError;
    }

    setIsFormValid(isValid);
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
    number,
    selectedState,
    selectedCity,
    selectedOption1,
    emailError,
    passwordError,
    confirmPasswordError,
    cpfError,
    phoneError,
    cnpjError,
    validateForm,
  ]);

  const handleConfirm = async () => {
    if (isFormValid) {
      const updatedUserData: CreateUser = {
        name,
        email,
        password,
        phone:
          selectedOption1 === 'aluno' || selectedOption1 === 'professor'
            ? '+55' + phone
            : undefined,
        cpfcnpj: selectedOption1 === 'instituicao' ? cnpj : cpf,
        photoURL: photoURL ? photoURL.toString() : undefined,
        blocked: false,
        registration_number: matricula ? matricula : 'null',
        institution_id: selectedInstituicao as number,
        role_id:
          selectedOption1 === 'professor'
            ? 1
            : selectedOption1 === 'aluno'
              ? 2
              : 0,
      };

      try {
        await createUser(updatedUserData);
        setToastMessage('Usuário criado com sucesso!');
        setToastType('success');
      } catch (error) {
        console.error('Erro ao criar usuário:', error);
        setToastMessage('Erro ao criar usuário.');
        setToastType('error');
      }
    } else {
      setToastMessage('Formulário inválido. Verifique os campos.');
      setToastType('error');
    }
  };

  const clearToast = () => {
    setToastMessage('');
    setToastType('info');
  };

  return (
    <>
      <div className="title">
        <h2>Preencha todos os Campos</h2>
      </div>
      <div className="container">
        <div className="selectUserAndProfilePicBox">
          <ProfilePicture onImageChange={setPhotoURL} />
          <div className="selectUserAlignment">
            <Select
              options={selectOptions1 as unknown as string[]}
              label="Tipo de Usuário"
              placeholder="Usuário"
              onChange={handleUserChange}
              required
            />
          </div>
        </div>
      </div>
      <div className="container">
        <br />
        <br />
        {selectedOption1 === 'professor' && (
          <>
            <div className="rowAlignmentBox">
              <div className="boxAlignment">
                <TextField
                  label="Digite seu nome"
                  placeholder="Nome"
                  required
                  value={name}
                  onChange={(value) => setName(value)}
                />
              </div>
              <div className="boxAlignment">
                <div className="boxAlignment">
                  <div className="boxAlignment">
                    <TextField
                      label="Digite seu email"
                      placeholder="Email"
                      required
                      value={email}
                      onChange={(email) => handleEmailChange(email)}
                    />
                    {emailError && (
                      <p className="error-message">Email Inválido</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="rowAlignmentBox">
              <div className="boxAlignment">
                <TextField
                  label="Digite sua Senha"
                  placeholder="Senha"
                  required
                  value={password}
                  onChange={(password) => handlePassword(password)}
                  hidepassword
                />
                {passwordError && (
                  <p className="error-message">Senha Inválida</p>
                )}
              </div>
              <div className="boxAlignment">
                <TextField
                  label="Confirme sua Senha"
                  placeholder="Senha"
                  required
                  value={confirmPassword}
                  onChange={(value) => handleConfirmPassword(value)}
                  hidepassword
                />
                {confirmPasswordError && (
                  <p className="error-message">Senha Diferente</p>
                )}
              </div>
            </div>
            <div className="rowAlignmentBox">
              <div className="boxAlignment">
                <Select
                  options={options}
                  label="Instituicao"
                  placeholder="Instituicao"
                  onChange={handleInstituicaoChange}
                  required
                />
              </div>
            </div>
            <div className="rowAlignmentBox">
              <div className="boxAlignment">
                <TextField
                  label="CPF"
                  placeholder="Digite seu CPF"
                  required
                  value={cpf}
                  onChange={(cpf) => handleCPFChange(cpf)}
                />
                {cpfError && <p className="error-message">CPF Inválido</p>}
              </div>
              <div className="boxAlignment">
                <TextField
                  label="Telefone"
                  placeholder="Digite seus Telefone"
                  required
                  value={phone}
                  onChange={(value) => handlePhoneChange(value)}
                />
                {phoneError && (
                  <p className="error-message">Telefone Inválido</p>
                )}
              </div>
            </div>
            <div className="rowAlignmentBox">
              <div className="boxAlignment">
                <Select
                  options={stateOptions}
                  label="Selecione estado"
                  placeholder="Estado"
                  onChange={handleStateChange}
                  value={selectedState}
                  required
                />
              </div>
              <div className="boxAlignment">
                <Select
                  options={cities}
                  label="Selecione cidade"
                  placeholder="Cidade"
                  onChange={(selectedOption) => {
                    setSelectedCity(selectedOption);
                  }}
                  value={selectedCity}
                  required
                />
              </div>
            </div>
            <div className="rowAlignmentBox">
              <div className="buttonsAlignment">
                <ButtonComponent
                  type="secondary"
                  onClick={handleCancel}
                  size={1}
                >
                  Cancelar
                </ButtonComponent>
              </div>
              <div className=".buttonsAlignment">
                <ButtonComponent
                  type="primary"
                  onClick={handleConfirm}
                  size={1}
                >
                  Confirmar
                </ButtonComponent>
                {toastMessage && (
                  <ToastNotification
                    message={toastMessage}
                    type={toastType}
                    onClose={clearToast}
                  />
                )}
              </div>
            </div>
          </>
        )}
        {selectedOption1 === 'aluno' && (
          <>
            <div className="rowAlignmentBox">
              <div className="boxAlignment">
                <TextField
                  label="Digite seu nome"
                  placeholder="Nome"
                  required
                  value={name}
                  onChange={(value) => setName(value)}
                />
              </div>
              <div className="boxAlignment">
                <TextField
                  label="Digite seu email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(email) => handleEmailChange(email)}
                />
                {emailError && <p className="error-message">Email Inválido</p>}
              </div>
            </div>

            <div className="rowAlignmentBox">
              <div className="boxAlignment">
                <TextField
                  label="Digite sua Senha"
                  placeholder="Senha"
                  required
                  value={password}
                  onChange={(password) => handlePassword(password)}
                  hidepassword
                />
                {passwordError && (
                  <p className="error-message">Senha Inválida</p>
                )}
              </div>
              <div className="boxAlignment">
                <TextField
                  label="Confirme sua Senha"
                  placeholder="Senha"
                  required
                  value={confirmPassword}
                  onChange={(value) => handleConfirmPassword(value)}
                  hidepassword
                />
                {confirmPasswordError && (
                  <p className="error-message">Senha Diferente</p>
                )}
              </div>
            </div>
            <div className="rowAlignmentBox">
              <div className="boxAlignment">
                <TextField
                  label="Matrícula"
                  placeholder="Digite sua matrícula"
                  required
                  value={matricula}
                  onChange={(value) => setMatricula(value)}
                />
              </div>
              <div className="boxAlignment">
                <Select
                  options={options}
                  label="Instituição"
                  placeholder="Selecione uma instituição"
                  onChange={handleInstituicaoChange}
                  required
                />
              </div>
            </div>
            <div className="rowAlignmentBox">
              <div className="boxAlignment">
                <TextField
                  label="CPF"
                  placeholder="Digite seu CPF"
                  required
                  value={cpf}
                  onChange={(cpf) => handleCPFChange(cpf)}
                />
                {cpfError && <p className="error-message">CPF Inválido</p>}
              </div>
              <div className="boxAlignment">
                <TextField
                  label="Telefone"
                  placeholder="Digite seus Telefone"
                  required
                  value={phone}
                  onChange={(value) => handlePhoneChange(value)}
                />
                {phoneError && (
                  <p className="error-message">Telefone Inválido</p>
                )}
              </div>
            </div>
            <div className="rowAlignmentBox">
              <div className="boxAlignment">
                <Select
                  options={stateOptions}
                  label="Selecione estado"
                  placeholder="Estado"
                  onChange={handleStateChange}
                  required
                />
              </div>
              <div className="boxAlignment">
                <Select
                  options={cities}
                  label="Selecione cidade"
                  placeholder="Cidade"
                  onChange={(selectedOption) => {
                    setSelectedCity(selectedOption);
                  }}
                  value={selectedCity}
                  required
                />
              </div>
            </div>
            <div className="rowAlignmentBox">
              <div className="buttonsAlignment">
                <ButtonComponent
                  type="secondary"
                  onClick={handleCancel}
                  size={1}
                >
                  Cancelar
                </ButtonComponent>
              </div>
              <div className=".buttonsAlignment">
                <ButtonComponent
                  type="primary"
                  onClick={handleConfirm}
                  size={1}
                >
                  Confirmar
                </ButtonComponent>
                {toastMessage && (
                  <ToastNotification
                    message={toastMessage}
                    type={toastType}
                    onClose={clearToast}
                  />
                )}
              </div>
            </div>
          </>
        )}
        {selectedOption1 === 'instituicao' && (
          <>
            <div className="rowAlignmentBox">
              <div className="boxAlignment">
                <TextField
                  label="Nome da Instituição"
                  placeholder="Nome"
                  required
                  value={name}
                  onChange={(value) => setName(value)}
                />
              </div>
              <div className="boxAlignment">
                <TextField
                  label="Digite seu email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(email) => handleEmailChange(email)}
                />
                {emailError && <p className="error-message">Email Inválido</p>}
              </div>
            </div>

            <div className="rowAlignmentBox">
              <div className="boxAlignment">
                <TextField
                  label="Digite sua Senha"
                  placeholder="Senha"
                  required
                  value={password}
                  onChange={(password) => handlePassword(password)}
                  hidepassword
                />
                {passwordError && (
                  <p className="error-message">Senha Inválida</p>
                )}
              </div>
              <div className="boxAlignment">
                <TextField
                  label="Confirme sua Senha"
                  placeholder="Senha"
                  required
                  value={confirmPassword}
                  onChange={(value) => handleConfirmPassword(value)}
                  hidepassword
                />
                {confirmPasswordError && (
                  <p className="error-message">Senha Diferente</p>
                )}
              </div>
            </div>
            <div className="rowAlignmentBox">
              <div className="boxAlignment">
                <Select
                  options={instituicoesOptionsArr as unknown as string[]}
                  label="Instituicao"
                  placeholder="Instituicao"
                  onChange={handleInstituicaoChange}
                  required
                />
              </div>
            </div>
            <div className="rowAlignmentBox">
              <div className="boxAlignment">
                <TextField
                  label="CNPJ"
                  placeholder="Digite CNPJ"
                  required
                  value={cnpj}
                  onChange={(value) => handleCNPJChange(value)}
                />
                {cnpjError && <p className="error-message">CNPJ Inválido</p>}
              </div>
              <div className="boxAlignment">
                <TextField
                  label="Telefone"
                  placeholder="Digite seus Telefone"
                  required
                  value={phone}
                  onChange={(value) => handlePhoneChange(value)}
                />
                {phoneError && (
                  <p className="error-message">Telefone Inválido</p>
                )}
              </div>
            </div>
            <div className="rowAlignmentBox">
              <div className="boxAlignment">
                <Select
                  options={stateOptions}
                  label="Selecione estado"
                  placeholder="Estado"
                  onChange={handleStateChange}
                  required
                />
              </div>
              <div className="boxAlignment">
                <Select
                  options={cities}
                  label="Selecione cidade"
                  placeholder="Cidade"
                  onChange={(selectedOption) => {
                    setSelectedCity(selectedOption);
                  }}
                  value={selectedCity}
                  required
                />
              </div>
            </div>

            <div className="rowAlignmentBox">
              <div className="addressBoxAlignment">
                <TextField
                  label="Endereço"
                  placeholder="Digite Endereço"
                  required
                  value={address}
                  onChange={(value) => setAddress(value)}
                />
              </div>
              <div className="numberBoxAlignment">
                <TextField
                  label="Número"
                  placeholder="Número"
                  required
                  value={number}
                  onChange={(value) => setNumber(value)}
                />
              </div>
            </div>
            <div className="rowAlignmentBox">
              <div className="buttonsAlignment">
                <ButtonComponent
                  type="secondary"
                  onClick={handleCancel}
                  size={1}
                >
                  Cancelar
                </ButtonComponent>
              </div>
              <div className=".buttonsAlignment">
                <ButtonComponent
                  type="primary"
                  onClick={handleConfirm}
                  size={1}
                >
                  Confirmar
                </ButtonComponent>
                {toastMessage && (
                  <ToastNotification
                    message={toastMessage}
                    type={toastType}
                    onClose={clearToast}
                  />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Register;
