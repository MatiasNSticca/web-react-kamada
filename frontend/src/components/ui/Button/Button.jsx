import React from "react";
import style from "./Buttons.module.css";

function Button({
  children,
  variant = "primary",
  as,
  ...rest
}) {
    const Component = as || "button";

  return (
    <Component
      className={`${style.button} ${style[variant]}`}
      {...rest}
    >
      {children}
    </Component>
  );
}

export default Button;
