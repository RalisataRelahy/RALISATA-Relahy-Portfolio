import { useTranslation } from 'react-i18next';
import { useReveal } from '../hooks/usePortfolio';
import {
  ClipboardList,
  BarChart3,
  RefreshCw,
  LineChart,
  Target,
  Compass,
  Code2,
  FlaskConical,
  Rocket,
  TrendingUp,
} from 'lucide-react';
import '../styles/Management.css';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>> = {
  ClipboardList,
  BarChart3,
  RefreshCw,
  LineChart,
  Target,
  Compass,
  Code2,
  FlaskConical,
  Rocket,
  TrendingUp,
};

const kpisConfig = [
  { icon: 'ClipboardList', value: '100%', labelKey: 'management.kpis.needs' },
  { icon: 'RefreshCw',   value: 'MVC',  labelKey: 'management.kpis.architecture' },
];

const processConfig = [
  { icon: 'Target',       stepKey: 'management.processSteps.analyse' },
  { icon: 'Compass',      stepKey: 'management.processSteps.conception' },
  { icon: 'Code2',        stepKey: 'management.processSteps.dev' },
  { icon: 'FlaskConical', stepKey: 'management.processSteps.tests' },
  { icon: 'Rocket',       stepKey: 'management.processSteps.delivery' },
];

const mgmtCardsConfig = [
  { icon: 'Target',      cardKey: 'management.cards.needs' },
  { icon: 'TrendingUp',  cardKey: 'management.cards.finance' },
  { icon: 'RefreshCw',   cardKey: 'management.cards.process' },
];

export default function Management() {
  const { t } = useTranslation();
  const { ref, visible } = useReveal();

  return (
    <section id="management" className="management section" aria-labelledby="management-title">
      <div className="container">
        {/* Intro */}
        <div className="management-intro" ref={ref}>
          <div className={`reveal-left${visible ? ' visible' : ''}`}>
            <p className="section-label">{t('management.label')}</p>
            <h2 className="section-title" id="management-title">
              {t('management.title')}
              <br />
              <span className="gradient-text">{t('management.titleAccent')}</span>
            </h2>
            <p className="management-paragraph" dangerouslySetInnerHTML={{ __html: t('management.p1') }} />
            <p className="management-paragraph" dangerouslySetInnerHTML={{ __html: t('management.p2') }} />
          </div>

          <div className={`management-kpis reveal-right${visible ? ' visible' : ''}`}>
            {kpisConfig.map(kpi => {
              const IconComponent = iconMap[kpi.icon];
              return (
                <div className="kpi-card" key={kpi.labelKey}>
                  <span className="kpi-icon" aria-hidden="true" style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
                    {IconComponent && <IconComponent size={24} style={{ color: 'var(--accent-blue)' }} />}
                  </span>
                  <div className="kpi-value">{kpi.value}</div>
                  <div className="kpi-label">{t(kpi.labelKey)}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cards */}
        <div className="management-cards" role="list">
          {mgmtCardsConfig.map((card, i) => {
            const IconComponent = iconMap[card.icon];
            const items = t(`${card.cardKey}.items`, { returnObjects: true }) as string[];
            return (
              <div
                className="mgmt-card reveal"
                key={card.cardKey}
                role="listitem"
                style={visible ? { opacity: 1, transform: 'none', transitionDelay: `${i * 0.1}s` } : { transitionDelay: `${i * 0.1}s` }}
              >
                <div className="mgmt-card-icon" aria-hidden="true">
                  {IconComponent && <IconComponent size={24} style={{ color: 'var(--accent-blue)' }} />}
                </div>
                <h3 className="mgmt-card-title">{t(`${card.cardKey}.title`)}</h3>
                <p className="mgmt-card-desc">{t(`${card.cardKey}.description`)}</p>
                <div className="mgmt-card-items" role="list">
                  {items.map(item => (
                    <div className="mgmt-item" key={item} role="listitem">{item}</div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Process flow */}
        <div className={`process-flow reveal${visible ? ' visible' : ''}`} aria-label={t('management.processTitle')}>
          <div className="process-flow-title">{t('management.processTitle')}</div>
          <div className="process-steps" role="list">
            {processConfig.map((step, i) => {
              const IconComponent = iconMap[step.icon];
              const label = t(step.stepKey);
              return (
                <div className="process-step" key={step.stepKey} role="listitem">
                  <div className="step-node">
                    <div className="step-circle" title={label.replace('\n', ' ')} aria-hidden="true">
                      {IconComponent && <IconComponent size={20} style={{ color: 'var(--accent-blue)' }} />}
                    </div>
                    <span className="step-label" aria-label={label.replace('\n', ' ')}>
                      {label.split('\n').map((line, j) => (
                        <span key={j} style={{ display: 'block' }}>{line}</span>
                      ))}
                    </span>
                  </div>
                  {i < processConfig.length - 1 && (
                    <div className="step-arrow" aria-hidden="true" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
