import React, { useState } from 'react';
import './ProfilePicture';
import './Cadastro.scss';
import ProfilePicture from './ProfilePicture';

interface Option {
  value: string;
  label: string;
}

interface User {
  name: string;
  email: string;
  password: string;
  cnpj?: string;
  cpf?: string;
  phone: string;
  institution: string;
  state: string;
  city: string;
  address: string;
  address_number: number;
}

interface Instituicoes {
  value: string;
  label: string;
}

interface Estado {
  value: string;
  label: string;
  city: string[];
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

const selectEstado: Estado[] = [
  {
    value: 'rio_grande_do_sul',
    label: 'Rio Grande do Sul',
    city: ['Porto Alegre'],
  },
  { value: 'sao_paulo', label: 'São Paulo', city: ['São Paulo'] },
  { value: 'minas_gerais', label: 'Minas Gerais', city: ['Belo Horizonte'] },
  { value: 'santa_catarina', label: 'Santa Catarina', city: ['Florianópolis'] },
];

const Register: React.FC = () => {
  const [selectedOption1, setSelectedOption1] = useState<string>('');
  const [selectedEstado, setSelectedEstado] = useState<string>('');
  const [selectedCidade, setSelectedCidade] = useState<string>('');
  const [selectInstituicoesOptions, setSelectedInstituicaoOption] =
    useState<string>('');
  const [cidades, setCidades] = useState<Option[]>([]);

  const handleSelectChange1 = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption1(event.target.value);
  };

  const handleSelectChangeEstado = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
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

  const handleSelectChangeCidade = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedCidade(event.target.value);
  };

  const handleSelectInstituicaoOption = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedInstituicaoOption(event.target.value);
  };

  return (
    <div className="container">
      <h1 className="title">Preencha todos os Campos</h1>
      <br />
      <ProfilePicture />
      {/* CHOOSE THE TYPE OF USER  */}
      <div>
        <br />
        <select
          className="select-type-user"
          id="Cadastro"
          value={selectedOption1}
          onChange={handleSelectChange1}
        >
          <option value="">User</option>
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
          <div className="input-container">
            <input type="text" placeholder="Nome Completo" />
            <input className="email-input" type="email" placeholder="E-mail" />
          </div>
          <div className="input-container">
            <input type="password" placeholder="Senha" />
            <input type="password" placeholder="Confirme sua Senha" />
          </div>
          <div>
            <div className="input-container">
              <input type="text" placeholder="CPF" />
              <select
                className="select-type-instituicao"
                id="Instituicoes"
                value={selectInstituicoesOptions}
                onChange={handleSelectInstituicaoOption}
              >
                <option value="">Instituição</option>
                {instituicoesOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="input-container">
            <select
              className="select-type-instituicao"
              id="Estados"
              value={selectedEstado}
              onChange={handleSelectChangeEstado}
            >
              <option value="">Estado</option>
              {selectEstado.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select
              className="select-type-instituicao"
              id="Cidades"
              value={selectedCidade}
              onChange={handleSelectChangeCidade}
            >
              <option value="">Cidade</option>
              {cidades.map((city) => (
                <option key={city.value} value={city.value}>
                  {city.label}
                </option>
              ))}
            </select>
          </div>
          <div className="input-container">
            <input
              className="input-endereco"
              type="text"
              placeholder="Endereço"
            />
            <input className="input-numero" type="text" placeholder="Número" />
          </div>
        </>
      )}
      {/* LAYOUT FOR "ALUNO" USER */}
      {selectedOption1 === 'aluno' && (
        <>
          <div className="input-container">
            <input type="text" placeholder="Nome Completo" />
            <input className="email-input" type="email" placeholder="E-mail" />
          </div>
          <div className="input-container">
            <input type="password" placeholder="Senha" />
            <input type="password" placeholder="Confirme sua Senha" />
          </div>
          <div>
            <div className="input-container">
              <input type="text" placeholder="CPF" />
              <select
                className="select-type-instituicao"
                id="Instituicoes"
                value={selectInstituicoesOptions}
                onChange={handleSelectInstituicaoOption}
              >
                <option value="">Instituição</option>
                {instituicoesOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="input-container">
            <select
              className="select-type-instituicao"
              id="Estados"
              value={selectedEstado}
              onChange={handleSelectChangeEstado}
            >
              <option value="">Estado</option>
              {selectEstado.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select
              className="select-type-instituicao"
              id="Cidades"
              value={selectedCidade}
              onChange={handleSelectChangeCidade}
            >
              <option value="">Cidade</option>
              {cidades.map((city) => (
                <option key={city.value} value={city.value}>
                  {city.label}
                </option>
              ))}
            </select>
          </div>
          <div className="input-container">
            <input
              className="input-endereco"
              type="text"
              placeholder="Endereço"
            />
            <input className="input-numero" type="text" placeholder="Número" />
          </div>
        </>
      )}
      {/* LAYOUT FOR "INSTITUICAO" USER */}
      {selectedOption1 === 'Instituição' && (
        <>
          <div className="input-container">
            <input type="text" placeholder="Nome Completo" />
            <input className="email-input" type="email" placeholder="E-mail" />
          </div>
          <div className="input-container">
            <input type="password" placeholder="Senha" />
            <input type="password" placeholder="Confirme sua Senha" />
          </div>
          <div>
            <div className="input-container">
              <input type="text" placeholder="CNPJ" />
              <select
                className="select-type-instituicao"
                id="Instituicoes"
                value={selectInstituicoesOptions}
                onChange={handleSelectInstituicaoOption}
              >
                <option value="">Instituição</option>
                {instituicoesOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="input-container">
            <select
              className="select-type-instituicao"
              id="Estados"
              value={selectedEstado}
              onChange={handleSelectChangeEstado}
            >
              <option value="">Estado</option>
              {selectEstado.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select
              className="select-type-instituicao"
              id="Cidades"
              value={selectedCidade}
              onChange={handleSelectChangeCidade}
            >
              <option value="">Cidade</option>
              {cidades.map((city) => (
                <option key={city.value} value={city.value}>
                  {city.label}
                </option>
              ))}
            </select>
          </div>
          <div className="input-container">
            <input
              className="input-endereco"
              type="text"
              placeholder="Endereço"
            />
            <input className="input-numero" type="text" placeholder="Número" />
          </div>
        </>
      )}
      <>
        <div>
          <div className="button-container">
            <button className="button-cancelar" type="button">
              CANCELAR
            </button>
            <button className="button-confirmar" type="submit">
              CONFIRMAR
            </button>
          </div>
        </div>
      </>
    </div>
  );
};

export default Register;
