import { useTranslation } from 'react-i18next';
import { useReveal } from '../hooks/usePortfolio';
import { projects } from '../data/portfolio';
import {
  Star,
  GitBranchIcon,
  ExternalLink,
  CheckSquare,
  BookOpen,
  ListTodo,
  HeartPulse,
  Bot,
  Globe,
  BrainCircuit,
  Gamepad2,
  Ship,
  MonitorCog,
  CircleHelp,
  Calculator,
} from 'lucide-react';
import '../styles/Projects.css';

const projectIconMap: Record<string, React.ComponentType<{ size?: number; style?: React.CSSProperties }>> = {
  CheckSquare,
  BookOpen,
  ListTodo,
  HeartPulse,
  Bot,
  Globe,
  BrainCircuit,
  Gamepad2,
  Ship,
  MonitorCog,
  CircleHelp,
  Calculator,
};

function FeaturedMockup() {
  const { t } = useTranslation();
  const bars = [40, 65, 50, 80, 60, 75, 55, 90];
  return (
    <div className="featured-mockup" aria-hidden="true">
      <div className="mockup-screen">
        <div className="mockup-titlebar">
          <span className="mockup-dot mockup-dot-r" />
          <span className="mockup-dot mockup-dot-y" />
          <span className="mockup-dot mockup-dot-g" />
        </div>
        <div className="mockup-body">
          <div className="mockup-stat-row">
            <div className="mockup-stat">
              <div className="mockup-stat-value">+2.4k</div>
              <div className="mockup-stat-label">{t('projects.mockup.revenues')}</div>
            </div>
            <div className="mockup-stat">
              <div className="mockup-stat-value">-890</div>
              <div className="mockup-stat-label">{t('projects.mockup.expenses')}</div>
            </div>
            <div className="mockup-stat">
              <div className="mockup-stat-value">1.5k</div>
              <div className="mockup-stat-label">{t('projects.mockup.balance')}</div>
            </div>
          </div>
          <div className="mockup-chart">
            {bars.map((h, i) => (
              <div key={i} className="chart-bar" style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="mockup-transactions">
            {[
              { labelKey: 'projects.mockup.restaurant', amt: '-45', neg: true },
              { labelKey: 'projects.mockup.salary', amt: '+1200', neg: false },
              { labelKey: 'projects.mockup.transport', amt: '-120', neg: true },
            ].map(tx => (
              <div className="tx-row" key={tx.labelKey}>
                <span className="tx-label">{t(tx.labelKey)}</span>
                <span className={`tx-amount ${tx.neg ? 'negative' : 'positive'}`}>{tx.amt}€</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const { t } = useTranslation();
  const { ref, visible } = useReveal();
  const featured = projects.find(p => p.featured)!;
  const others = projects.filter(p => !p.featured);

  return (
    <section id="projects" className="projects section" aria-labelledby="projects-title">
      <div className="container">
        <div className="projects-header reveal" ref={ref} style={visible ? { opacity: 1, transform: 'none' } : {}}>
          <p className="section-label">{t('projects.label')}</p>
          <h2 className="section-title" id="projects-title">
            {t('projects.title')} <span className="gradient-text">{t('projects.titleAccent')}</span>
          </h2>
          <p className="section-subtitle">
            {t('projects.subtitle')}
          </p>
        </div>

        {/* Featured */}
        <div className={`project-featured reveal${visible ? ' visible' : ''}`}>
          <div className="featured-visual">
            <FeaturedMockup />
          </div>
          <div className="featured-content">
            <span className="featured-badge">
              <Star size={14} style={{ display: 'inline', marginRight: '4px' }} />
              {t('projects.featured')}
            </span>
            <h3 className="featured-title">{t(`projects.items.${featured.translationKey}.title`)}</h3>
            <p className="featured-desc">{t(`projects.items.${featured.translationKey}.longDescription`)}</p>
            <div className="featured-features">
              {(t(`projects.items.${featured.translationKey}.features`, { returnObjects: true }) as string[]).map(f => (
                <div className="feature-item" key={f}>{f}</div>
              ))}
            </div>
            <div className="featured-stack">
              {featured.stack.map(s => (
                <span className="stack-tag" key={s}>{s}</span>
              ))}
            </div>
            <div className="featured-links">
              <a href={featured.github} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                <GitBranchIcon size={16} /> {t('projects.btnGithub')}
              </a>
              {featured.demo!=null &&    
              <a href={featured.demo} className="btn btn-outline" target="_blank" rel="noopener noreferrer">
                <ExternalLink size={16} /> {t('projects.btnDemo')}
              </a>           }
              
            </div>
          </div>
        </div>

        {/* Other projects */}
        <div className="projects-grid" role="list">
          {others.map((project, i) => {
            const IconComp = projectIconMap[project.icon];
            return (
              <div
                className="project-card reveal"
                key={project.id}
                role="listitem"
                style={visible ? { opacity: 1, transform: 'none', transitionDelay: `${i * 0.1}s` } : { transitionDelay: `${i * 0.1}s` }}
              >
                <div className="project-meta">
                  <div className="project-icon" aria-hidden="true">
                    {IconComp && <IconComp size={24} style={{ color: project.color }} />}
                  </div>
                  <div className="project-links-inline">
                    <a href={project.github} className="icon-link" target="_blank" rel="noopener noreferrer" aria-label="Code source GitHub">
                      <GitBranchIcon size={16} />
                    </a>
                    {project.demo!=null && 
                    <a href={project.demo} className="icon-link" target="_blank" rel="noopener noreferrer" aria-label="Démo en ligne">
                      <ExternalLink size={16} />
                    </a>
                    }
                    
                  </div>
                </div>
                <div className="project-category">{t(`projects.items.${project.translationKey}.category`)}</div>
                <h3 className="project-title">{t(`projects.items.${project.translationKey}.title`)}</h3>
                <p className="project-desc">{t(`projects.items.${project.translationKey}.description`)}</p>
                <div className="project-stack">
                  {project.stack.map(s => (
                    <span className="stack-tag" key={s}>{s}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
