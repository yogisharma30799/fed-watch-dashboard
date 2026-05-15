import { useState, useMemo } from 'react';
import { Search, Bell, ShieldAlert, Radio, Settings2, Filter, Activity, Landmark, Play, Pause } from 'lucide-react';
import { useLiveFeed } from './hooks/useLiveFeed';
import FeedItem from './components/FeedItem';

function App() {
  const [isPaused, setIsPaused] = useState(false);
  const { visibleData } = useLiveFeed(isPaused);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [highlightSurges, setHighlightSurges] = useState(true);

  const stats = useMemo(() => {
    const alerts = visibleData.filter(d => d.isInflationSurge).length;
    const sources = new Set(visibleData.map(d => d.source)).size;
    return { alerts, sources, total: visibleData.length };
  }, [visibleData]);

  const filteredData = useMemo(() => {
    return visibleData.filter(entry => {
      const matchesSearch = entry.source.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || entry.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [visibleData, searchTerm, selectedCategory]);

  const categories = ['All', 'Inflation', 'Employment', 'GDP', 'Rates'];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-500/30">
      <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.4)]">
              <Radio className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">FedWatch</h1>
              <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest leading-none">Intelligence Dashboard</p>
            </div>
          </div>

          <div className="flex-grow max-w-md relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
            <input
              type="text"
              placeholder="Search source (e.g. FED, BLS, BEA)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-slate-600"
            />
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg hover:bg-slate-900 transition-colors relative">
              <Bell className="w-5 h-5 text-slate-400" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-slate-950"></span>
            </button>
            <div className="h-6 w-[1px] bg-slate-800 mx-1"></div>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors">
              <Settings2 className="w-4 h-4" />
              Terminal
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Active Alerts', value: stats.alerts, icon: Bell, color: 'text-rose-400' },
            { label: 'Data Sources', value: stats.sources, icon: Landmark, color: 'text-blue-400' },
            { label: 'Feed Volume', value: stats.total, icon: Activity, color: 'text-emerald-400' }
          ].map((stat, i) => (
            <div key={i} className="bg-slate-900/40 border border-slate-800 p-4 rounded-2xl flex items-center gap-4">
              <div className={`p-3 rounded-xl bg-slate-900 border border-slate-800 ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{stat.label}</p>
                <p className="text-xl font-bold tabular-nums">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Controls Section */}
        <div className="mb-8 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-50 mb-1">Economic Feed</h2>
              <p className="text-slate-400 text-sm">Real-time indicators from the Federal Reserve and agencies.</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPaused(!isPaused)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${isPaused
                    ? 'bg-blue-600/20 border-blue-500/50 text-blue-400'
                    : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
              >
                {isPaused ? <Play className="w-4 h-4 fill-current" /> : <Pause className="w-4 h-4 fill-current" />}
                <span className="text-xs font-bold uppercase tracking-wider">{isPaused ? 'Resume' : 'Freeze'}</span>
              </button>

              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/50 border border-slate-800">
                <ShieldAlert className={highlightSurges ? "w-4 h-4 text-rose-400" : "w-4 h-4 text-slate-600"} />
                <span className="text-xs font-medium text-slate-300">Surge Alert</span>
                <button
                  onClick={() => setHighlightSurges(!highlightSurges)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${highlightSurges ? 'bg-blue-600' : 'bg-slate-700'}`}
                >
                  <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${highlightSurges ? 'translate-x-5' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-900/50 border border-slate-800 rounded-xl w-fit overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${selectedCategory === cat
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-300'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Live Feed List */}
        <div className="grid gap-4">
          {filteredData.length > 0 ? (
            filteredData.map((entry) => (
              <div key={entry.id} className="animate-in fade-in slide-in-from-top-4 duration-500">
                <FeedItem entry={entry} highlightSurges={highlightSurges} />
              </div>
            ))
          ) : (
            <div className="py-20 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center mb-4 border border-slate-800">
                <Search className="w-8 h-8 text-slate-700" />
              </div>
              <h3 className="text-lg font-semibold text-slate-300">No results found</h3>
              <p className="text-slate-500 text-sm max-w-[200px]">Try adjusting your search for 'FED', 'BLS', or 'BEA'</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer Info */}
      <footer className="mt-20 border-t border-slate-900 py-10 text-center">
        <p className="text-slate-600 text-xs font-mono tracking-wider">
          LIVE DATA STREAM • REFRESHING EVERY 2.0S • v1.0.4-BETA
        </p>
      </footer>
    </div>
  );
}

export default App;
