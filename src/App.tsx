import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Nav } from './components/Nav';
import { Home } from './pages/Home';
import { Quiz } from './pages/Quiz';
import { Tips } from './pages/Tips';

function GradientBlob() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div
        className="gradient-blob-animated absolute inset-[-10%]"
        style={{
          background: `
            radial-gradient(
              circle 60vmax at 50% 90%,
              #e2792c 35%,
              #cb4e29 48%,
              #bb5f92 53%,
              #9589b1 100%,
              #9589b1 100%
            )
          `,
        }}
      />
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  const isTips = location.pathname === '/tips';

  return (
    <>
      {!isTips && <GradientBlob />}
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
