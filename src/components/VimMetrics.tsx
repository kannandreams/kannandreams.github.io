
import React, { useState, useEffect } from 'react';
import { Activity, Cpu, MemoryStick, Database, Wifi, HardDrive } from 'lucide-react';

// Generate mock performance data
const generateMockData = () => {
  return {
    cpu: Math.floor(Math.random() * 80) + 10,
    memory: Math.floor(Math.random() * 60) + 20,
    network: Math.floor(Math.random() * 90) + 5,
    disk: Math.floor(Math.random() * 70) + 15,
    uptime: '14d 7h 22m',
    temperature: Math.floor(Math.random() * 25) + 40,
    processes: Math.floor(Math.random() * 100) + 150,
    threads: Math.floor(Math.random() * 500) + 1000,
    
    // Array of data points for history graph
    cpuHistory: Array(30).fill(0).map(() => Math.floor(Math.random() * 70) + 10),
    memoryHistory: Array(30).fill(0).map(() => Math.floor(Math.random() * 60) + 20),
    networkHistory: Array(30).fill(0).map(() => Math.floor(Math.random() * 85) + 5)
  };
};

const ProgressBar: React.FC<{ value: number, type: 'cpu' | 'memory' | 'network' | 'disk' }> = ({ value, type }) => {
  // Different colors for different metrics
  const getColor = () => {
    if (value > 80) return 'bg-terminal-error';
    if (value > 60) return 'bg-terminal-warning';
    return 'bg-terminal-success';
  };

  // Get the appropriate icon
  const getIcon = () => {
    switch (type) {
      case 'cpu':
        return <Cpu size={16} />;
      case 'memory':
        return <MemoryStick size={16} />;
      case 'network':
        return <Wifi size={16} />;
      case 'disk':
        return <HardDrive size={16} />;
      default:
        return <Activity size={16} />;
    }
  };

  return (
    <div className="mb-3">
      <div className="flex justify-between mb-1">
        <div className="flex items-center">
          <span className="text-terminal-muted mr-2">{getIcon()}</span>
          <span className="text-terminal-foreground capitalize">{type}</span>
        </div>
        <span className="text-terminal-accent">{value}%</span>
      </div>
      
      <div className="h-2 bg-terminal-border/30 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full ${getColor()}`}
          style={{ width: `${value}%`, transition: 'width 0.5s ease-in-out' }}
        ></div>
      </div>
    </div>
  );
};

const MetricsGraph: React.FC<{ data: number[], label: string, color: string }> = ({ data, label, color }) => {
  const max = Math.max(...data, 100);
  
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-terminal-foreground text-sm">{label}</span>
        <span className="text-terminal-muted text-xs">Current: {data[data.length - 1]}%</span>
      </div>
      
      <div className="flex items-end h-24 space-x-1 bg-terminal-border/10 rounded p-2">
        {data.map((value, index) => (
          <div
            key={index}
            className={`w-1 transition-all duration-300 ${color}`}
            style={{ height: `${(value / max) * 100}%` }}
          ></div>
        ))}
      </div>
    </div>
  );
};

const VimMetrics: React.FC = () => {
  const [metrics, setMetrics] = useState(generateMockData());
  const [lastUpdated, setLastUpdated] = useState(new Date());
  
  // Simulate real-time metrics updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(generateMockData());
      setLastUpdated(new Date());
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="vim-metrics animate-fade-in">
      <div className="flex items-center space-x-2 mb-6">
        <Activity className="text-terminal-secondary" />
        <h2 className="text-terminal-accent text-xl font-semibold">System Metrics</h2>
      </div>
      
      {/* Real-time metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="col-span-full md:col-span-1">
          <div className="bg-terminal-border/20 rounded-md p-4">
            <h3 className="text-terminal-primary text-lg mb-3">Current Usage</h3>
            
            <ProgressBar value={metrics.cpu} type="cpu" />
            <ProgressBar value={metrics.memory} type="memory" />
            <ProgressBar value={metrics.network} type="network" />
            <ProgressBar value={metrics.disk} type="disk" />
            
            <div className="text-right text-terminal-muted text-xs mt-2">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </div>
          </div>
        </div>
        
        <div className="col-span-full md:col-span-1">
          <div className="bg-terminal-border/20 rounded-md p-4">
            <h3 className="text-terminal-primary text-lg mb-3">System Information</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-terminal-muted text-sm mb-1">Uptime</div>
                <div className="text-terminal-foreground">{metrics.uptime}</div>
              </div>
              <div>
                <div className="text-terminal-muted text-sm mb-1">Temperature</div>
                <div className="text-terminal-foreground">{metrics.temperature}°C</div>
              </div>
              <div>
                <div className="text-terminal-muted text-sm mb-1">Processes</div>
                <div className="text-terminal-foreground">{metrics.processes}</div>
              </div>
              <div>
                <div className="text-terminal-muted text-sm mb-1">Threads</div>
                <div className="text-terminal-foreground">{metrics.threads}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Usage history graphs */}
      <div className="bg-terminal-border/20 rounded-md p-4 mb-4">
        <h3 className="text-terminal-primary text-lg mb-3">Usage History (30s)</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricsGraph 
            data={metrics.cpuHistory} 
            label="CPU History" 
            color="bg-terminal-primary" 
          />
          <MetricsGraph 
            data={metrics.memoryHistory} 
            label="Memory History" 
            color="bg-terminal-secondary" 
          />
          <MetricsGraph 
            data={metrics.networkHistory} 
            label="Network History" 
            color="bg-terminal-accent" 
          />
        </div>
      </div>
      
      <div className="text-terminal-muted text-sm italic">
        <p>* All metrics are simulated for demonstration purposes</p>
      </div>
    </div>
  );
};

export default VimMetrics;
