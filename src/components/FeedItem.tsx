import React from 'react';
import type { NormalizedEntry } from '../utils/dataFormatter';
import { TrendingUp, TrendingDown, AlertCircle, Activity, Landmark, Users, BarChart3 } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface FeedItemProps {
  entry: NormalizedEntry;
  highlightSurges: boolean;
}

const CategoryIcon = ({ category }: { category: string }) => {
  switch (category.toLowerCase()) {
    case 'inflation': return <Activity className="w-5 h-5 text-amber-400" />;
    case 'employment': return <Users className="w-5 h-5 text-blue-400" />;
    case 'gdp': return <BarChart3 className="w-5 h-5 text-emerald-400" />;
    case 'rates': return <Landmark className="w-5 h-5 text-purple-400" />;
    default: return <Activity className="w-5 h-5 text-slate-400" />;
  }
};

const FeedItem = React.memo(({ entry, highlightSurges }: FeedItemProps) => {
  const isSurging = highlightSurges && entry.isInflationSurge;

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 p-4 transition-all duration-300 hover:bg-slate-900 hover:border-slate-700",
        isSurging && "border-rose-500/50 bg-rose-500/5 ring-1 ring-rose-500/50 shadow-[0_0_20px_rgba(244,63,94,0.1)]"
      )}
    >
      {isSurging && (
        <div className="absolute top-0 right-0 p-2">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 text-[10px] font-bold uppercase tracking-wider animate-pulse">
            <AlertCircle className="w-3 h-3" />
            Inflation Spike
          </div>
        </div>
      )}

      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 mt-1">
          <CategoryIcon category={entry.category} />
        </div>

        <div className="flex-grow min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-xs font-medium text-slate-500 tracking-wider uppercase">
              {entry.source} • {entry.category}
            </span>
            <div className="w-1 h-1 rounded-full bg-slate-800" />
            <span className="text-[10px] text-slate-600 font-mono">
              {entry.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <h3 className="text-xl font-bold text-slate-100 tabular-nums">
              {entry.displayValue}
            </h3>
            
            {/* Sentiment Badge */}
            <div className={cn(
              "px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border",
              entry.category.toLowerCase() === 'inflation' ? (entry.isInflationSurge ? "bg-rose-500/10 text-rose-400 border-rose-500/20" : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20") :
              entry.category.toLowerCase() === 'gdp' ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
              "bg-slate-800 text-slate-400 border-slate-700"
            )}>
              {entry.category.toLowerCase() === 'inflation' ? (entry.isInflationSurge ? "Bearish" : "Bullish") : 
               entry.category.toLowerCase() === 'gdp' ? "Bullish" : "Neutral"}
            </div>
            
            {/* Simple Good/Bad heuristic */}
            <div className={cn(
              "flex items-center gap-1 text-xs font-semibold ml-auto",
              entry.category.toLowerCase() === 'inflation' ? (entry.isInflationSurge ? "text-rose-400" : "text-emerald-400") :
              entry.category.toLowerCase() === 'gdp' ? "text-emerald-400" :
              "text-slate-400"
            )}>
              {entry.category.toLowerCase() === 'inflation' ? (
                entry.isInflationSurge ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />
              ) : entry.category.toLowerCase() === 'gdp' ? (
                <TrendingUp className="w-3 h-3" />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

FeedItem.displayName = 'FeedItem';

export default FeedItem;
