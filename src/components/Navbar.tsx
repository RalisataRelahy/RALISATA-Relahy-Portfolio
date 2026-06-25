import { useState, useEffect } from 'react';
import { Sun, Moon, ArrowRight } from 'lucide-react';
import '../styles/Navbar.css';
import { useTranslation } from 'react-i18next';
import { FranceFlag, EnglandFlag } from '../assets/flags';
interface NavbarProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  activeSection: string;
}

const navItems = [
  { id: 'hero', labelKey: 'nav.home' },
  { id: 'about', labelKey: 'nav.about' },
  { id: 'skills', labelKey: 'nav.skills' },
  { id: 'projects', labelKey: 'nav.projects' },
  { id: 'timeline', labelKey: 'nav.timeline' },
  { id: 'management', labelKey: 'nav.management' },
  { id: 'contact', labelKey: 'nav.contact' },
];

export default function Navbar({ theme, onToggleTheme, activeSection }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.resolvedLanguage ?? i18n.language;
  const isFrench = currentLanguage.startsWith('fr');

  const changeLanguage = () => {
    const newLang = isFrench ? 'en' : 'fr';
    i18n.changeLanguage(newLang);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} role="navigation" aria-label={t('nav.ariaLabel')}>
        <div className="container navbar-inner">
          <button className="nav-logo" onClick={() => scrollTo('hero')} aria-label={t('nav.logoLabel')}>
            <span className="logo-bracket">&lt;/&gt;</span>
            Relahy.dev
          </button>

          <ul className="nav-links" role="list">
            {navItems.map(item => (
              <li key={item.id}>
                <button
                  className={`nav-link${activeSection === item.id ? ' active' : ''}`}
                  onClick={() => scrollTo(item.id)}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                >
                  {t(item.labelKey)}
                </button>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <button
              className="theme-toggle"
              onClick={onToggleTheme}
              aria-label={theme === 'dark' ? t('nav.themeLight') : t('nav.themeDark')}
              title={theme === 'dark' ? t('nav.themeLight') : t('nav.themeDark')}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              className="language-toggle"
              onClick={changeLanguage}
              aria-label={isFrench ? t('nav.languageEnglish') : t('nav.languageFrench')}
              title={isFrench ? t('nav.languageEnglish') : t('nav.languageFrench')}
            >
              {isFrench
                ? <FranceFlag />
                : <EnglandFlag />
              }
              <span>{isFrench ? 'FR' : 'EN'}</span>
            </button>


            <button className="btn btn-primary nav-cta" onClick={() => scrollTo('contact')}>
              {t('nav.cta')}
            </button>

            <button
              className={`menu-toggle${menuOpen ? ' open' : ''}`}
              onClick={() => setMenuOpen(v => !v)}
              aria-label={menuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
              aria-expanded={menuOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile nav */}
      <div className={`mobile-nav${menuOpen ? ' open' : ''}`} role="dialog" aria-label={t('nav.mobileMenu')}>
        {navItems.map(item => (
          <button
            key={item.id}
            className={`mobile-nav-link${activeSection === item.id ? ' active' : ''}`}
            onClick={() => scrollTo(item.id)}
          >
            {t(item.labelKey)}
            <ArrowRight size={18} />
          </button>
        ))}
      </div>
    </>
  );
}
