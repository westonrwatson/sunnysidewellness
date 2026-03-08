import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Nav } from './components/Nav';
import { Home } from './pages/Home';
import { Quiz } from './pages/Quiz';
import { Tips } from './pages/Tips';
import backgroundImage from './assets/background.png';

function AppContent() {
  const location = useLocation();
  const isTips = location.pathname === '/tips';

  return (
    <>
      {!isTips && (
        <div
          className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundAttachment: 'fixed',
          }}
          aria-hidden
        />
      )}
      {isTips && (
        <div
          className="fixed inset-0 -z-10 bg-cream"
          aria-hidden
        />
      )}
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/tips" element={<Tips />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
