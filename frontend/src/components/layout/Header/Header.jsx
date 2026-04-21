import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import HeaderNav from "./HeaderNav";
import Hero from "./Hero";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const showHero = location.pathname === "/";

  return (
    <header className="header">
      <HeaderNav isOpen={isOpen} toggleMenu={() => setIsOpen(!isOpen)} />
      {showHero && <Hero />}
    </header>
  );
}

export default Header;
