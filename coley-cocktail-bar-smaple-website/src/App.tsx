import { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Menu from './pages/Menu';
import Events from './pages/Events';
import Contact from './pages/Contact';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppLayout() {
  const { pathname } = useLocation();

  // Determine active page
  const getActivePage = () => {
    if (pathname === '/' || pathname === '') return 'home';
    if (pathname.startsWith('/about')) return 'about';
    if (pathname.startsWith('/menu')) return 'menu';
    if (pathname.startsWith('/events')) return 'events';
    if (pathname.startsWith('/contact')) return 'contact';
    return 'home';
  };

  const activePage = getActivePage();

  return (
    <>
      <ScrollToTop />
      <Navbar activePage={activePage} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/events" element={<Events />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}
