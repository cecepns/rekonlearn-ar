import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ArrowLeft, Award, CheckCircle } from 'lucide-react';
import { playClickSound } from '../utils/audio';

const capaianList = [
  {
    num: 1,
    title: 'Memahami Konsep & Tujuan Dasar Rekonsiliasi Bank',
    detail: 'Mahasiswa mampu mendefinisikan arti rekonsiliasi bank, menjelaskan mengapa pencatatan perusahaan dan laporan bank sering berbeda, serta memahami pentingnya pengendalian internal kas.',
  },
  {
    num: 2,
    title: 'Mengidentifikasi Faktor Penyebab Perbedaan Saldo Kas',
    detail: 'Mahasiswa mampu membedakan pos-pos transaksi penambah dan pengurang pada saldo bank (Setoran dalam perjalanan, Cek beredar) serta pada saldo buku perusahaan (Jasa giro, Biaya admin, NSF check/cek kosong).',
  },
  {
    num: 3,
    title: 'Menganalisis Dokumen Sumber (Buku Kas & Rekening Koran)',
    detail: 'Mahasiswa mampu melakukan cross-check dan verifikasi silang antara bukti penerimaan/pengeluaran kas internal dengan mutasi debit/kredit pada rekening koran bank.',
  },
  {
    num: 4,
    title: 'Menyusun Laporan Rekonsiliasi Bank Format Standar',
    detail: 'Mahasiswa mampu menyusun laporan rekonsiliasi kas bentuk skontro maupun staffel menuju saldo kas yang benar (Corrected Balance) secara teliti dan akurat.',
  },
  {
    num: 5,
    title: 'Membuat Jurnal Penyesuaian Kas yang Diperlukan',
    detail: 'Mahasiswa mampu mencatat ayat jurnal penyesuaian (Adjusting Journal Entries) untuk seluruh transaksi yang belum dicatat oleh buku kas perusahaan.',
  },
];

export default function CapaianScreen({ onBackToMenu }) {
  const [expandedIndex, setExpandedIndex] = useState(0);

  const toggleItem = (idx) => {
    playClickSound();
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <div className="w-full flex-1 min-h-0 flex flex-col px-4 py-2 overflow-y-auto pb-8 overscroll-contain">
      {/* Banner */}
      <div className="bg-[#f6be32] rounded-2xl p-3 border-2 border-white flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 border border-white/80">
          <Award className="w-5 h-5 text-[#b45309]" />
        </div>
        <div>
          <h2 className="font-display font-extrabold text-lg text-slate-900 leading-tight">Capaian Pembelajaran</h2>
          <p className="text-[11px] text-slate-800/80 font-medium">Target Kompetensi Mata Kuliah</p>
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-2.5 mb-4">
        {capaianList.map((item, idx) => {
          const isOpen = expandedIndex === idx;
          return (
            <div
              key={item.num}
              className="bg-slate-900/90 border border-amber-500/30 rounded-2xl overflow-hidden shadow-sm transition-all"
            >
              <button
                onClick={() => toggleItem(idx)}
                className="w-full p-3 flex items-center gap-3 text-left transition-colors hover:bg-slate-800/60 btn-press"
              >
                {/* Number Badge */}
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-display font-black text-sm flex items-center justify-center shrink-0 shadow-md">
                  {item.num}
                </div>

                {/* Summary Title */}
                <span className="flex-1 font-display font-bold text-xs sm:text-sm text-slate-100 leading-snug">
                  {item.title}
                </span>

                {/* Chevron */}
                <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 shrink-0">
                  {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </div>
              </button>

              {isOpen && (
                <div className="px-4 pb-3 pt-1 text-xs text-slate-300 border-t border-slate-800 leading-relaxed bg-slate-950/40 animate-fadeIn">
                  <div className="flex items-start gap-2 text-amber-300 font-semibold mb-1">
                    <CheckCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>Uraian Capaian:</span>
                  </div>
                  <p className="pl-5 text-slate-300 text-[11px]">
                    {item.detail}
                  </p>
                </div>
              )}
            </div>
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
