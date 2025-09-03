// store/timerStore.ts
import { create } from 'zustand';

interface TimerState {
  isRunning: boolean;
  secondsElapsed: number;
  startTime: Date | null;
  setRunning: (isRunning: boolean) => void;
  setSeconds: (seconds: number) => void;
  setStartTime: (startTime: Date | null) => void;
  reset: () => void;
}

export const useTimerStore = create<TimerState>((set) => ({
  isRunning: false,
  secondsElapsed: 0,
  startTime: null,
  setRunning: (isRunning) => set({ isRunning }),
  setSeconds: (seconds) => set({ secondsElapsed: seconds }),
  setStartTime: (startTime) => set({ startTime }),
  reset: () => set({ isRunning: false, secondsElapsed: 0, startTime: null })
}));