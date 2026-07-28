import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Destinations } from './pages/Destinations';
import { Gallery } from './pages/Gallery';
import { Map } from './pages/Map';
import { PlanTrip } from './pages/PlanTrip';
import { GlobalCTA } from './components/GlobalCTA';
import { LiveWeatherWidget } from './components/LiveWeatherWidget';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [activeSection, setActiveSection] = useState(null);

  // Handle browser hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && ['home', 'destinations', 'gallery', 'map', 'plan-trip'].includes(hash)) {
        setActiveTab(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleTabChange = (tab, sectionId = null) => {
    setActiveTab(tab);
    setActiveSection(sectionId);
    window.location.hash = tab;
    if (sectionId) {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home setActiveTab={handleTabChange} />;
      case 'destinations':
        return <Destinations activeSection={activeSection} setActiveSection={setActiveSection} setActiveTab={handleTabChange} />;
      case 'gallery':
        return <Gallery />;
      case 'map':
        return <Map />;
      case 'plan-trip':
        return <PlanTrip />;
      default:
        return <Home setActiveTab={handleTabChange} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-cream text-brand-dark selection:bg-brand-gold selection:text-brand-dark">
      {/* Floating Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={handleTabChange} />

      {/* Live Weather & Currency Exchange API Bar */}
      <div className="pt-24 md:pt-28 relative z-40">
        <LiveWeatherWidget />
      </div>

      {/* Pages Content */}
      <main className="flex-grow">
        {renderContent()}
      </main>

      {/* Global Call to Action */}
      {activeTab !== 'plan-trip' && (
        <GlobalCTA setActiveTab={handleTabChange} />
      )}

      {/* Footer */}
      <Footer setActiveTab={handleTabChange} />
    </div>
  );
}

export default App;
