// App.js
import './App.css';
import React, { useState, useEffect } from 'react';

// 外部 UI 與 icon 套件
import { Grid } from '@radix-ui/themes';
import { Home, MapPin, Star } from 'lucide-react';

// 自訂元件
import { BrandHeader } from './Header';
import Metro from './Metro';
import Bus from './Nearest';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import FavoritePage from './FavoritePage';

function App() {
  const [mode, setMode] = useState(localStorage.getItem('mode') || 'Home');
  const [user, setUser] = useState(null);
  const [page, setPage] = useState('main'); // 'main' | 'login' | 'register'

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(savedUser);
  }, []);

  const handleLoginSuccess = (username) => {
    setUser(username);
    setPage('main');
    setMode('Home');
  };

  const handleRegisterSuccess = (userInfo) => {
    setUser(userInfo.name);
    setPage('main');
    setMode('Home');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setPage('main');
  };
  

  return (
    <div className="App">
      <div className="AppWrapper h-screen flex flex-col">

        {/* 頁首 */}
        <header>
          <div className="header-inner">
            <BrandHeader user={user} onLoginClick={() => setPage('login')} onLogout={handleLogout} />
          </div>
        </header>

        {/* 主內容區 */}
        <main className="flex-grow mt-16 mb-16">
          <Grid gap="4" className="grid-full">
            {page === 'login' && (
              <LoginPage
                onLogin={handleLoginSuccess}
                goToRegister={() => setPage('register')}
              />
            )}
            {page === 'register' && (
              <RegisterPage
                onRegister={handleRegisterSuccess}
                goToLogin={() => setPage('login')}
              />
            )}
            {page === 'main' && (
              <>
                {mode === 'Home' && <Metro />}
                {mode === 'Bus' && <Bus />}
                {mode === 'Favorite' && <FavoritePage user={user} />}
              </>
            )}
          </Grid>
        </main>

        {/* 底部選單 */}
        <footer className="tab-bar">
          <button
            className={`tab-button ${mode === 'Home' ? 'active' : ''}`}
            onClick={() => setMode('Home')}
          >
            <Home size={20} />
            Home
          </button>
          <button
            className={`tab-button ${mode === 'Bus' ? 'active' : ''}`}
            onClick={() => setMode('Bus')}
          >
            <MapPin size={20} />
            Nearest
          </button>
          <button
            className={`tab-button ${mode === 'Favorite' ? 'active' : ''}`}
            onClick={() => setMode('Favorite')}
          >
            <Star size={20} />
            Favorite
          </button>
        </footer>

      </div>
    </div>
  );
}

export default App;
