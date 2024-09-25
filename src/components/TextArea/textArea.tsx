import React from 'react';
import './textArea.scss';

interface TextAreaProps {
  label: string;
  name: string;
  value: string;
  placeholder: string;
  required?: boolean;
  errormessage?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  name,
  value,
  placeholder,
  required = false,
  errormessage,
  onChange,
}) => {
  return (
    <div className="textarea-component">
      <label>
        {label} {required && <span>*</span>}
      </label>
      <textarea
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        style={{
          borderColor:
            errormessage !== undefined && errormessage !== ''
              ? 'red'
              : 'transparent',
        }}
      />
      {errormessage && <p>{errormessage}</p>}
    </div>
  );
};
