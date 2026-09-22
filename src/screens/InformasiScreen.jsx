import React from 'react';
import { ArrowLeft, Lightbulb, BookOpen, Compass, Info } from 'lucide-react';
import { playClickSound } from '../utils/audio';

const guides = [
  { step: '1', title: 'Beranda', desc: 'Tekan tombol "Mulai" untuk membuka dasbor navigasi menu utama media belajar.' },
  { step: '2', title: 'Capaian Pembelajaran', desc: 'Pelajari target kompetensi pemahaman rekonsiliasi kas melalui kartu interaktif.' },
  { step: '3', title: 'Materi Pembelajaran', desc: 'Buka 4 modul teori, formula penyesuaian, dan contoh format rekonsiliasi bank.' },
  { step: '4', title: 'Kamera AR', desc: 'Arahkan kamera atau jalankan simulasi scan marker 3D objek akuntansi perbankan.' },
  { step: '5', title: 'Spreadsheet', desc: 'Latih kemampuan menghitung saldo kas yang disesuaikan secara langsung pada lembar kerja 2 kolom.' },
];

const glossary = [
  {
    term: 'Deposit in Transit (Setoran Dalam Perjalanan)',
    def: 'Penerimaan kas yang sudah dicatat dalam buku perusahaan dan disetor ke bank, namun belum tercatat di rekening koran bank saat penutupan buku (Menambah saldo bank).'
  },
  {
    term: 'Outstanding Check (Cek Beredar)',
    def: 'Cek yang telah diterbitkan perusahaan kepada pihak ketiga untuk pembayaran tetapi belum dicairkan ke bank oleh pemegangnya (Mengurangi saldo bank).'
  },
  {
    term: 'Non-Sufficient Funds / NSF Check (Cek Kosong)',
    def: 'Cek setoran pelanggan yang ditolak oleh bank karena saldo rekening penerbit tidak mencukupi (Mengurangi saldo buku kas).'
  },
  {
    term: 'Bank Service Charge (Biaya Administrasi Bank)',
    def: 'Biaya pengelolaan rekening dan layanan transaksi perbankan yang dipotong langsung dari saldo bank (Mengurangi saldo buku kas).'
  },
  {
    term: 'Interest Earned (Jasa Giro / Bunga Bank)',
    def: 'Pendapatan bunga atas simpanan saldo kas perusahaan yang langsung dikreditkan bank ke rekening (Menambah saldo buku kas).'
  },
];

export default function InformasiScreen({ onBackToMenu }) {
  return (
    <div className="w-full flex-1 min-h-0 flex flex-col px-4 py-2 overflow-y-auto pb-8 overscroll-contain">
      {/* Banner */}
      <div className="bg-[#e66271] rounded-2xl p-3 border-2 border-white flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 border border-white/80">
          <Info className="w-5 h-5 text-[#dc2626]" />
        </div>
        <div>
          <h2 className="font-display font-extrabold text-lg text-white leading-tight">Informasi & Glosarium</h2>
          <p className="text-[11px] text-rose-100/90 font-medium">Panduan Penggunaan & Kamus Istilah</p>
        </div>
      </div>

      {/* Guide Section */}
      <div className="bg-slate-900/90 border border-slate-700/90 rounded-2xl p-4 mb-3 shadow-md">
        <div className="flex items-center gap-2 text-amber-300 font-display font-bold text-xs mb-3">
          <Lightbulb className="w-4 h-4" />
          <span>Petunjuk Penggunaan REKONLEARN AR</span>
        </div>
        <div className="space-y-2">
          {guides.map((g) => (
            <div key={g.step} className="flex items-start gap-2.5 text-xs">
              <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-300 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5 border border-sky-400/30">
                {g.step}
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                <strong className="text-white">{g.title}:</strong> {g.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Glossary Section */}
      <div className="bg-slate-900/90 border border-slate-700/90 rounded-2xl p-4 mb-4 shadow-md">
        <div className="flex items-center gap-2 text-sky-300 font-display font-bold text-xs mb-3">
          <BookOpen className="w-4 h-4" />
          <span>Glosarium Istilah Rekonsiliasi Bank</span>
        </div>
        <div className="space-y-2.5">
          {glossary.map((item, i) => (
            <div key={i} className="pt-2 first:pt-0 border-t first:border-0 border-slate-800 text-[11px]">
              <strong className="block font-semibold text-sky-200 mb-0.5">
                {item.term}
              </strong>
              <p className="text-slate-400 leading-relaxed">
                {item.def}
              </p>
            </div>
          ))}
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
