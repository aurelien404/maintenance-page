import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import Logo from "./logo";

function Header() {
  const logoRef = useRef(null);
  const [mouseX, setMouseX] = useState(0);

  const handleMouseMove = (e) => {
    const rect = logoRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; // position relative dans le lien
    setMouseX(x / rect.width); // Normalisé entre 0 et 1
  };

  const [isShrunk, setIsShrunk] = useState(false);
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", labelKey: "link.home" },
    { to: "/Projects", labelKey: "link.UiUxLab" },
    { to: "/About", labelKey: "link.about" },
    { to: "/contact", labelKey: "link.contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsShrunk(true);
      } else {
        setIsShrunk(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header
      className={`${
        isShrunk ? "py-3 px-7" : "py-5 px-10"
      } sticky top-0 left-0 w-screen flex justify-between items-center bg-zzcontrast border-b-2 border-base transition-all duration-300 ease-out z-10`}
    >
      <Logo />

      <button
        onClick={() => setMenuOpen(true)}
        className="md:hidden text-3xl font-extrabold transition-all duration-500 ease-in hover:rotate-1080 hover:text-zzlink active:rotate-1080 active:text-zzlink hover:scale-110 active:scale-110"
      >
        ☰
      </button>

      <span className="hidden md:flex md:flex-row justify-between">
        <nav
          className={`flex flex-row ${
            isShrunk ? "text-base" : "text-xl"
          } font-bold transition-all duration-300 ease-out mr-4`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => {
                setMenuOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`mr-4 link-style ${
                location.pathname === link.to ? "link-style-active" : ""
              }`}
            >
              {t(link.labelKey)}
            </Link>
          ))}
        </nav>

        <button
          className={`font-extrabold mx-0.5 border-none bg-none cursor-pointer ${
            i18n.language === "fr" ? "text-zzlink text-sm" : ""
          }`}
          onClick={() => changeLanguage("fr")}
        >
          FR
        </button>
        <button
          className={`font-extrabold mx-0.5 border-none bg-none cursor-pointer ${
            i18n.language !== "fr" ? "text-zzlink text-sm" : ""
          }`}
          onClick={() => changeLanguage("en")}
        >
          EN
        </button>
      </span>

      <div
        className={`fixed top-0 left-0 w-full bg-zzcontrast text-zzbase transform ${
          menuOpen ? "translate-y-0" : "-translate-y-full"
        } transition-transform duration-300 ease-in-out z-10 flex flex-col items-center py-10`}
      >
        {/* Bouton croix */}
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-4 right-4 text-3xl font-extrabold transition-all duration-500 ease-in-out hover:rotate-[360deg] hover:text-zzlink active:rotate-[360deg] active:text-zzlink"
        >
          ✕
        </button>

        {/* Liens du menu mobile */}
        <nav className="flex flex-col space-y-4 text-xl font-bold md:flex-row items-center md:items-start text-center md:text-left">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => {
                setMenuOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`mr-4 link-style ${
                location.pathname === link.to ? "link-style-active" : ""
              }`}
            >
              {t(link.labelKey)}
            </Link>
          ))}
        </nav>

        {/* Langues */}
        <div className="flex justify-center space-x-4 mt-4">
          <button
            className={`font-extrabold cursor-pointer ${
              i18n.language !== "fr" ? "text-zzlink text-sm" : ""
            }`}
            onClick={() => {
              changeLanguage("en");
              setMenuOpen(false);
            }}
          >
            EN
          </button>
          <button
            className={`font-extrabold bg-none cursor-pointer ${
              i18n.language === "fr" ? "text-zzlink text-sm" : ""
            }`}
            onClick={() => {
              changeLanguage("fr");
              setMenuOpen(false);
            }}
          >
            FR
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
