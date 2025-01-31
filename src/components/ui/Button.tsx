import clsx from "clsx";
import React, { MouseEventHandler } from "react";

interface ButtonInterface {
  label: string;
  handleClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  disabled: boolean;
  className?:string;
  type:"button" | "submit";
  image?:string;
}


const Button = ({ label, disabled, type ,handleClick,className ,image}: ButtonInterface) => {
  const merged = clsx(
    "flex items-center transition-all duration-300 justify-center gap-2 lg:py-4 md:py-5 py-[14px] mt-3 px-11 max-w-[290px] lg:max-w-full text-nowrap rounded-button-default-radius  disabled:opacity-50 text-button-text-size font-medium",
    className
  )
  return (
    <button disabled={type == "submit" && disabled} type={type} onClick={ type === "button" ? handleClick : undefined} className={merged}>
      {image && <img src={image} className="w-12 h-7"/>}
      {label}
    </button>
  );
};

export default Button;
