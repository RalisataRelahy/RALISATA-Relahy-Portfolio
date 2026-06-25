import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { personalInfo } from '../data/portfolio';
import { Play, Download, ArrowRight } from 'lucide-react';
import '../styles/Hero.css';
import HeroImage from "../assets/hero.png";
export default function Hero() {
  const { t } = useTranslation();
  const roles = t('hero.roles', { returnObjects: true }) as string[];

  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const target = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < target.length) {
      timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex(i => (i + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex, roles]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero" aria-label="Introduction">
      {/* Background */}
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-grid" />
        <div className="hero-glow" />
        <div className="hero-glow-2" />
      </div>

      <div className="hero-content">
        {/* Left */}
        <div className="hero-left">
          <div className="hero-badge fade-in-up animate-delay-1" aria-label={t('hero.badge')}>
            <span className="badge-dot" />
            {t('contact.availability.title')}
          </div>

          <h1 className="hero-name fade-in-up animate-delay-2">
            {personalInfo.firstName}<br />
            <span className="gradient-text">{personalInfo.name.trim()}</span>
          </h1>

          <p className="hero-title fade-in-up animate-delay-3">
            <span>{displayed}</span>
            <span className="cursor" aria-hidden="true" />
            <span className="hero-title-divider" />
            <span className="hero-title-accent">{t('hero.titleAccent')}</span>
          </p>

          <p className="hero-description fade-in-up animate-delay-4">
            {t('personal.description')} {t('hero.description')}
          </p>

          <div className="hero-buttons fade-in-up animate-delay-5">
            <button className="btn btn-primary" onClick={() => scrollTo('projects')}>
              <Play size={14} fill="currentColor" /> {t('hero.btnProjects')}
            </button>
            <button
              className="btn btn-outline"
              onClick={() => setOpen(true)}

              aria-label={t('hero.btnCV')}
            >
              <Download size={16} /> {t('hero.btnCV')}
            </button>
            <button className="btn btn-ghost" onClick={() => scrollTo('contact')}>
              {t('hero.btnContact')} <ArrowRight size={16} style={{ marginLeft: '4px' }} />
            </button>
          </div>
          {open && (
            <div
              className="overlay"
              onClick={() => setOpen(false)}
            >
              <div
                className="popup"
                onClick={(e) => e.stopPropagation()}
              >
                <h2>Quel CV souhaitez-vous télécharger ?</h2>

                <div className="cv-buttons">
                  <a
                    href="/cv-dev.pdf"
                    download
                    className="btn btn-outline"
                  >
                    {t("hero.devbtnCV")}
                  </a>

                  <a
                    href="/cv-accounting.pdf"
                    download
                    className="btn btn-outline"
                  >
                    {t("hero.accoutingtbtnCV")}
                  </a>
                </div>

                <button
                  className="btn btn-primary btn-close"
                  onClick={() => setOpen(false)}
                >
                  Fermer
                </button>
              </div>
            </div>
          )}
          <div className="hero-stats fade-in-up animate-delay-6">
            <div className="stat-item">
              <span className="stat-number">3<span>+</span></span>
              <span className="stat-label">{t('hero.stats.years')}</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">12<span>+</span></span>
              <span className="stat-label">{t('hero.stats.technologies')}</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">4<span>+</span></span>
              <span className="stat-label">{t('hero.stats.projects')}</span>
            </div>
          </div>
        </div>

        {/* Right — Code snippet card */}
        <div className="hero-right fade-in animate-delay-4" aria-hidden="true">
          <div className="code-card" role="presentation">
            <img src={HeroImage} alt="heroImage" className='hero-image' />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator" aria-hidden="true">
        <div className="scroll-indicator-line" />
        <span>{t('hero.scroll')}</span>
      </div>
    </section>
  );
}
