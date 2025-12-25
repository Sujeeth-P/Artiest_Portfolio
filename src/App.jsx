import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import ClientWork from './components/ClientWork';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Lightbox from './components/Lightbox';
import './index.css';

function App() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  const handleViewArtwork = (artwork) => {
    setSelectedArtwork(artwork);
    setLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setLightboxOpen(false);
    setSelectedArtwork(null);
  };

  return (
    <>
      <Navbar />
      <Hero />
      <Portfolio onViewArtwork={handleViewArtwork} />
      <Services />
      <ClientWork />
      <About />
      <Contact />
      <Footer />

      <Lightbox
        isOpen={lightboxOpen}
        artwork={selectedArtwork}
        onClose={handleCloseLightbox}
      />
    </>
  );
}

export default App;
