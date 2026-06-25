import { useScrollProgress, useTheme, useActiveSection } from './hooks/usePortfolio';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Timeline from './components/Timeline.tsx';
import Management from './components/Management';
import Contact from './components/Contact';
import FloatingButton from './components/floatingActionButton';

export default function App() {
  const scrollProgress = useScrollProgress();
  const { theme, toggle } = useTheme();
  const activeSection = useActiveSection();

  return (
    <>
      {/* Scroll progress bar */}
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progression de lecture"
      />

      {/* Navigation */}
      <Navbar
        theme={theme}
        onToggleTheme={toggle}
        activeSection={activeSection}
      />

      {/* Main content */}
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Timeline />
        <Management />
        <Contact />
         <FloatingButton />
      </main>
    </>
  );
}
