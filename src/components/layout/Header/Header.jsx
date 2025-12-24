import React from "react";
import { useState } from "react";
import HeaderNav from "./HeaderNav";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header">
      <HeaderNav 
        isOpen={isOpen} 
        toggleMenu={() => setIsOpen(!isOpen)} 
      />
    </header>
  );
}

export default Header;
