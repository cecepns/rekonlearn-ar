import React, { useState, useRef, useEffect } from 'react';
import { Camera, Sparkles, ArrowLeft, VideoOff, Info, Layers, X } from 'lucide-react';
import { playClickSound, playSuccessChime } from '../utils/audio';

const arMarkers = [
  {
    title: '🏛️ Model 3D Gedung Bank & Kliring',
    badge: 'AR MARKER 1: BANKING SYSTEM',
    desc: 'Sistem kliring elektronik bank mencatat mutasi kas secara berkala. Bank memproses warkat debit dan kredit sesuai batas waktu cut-off harian.'
  },
  {
    title: '📑 Rekening Koran (Bank Statement)',
    badge: 'AR MARKER 2: FINANCIAL REPORT',
    desc: 'Dokumen mutasi transaksi kas yang dikirimkan bank kepada nasabah. Menampilkan histori setoran, tarikan, biaya admin, serta bunga giro.'
  },
  {
    title: '💳 Alur Kliring Cek & Bilyet Giro',
    badge: 'AR MARKER 3: CLEARING FLOW',
    desc: 'Cek beredar (Outstanding Check) adalah cek yang sudah diserahkan perusahaan kepada pihak ketiga, namun belum diajukan kliring ke bank penerbit.'
  }
];

export default function KameraScreen({ onBackToMenu }) {
  const videoRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [activeMarkerIndex, setActiveMarkerIndex] = useState(null);
  const streamRef = useRef(null);

  // Stop camera when unmounting
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const toggleCamera = async () => {
    playClickSound();
    setCameraError(null);

    if (isCameraOn) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setIsCameraOn(false);
    } else {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' }
          });
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
          }
          setIsCameraOn(true);
        } else {
          setCameraError('Kamera tidak didukung di browser ini. Anda dapat mencoba mode Simulasi Scan AR!');
        }
      } catch (err) {
        console.warn('Camera error:', err);
        setCameraError('Izin akses kamera belum diizinkan atau kamera tidak terdeteksi. Silakan coba tombol "Simulasi Scan AR"!');
      }
    }
  };

  const handleSimulateScan = () => {
    playClickSound();
    const nextIndex = activeMarkerIndex === null ? 0 : (activeMarkerIndex + 1) % arMarkers.length;
    setActiveMarkerIndex(nextIndex);
    playSuccessChime();
  };

  const currentMarker = activeMarkerIndex !== null ? arMarkers[activeMarkerIndex] : null;

  return (
    <div className="w-full flex-1 min-h-0 flex flex-col px-4 py-2 overflow-y-auto pb-8 overscroll-contain">
      {/* Banner */}
      <div className="bg-[#889af2] rounded-2xl p-3 border-2 border-white flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 border border-white/80">
          <Camera className="w-5 h-5 text-[#4f46e5]" />
        </div>
        <div>
          <h2 className="font-display font-extrabold text-lg text-slate-900 leading-tight">Kamera AR</h2>
          <p className="text-[11px] text-slate-800/80 font-medium">Augmented Reality Marker Recognition</p>
        </div>
      </div>

      {/* AR Viewfinder Screen Container */}
      <div className="relative w-full aspect-[4/5] bg-black rounded-3xl overflow-hidden border-[3px] border-white/30 shadow-2xl flex items-center justify-center mb-3">
        {/* Actual Video Stream Feed */}
        <video
          ref={videoRef}
          playsInline
          autoPlay
          muted
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            isCameraOn ? 'opacity-100 z-0' : 'opacity-0 pointer-events-none'
          }`}
        />

        {/* Top Status Pill (Clean & Non-overlapping) */}
        <div className="absolute top-4 inset-x-0 flex justify-center z-10 pointer-events-none px-4">
          <div className="bg-slate-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-[11px] font-medium text-slate-200 tracking-wide flex items-center gap-2 shadow-lg">
            {isCameraOn ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="text-emerald-300 font-semibold">AR Aktif: Arahkan Kamera ke Objek</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                <span className="text-sky-200">Mode Standby: Siap Memindai AR</span>
              </>
            )}
          </div>
        </div>

        {/* Clean AR Reticle (Matching original design without clutter) */}
        <div className="relative w-[260px] h-[260px] flex items-center justify-center pointer-events-none z-10">
          {/* 4 Corner Brackets (White, 5px solid, clean rounded corners) */}
          <div className="absolute top-0 left-0 w-12 h-12 border-t-[5px] border-l-[5px] border-white rounded-tl-2xl"></div>
          <div className="absolute top-0 right-0 w-12 h-12 border-t-[5px] border-r-[5px] border-white rounded-tr-2xl"></div>
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-[5px] border-l-[5px] border-white rounded-bl-2xl"></div>
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-[5px] border-r-[5px] border-white rounded-br-2xl"></div>

          {/* Center Scanning Capsule & Animated Laser Beam */}
          <div className="w-[190px] h-[135px] border-[4px] border-white rounded-[34px] relative overflow-hidden flex items-center justify-center bg-sky-500/5 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
            {/* Glowing Laser Scan Beam sweeping up and down */}
            <div className="absolute w-full h-[3px] bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_18px_#38bdf8] animate-scan-beam"></div>
          </div>
        </div>

        {/* Pop-up Detected AR Marker Card */}
        {currentMarker && (
          <div 
            onClick={() => setActiveMarkerIndex(null)}
            className="absolute bottom-4 inset-x-4 bg-slate-900/95 border-2 border-amber-400 rounded-2xl p-4 shadow-2xl backdrop-blur-md cursor-pointer animate-fadeIn z-20"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/25 text-amber-300 border border-amber-400/40 tracking-wide uppercase">
                <Sparkles className="w-3 h-3 text-amber-300" />
                {currentMarker.badge}
              </span>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveMarkerIndex(null);
                }}
                className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
            <h4 className="font-display font-bold text-sm text-white mb-1.5">
              {currentMarker.title}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {currentMarker.desc}
            </p>
          </div>
        )}
      </div>

      {/* Camera error notification if any */}
      {cameraError && (
        <div className="flex items-start gap-2 p-2.5 rounded-xl bg-amber-950/60 border border-amber-500/40 text-amber-200 text-xs mb-3">
          <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>{cameraError}</span>
        </div>
      )}

      {/* AR Control Buttons */}
      <div className="flex gap-2 mb-3">
        <button
          onClick={toggleCamera}
          className={`flex-1 h-12 font-display font-bold text-xs rounded-2xl border-2 border-white flex items-center justify-center gap-2 transition-all btn-press shadow-md ${
            isCameraOn 
              ? 'bg-rose-600 hover:bg-rose-500 text-white' 
              : 'bg-[#889af2] hover:bg-[#788be2] text-slate-900'
          }`}
        >
          {isCameraOn ? <VideoOff className="w-4 h-4 text-white" /> : <Camera className="w-4 h-4" />}
          <span>{isCameraOn ? 'Matikan Kamera' : 'Nyalakan Kamera'}</span>
        </button>

        <button
          onClick={handleSimulateScan}
          className="flex-1 h-12 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-display font-bold text-xs rounded-2xl border-2 border-white flex items-center justify-center gap-2 transition-all btn-press shadow-md"
        >
          <Sparkles className="w-4 h-4 text-amber-200" />
          <span>Simulasi Scan AR</span>
        </button>
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
