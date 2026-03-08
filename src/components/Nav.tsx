import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { HiBars3, HiXMark } from 'react-icons/hi2';
import logoWhite from '../assets/logo-white.png';
import logoColor from '../assets/logo-color.png';

const linkClass = (isCreamBg: boolean, isActive: boolean) =>
  `nav-link ${isActive ? 'nav-link-active' : ''} font-sans text-lg ${
    isCreamBg
      ? isActive
        ? 'text-accent-orange'
        : 'text-accent-orange/80'
      : isActive
        ? 'text-cream'
        : 'text-white/90'
  }`;

export function Nav() {
  const location = useLocation();
  const isTips = location.pathname === '/tips';
  const isCreamBg = isTips;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const logo = isCreamBg ? logoColor : logoWhite;

  const navLinks = (
    <>
      <NavLink
        to="/"
        onClick={() => setMobileOpen(false)}
        className={({ isActive }) => linkClass(isCreamBg, isActive)}
      >
        Home
      </NavLink>
      <NavLink
        to="/tips"
        onClick={() => setMobileOpen(false)}
        className={({ isActive }) => linkClass(isCreamBg, isActive)}
      >
        Tips
      </NavLink>
    </>
  );

  const showGlass = scrolled || mobileOpen;
  const glassClasses =
    'backdrop-blur-xl bg-white/10 border-b border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 py-4 px-4 md:px-6 ${
        showGlass ? glassClasses : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Sunny Side Wellness" className="h-11 w-11 object-contain" />
            <span
              className={`averia-serif-libre-regular-italic text-xl md:text-2xl ${
                isCreamBg ? 'text-accent-orange' : 'text-cream'
              }`}
            >
              Sunny Side Wellness Guide
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8 shrink-0">{navLinks}</div>

          {/* Mobile hamburger / close */}
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className={`md:hidden p-2 -mr-2 transition-colors relative w-9 h-9 ${
              isCreamBg
                ? 'text-accent-orange hover:text-accent-rust'
                : 'text-cream hover:text-white'
            }`}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <HiBars3
              className={`absolute inset-0 w-7 h-7 m-auto transition-all duration-200 ${
                mobileOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'
              }`}
            />
            <HiXMark
              className={`absolute inset-0 w-7 h-7 m-auto transition-all duration-200 ${
                mobileOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'
              }`}
            />
          </button>
        </div>

        {/* Mobile links - same nav, expands below */}
        <div
          className={`md:hidden overflow-hidden ${
            mobileOpen ? 'max-h-40 opacity-100 mt-3 pt-3 border-t border-white/20' : 'max-h-0 opacity-0 mt-0 pt-0 border-t-0'
          } transition-all duration-200`}
        >
          <div className="mobile-nav-menu flex flex-col gap-1 -mx-4 [&>a]:min-h-[40px] [&>a]:py-2 [&>a]:px-4 [&>a]:rounded-lg [&>a]:active:bg-white/10">
            {navLinks}
          </div>
        </div>
      </div>
    </nav>
  );
}
