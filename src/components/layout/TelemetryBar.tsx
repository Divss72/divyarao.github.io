import React from 'react';
import { TELEMETRY_DATA } from '../../data/portfolioData';

export const TelemetryBar: React.FC = () => {
  return (
    <div className="w-full bg-background/90 border-b border-border-subtle py-1.5 px-4 sm:px-8 text-[11px] font-mono text-text-muted flex items-center justify-between select-none overflow-x-auto">
      <div className="flex items-center gap-4 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-telemetry-green animate-ping-slow" />
          <span className="text-text-primary font-semibold">STATUS: {TELEMETRY_DATA.status}</span>
        </div>
        <span className="text-border-subtle">|</span>
        <span>{TELEMETRY_DATA.location}</span>
        <span className="text-border-subtle hidden sm:inline">|</span>
        <span className="hidden sm:inline">{TELEMETRY_DATA.systemId}</span>
      </div>

      <div className="flex items-center gap-4 whitespace-nowrap pl-4">
        <span className="hidden md:inline">UPTIME: <span className="text-text-primary">{TELEMETRY_DATA.uptime}</span></span>
        <span className="text-border-subtle hidden md:inline">|</span>
        <span className="text-accent font-semibold">{TELEMETRY_DATA.version}</span>
      </div>
    </div>
  );
};
