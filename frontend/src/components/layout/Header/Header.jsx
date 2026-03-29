import React from "react";
import { useState } from "react";
import HeaderNav from "./HeaderNav";
import Hero from "./Hero";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header">
      <HeaderNav isOpen={isOpen} toggleMenu={() => setIsOpen(!isOpen)} />
      <Hero />
    </header>
  );
}

export default Header;
