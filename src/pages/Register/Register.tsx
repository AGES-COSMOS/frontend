import React, { useState } from 'react';
import './Cadastro.scss';

interface Option {
  value: string;
  label: string;
}

const selectOptions1: Option[] = [
  { value: 'professor', label: 'Professor' },
  { value: 'aluno', label: 'Aluno' },
  { value: 'instituicao', label: 'Instituicao' },
];

const selectOptions2: Option[] = [
  { value: 'suboption1', label: 'Suboption 1' },
  { value: 'suboption2', label: 'Suboption 2' },
];

const Register: React.FC = () => {
  const [selectedOption1, setSelectedOption1] = useState<string>('');
  const [selectedOption2, setSelectedOption2] = useState<string>('');

  const handleSelectChange1 = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption1(event.target.value);
  };

  const handleSelectChange2 = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption2(event.target.value);
  };

  return (
    <div className="container">
      <h1>Preencha todos os Campos</h1>
      <div>
        <label htmlFor="Cadastro">Cadastro</label>
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
      {selectedOption1 === 'professor' && (
        <>
          <input type="text" placeholder="Nome Completo" />
          <input type="password" placeholder="Senha" />
          <input type="password" placeholder="Confirme sua Senha" />
          <input type="text" placeholder="CNPJ" />
          <input type="email" placeholder="E-mail" />
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Telefone"
            pattern="[0-9]{2}-[0-9]{5}-[0-9]{4}"
            required
          />
        </>
      )}

      {selectedOption1 === 'aluno' && (
        <>
          <input type="text" placeholder="Nome Completo" />
          <input type="password" placeholder="Senha" />
          <input type="password" placeholder="Confirme sua Senha" />
          <input type="text" placeholder="CNPJ" />
          <input type="email" placeholder="E-mail" />
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Telefone"
            pattern="[0-9]{2}-[0-9]{5}-[0-9]{4}"
            required
          />
        </>
      )}

      {selectedOption1 && selectedOption2 && (
        <div>
          {selectedOption1 === 'option1' &&
            selectedOption2 === 'suboption1' && (
              <input
                type="text"
                placeholder="Input for Option 1 and Suboption 1"
              />
            )}
          {selectedOption1 === 'option1' &&
            selectedOption2 === 'suboption2' && (
              <input
                type="number"
                placeholder="Input for Option 1 and Suboption 2"
              />
            )}
          {selectedOption1 === 'option2' &&
            selectedOption2 === 'suboption1' && (
              <input
                type="email"
                placeholder="Input for Option 2 and Suboption 1"
              />
            )}
          {selectedOption1 === 'option2' &&
            selectedOption2 === 'suboption2' && (
              <input
                type="date"
                placeholder="Input for Option 2 and Suboption 2"
              />
            )}
        </div>
      )}
      <button>B</button>
    </div>
  );
};

export default Register;
