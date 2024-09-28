import React, { useEffect, useState } from 'react';
import './Cadastro.scss';

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

interface Option {
  value: string;
  label: string;
}

const selectOptions1: Option[] = [
  { value: 'professor', label: 'Professor' },
  { value: 'aluno', label: 'Aluno' },
  { value: 'instituicao', label: 'Instituição' },
];

const instituicoesOptionsArr: Option[] = [
  { value: 'ufrgs', label: 'UFRGS' },
  { value: 'pucrs', label: 'PUCRS' },
  { value: 'uniritter', label: 'UNIRITTER' },
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

  const handleInstituicaoChange = (value: string) => {
    setSelectedInstituicao(value);
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

  const [stateOptions, setStateOptions] = useState<string[]>([]);
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
        !cpfError &&
        !phoneError;
    }

    if (selectedOption1 === 'instituicao') {
      isValid =
        !!name &&
        !!email &&
        !!password &&
        !!confirmPassword &&
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
  ]);

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

  const handleConfirm = () => {
    if (isFormValid) {
      console.log({
        name,
        email,
        password,
        cpf,
        phone,
        cnpj,
        address,
        number,
        selectedState,
        selectedCity,
        photoURL,
      });
    }
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
                <div className="email-container">
                  <TextField
                    label="Digite seu email"
                    placeholder="Email"
                    required
                    value={email}
                    errormessage="Email Inválido"
                    onChange={(value) => setEmail(value)}
                  />
                </div>
              </div>
              {emailError && <p className="error-message">Email Inválido</p>}
            </div>

            <div className="rowAlignmentBox">
              <div className="boxAlignment">
                <TextField
                  label="Digite sua Senha"
                  placeholder="Senha"
                  required
                  value={password}
                  onChange={(value) => setPassword(value)}
                  errormessage="Senha Inválida"
                  hidepassword
                />
              </div>
              <div className="boxAlignment">
                <TextField
                  label="Confirme sua Senha"
                  placeholder="Senha"
                  required
                  value={confirmPassword}
                  onChange={(value) => setConfirmPassword(value)}
                  errormessage="Senha Diferente"
                  hidepassword
                />
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
                  label="CPF"
                  placeholder="Digite seu CPF"
                  required
                  value={cpf} //ADD cpfError
                  onChange={(value) => setCPF(formatCPF(value))}
                  errormessage="CPF Inválido"
                />
              </div>
              <div className="boxAlignment">
                <TextField
                  label="Telefone"
                  placeholder="Digite seus Telefone"
                  required
                  value={phone}
                  onChange={(value) => setPhone(value)}
                  errormessage="Telefone Inválido"
                />
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
              </div>
              {confirmPasswordError && (
                <p className="error-message">Senha Diferente</p>
              )}
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
              </div>
              {confirmPasswordError && (
                <p className="error-message">Senha Diferente</p>
              )}
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
                  onChange={(value) => setPhone(value)}
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
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Register;
