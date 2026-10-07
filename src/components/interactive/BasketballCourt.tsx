import React, { useRef, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

export const BasketballCourt: React.FC = () => {
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [shotStatus, setShotStatus] = useState<string>('Drag the ball backward & release to shoot!');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Ball physics state
  const ballRef = useRef<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    isDragging: boolean;
    isFlying: boolean;
    startX: number;
    startY: number;
  }>({
    x: 80,
    y: 200,
    vx: 0,
    vy: 0,
    radius: 16,
    isDragging: false,
    isFlying: false,
    startX: 80,
    startY: 200,
  });

  const dragOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 500;
    const height = 280;
    canvas.width = width;
    canvas.height = height;

    // Reset ball home
    ballRef.current.startX = 80;
    ballRef.current.startY = height - 70;
    ballRef.current.x = ballRef.current.startX;
    ballRef.current.y = ballRef.current.startY;

    // Hoop coordinates
    const hoop = {
      backboardX: width - 50,
      backboardY: 60,
      backboardH: 80,
      rimX: width - 85,
      rimY: 105,
      rimWidth: 35,
    };

    let scoredThisFlight = false;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Warm hardwood court floor
      ctx.fillStyle = '#E5D5BD';
      ctx.fillRect(0, 0, width, height);

      // Court wood planks
      ctx.strokeStyle = 'rgba(107, 74, 50, 0.12)';
      ctx.lineWidth = 1;
      for (let y = 30; y < height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Three-point arc line
      ctx.strokeStyle = 'rgba(107, 74, 50, 0.25)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(hoop.rimX + 15, hoop.rimY, 150, Math.PI * 0.5, Math.PI * 1.5, false);
      ctx.stroke();

      // Floor ground baseline
      ctx.fillStyle = '#6B4A32';
      ctx.fillRect(0, height - 12, width, 12);

      // Draw Hoop Backboard pole & board
      ctx.fillStyle = '#2A1D16';
      ctx.fillRect(hoop.backboardX + 10, hoop.backboardY + 20, 8, height - (hoop.backboardY + 20));

      // Backboard
      ctx.fillStyle = '#FFFFFF';
      ctx.strokeStyle = '#2A1D16';
      ctx.lineWidth = 3;
      ctx.fillRect(hoop.backboardX, hoop.backboardY, 8, hoop.backboardH);
      ctx.strokeRect(hoop.backboardX, hoop.backboardY, 8, hoop.backboardH);

      // Backboard inner target square
      ctx.strokeStyle = '#C85A32';
      ctx.lineWidth = 2;
      ctx.strokeRect(hoop.backboardX - 1, hoop.backboardY + 25, 2, 30);

      // Rim (Orange)
      ctx.strokeStyle = '#C85A32';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(hoop.rimX, hoop.rimY);
      ctx.lineTo(hoop.backboardX, hoop.rimY);
      ctx.stroke();

      // Net (Crossed white lines)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(hoop.rimX, hoop.rimY);
      ctx.lineTo(hoop.rimX + 6, hoop.rimY + 30);
      ctx.lineTo(hoop.backboardX - 4, hoop.rimY + 30);
      ctx.lineTo(hoop.backboardX, hoop.rimY);
      ctx.stroke();

      const ball = ballRef.current;

      // Trajectory Guide when dragging
      if (ball.isDragging) {
        const pullDx = ball.startX - ball.x;
        const pullDy = ball.startY - ball.y;

        ctx.strokeStyle = 'rgba(200, 90, 50, 0.6)';
        ctx.setLineDash([4, 4]);
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(ball.x, ball.y);
        ctx.lineTo(ball.x + pullDx * 1.5, ball.y + pullDy * 1.5);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Ball Physics update
      if (ball.isFlying) {
        ball.vy += 0.42; // Gravity
        ball.x += ball.vx;
        ball.y += ball.vy;

        // Backboard bounce
        if (
          ball.x + ball.radius >= hoop.backboardX &&
          ball.x - ball.radius <= hoop.backboardX + 8 &&
          ball.y >= hoop.backboardY &&
          ball.y <= hoop.backboardY + hoop.backboardH
        ) {
          ball.vx = -ball.vx * 0.6;
          ball.x = hoop.backboardX - ball.radius;
        }

        // Front rim bounce
        const frontRimDist = Math.hypot(ball.x - hoop.rimX, ball.y - hoop.rimY);
        if (frontRimDist < ball.radius + 3) {
          ball.vy = -ball.vy * 0.6;
          ball.vx = ball.vx * 0.7;
        }

        // Swish check: ball passes through rim from top downward
        if (
          !scoredThisFlight &&
          ball.x > hoop.rimX &&
          ball.x < hoop.backboardX &&
          ball.y >= hoop.rimY - 2 &&
          ball.y <= hoop.rimY + 16 &&
          ball.vy > 0
        ) {
          scoredThisFlight = true;
          setScore((s) => s + 2);
          setStreak((st) => st + 1);
          setShotStatus('SWISH! Clean bucket! 🏀 🔥');

          // Celebrate with confetti
          confetti({
            particleCount: 35,
            spread: 50,
            origin: { x: 0.85, y: 0.4 },
            colors: ['#C85A32', '#D97706', '#6B4A32', '#F4EBDD'],
          });
        }

        // Floor collision
        if (ball.y + ball.radius >= height - 12) {
          ball.y = height - 12 - ball.radius;
          ball.vy = -ball.vy * 0.55;
          ball.vx *= 0.85;

          if (Math.abs(ball.vy) < 1.2) {
            // Ball came to rest
            ball.isFlying = false;
            if (!scoredThisFlight) {
              setStreak(0);
              setShotStatus('Off the rim! Pull back and try again.');
            }
            setTimeout(() => {
              ball.x = ball.startX;
              ball.y = ball.startY;
              ball.vx = 0;
              ball.vy = 0;
              scoredThisFlight = false;
              setShotStatus('Ready! Drag and shoot.');
            }, 800);
          }
        }

        // Out of bounds reset
        if (ball.x > width + 50 || ball.x < -50) {
          ball.isFlying = false;
          ball.x = ball.startX;
          ball.y = ball.startY;
          scoredThisFlight = false;
          setStreak(0);
          setShotStatus('Out of bounds! Resetting.');
        }
      }

      // Draw Basketball
      ctx.save();
      ctx.translate(ball.x, ball.y);

      // Ball base
      ctx.fillStyle = '#C85A32';
      ctx.beginPath();
      ctx.arc(0, 0, ball.radius, 0, Math.PI * 2);
      ctx.fill();

      // Ball outline
      ctx.strokeStyle = '#2A1D16';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Basketball seam lines
      ctx.beginPath();
      ctx.moveTo(-ball.radius, 0);
      ctx.lineTo(ball.radius, 0);
      ctx.moveTo(0, -ball.radius);
      ctx.lineTo(0, ball.radius);
      ctx.stroke();

      ctx.restore();

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Mouse & Touch Drag interactions
  const handleStart = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const ball = ballRef.current;
    const dist = Math.hypot(x - ball.x, y - ball.y);

    if (dist <= ball.radius + 15 && !ball.isFlying) {
      ball.isDragging = true;
      dragOffsetRef.current = { x: x - ball.x, y: y - ball.y };
      setShotStatus('Aiming... Release to shoot!');
    }
  };

  const handleMove = (clientX: number, clientY: number) => {
    const ball = ballRef.current;
    if (!ball.isDragging) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();

    ball.x = clientX - rect.left - dragOffsetRef.current.x;
    ball.y = clientY - rect.top - dragOffsetRef.current.y;
  };

  const handleEnd = () => {
    const ball = ballRef.current;
    if (!ball.isDragging) return;

    ball.isDragging = false;
    ball.isFlying = true;

    // Launch velocity is proportional to slingshot distance from start
    const pullX = ball.startX - ball.x;
    const pullY = ball.startY - ball.y;

    ball.vx = pullX * 0.16;
    ball.vy = pullY * 0.16;
  };

  return (
    <div className="p-6 bg-cream-50 rounded-2xl border border-beige-dark/60 shadow-warm-md space-y-4">
      {/* Header and Scoreboard */}
      <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
        <div>
          <span className="text-[10px] text-accent-terracotta uppercase tracking-wider font-bold block">
            // MICRO INTERACTION
          </span>
          <h4 className="font-editorial text-lg font-bold text-coffee-espresso">
            Half-Court Shootout
          </h4>
        </div>

        <div className="flex items-center gap-4 bg-cream-100 px-4 py-2 rounded-xl border border-beige/60">
          <div>
            <span className="text-[9px] text-coffee-muted block">POINTS</span>
            <span className="text-base font-bold text-coffee-espresso">{score}</span>
          </div>
          <div className="border-l border-beige pl-3">
            <span className="text-[9px] text-coffee-muted block">STREAK</span>
            <span className="text-base font-bold text-accent-terracotta">{streak} 🔥</span>
          </div>
        </div>
      </div>

      {/* Interactive Court Canvas */}
      <div className="relative rounded-xl overflow-hidden border border-beige-dark/60 shadow-warm-inner flex justify-center bg-cream-200">
        <canvas
          ref={canvasRef}
          onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
          onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={(e) => {
            const touch = e.touches[0];
            handleStart(touch.clientX, touch.clientY);
          }}
          onTouchMove={(e) => {
            const touch = e.touches[0];
            handleMove(touch.clientX, touch.clientY);
          }}
          onTouchEnd={handleEnd}
          className="cursor-grab active:cursor-grabbing max-w-full block"
          style={{ width: '100%', maxWidth: '500px', height: 'auto' }}
        />
      </div>

      {/* Status Readout */}
      <div className="flex items-center justify-between text-xs font-mono text-coffee-muted">
        <span>{shotStatus}</span>
        <button
          onClick={() => {
            setScore(0);
            setStreak(0);
          }}
          className="text-[10px] text-coffee hover:underline cursor-pointer"
        >
          Reset Score
        </button>
      </div>
    </div>
  );
};
