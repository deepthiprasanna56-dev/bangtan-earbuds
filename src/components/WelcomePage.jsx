import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import BangtanLogo from './BangtanLogo';
import BangtanProductStamp from './BangtanProductStamp';
import EarbudsCanvas3D from './3d/EarbudsCanvas3D';
import { products } from '../data/products';

const shapeIndex = [
  ['01', 'SIGNATURE STEM'],
  ['02', 'SOFT SCULPT'],
  ['03', 'PRECISION BLADE'],
  ['04', 'OPEN ARC'],
  ['05', 'SHELL FORM'],
  ['06', 'FACET SERIES']
];

export default function WelcomePage() {
  const location = useLocation();
  const returnState = location.state?.from ? { from: location.state.from } : undefined;
  const enterStoreState = { from: { pathname: '/products' } };
  const featured = products.slice(-6);

  return (
    <main className="bg-[#07070b] text-white">
      <section className="relative isolate min-h-[100svh] overflow-hidden border-b border-white/10">
        <div className="absolute inset-y-0 right-0 z-0 w-full md:w-[68%]" aria-label="BANGTAN AUDIO three-dimensional earbuds">
          <EarbudsCanvas3D
            colorHex="#7c3aed"
            modelStyle="classic"
            caseOpen
            autoRotate
            className="h-[58svh] min-h-[390px] w-full md:h-[86svh] md:min-h-[620px]"
            showHint={false}
          />
        </div>
        <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(90deg,#07070b_0%,rgba(7,7,11,0.96)_28%,rgba(7,7,11,0.68)_51%,rgba(7,7,11,0.08)_100%)] md:bg-[linear-gradient(90deg,#07070b_0%,rgba(7,7,11,0.94)_32%,rgba(7,7,11,0.25)_70%,transparent_100%)]" />

        <header className="relative z-10 flex items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
          <Link to="/" className="flex items-center gap-3" aria-label="BANGTAN AUDIO home">
            <BangtanLogo className="h-7 w-7 text-purple-400" />
            <span className="text-sm font-semibold tracking-[0.22em]">BANGTAN AUDIO</span>
          </Link>
          <nav className="hidden items-center gap-8 text-[10px] font-medium uppercase tracking-[0.17em] text-gray-300 md:flex">
            <a href="#forms" className="transition hover:text-white">Forms</a>
            <a href="#atelier" className="transition hover:text-white">Atelier series</a>
            <Link to="/login" state={returnState} className="transition hover:text-white">Sign in <ArrowUpRight className="ml-1 inline h-3.5 w-3.5" /></Link>
          </nav>
          <Link to="/login" state={returnState} className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-300 transition hover:text-white md:hidden">
            Sign in <ArrowUpRight className="ml-1 inline h-3.5 w-3.5" />
          </Link>
        </header>

        <div className="absolute right-6 top-[21%] z-[2] hidden text-right text-[9px] uppercase tracking-[0.2em] text-gray-300/80 md:block lg:right-12">
          <p>01 / 18</p>
          <p className="mt-2 text-purple-200">ATELIER COLLECTION</p>
        </div>

        <section className="relative z-10 flex min-h-[calc(100svh-76px)] items-end px-5 pb-12 pt-[43svh] sm:px-8 sm:pb-16 md:items-center md:pt-4 lg:px-12">
          <div className="max-w-xl">
            <p className="mb-5 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.3em] text-purple-200/80">
              <span className="h-px w-8 bg-purple-400" /> SIGNATURE SOUND · SEOUL
            </p>
            <h1 className="font-display text-5xl font-semibold leading-[0.98] sm:text-6xl lg:text-7xl">
              BANGTAN<br /><span className="text-purple-300">AUDIO</span>
            </h1>
            <p className="mt-6 max-w-sm text-base leading-7 text-gray-300 sm:text-lg">
              Feel every beat. Sculpted listening, shaped around you.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Link
                to="/login"
                state={enterStoreState}
                className="inline-flex min-h-12 items-center gap-8 bg-purple-600 px-6 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-purple-500"
              >
                Explore the collection <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link to="/signup" state={enterStoreState} className="text-xs font-medium uppercase tracking-[0.16em] text-gray-300 transition hover:text-white">
                Create an account
              </Link>
            </div>
            <a href="#forms" className="mt-12 inline-flex items-center gap-3 text-[9px] uppercase tracking-[0.22em] text-gray-500 transition hover:text-gray-300">
              <ArrowDown className="h-3.5 w-3.5" /> Discover the forms
            </a>
          </div>
        </section>
      </section>

      <section id="forms" className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="mb-9 flex flex-col justify-between gap-5 border-b border-white/10 pb-7 md:flex-row md:items-end">
          <div>
            <p className="text-[9px] uppercase tracking-[0.25em] text-purple-300">BANGTAN AUDIO · FORM INDEX</p>
            <h2 className="mt-3 font-display text-3xl font-medium sm:text-4xl">A different shape for every sound.</h2>
          </div>
          <p className="max-w-sm text-xs leading-6 text-gray-400">Six sculptural signatures. One unmistakable house sound.</p>
        </div>

        <div className="grid grid-cols-2 border-y border-white/10 sm:grid-cols-3 lg:grid-cols-6">
          {shapeIndex.map(([number, label]) => (
            <Link key={number} to="/login" state={enterStoreState} className="group min-w-0">
              <div className="flex min-h-16 items-center gap-3 border-b border-r border-white/10 px-3 py-4 transition-colors group-hover:bg-white/[0.03] sm:min-h-20 sm:px-4">
                <span className="text-[9px] tracking-[0.16em] text-purple-300">{number}</span>
                <span className="min-w-0 truncate text-[8px] font-medium uppercase tracking-[0.12em] text-gray-300 sm:text-[9px]">{label}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="atelier" className="border-y border-white/10 bg-[#0a0910] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="mb-9 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-[9px] uppercase tracking-[0.25em] text-purple-300">THE ATELIER SERIES · 13—18</p>
            <h2 className="mt-3 font-display text-3xl font-medium sm:text-4xl">New forms. Same frequency.</h2>
          </div>
          <Link to="/login" state={enterStoreState} className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-purple-200 transition hover:text-white">
            Enter all 18 collections <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product, index) => (
            <Link
              key={product.id}
              to="/login"
              state={enterStoreState}
              className="group min-w-0 border-b border-white/10 pb-4 transition-colors hover:border-purple-400/60"
            >
              <div className="relative aspect-[1.28] overflow-hidden bg-[#07070b]">
                <EarbudsCanvas3D
                  colorHex={product.colorHex}
                  modelStyle={product.modelStyle}
                  caseOpen
                  interactive={false}
                  autoRotate={false}
                  staticRender
                  showHint={false}
                  className="h-full w-full transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <BangtanProductStamp className="bottom-2 left-2 px-1.5 py-1 text-[6px]" />
                <span className="absolute right-3 top-3 text-[8px] uppercase tracking-[0.17em] text-gray-300">ATELIER / {String(index + 13).padStart(2, '0')}</span>
              </div>
              <div className="flex items-start justify-between gap-3 pt-4">
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-medium text-white">{product.name}</h3>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-gray-500">{product.tagline}</p>
                </div>
                <span className="shrink-0 text-xs text-gray-300">₹ {product.price.toLocaleString('en-IN')}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-10 px-5 py-16 sm:px-8 sm:py-20 md:grid-cols-2 lg:px-12">
        <div>
          <p className="text-[9px] uppercase tracking-[0.25em] text-purple-300">THE BANGTAN SIGNATURE</p>
          <h2 className="mt-4 max-w-lg font-display text-3xl font-medium leading-tight sm:text-4xl">A considered object. An expansive soundstage.</h2>
        </div>
        <div className="flex flex-col justify-between gap-7">
          <p className="max-w-xl text-sm leading-7 text-gray-400">Every silhouette is tuned to feel personal: quiet where the world is loud, vivid where the music comes alive. Eighteen Bangtan collections, each finished with the house emblem.</p>
          <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-5">
            <div><span className="block text-xl font-light text-white">18</span><span className="mt-1 block text-[8px] uppercase tracking-[0.16em] text-gray-500">Collections</span></div>
            <div><span className="block text-xl font-light text-white">06</span><span className="mt-1 block text-[8px] uppercase tracking-[0.16em] text-gray-500">Form families</span></div>
            <div><span className="block text-xl font-light text-white">01</span><span className="mt-1 block text-[8px] uppercase tracking-[0.16em] text-gray-500">House signature</span></div>
          </div>
          <Link to="/signup" state={enterStoreState} className="inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-purple-200 transition hover:text-white">
            Join BANGTAN AUDIO <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <footer className="flex flex-col gap-4 border-t border-white/10 px-5 py-6 text-[9px] uppercase tracking-[0.15em] text-gray-500 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
        <Link to="/" className="flex items-center gap-2 text-gray-300"><BangtanLogo className="h-4 w-4 text-purple-400" /> BANGTAN AUDIO</Link>
        <span>Feel every beat · Seoul</span>
        <Link to="/login" state={returnState} className="transition hover:text-white">Enter the collection <ArrowUpRight className="ml-1 inline h-3 w-3" /></Link>
      </footer>
    </main>
  );
}
