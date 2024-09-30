import React from 'react';
import './datePicker.scss';

interface DatePickerProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  errormessage?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  label,
  name,
  value,
  onChange,
  required = false,
  errormessage,
}) => {
  return (
    <div className="datepicker-component">
      <label>
        {label} {required && <span>*</span>}
      </label>
      <input
        type="date"
        className="item"
        name={name}
        value={value}
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
