import { useState } from 'react';
import Navbar from './components/Navbar';
import ElenaIntro from './components/ElenaIntro';
import Hero from './components/Hero';
// import Portfolio from './components/Portfolio';
import ConversationIntro from './components/ConversationIntro';
import GuidedGallery from './components/GuidedGallery';
// import WorkShowcase from './components/WorkShowcase';
import WorksGallery from './components/WorksGallery';
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
  const [introComplete, setIntroComplete] = useState(false);

  const handleViewArtwork = (artwork) => {
    setSelectedArtwork(artwork);
    setLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setLightboxOpen(false);
    setSelectedArtwork(null);
  };

  const handleIntroComplete = () => {
    setIntroComplete(true);
  };

  return (
    <>
    {!introComplete && (
  <ElenaIntro onComplete={handleIntroComplete} />
)}

<Navbar />

<Hero />

      {/* <ElenaIntro onComplete={handleIntroComplete} />
      <Navbar/>
      <Hero /> */}
      {/* <Portfolio onViewArtwork={handleViewArtwork} /> */}
      <ConversationIntro />
      <GuidedGallery />
      {/* <WorkShowcase /> */}
      <WorksGallery onViewArtwork={handleViewArtwork} />
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

