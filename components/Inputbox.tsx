import React, { ChangeEventHandler } from "react";

interface InputboxProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  errorMessage?: string;
}

const Inputbox: React.FC<InputboxProps> = ({ label, placeholder, value, onChange, errorMessage }) => {
  return (
    <div>
      <div className="text-sm font-medium text-left py-2">
        {label} <span className="text-red-600">*</span>
      </div>
      <input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-2 py-1 border rounded ${errorMessage ? 'border-red-500' : 'border-slate-200'}`}
      />
      {errorMessage && <div className="text-red-500 text-xs mt-1 text-left">{errorMessage}</div>}
    </div>
  );
};

export default Inputbox;
