import './App.css';
import React, { useState, useEffect } from 'react';
import { Grid, Button } from '@radix-ui/themes';
import { Home, MapPin, Star } from 'lucide-react'; // 安裝 icon 套件 lucide-react
import { BrandHeader } from './Header';

import Metro from './metro';
import Bus from './Nearest';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import FavoritePage from './FavoritePage';


function App() {
  const [Mode, setMode] = useState(localStorage.getItem('mode') || "Home");
  const [user, setUser] = useState(null);
  const [page, setPage] = useState('main'); // 'main' | 'login' | 'register'

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(savedUser);
    }
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

  return (
    <div className="App h-screen flex flex-col">
      <header className="fixed top-0 w-full bg-white shadow-lg z-10">
        <Grid gap="4" className="grid-full">
          <BrandHeader user={user} onLoginClick={() => setPage('login')} />
        </Grid>
      </header>

      <div className="flex-grow mt-16 mb-16">
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
              {Mode === "Home" && <Metro />}
              {Mode === "Bus" && <Bus />}
              {Mode === "Favorite" && <FavoritePage user={user} />}
            </>
          )}
        </Grid>
      </div>

      <footer className="tab-bar">
        <button
          className={`tab-button ${Mode === 'Home' ? 'active' : ''}`}
          onClick={() => setMode('Home')}
        >
          <Home size={20} />
          Home
        </button>
        <button
          className={`tab-button ${Mode === 'Bus' ? 'active' : ''}`}
          onClick={() => setMode('Bus')}
        >
          <MapPin size={20} />
          Nearest
        </button>
        <button
          className={`tab-button ${Mode === 'Favorite' ? 'active' : ''}`}
          onClick={() => setMode('Favorite')}
        >
          <Star size={20} />
          Favorite
        </button>
      </footer>
    </div>
  );
}

export default App;
