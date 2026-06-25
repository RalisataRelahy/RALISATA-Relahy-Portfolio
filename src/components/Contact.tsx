import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useReveal } from '../hooks/usePortfolio';
import { personalInfo } from '../data/portfolio';
import { Mail, GitBranchPlus, MapPin, CheckCircle, Send, Loader2, PhoneCall} from 'lucide-react';
import '../styles/Contact.css';
import emailjs from "@emailjs/browser";
export default function Contact() {
  const { t } = useTranslation();
  const { ref, visible } = useReveal();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate send
    try{
      await emailjs.send(
        "service_4vlvzoa",
        "template_wk5u1v1",{
          subject:form.subject,
          name:form.name,
          email:form.email,
          time: new Date().getTime(),
          message:form.message
        },
        "upVedwxGSpa2sAgXW"
      );
      alert("Message envoyé");
      setLoading(false);
      setSubmitted(true);
    }catch{
      alert("erreur")
    }
  };

  const contactLinks = [
    { icon: Mail, label: t('contact.links.email'), value: personalInfo.email, href: `mailto:${personalInfo.email}` },
    { icon: GitBranchPlus, label: t('contact.links.github'), value: personalInfo.github, href: personalInfo.github },
    { icon: MapPin, label: t('contact.links.location'), value: t('personal.location'), href: undefined },
    { icon: PhoneCall, label: t('contact.links.phone'), value: "+261 38 75 168 61", href:"tel=+261387516861" }
  ];

  return (
    <section id="contact" className="contact section" aria-labelledby="contact-title">
      <div className="container">
        <div className="contact-inner" ref={ref}>
          {/* Left */}
          <div className={`contact-left reveal-left${visible ? ' visible' : ''}`}>
            <p className="section-label">{t('contact.label')}</p>
            <h2 className="section-title" id="contact-title">
              {t('contact.title')} <span className="gradient-text">{t('contact.titleAccent')}</span>
            </h2>
            <p className="section-subtitle">
              {t('contact.subtitle')}
            </p>

            <div className="contact-info-cards" role="list">
              {contactLinks.map(link => {
                const Icon = link.icon;
                return (
                  <div key={link.label} role="listitem">
                    {link.href ? (
                      <a
                        className="contact-info-card"
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        aria-label={`${link.label}: ${link.value}`}
                      >
                        <div className="contact-card-icon" aria-hidden="true">
                          <Icon size={20} style={{ color: "var(--accent-blue)" }} />
                        </div>

                        <div className="contact-card-content">
                          <div className="contact-card-label">{link.label}</div>
                          <div className="contact-card-value">{link.value}</div>
                        </div>
                      </a>
                    ) : (
                      <div className="contact-info-card">
                        <div className="contact-card-icon" aria-hidden="true">
                          <Icon size={20} style={{ color: 'var(--accent-blue)' }} />
                        </div>
                        <div className="contact-card-content">
                          <div className="contact-card-label">{link.label}</div>
                          <div className="contact-card-value">{link.value}</div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="availability-card" role="status" aria-live="polite">
              <div className="avail-dot" aria-hidden="true" />
              <div className="avail-text">
                <strong>{t('contact.availability.title')}</strong>
                <span>{t('contact.availability.subtitle')}</span>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className={`contact-form-wrap reveal-right${visible ? ' visible' : ''}`}>
            {submitted ? (
              <div className="form-success" role="alert">
                <div className="success-icon" aria-hidden="true" style={{ color: '#4ade80', display: 'flex', justifyContent: 'center' }}>
                  <CheckCircle size={48} />
                </div>
                <h3 className="success-title">{t('contact.success.title')}</h3>
                <p className="success-text">{t('contact.success.text')}</p>
                <button
                  className="btn btn-outline"
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                >
                  {t('contact.success.reset')}
                </button>
              </div>
            ) : (
              <>
                <h3 className="form-title">{t('contact.form.title')}</h3>
                <p className="form-subtitle">{t('contact.form.subtitle')}</p>

                <form className="contact-form" onSubmit={handleSubmit} noValidate>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="name">{t('contact.form.name')}</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        className="form-input"
                        placeholder={t('contact.form.namePlaceholder')}
                        value={form.name}
                        onChange={handleChange}
                        required
                        autoComplete="name"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="email">{t('contact.form.email')}</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="form-input"
                        placeholder={t('contact.form.emailPlaceholder')}
                        value={form.email}
                        onChange={handleChange}
                        required
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="subject">{t('contact.form.subject')}</label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      className="form-input"
                      placeholder={t('contact.form.subjectPlaceholder')}
                      value={form.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="message">{t('contact.form.message')}</label>
                    <textarea
                      id="message"
                      name="message"
                      className="form-textarea"
                      placeholder={t('contact.form.messagePlaceholder')}
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary form-submit"
                    disabled={loading}
                    aria-busy={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin" size={18} />
                        {t('contact.form.sending')}
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        {t('contact.form.submit')}
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="contact-footer">
          <p className="footer-copy">
            © {new Date().getFullYear()} <span>Relahy RALISATA</span> — {t('contact.footer.copy')}
          </p>
          <div className="footer-actions">
            <nav className="footer-links" aria-label={t('contact.footer.linksLabel')}>
              <a href={personalInfo.github} className="footer-link" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a href={`mailto:${personalInfo.email}`} className="footer-link">
                Email
              </a>
            </nav>
          </div>
        </footer>
      </div>
    </section>
  );
}
