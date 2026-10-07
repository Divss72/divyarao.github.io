import React, { useRef, useState, useEffect } from 'react';

export const DoodleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#2A1D16'); // Coffee Dark
  const [lineWidth, setLineWidth] = useState(3);
  const [tool, setTool] = useState<'pen' | 'brush' | 'eraser'>('pen');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = canvas.parentElement?.clientWidth || 600;
    canvas.height = 360;

    // Fill background with warm paper tone
    ctx.fillStyle = '#FDFBF7';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw light notebook grid lines
    ctx.strokeStyle = 'rgba(107, 74, 50, 0.06)';
    ctx.lineWidth = 1;
    for (let y = 24; y < canvas.height; y += 24) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  }, []);

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    return {
      x: (e as React.MouseEvent).clientX - rect.left,
      y: (e as React.MouseEvent).clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const { x, y } = getPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getPos(e);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (tool === 'eraser') {
      ctx.strokeStyle = '#FDFBF7';
      ctx.lineWidth = 20;
    } else {
      ctx.strokeStyle = color;
      ctx.lineWidth = tool === 'brush' ? lineWidth * 2.5 : lineWidth;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#FDFBF7';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Re-draw subtle ruled lines
    ctx.strokeStyle = 'rgba(107, 74, 50, 0.06)';
    ctx.lineWidth = 1;
    for (let y = 24; y < canvas.height; y += 24) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  };

  const downloadSketch = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `divyarao-sketch-${Date.now()}.png`;
    a.click();
  };

  const handleUploadSketch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = canvasRef.current;
          if (!canvas) return;
          const ctx = canvas.getContext('2d');
          if (!ctx) return;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6 bg-cream-50 rounded-2xl border border-beige-dark/60 shadow-warm-md space-y-4">
      {/* Header and Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
        <div>
          <span className="text-[10px] text-accent-terracotta uppercase tracking-wider font-bold block">
            // SKETCHBOOK SANDBOX
          </span>
          <h4 className="font-editorial text-lg font-bold text-coffee-espresso">
            Notebook Doodle Pad
          </h4>
        </div>

        {/* Tools Palette */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Tool switches */}
          <div className="flex items-center gap-1 bg-cream-100 p-1 rounded-xl border border-beige/60">
            <button
              onClick={() => {
                setTool('pen');
                setColor('#2A1D16');
              }}
              className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                tool === 'pen' ? 'bg-coffee text-cream-50 font-bold' : 'text-coffee-muted'
              }`}
            >
              Ink Pen
            </button>
            <button
              onClick={() => {
                setTool('brush');
                setColor('#C85A32');
              }}
              className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                tool === 'brush' ? 'bg-coffee text-cream-50 font-bold' : 'text-coffee-muted'
              }`}
            >
              Terracotta Brush
            </button>
            <button
              onClick={() => setTool('eraser')}
              className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                tool === 'eraser' ? 'bg-coffee text-cream-50 font-bold' : 'text-coffee-muted'
              }`}
            >
              Eraser
            </button>
          </div>

          {/* Color swatches */}
          {tool !== 'eraser' && (
            <div className="flex items-center gap-1.5 px-2 py-1 bg-cream-100 rounded-xl border border-beige/60">
              {[
                { hex: '#2A1D16', label: 'Dark Coffee' },
                { hex: '#6B4A32', label: 'Roast' },
                { hex: '#C85A32', label: 'Terracotta' },
                { hex: '#4D7C5F', label: 'Sage' },
                { hex: '#3B6E8C', label: 'Ink Blue' },
              ].map((swatch) => (
                <button
                  key={swatch.hex}
                  onClick={() => setColor(swatch.hex)}
                  className={`w-5 h-5 rounded-full border transition cursor-pointer ${
                    color === swatch.hex ? 'scale-125 border-coffee-roast' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: swatch.hex }}
                  title={swatch.label}
                />
              ))}
            </div>
          )}

          {/* Action buttons */}
          <button
            onClick={clearCanvas}
            className="px-3 py-1 rounded-lg border border-beige-dark/50 text-coffee-muted hover:text-coffee-espresso hover:bg-beige/30 transition cursor-pointer"
          >
            Clear
          </button>
          <button
            onClick={downloadSketch}
            className="px-3 py-1 rounded-lg bg-coffee text-cream-50 hover:bg-coffee-roast transition cursor-pointer"
          >
            Export PNG ↓
          </button>
          <label className="px-3 py-1 rounded-lg border border-accent-terracotta/40 text-accent-terracotta hover:bg-accent-terracotta hover:text-white transition cursor-pointer">
            <span>Import</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleUploadSketch}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Drawing Canvas */}
      <div className="rounded-xl overflow-hidden border border-beige-dark/60 shadow-warm-inner bg-[#FDFBF7]">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full cursor-crosshair block touch-none"
        />
      </div>

      <div className="flex items-center justify-between text-[11px] font-mono text-coffee-muted">
        <span>Draw freehand doodles, architecture flowcharts, or sketches.</span>
        <span>Paper Grid: 24px Ruled</span>
      </div>
    </div>
  );
};
