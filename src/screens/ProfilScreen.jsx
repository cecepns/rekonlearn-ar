import React from 'react';
import { ArrowLeft, GraduationCap, Building2, BookMarked, Sparkles } from 'lucide-react';
import { playClickSound } from '../utils/audio';
import iconProfil from '../assets/1.png';

export default function ProfilScreen({ onBackToMenu }) {
  return (
    <div className="w-full flex-1 min-h-0 flex flex-col px-4 py-2 overflow-y-auto pb-8 overscroll-contain">
      {/* Banner */}
      <div className="bg-[#f8b4c4] rounded-2xl p-3 border-2 border-white flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 border border-white/80 overflow-hidden">
          <img src={iconProfil} alt="Profil Penulis" className="w-7 h-7 object-contain drop-shadow-none [filter:none]" />
        </div>
        <div>
          <h2 className="font-display font-extrabold text-lg text-slate-900 leading-tight">Profil Penulis</h2>
          <p className="text-[11px] text-slate-800/80 font-medium">Pengembang Media REKONLEARN AR</p>
        </div>
      </div>

      {/* Author Card */}
      <div className="flex flex-col items-center text-center mb-4">
        <div className="relative mb-3">
          <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-pink-400 via-sky-400 to-amber-300 p-1 shadow-xl">
            <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 border-2 border-white">
              <img
                src="/assets/profil_susanti.png"
                alt="Prof. Dr. Susanti, S.Pd., M.Si."
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-sky-500 border-2 border-white flex items-center justify-center shadow-md">
            <GraduationCap className="w-4 h-4 text-white" />
          </div>
        </div>

        <div className="bg-slate-900/90 border border-pink-400/40 px-4 py-1.5 rounded-full shadow-sm mb-2">
          <h3 className="font-display font-extrabold text-sm text-pink-200">
            Prof. Dr. Susanti, S.Pd., M.Si.
          </h3>
        </div>
        <p className="text-xs text-slate-400 font-medium max-w-[260px]">
          Guru Besar Pendidikan Akuntansi Universitas Negeri Surabaya
        </p>
      </div>

      {/* Academic Meta Details */}
      <div className="bg-slate-900/90 border border-slate-700/90 rounded-2xl p-4 space-y-3 text-xs mb-4 shadow-md">
        <div className="flex items-start gap-3">
          <div className="w-7 h-7 rounded-lg bg-pink-500/20 text-pink-300 flex items-center justify-center shrink-0 mt-0.5">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <strong className="block text-slate-200 font-semibold">Institusi & Fakultas</strong>
            <span className="text-slate-400 text-[11px]">
              Fakultas Ekonomika dan Bisnis (FEB), Universitas Negeri Surabaya (UNESA)
            </span>
          </div>
        </div>

        <div className="flex items-start gap-3 pt-2 border-t border-slate-800">
          <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-300 flex items-center justify-center shrink-0 mt-0.5">
            <BookMarked className="w-4 h-4" />
          </div>
          <div>
            <strong className="block text-slate-200 font-semibold">Bidang Keahlian</strong>
            <span className="text-slate-400 text-[11px]">
              Pendidikan Akuntansi, Media Pembelajaran Berbasis Teknologi Interaktif & Sistem Informasi Akuntansi
            </span>
          </div>
        </div>

        <div className="flex items-start gap-3 pt-2 border-t border-slate-800">
          <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <strong className="block text-slate-200 font-semibold">Fokus Inovasi</strong>
            <span className="text-slate-400 text-[11px]">
              Pengembangan Media Belajar Rekonsiliasi Bank Menggabungkan Web Interaktif, Simulasi Spreadsheet & Augmented Reality
            </span>
          </div>
        </div>
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
