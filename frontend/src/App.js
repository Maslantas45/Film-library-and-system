import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import AddMoviePage from './pages/AddMoviePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'; // YENİ: Sayfayı çağırdık
import { useEffect, useState } from 'react';
import EditMoviePage from './pages/EditMoviePage';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <BrowserRouter>
      <div className="app">
        <nav>
          <Link to="/">Ana Sayfa</Link>
          
          {/* Admin kontrolü zaten burada var */}
          {user && user.role === 'admin' && (
            <Link to="/add-movie">Film Ekle (Admin)</Link>
          )}

          <div style={{marginLeft: 'auto', display: 'flex', gap: '15px'}}>
            {user ? (
              <>
                <span>👤 {user.email} ({user.role})</span>
                <button onClick={handleLogout} style={{width: 'auto', background: 'red', padding: '5px 10px'}}>Çıkış</button>
              </>
            ) : (
              <>
                {/* YENİ: Kayıt Ol Linki */}
                <Link to="/register">Kayıt Ol</Link>
                <Link to="/login">Giriş Yap</Link>
              </>
            )}
          </div>
        </nav>

        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add-movie" element={<AddMoviePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} /> {/* YENİ: Rota */}
            <Route path="/edit-movie/:id" element={<EditMoviePage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;