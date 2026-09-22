import React, { useState, useEffect } from 'react';
import DesktopTopBar from './components/DesktopTopBar';
import PhoneHeader from './components/PhoneHeader';
import QuickDrawer from './components/QuickDrawer';
import HomeScreen from './screens/HomeScreen';
import MenuScreen from './screens/MenuScreen';
import ProfilScreen from './screens/ProfilScreen';
import CapaianScreen from './screens/CapaianScreen';
import MateriScreen from './screens/MateriScreen';
import KameraScreen from './screens/KameraScreen';
import VideoScreen from './screens/VideoScreen';
import SpreadsheetScreen from './screens/SpreadsheetScreen';
import InformasiScreen from './screens/InformasiScreen';
import { isSoundEnabled, toggleSound } from './utils/audio';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    setSoundOn(isSoundEnabled());
    const savedFull = localStorage.getItem('rekon_full_mode') === 'true';
    setIsFullscreen(savedFull);
  }, []);

  const handleToggleSound = () => {
    const nextState = toggleSound();
    setSoundOn(nextState);
  };

  const handleToggleFullscreen = () => {
    const nextMode = !isFullscreen;
    setIsFullscreen(nextMode);
    localStorage.setItem('rekon_full_mode', String(nextMode));
  };

  const handleNavigate = (screenId) => {
    setCurrentScreen(screenId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen w-full bg-[#070e1a] flex flex-col items-center justify-center p-0 sm:p-4 selection:bg-sky-500 selection:text-white relative overflow-x-hidden">
      {/* Background Ambient Glow */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed bottom-10 right-10 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

      {/* Desktop Top Control Bar */}
      <DesktopTopBar
        soundEnabled={soundOn}
        onToggleSound={handleToggleSound}
        isFullscreen={isFullscreen}
        onToggleFullscreen={handleToggleFullscreen}
      />

      {/* Main Smartphone Frame Container */}
      <main
        className={`relative z-10 w-full transition-all duration-300 flex flex-col ${
          isFullscreen
            ? 'max-w-4xl h-screen sm:h-[94vh] sm:rounded-3xl'
            : 'max-w-[420px] h-screen sm:h-[860px] sm:max-h-[92vh] sm:rounded-[44px]'
        } bg-[#0b172a] sm:border-[5px] sm:border-slate-700/80 shadow-phone overflow-hidden`}
      >
        {/* Phone Top Status Bar & Nav Header */}
        <PhoneHeader
          onOpenDrawer={() => setIsDrawerOpen(true)}
          onNavigateHome={() => handleNavigate('home')}
          showNavHeader={currentScreen !== 'home'}
        />

        {/* Screen Container with min-h-0 so flex children can scroll properly */}
        <div className="flex-1 min-h-0 w-full overflow-hidden flex flex-col relative">
          {currentScreen === 'home' && (
            <HomeScreen onStart={() => handleNavigate('menu')} />
          )}

          {currentScreen === 'menu' && (
            <MenuScreen onSelectScreen={handleNavigate} />
          )}

          {currentScreen === 'profil' && (
            <ProfilScreen onBackToMenu={() => handleNavigate('menu')} />
          )}

          {currentScreen === 'capaian' && (
            <CapaianScreen onBackToMenu={() => handleNavigate('menu')} />
          )}

          {currentScreen === 'materi' && (
            <MateriScreen onBackToMenu={() => handleNavigate('menu')} />
          )}

          {currentScreen === 'kamera' && (
            <KameraScreen onBackToMenu={() => handleNavigate('menu')} />
          )}

          {currentScreen === 'video' && (
            <VideoScreen onBackToMenu={() => handleNavigate('menu')} />
          )}

          {currentScreen === 'spreadsheet' && (
            <SpreadsheetScreen onBackToMenu={() => handleNavigate('menu')} />
          )}

          {currentScreen === 'informasi' && (
            <InformasiScreen onBackToMenu={() => handleNavigate('menu')} />
          )}
        </div>
      </main>

      {/* Quick Drawer Navigation Modal */}
      <QuickDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSelectScreen={handleNavigate}
        currentScreen={currentScreen}
        soundEnabled={soundOn}
        onToggleSound={handleToggleSound}
      />
    </div>
  );
}
