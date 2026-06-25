import React, { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { timeline } from '../data/portfolio';
import { GraduationCap, FolderOpen, Zap } from 'lucide-react';
import "../styles/TimeLine.css";

const typeIconMap: Record<string, React.ComponentType<{ size?: number; style?: React.CSSProperties }>> = {
  education: GraduationCap,
  project: FolderOpen,
  skill: Zap,
};

export default function Timeline() {
  const { t } = useTranslation();
  const [lineHeight, setLineHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => setLineHeight(100), 300);
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="timeline" className="timeline section">
      <div className="container">

        <div
          className="timeline-header reveal"
          ref={ref}
          style={lineHeight > 0 ? { opacity: 1, transform: 'none' } : {}}
        >
          <p className="section-label">{t('timeline.label')}</p>

          <h2 className="section-title">
            {t('timeline.title')} <span className="gradient-text">{t('timeline.titleAccent')}</span>
          </h2>

          <p className="section-subtitle">
            {t('timeline.subtitle')}
          </p>
        </div>

        <div className="timeline-track">

          <div className="timeline-line">
            <div
              className="timeline-line-progress"
              style={{ height: `${lineHeight}%` }}
            />
          </div>

          {Array.isArray(timeline) && timeline.map((item, i) => {
            const Icon = item?.type ? typeIconMap[item.type] : undefined;

            return (
              <article
                key={i}
                className={`timeline-item${item?.highlight ? ' highlighted' : ''}`}
              >
                <div className={`timeline-dot ${item?.type}`}>
                  {Icon && <Icon size={16} style={{ color: 'white' }} />}
                </div>

                <div className="timeline-content">
                  <div className="timeline-year">
                    {t(`timeline.entries.${item?.translationKey}.year`)}
                  </div>

                  <h3 className="timeline-title">
                    {t(`timeline.entries.${item?.translationKey}.title`)}
                  </h3>

                  <p className="timeline-desc">
                    {t(`timeline.entries.${item?.translationKey}.description`)}
                  </p>

                  <div className={`timeline-type-tag ${item?.type}`}>
                    {Icon && <Icon size={12} style={{ marginRight: '4px' }} />}
                    {t(`timeline.types.${item?.type}`)}
                    {item?.highlight && t('timeline.ongoing')}
                  </div>
                </div>
              </article>
            );
          })}

        </div>
      </div>
    </section>
  );
}