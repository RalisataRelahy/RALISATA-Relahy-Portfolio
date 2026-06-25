import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { skills } from '../data/portfolio';
import '../styles/Skills.css';

const categoryKeys = [
  'all',
  'frontend',
  'backend',
  'mobile',
  'databases',
  'programming',
  'management',
  'tools',
];

export default function Skills() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const filtered = activeCategory === 'all'
    ? skills
    : skills.filter(skill => skill.categoryKey === activeCategory);

  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="container">
        <div className="skills-header reveal" ref={ref} style={visible ? { opacity: 1, transform: 'none' } : {}}>
          <p className="section-label">{t('skills.label')}</p>
          <h2 className="section-title" id="skills-title">
            {t('skills.title')} <span className="gradient-text">{t('skills.titleAccent')}</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            {t('skills.subtitle')}
          </p>
        </div>

        <div className="skills-filter" role="group" aria-label={t('skills.filterLabel')}>
          {categoryKeys.map(category => (
            <button
              key={category}
              className={`filter-btn${activeCategory === category ? ' active' : ''}`}
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
            >
              {category === 'all' ? t('skills.filterAll') : t(`skills.categories.${category}`)}
            </button>
          ))}
        </div>

        <div className="skills-grid" role="list" aria-label={t('skills.listLabel')}>
          {filtered.map((skill, i) => {
            const skillName = skill.nameKey ? t(skill.nameKey) : skill.name;
            return (
              <div
                key={skill.id}
                className="skill-card"
                data-cat={skill.categoryKey}
                role="listitem"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="skill-top">
                  <span className="skill-name">{skillName}</span>
                  <span className="skill-level-text">{skill.level}%</span>
                </div>
                <div className="skill-category-tag">{t(`skills.categories.${skill.categoryKey}`)}</div>
                <div className="skill-bar" role="progressbar" aria-valuenow={skill.level} aria-valuemin={0} aria-valuemax={100} aria-label={`${skillName}: ${skill.level}%`}>
                  <div
                    className="skill-bar-fill"
                    style={{ width: visible ? `${skill.level}%` : '0%' }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
