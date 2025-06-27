import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TimeLeft {
  h: number;
  m: number;
  s: number;
}

export default function CountdownTo810(): React.JSX.Element {
  const [left, setLeft] = useState<TimeLeft>({
    h: 0,
    m: 0,
    s: 0
  });
  const [next, setNext] = useState<string>('');
  const [curr, setCurr] = useState<string>('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const currHour = now.getHours();
      const currMin = now.getMinutes();
      const currSec = now.getSeconds();

      setCurr(now.toLocaleTimeString());

      let target = new Date(now);

      if (currHour < 8 || (currHour === 8 && currMin < 10)) {
        target.setHours(8, 10, 0, 0);
        setNext('8:10 AM');
      }
      else if (currHour < 20 || (currHour === 20 && currMin < 10)) {
        target.setHours(20, 10, 0, 0);
        setNext('8:10 PM');
      }
      else {
        target.setDate(target.getDate() + 1);
        target.setHours(8, 10, 0, 0);
        setNext('8:10 AM (Tomorrow)');
      }

      const diff = target.getTime() - now.getTime();

      if (diff > 0) {
        const h = Math.floor(diff / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        setLeft({ h, m, s });
      } else {
        setLeft({ h: 0, m: 0, s: 0 });
      }
    };

    update();
    const int = setInterval(update, 1000);
    return () => clearInterval(int);
  }, []);

  const fmt = (num: number): string => num.toString().padStart(2, '0');

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 max-w-md w-full border border-white/20 shadow-2xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Clock className="w-8 h-8 text-white mr-3" />
            <h1 className="text-3xl font-bold text-white">When is 8:10?</h1>
          </div>
          <p className="text-white/80 text-lg">Next target: {next}</p>
        </div>

        <div className="text-center mb-8">
          <p className="text-white/60 text-sm mb-1">Current Time</p>
          <p className="text-white text-xl font-mono">{curr}</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white/10 rounded-2xl p-4 text-center border border-white/20">
            <div className="text-4xl font-bold text-white font-mono">
              {fmt(left.h)}
            </div>
            <div className="text-white/70 text-sm mt-1">Hours</div>
          </div>
          <div className="bg-white/10 rounded-2xl p-4 text-center border border-white/20">
            <div className="text-4xl font-bold text-white font-mono">
              {fmt(left.m)}
            </div>
            <div className="text-white/70 text-sm mt-1">Minutes</div>
          </div>
          <div className="bg-white/10 rounded-2xl p-4 text-center border border-white/20">
            <div className="text-4xl font-bold text-white font-mono">
              {fmt(left.s)}
            </div>
            <div className="text-white/70 text-sm mt-1">Seconds</div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-white/70 text-sm mb-2">
            <span>Progress to 8:10</span>
            <span>
              {left.h === 0 && left.m === 0 && left.s === 0
                ? '🎉 Time!'
                : `${left.h}h ${left.m}m left`}
            </span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-pink-400 to-purple-400 h-2 rounded-full transition-all duration-1000 ease-out"
              style={{
                width: `${Math.max(5, 100 - ((left.h * 3600 + left.m * 60 + left.s) / 432) * 10)}%`
              }}
            ></div>
          </div>
        </div>

        <div className="text-center">
          {left.h === 0 && left.m === 0 && left.s === 0 ? (
            <div className="text-2xl animate-pulse">🎉 It's 8:10! 🎉</div>
          ) : left.h === 0 && left.m < 5 ? (
            <div className="text-yellow-300 animate-bounce">⏰ Almost there!</div>
          ) : (
            <div className="text-white/60">⭐ Stay patient, wish a better world! ⭐</div>
          )}
        </div>
      </div>
    </div>
  );
}