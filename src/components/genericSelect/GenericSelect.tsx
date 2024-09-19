import React, { useEffect, useState } from 'react';
import { getStates, getCities } from '@brazilian-utils/brazilian-utils';
import {
  MenuItem,
  InputLabel,
  FormControl,
  SelectChangeEvent,
  Select,
} from '@mui/material';

interface Option {
  value: string;
  label: string;
}

interface GenericSelectProps {
  type: 'estado' | 'cidade' | 'instituicao';
  selectedValue?: string;
  onChange: (value: string) => void;
  selectedState?: string;
}

const GenericSelect: React.FC<GenericSelectProps> = ({
  type,
  selectedValue,
  onChange,
  selectedState,
}) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [selected, setSelected] = useState<string | undefined>(selectedValue);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchOptions = () => {
      let data: Option[] = [];

      if (type === 'estado') {
        const estados = getStates();
        data = estados.map((estado) => ({
          value: estado.code,
          label: estado.name,
        }));
      } else if (type === 'cidade' && selectedState) {
        const cidades = getCities(selectedState as any);
        data = cidades.map((cidade) => ({
          value: cidade,
          label: cidade,
        }));
      } else if (type === 'instituicao') {
        const instituicoesOptions: Option[] = [
          { value: 'ufrgs', label: 'UFRGS' },
          { value: 'pucrs', label: 'PUCRS' },
          { value: 'uniritter', label: 'UNIRITTER' },
        ];
        data = instituicoesOptions;
      }

      setOptions(data);
    };

    fetchOptions();
  }, [type, selectedState]);

  useEffect(() => {
    setSelected(selectedValue);
  }, [selectedValue]);

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const value = event.target.value as string;
    setSelected(value);
    onChange(value);
  };

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel>
        {type === 'estado'
          ? 'Estado'
          : type === 'cidade'
            ? 'Cidade'
            : 'Instituição'}
      </InputLabel>
      <Select
        value={selected || ''}
        onChange={handleChange}
        label={
          type === 'estado'
            ? 'Estado'
            : type === 'cidade'
              ? 'Cidade'
              : 'Instituição'
        }
        onOpen={() => setIsOpen(true)} // Altera o estado quando aberto
        onClose={() => setIsOpen(false)} // Altera o estado quando fechado
        open={isOpen} // Passa o estado de abertura
      >
        <MenuItem value="" disabled>
          Selecione um{' '}
          {type === 'estado'
            ? 'estado'
            : type === 'cidade'
              ? 'cidade'
              : 'instituição'}
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default GenericSelect;
