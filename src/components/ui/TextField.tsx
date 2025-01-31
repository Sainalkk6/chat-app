"use client";
import { FormikTouched } from "formik";
import React, { ChangeEventHandler, SetStateAction } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface TextFieldInterface {
  error?: string;
  label: string;
  name: string;
  id: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  isPassword: boolean;
  login: boolean;
  type: string;
  value: string;
  showPassword?: boolean;
  setShowPassword?: React.Dispatch<SetStateAction<boolean>>;
  touched: boolean;
  handleBlur: React.FocusEventHandler<HTMLInputElement>;
  isReadOnly?: boolean;
}

const TextField = ({ error, handleChange, isReadOnly, id, label, name, value, touched, type, isPassword, setShowPassword, showPassword, handleBlur }: TextFieldInterface) => {
  const renderFieldHeader = () => {
    return (
      <div className="flex w-full justify-between">
        <span className="text-field-label capitalize">{label}</span>
        {isPassword && setShowPassword && (
          <button onClick={() => setShowPassword(!showPassword)} className="flex items-center gap-[10px]">
            <span className="text-field-label">{showPassword ? "Hide" : "Show"}</span>
            {showPassword ? <AiOutlineEyeInvisible scale={20} /> : <AiOutlineEye scale={20} />}
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-1 mb-2 relative w-full">
      {renderFieldHeader()}
      <input readOnly={isReadOnly} type={type} onBlur={handleBlur} onChange={handleChange} name={name} id={id} className={`md:h-14 h-12 rounded-xl pl-5 outline-none border ${error && touched ? "border-[#FF0000]" : "border-[#66666659]"} outline-none`} value={value} />
      {touched && error && <p className="text-red-500 left-1 -bottom-7 absolute text-sm">{error}</p>}
    </div>
  );
};

export default TextField;
