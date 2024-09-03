import React, { useState } from 'react';
import './ProfilePicture';
import './Cadastro.scss';
import ProfilePicture from './ProfilePicture';

interface Option {
  value: string;
  label: string;
}

interface Instituicoes {
  value: string;
  label: string;
}

const instituicoesOptions: Instituicoes[] = [
  { value: 'ufrgs', label: 'UFRGS' },
  { value: 'pucrs', label: 'PUCRS' },
  { value: 'uniritter', label: 'UNIRITTER' },
];

const selectOptions1: Option[] = [
  { value: 'professor', label: 'Professor' },
  { value: 'aluno', label: 'Aluno' },
  { value: 'Instituição', label: 'Instituição' },
];

const selectOptions2: Option[] = [
  { value: 'suboption1', label: 'Suboption 1' },
  { value: 'suboption2', label: 'Suboption 2' },
];

const Register: React.FC = () => {
  const [selectedOption1, setSelectedOption1] = useState<string>('');
  const [selectedOption2, setSelectedOption2] = useState<string>('');
  const [selectInstituicoesOptions, setSelectedInstituicaoOption] =
    useState<string>('');

  const handleSelectChange1 = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption1(event.target.value);
  };

  const handleSelectChange2 = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption2(event.target.value);
  };

  const handleSelectInstituicaoOption = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedInstituicaoOption(event.target.value);
  };

  return (
    <div className="container">
      <h1 className="title">Preencha todos os Campos</h1>
      {/* CHOOSE THE TYPE OF USER  */}
      <ProfilePicture />

      <div>
        <select
          id="Cadastro"
          value={selectedOption1}
          onChange={handleSelectChange1}
        >
          <option value=""></option>
          {selectOptions1.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* LAYOUT FOR "PROFESSOR" USER */}

      {selectedOption1 === 'professor' && (
        <>
          <input type="text" placeholder="Nome Completo" />
          <input type="password" placeholder="Senha" />
          <input type="password" placeholder="Confirme sua Senha" />
          <input type="text" placeholder="CPF" />
          <input type="email" placeholder="E-mail" />
          <input
            type="tel"
            id="phoneProfessor"
            name="phone"
            placeholder="Telefone"
            pattern="[0-9]{2}-[0-9]{5}-[0-9]{4}"
            required
          />
        </>
      )}

      {/* LAYOUT FOR "ALUNO" USER */}

      {selectedOption1 === 'aluno' && (
        <>
          <div className="inputs-aluno">
            <input type="text" placeholder="Nome Completo" />
            <input type="password" placeholder="Senha" />
            <input type="password" placeholder="Confirme sua Senha" />
            <input type="text" placeholder="CPF" />
            <input type="email" placeholder="E-mail" />
            <input
              type="tel"
              id="phoneAluno"
              name="phone"
              placeholder="Telefone"
              pattern="[0-9]{2}-[0-9]{5}-[0-9]{4}"
              required
            />
          </div>
          {/* SELECT "INSTITUICAO" */}
          <div>
            <select
              id="Instituicoes"
              value={selectInstituicoesOptions}
              onChange={handleSelectInstituicaoOption}
            >
              <option value="">Instituicao</option>
              {instituicoesOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </>
      )}

      {/* LAYOUT FOR "INSTITUICAO" USER */}

      {selectedOption1 === 'Instituição' && (
        <>
          <input type="text" placeholder="Nome Completo" />
          <input type="password" placeholder="Senha" />
          <input type="password" placeholder="Confirme sua Senha" />
          <input type="text" placeholder="CNPJ" />
          <input type="email" placeholder="E-mail" />
          <input
            type="tel"
            id="phoneInstituicao"
            name="phone"
            placeholder="Telefone"
            pattern="[0-9]{2}-[0-9]{5}-[0-9]{4}"
            required
          />
        </>
      )}
      <>
        <div>
          <button className="button-cancelar" type="submit">
            CANCELAR
          </button>
          <button className="button-confirmar" type="submit">
            CONFIRMAR
          </button>
        </div>
      </>
    </div>
  );
};

export default Register;
