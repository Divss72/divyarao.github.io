import React, { useRef, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

interface Collectible {
  x: number;
  y: number;
  type: 'coffee' | 'book' | 'ai' | 'ball' | 'laptop';
  icon: string;
  points: number;
  label: string;
  collected: boolean;
}

interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
}

export const RunnerGame: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [distance, setDistance] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [recentDiscovery, setRecentDiscovery] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Journey milestones
  const milestones = [
    { dist: 150, text: '🎓 Started B.E. Computer Science at Chandigarh University' },
    { dist: 400, text: '💻 Built DevPosting Full-Stack Community Platform' },
    { dist: 750, text: '⚡ Built AutoHeal-J Spring Boot Monitoring Prototype' },
    { dist: 1100, text: '🤖 Selected as Alta AI Builders Fellow (Agentic Workflows)' },
    { dist: 1500, text: '🌍 GSSoC \'24 Open Source Contributor' },
    { dist: 1900, text: '🏆 National Hackathon Finalist' },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('dr_runner_highscore');
    if (saved) setHighScore(parseInt(saved, 10));
  }, []);

  const startGame = () => {
    setIsPlaying(true);
    setIsGameOver(false);
    setScore(0);
    setDistance(0);
    setRecentDiscovery(null);
  };

  useEffect(() => {
    if (!isPlaying) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 640;
    const height = 300;
    canvas.width = width;
    canvas.height = height;

    const groundY = height - 50;

    // Player state
    const player = {
      x: 70,
      y: groundY - 32,
      w: 24,
      h: 32,
      vy: 0,
      jumpForce: -11.5,
      gravity: 0.65,
      isGrounded: true,
      jumpsRemaining: 2,
    };

    let currentDistance = 0;
    let currentScore = 0;
    let gameSpeed = 4.2;

    const obstacles: Obstacle[] = [];
    const collectibles: Collectible[] = [];

    const itemTypes: Array<{ type: Collectible['type']; icon: string; points: number; label: string }> = [
      { type: 'coffee', icon: '☕', points: 10, label: 'Coffee (+10)' },
      { type: 'book', icon: '📖', points: 20, label: 'Read Book (+20)' },
      { type: 'ai', icon: '🤖', points: 25, label: 'AI Agent (+25)' },
      { type: 'ball', icon: '🏀', points: 15, label: 'Hoop Shot (+15)' },
      { type: 'laptop', icon: '💻', points: 30, label: 'Deployed Code (+30)' },
    ];

    let nextObstacleTick = 60;
    let nextCollectibleTick = 30;

    // Jump handler
    const doJump = () => {
      if (player.jumpsRemaining > 0) {
        player.vy = player.jumpForce;
        player.isGrounded = false;
        player.jumpsRemaining--;
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        doJump();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Main Game Loop
    const loop = () => {
      ctx.clearRect(0, 0, width, height);

      // Background Paper Sky
      ctx.fillStyle = '#F4EBDD';
      ctx.fillRect(0, 0, width, height);

      // Subtle Mountain / City Horizon
      ctx.fillStyle = '#E5D5BD';
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.lineTo(80, groundY - 40);
      ctx.lineTo(180, groundY - 20);
      ctx.lineTo(290, groundY - 60);
      ctx.lineTo(400, groundY - 30);
      ctx.lineTo(520, groundY - 55);
      ctx.lineTo(width, groundY - 25);
      ctx.lineTo(width, groundY);
      ctx.fill();

      // Hardwood / Coffee Road
      ctx.fillStyle = '#6B4A32';
      ctx.fillRect(0, groundY, width, 50);

      // Road dash line
      ctx.strokeStyle = '#DCC7A6';
      ctx.lineWidth = 3;
      ctx.setLineDash([16, 16]);
      ctx.lineDashOffset = -currentDistance * 2;
      ctx.beginPath();
      ctx.moveTo(0, groundY + 25);
      ctx.lineTo(width, groundY + 25);
      ctx.stroke();
      ctx.setLineDash([]);

      // Update player physics
      player.vy += player.gravity;
      player.y += player.vy;

      if (player.y >= groundY - player.h) {
        player.y = groundY - player.h;
        player.vy = 0;
        player.isGrounded = true;
        player.jumpsRemaining = 2;
      }

      // Draw Player Character (Warm retro courier with backpack)
      ctx.fillStyle = '#2A1D16';
      // Head
      ctx.fillRect(player.x + 4, player.y, 16, 10);
      // Torso
      ctx.fillStyle = '#C85A32';
      ctx.fillRect(player.x + 2, player.y + 10, 20, 14);
      // Backpack
      ctx.fillStyle = '#8A684D';
      ctx.fillRect(player.x - 3, player.y + 11, 6, 10);
      // Legs (animated running wobble when grounded)
      ctx.fillStyle = '#1B1410';
      const legOffset = player.isGrounded ? Math.sin(currentDistance * 0.25) * 4 : 0;
      ctx.fillRect(player.x + 4, player.y + 24, 6, 8 + legOffset);
      ctx.fillRect(player.x + 14, player.y + 24, 6, 8 - legOffset);

      // Distance advancement
      currentDistance += Math.round(gameSpeed * 0.2);
      setDistance(currentDistance);

      // Check milestones
      for (const m of milestones) {
        if (Math.abs(currentDistance - m.dist) < 3) {
          setRecentDiscovery(m.text);
        }
      }

      // Spawn collectibles
      nextCollectibleTick--;
      if (nextCollectibleTick <= 0) {
        const item = itemTypes[Math.floor(Math.random() * itemTypes.length)];
        const floatY = groundY - 45 - Math.random() * 50;
        collectibles.push({
          x: width + 20,
          y: floatY,
          type: item.type,
          icon: item.icon,
          points: item.points,
          label: item.label,
          collected: false,
        });
        nextCollectibleTick = 65 + Math.floor(Math.random() * 60);
      }

      // Spawn obstacles (Server bugs / latency spikes / hurdles)
      nextObstacleTick--;
      if (nextObstacleTick <= 0) {
        const obsH = 24 + Math.random() * 16;
        obstacles.push({
          x: width + 20,
          y: groundY - obsH,
          width: 18,
          height: obsH,
          label: 'BUG',
        });
        nextObstacleTick = 85 + Math.floor(Math.random() * 70);
      }

      // Render & Move Collectibles
      for (let i = collectibles.length - 1; i >= 0; i--) {
        const c = collectibles[i];
        c.x -= gameSpeed;

        if (!c.collected) {
          ctx.font = '18px serif';
          ctx.fillText(c.icon, c.x, c.y);

          // Collision detection with player
          const distToPlayer = Math.hypot(c.x + 8 - (player.x + player.w / 2), c.y - 8 - (player.y + player.h / 2));
          if (distToPlayer < 24) {
            c.collected = true;
            currentScore += c.points;
            setScore(currentScore);
            setRecentDiscovery(`Collected: ${c.label}`);
          }
        }

        if (c.x < -30) collectibles.splice(i, 1);
      }

      // Render & Move Obstacles
      for (let i = obstacles.length - 1; i >= 0; i--) {
        const obs = obstacles[i];
        obs.x -= gameSpeed;

        // Draw obstacle as a dark coffee server node or bug hurdle
        ctx.fillStyle = '#2A1D16';
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
        ctx.fillStyle = '#C85A32';
        ctx.fillRect(obs.x + 3, obs.y + 3, obs.width - 6, 3);

        // AABB Collision with player
        if (
          player.x < obs.x + obs.width &&
          player.x + player.w > obs.x &&
          player.y < obs.y + obs.height &&
          player.y + player.h > obs.y
        ) {
          // Game Over collision!
          setIsPlaying(false);
          setIsGameOver(true);
          if (currentScore > highScore) {
            setHighScore(currentScore);
            localStorage.setItem('dr_runner_highscore', currentScore.toString());
            confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
          }
          return;
        }

        if (obs.x < -40) obstacles.splice(i, 1);
      }

      // Slowly accelerate speed
      gameSpeed = Math.min(8.5, 4.2 + (currentDistance / 1000) * 0.8);

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, highScore]);

  return (
    <div className="p-6 bg-cream-50 rounded-2xl border border-beige-dark/60 shadow-warm-md space-y-4">
      {/* Header and Stats */}
      <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
        <div>
          <span className="text-[10px] text-accent-terracotta uppercase tracking-wider font-bold block">
            // INTERACTIVE JOURNEY
          </span>
          <h4 className="font-editorial text-lg font-bold text-coffee-espresso">
            Play My Journey — The Infinite Runner
          </h4>
        </div>

        <div className="flex items-center gap-3 bg-cream-100 px-4 py-2 rounded-xl border border-beige/60">
          <div>
            <span className="text-[9px] text-coffee-muted block">DISTANCE</span>
            <span className="text-sm font-bold text-coffee-espresso">{distance}m</span>
          </div>
          <div className="border-l border-beige pl-3">
            <span className="text-[9px] text-coffee-muted block">SCORE</span>
            <span className="text-sm font-bold text-accent-terracotta">{score} pts</span>
          </div>
          <div className="border-l border-beige pl-3">
            <span className="text-[9px] text-coffee-muted block">BEST</span>
            <span className="text-sm font-bold text-coffee">{highScore}</span>
          </div>
        </div>
      </div>

      {/* Canvas Viewport */}
      <div className="relative rounded-xl overflow-hidden border border-beige-dark/60 shadow-warm-inner bg-[#F4EBDD] flex justify-center">
        <canvas
          ref={canvasRef}
          onClick={() => {
            if (!isPlaying) startGame();
            else {
              // Tap to jump on mobile/click
              const evt = new KeyboardEvent('keydown', { code: 'Space' });
              window.dispatchEvent(evt);
            }
          }}
          className="w-full cursor-pointer max-w-[640px] block"
          style={{ height: '300px' }}
        />

        {/* Start Overlay */}
        {!isPlaying && !isGameOver && (
          <div className="absolute inset-0 bg-coffee-roast/75 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center text-cream-50 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-beige text-coffee-espresso flex items-center justify-center text-2xl font-bold shadow-warm-md">
              🏃
            </div>
            <div>
              <h5 className="font-editorial text-2xl font-bold text-cream-50">
                Run Through Divya's Universe
              </h5>
              <p className="text-xs text-cream-300/80 font-mono mt-1 max-w-sm">
                Jump over latency bugs, collect coffee, books & AI nodes, and unlock real milestones from college to career.
              </p>
            </div>
            <button
              onClick={startGame}
              className="px-6 py-2.5 rounded-xl bg-accent-terracotta text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-accent-rust shadow-warm-md transition cursor-pointer"
            >
              Play My Journey (Space / Tap)
            </button>
          </div>
        )}

        {/* Game Over Overlay */}
        {isGameOver && (
          <div className="absolute inset-0 bg-coffee-roast/85 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center text-cream-50 space-y-3">
            <h5 className="font-editorial text-2xl font-bold text-accent-terracotta">
              Hurdle Encountered!
            </h5>
            <div className="font-mono text-xs text-cream-200">
              Traveled <strong className="text-cream-50">{distance}m</strong> • Earned{' '}
              <strong className="text-accent-gold">{score} pts</strong>
            </div>
            <button
              onClick={startGame}
              className="px-6 py-2 rounded-xl bg-coffee text-cream-50 font-mono text-xs font-bold hover:bg-beige hover:text-coffee-espresso transition cursor-pointer"
            >
              Run Again ↻
            </button>
          </div>
        )}
      </div>

      {/* Discovery Milestone Ticker */}
      <div className="min-h-[28px] p-2 bg-cream-100 rounded-lg border border-beige/60 text-xs font-mono text-coffee-espresso flex items-center justify-between">
        <span className="truncate">
          {recentDiscovery || 'Controls: Press Spacebar or Tap Canvas to Jump (Double-jump supported!)'}
        </span>
        <span className="text-[10px] text-coffee-muted flex-shrink-0 ml-2">
          Double-Jump: ACTIVE
        </span>
      </div>
    </div>
  );
};
