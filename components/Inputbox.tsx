import React, { ChangeEventHandler } from "react";

interface InputboxProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const Inputbox: React.FC<InputboxProps> = ({ label, placeholder, value, onChange }) => {
  return (
    <div>
      <div className="text-sm font-medium text-left py-2">{label}</div>
      <input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-2 py-1 border rounded border-slate-200"
      />
    </div>
  );
};

export default Inputbox;