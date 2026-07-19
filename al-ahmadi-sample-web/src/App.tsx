import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import ThemedNights from './components/ThemedNights';
import Location from './components/Location';
import Footer from './components/Footer';
import GoldDivider from './components/GoldDivider';
import FloatingBookBtn from './components/FloatingBookBtn';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen" id="top">
        <Navbar />
        <main>
          <Hero />
          <About />
          <GoldDivider />
          <ThemedNights />
          <Location />
        </main>
        <Footer />
        <FloatingBookBtn />
      </div>
    </LanguageProvider>
  );
};

export default App;
