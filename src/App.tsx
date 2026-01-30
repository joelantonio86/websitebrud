import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout';
import ScrollToHash from '@/components/ScrollToHash';
import Home from '@/pages/Home';
import Repertorio from '@/pages/Repertorio';
import Partituras from '@/pages/Partituras';
import MaterialApoio from '@/pages/MaterialApoio';
import SibeliusComputador from '@/pages/SibeliusComputador';
import SibeliusIOS from '@/pages/SibeliusIOS';
import SibeliusAndroid from '@/pages/SibeliusAndroid';
import LetrasMusicas from '@/pages/LetrasMusicas';
import Eventos from '@/pages/Eventos';
import TourEuropa2019 from '@/pages/TourEuropa2019';
import TourSuecia2017 from '@/pages/TourSuecia2017';
import ProximosEventos from '@/pages/ProximosEventos';
import Calendarios from '@/pages/Calendarios';
import Contato from '@/pages/Contato';

const App: React.FC = () => {
  // Um único áudio por vez no site: Partituras e Repertório. Ao dar play em outro, o anterior para.
  useEffect(() => {
    const onPlay = (e: Event) => {
      const target = e.target as HTMLAudioElement;
      if (target.tagName !== 'AUDIO') return;
      document.querySelectorAll('audio').forEach((el) => {
        if (el !== target) el.pause();
      });
    };
    document.addEventListener('play', onPlay, true);
    return () => document.removeEventListener('play', onPlay, true);
  }, []);

  return (
    <Layout>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/repertorio" element={<Repertorio />} />
        <Route path="/partituras" element={<Partituras />} />
        <Route path="/material-apoio" element={<MaterialApoio />} />
        <Route path="/sibelius-computador" element={<SibeliusComputador />} />
        <Route path="/sibelius-ios" element={<SibeliusIOS />} />
        <Route path="/sibelius-android" element={<SibeliusAndroid />} />
        <Route path="/letras-musicas" element={<LetrasMusicas />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/eventos/tour-europa-2019" element={<TourEuropa2019 />} />
        <Route path="/eventos/tour-suecia-2017" element={<TourSuecia2017 />} />
        <Route path="/proximos-eventos" element={<ProximosEventos />} />
        <Route path="/calendarios" element={<Calendarios />} />
        <Route path="/contato" element={<Contato />} />
      </Routes>
    </Layout>
  );
};

export default App;
