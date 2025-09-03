
import { Pause, Play } from "lucide-react";
import { useEffect, useRef } from "react";
import { useTimerStore } from "@/store/timerStore";

export default function WorkTimer({ showTimer = false }: { showTimer?: boolean }) {
  const { isRunning, secondsElapsed, setRunning, setSeconds, setStartTime } =
    useTimerStore();

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    checkActiveTimer();
  }, []);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds(secondsElapsed + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, secondsElapsed, setSeconds]);

  // التحقق من وجود تايمر نشط على الخادم
  const checkActiveTimer = async () => {
    try {
      const res = await fetch("/api/timer/status");
      const data = await res.json();

      if (data.isRunning) {
        setRunning(true);
        setStartTime(new Date(data.startTime));

        // حساب الوقت المنقضي منذ بداية التايمر
        const start = new Date(data.startTime).getTime();
        const now = new Date().getTime();
        const elapsedSeconds = Math.floor((now - start) / 1000);
        setSeconds(elapsedSeconds);
      }
    } catch (error) {
      console.error("Failed to check timer status:", error);
    }
  };

  const startTimer = async () => {
    try {
      const res = await fetch("/api/timer/start", { method: "POST" });
      const data = await res.json();

      if (!data.error) {
        setRunning(true);
        setStartTime(new Date());
        setSeconds(0);
      }
    } catch (error) {
      console.error("Failed to start timer:", error);
    }
  };

  const stopTimer = async () => {
    try {
      const res = await fetch("/api/timer/stop", { method: "POST" });
      const data = await res.json();

      setRunning(false);
      setSeconds(data.seconds || 0);
      console.log("Total time today:", data.seconds);
    } catch (error) {
      console.error("Failed to stop timer:", error);
    }
  };

  const toggleTimer = () => {
    if (isRunning) {
      stopTimer();
    } else {
      startTimer();
    }
  };

  // عرض الوقت بصيغة ساعة:دقيقة:ثانية
  const formatTime = (sec: number) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // إذا كان التايمر موقف، ما نعرضش أي شيء
  if (!isRunning && !showTimer) {
    return null;
  }

  return (
    <div className="flex items-center space-x-4 w-40">
      <button
        onClick={toggleTimer}
        className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-all duration-300 ${
          isRunning
            ? "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"
            : "bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300"
        }`}
      >
        {isRunning ? (
          <>
            <Pause className="w-4 h-4" />
            <span className="text-sm font-medium">Stop</span>
          </>
        ) : (
          <>
            <Play className="w-4 h-4" />
            <span className="text-sm font-medium">Start</span>
          </>
        )}
      </button>
      <span className="text-sm font-medium">{formatTime(secondsElapsed)}</span>
    </div>
  );
}