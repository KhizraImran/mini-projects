import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageTransition from './components/PageTransition';
import Home from './pages/Home';
import About from './pages/About';
import Locations from './pages/Locations';
import Menu from './pages/Menu';
import Promotions from './pages/Promotions';
import Order from './pages/Order';
import Contact from './pages/Contact';

type Page = 'home' | 'about' | 'locations' | 'menu' | 'promotions' | 'order' | 'contact';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const navigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  useEffect(() => {
    // Update document title based on page
    const titles: Record<Page, string> = {
      home: 'Nasi Ayam Hainan Chee Meng | Authentic Hainanese Chicken Rice Since 1965',
      about: 'Our Story | Nasi Ayam Hainan Chee Meng',
      locations: 'Locations | Nasi Ayam Hainan Chee Meng',
      menu: 'Menu | Nasi Ayam Hainan Chee Meng',
      promotions: 'Promotions & Events | Nasi Ayam Hainan Chee Meng',
      order: 'Online Order | Nasi Ayam Hainan Chee Meng',
      contact: 'Contact Us | Nasi Ayam Hainan Chee Meng',
    };
    document.title = titles[currentPage];
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home onNavigate={navigate} />;
      case 'about': return <About onNavigate={navigate} />;
      case 'locations': return <Locations onNavigate={navigate} />;
      case 'menu': return <Menu onNavigate={navigate} />;
      case 'promotions': return <Promotions onNavigate={navigate} />;
      case 'order': return <Order onNavigate={navigate} />;
      case 'contact': return <Contact onNavigate={navigate} />;
      default: return <Home onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentPage={currentPage} onNavigate={navigate} />
      <main className="flex-1">
        <PageTransition pageKey={currentPage}>
          {renderPage()}
        </PageTransition>
      </main>
      <Footer onNavigate={navigate} />
    </div>
  );
}
