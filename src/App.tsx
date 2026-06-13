import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Destinations } from './pages/Destinations';
import { Gallery } from './pages/Gallery';
import { Map } from './pages/Map';
import { Contact } from './pages/Contact';
import { PlanTrip } from './pages/PlanTrip';

function App() {
  const [activeTab, setActiveTab] = useState<string>('home');

  // Handle browser hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && ['home', 'destinations', 'gallery', 'map', 'contact', 'plan-trip'].includes(hash)) {
        setActiveTab(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home setActiveTab={handleTabChange} />;
      case 'destinations':
        return <Destinations />;
      case 'gallery':
        return <Gallery />;
      case 'map':
        return <Map />;
      case 'contact':
        return <Contact />;
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

      {/* Pages Content */}
      <main className="flex-grow">
        {renderContent()}
      </main>

      {/* Footer */}
      <Footer setActiveTab={handleTabChange} />
    </div>
  );
}

export default App;
