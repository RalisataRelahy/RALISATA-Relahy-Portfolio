import { useTranslation } from 'react-i18next';
import { useReveal } from '../hooks/usePortfolio';
import { Layers, Target, Users, Zap, Code2, Atom, Terminal, BarChart3 } from 'lucide-react';
import '../styles/About.css';

export default function About() {
  const { t } = useTranslation();
  const { ref, visible } = useReveal();

  const values = [
    { icon: Layers, title: t('about.values.hybrid.title'), desc: t('about.values.hybrid.desc') },
    { icon: Target, title: t('about.values.solutions.title'), desc: t('about.values.solutions.desc') },
    { icon: Users, title: t('about.values.team.title'), desc: t('about.values.team.desc') },
    { icon: Zap, title: t('about.values.learning.title'), desc: t('about.values.learning.desc') },
  ];

  return (
    <section id="about" className="about section" aria-labelledby="about-title">
      <div className="container">
        <div className="about-inner" ref={ref}>
          {/* Visual */}
          <div className={`about-visual reveal-left${visible ? ' visible' : ''}`}>
            <div className="about-avatar-wrap">
              <div className="about-avatar" aria-hidden="true">
                <Code2 size={80} className="about-avatar-emoji" style={{ color: 'var(--accent-blue)' }} />
                <div className="about-avatar-overlay" />
              </div>

              {/* Floating badges */}
              <div className="about-badge badge-top-right" aria-hidden="true">
                <Atom size={16} style={{ color: 'var(--accent-cyan)' }} />
                <div>
                  <div className="about-badge-text">React TSX</div>
                  <div className="about-badge-sub">{t('about.badges.frontend')}</div>
                </div>
              </div>

              <div className="about-badge badge-bottom-left" aria-hidden="true">
                <Terminal size={16} style={{ color: '#4ade80' }} />
                <div>
                  <div className="about-badge-text">FastAPI</div>
                  <div className="about-badge-sub">{t('about.badges.backend')}</div>
                </div>
              </div>

              <div className="about-badge badge-bottom-right" aria-hidden="true">
                <BarChart3 size={16} style={{ color: 'var(--accent-blue)' }} />
                <div>
                  <div className="about-badge-text">Analyse</div>
                  <div className="about-badge-sub">{t('about.badges.gestion')}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className={`about-content reveal-right${visible ? ' visible' : ''}`}>
            <div>
              <p className="section-label">{t('about.label')}</p>
              <h2 className="section-title" id="about-title">
                {t('about.title')}{' '}
                <span className="gradient-text">{t('about.titleAccent')}</span>
              </h2>
            </div>

            <div className="about-text">
              <p dangerouslySetInnerHTML={{ __html: t('about.p1') }} />
              <p dangerouslySetInnerHTML={{ __html: t('about.p2') }} />
              <p dangerouslySetInnerHTML={{ __html: t('about.p3') }} />
            </div>

            <div className="about-values" role="list">
              {values.map(v => {
                const Icon = v.icon;
                return (
                  <div className="value-card" key={v.title} role="listitem">
                    <div className="value-icon" aria-hidden="true">
                      <Icon size={22} style={{ color: 'var(--accent-blue)' }} />
                    </div>
                    <div className="value-title">{v.title}</div>
                    <div className="value-desc">{v.desc}</div>
                  </div>
                );
              })}
            </div>

            <div className="about-cta">
              <a
                href="/cv-relahy-ralisata.pdf"
                download
                className="btn btn-primary"
              >
                <Zap size={16} /> {t('about.btnCV')}
              </a>
              <button
                className="btn btn-outline"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t('about.btnContact')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
