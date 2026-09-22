import React, { useState, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  SkipBack, 
  SkipForward, 
  ArrowLeft,
  Film,
  Video
} from 'lucide-react';
import { playClickSound } from '../utils/audio';

const playlist = [
  {
    id: 1,
    title: 'Pengenalan & Alur Rekonsiliasi Bank',
    duration: '04:12',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
  },
  {
    id: 2,
    title: 'Analisis Pos Penyesuaian Kas & Bank',
    duration: '06:30',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
  },
  {
    id: 3,
    title: 'Simulasi Penyusunan Laporan 2 Kolom',
    duration: '05:45',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
  }
];

export default function VideoScreen({ onBackToMenu }) {
  const [currentVideo, setCurrentVideo] = useState(playlist[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progressPct, setProgressPct] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    playClickSound();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const pct = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgressPct(pct);
    }
  };

  const handleScrub = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    if (videoRef.current && videoRef.current.duration) {
      videoRef.current.currentTime = pos * videoRef.current.duration;
    }
  };

  const selectVideo = (item) => {
    playClickSound();
    setCurrentVideo(item);
    setProgressPct(0);
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.src = item.url;
      videoRef.current.play();
    }
  };

  return (
    <div className="w-full flex-1 min-h-0 flex flex-col px-4 py-2 overflow-y-auto pb-8 overscroll-contain">
      {/* Banner */}
      <div className="bg-[#659a7f] rounded-2xl p-3 border-2 border-white flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 border border-white/80">
          <Video className="w-5 h-5 text-[#047857]" />
        </div>
        <div>
          <h2 className="font-display font-extrabold text-lg text-white leading-tight">Video Pembelajaran</h2>
          <p className="text-[11px] text-emerald-100/90 font-medium">Visualisasi Audio Visual Interaktif</p>
        </div>
      </div>

      {/* Video Player Container */}
      <div className="bg-slate-950 rounded-2xl overflow-hidden border-2 border-slate-700/80 shadow-xl mb-3">
        <div className="relative aspect-video bg-black flex items-center justify-center">
          <video
            ref={videoRef}
            src={currentVideo.url}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover"
          />

          {!isPlaying && (
            <button
              onClick={togglePlay}
              className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-sky-500/90 hover:bg-sky-400 text-slate-950 flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 btn-press"
            >
              <Play className="w-7 h-7 fill-slate-950 ml-1" />
            </button>
          )}
        </div>

        {/* Custom Video Controls */}
        <div className="p-3 bg-slate-900 border-t border-slate-800 space-y-2">
          {/* Progress Bar */}
          <div
            onClick={handleScrub}
            className="w-full h-2 bg-slate-800 hover:h-2.5 rounded-full cursor-pointer relative overflow-hidden transition-all"
          >
            <div
              className="h-full bg-sky-400 rounded-full transition-all"
              style={{ width: `${progressPct}%` }}
            ></div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <button
                onClick={togglePlay}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors"
              >
                {isPlaying ? <Pause className="w-4 h-4 text-sky-400" /> : <Play className="w-4 h-4 text-sky-400 fill-sky-400 ml-0.5" />}
              </button>

              <button
                onClick={() => {
                  if (videoRef.current) videoRef.current.currentTime -= 10;
                }}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors"
                title="-10 Detik"
              >
                <SkipBack className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  if (videoRef.current) videoRef.current.currentTime += 10;
                }}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors"
                title="+10 Detik"
              >
                <SkipForward className="w-3.5 h-3.5" />
              </button>
            </div>

            <span className="text-[11px] font-mono text-slate-400 truncate max-w-[140px]">
              {currentVideo.title}
            </span>

            <button
              onClick={() => setIsMuted(!isMuted)}
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-sky-400" />}
            </button>
          </div>
        </div>
      </div>

      {/* Playlist */}
      <div className="space-y-2 mb-4">
        <h4 className="font-display font-bold text-xs text-slate-300 uppercase tracking-wider px-1">
          Daftar Putar Video
        </h4>
        {playlist.map((item) => {
          const isCurrent = currentVideo.id === item.id;
          return (
            <button
              key={item.id}
              onClick={() => selectVideo(item)}
              className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-left transition-all btn-press ${
                isCurrent
                  ? 'bg-sky-500/20 border-sky-400/60 text-sky-200 shadow-sm'
                  : 'bg-slate-900/70 hover:bg-slate-800/80 border-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Film className={`w-4 h-4 ${isCurrent ? 'text-sky-400' : 'text-slate-500'}`} />
                <span className="font-sans font-medium text-xs truncate max-w-[200px]">
                  {item.title}
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                {item.duration}
              </span>
            </button>
          );
        })}
      </div>

      {/* Back button with Lucide ArrowLeft */}
      <button
        onClick={() => {
          playClickSound();
          onBackToMenu();
        }}
        className="w-full py-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 text-slate-400 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all btn-press"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Kembali ke Menu Utama</span>
      </button>
    </div>
  );
}
