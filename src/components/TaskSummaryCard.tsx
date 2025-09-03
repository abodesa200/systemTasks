'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface TaskSummaryCardProps {
  title: string;
  count: number;
  status: 'todo' | 'progress' | 'review' | 'hold';
  icon: LucideIcon;
  percentage?: number;
}

const TaskSummaryCard: React.FC<TaskSummaryCardProps> = ({ 
  title, 
  count, 
  status, 
  icon: Icon,
  percentage 
}) => {
  // تحديد الألوان والأنماط بناءً على الحالة
  const getStatusStyles = () => {
    switch (status) {
      case 'todo':
        return {
          gradient: 'from-blue-500/20 to-cyan-500/20',
          accentColor: '#3b82f6',
          textColor: 'text-blue-400',
          progressBg: 'bg-blue-500/30',
          iconBg: 'bg-blue-500/20'
        };
      case 'progress':
        return {
          gradient: 'from-amber-500/20 to-orange-500/20',
          accentColor: '#f59e0b',
          textColor: 'text-amber-400',
          progressBg: 'bg-amber-500/30',
          iconBg: 'bg-amber-500/20'
        };
      case 'review':
        return {
          gradient: 'from-purple-500/20 to-pink-500/20',
          accentColor: '#a855f7',
          textColor: 'text-purple-400',
          progressBg: 'bg-purple-500/30',
          iconBg: 'bg-purple-500/20'
        };
      case 'hold':
        return {
          gradient: 'from-gray-500/20 to-slate-500/20',
          accentColor: '#64748b',
          textColor: 'text-gray-400',
          progressBg: 'bg-gray-500/30',
          iconBg: 'bg-gray-500/20'
        };
      default:
        return {
          gradient: 'from-blue-500/20 to-cyan-500/20',
          accentColor: '#3b82f6',
          textColor: 'text-blue-400',
          progressBg: 'bg-blue-500/30',
          iconBg: 'bg-blue-500/20'
        };
    }
  };

  const styles = getStatusStyles();

  return (
    <div className={`
      relative rounded-2xl p-6 overflow-hidden group
      bg-gradient-to-br ${styles.gradient}
      border border-white/10 backdrop-blur-sm
      transition-all duration-300 hover:scale-[1.02] hover:shadow-lg
      animate-fade-in
    `}>
      {/* تأثير إشعاعي خلفي */}
      <div 
        className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 70% 20%, ${styles.accentColor}40, transparent 50%)`
        }}
      />
      
      {/* نمط خطي خلفي */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0 bg-[length:20px_20px] bg-grid-white" />
      </div>

      {/* تأثير لامع عند التحويم */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* المحتوى */}
      <div className="relative z-10">
        {/* الرأس */}
        <div className="flex items-center justify-between mb-6">
          <div className={`p-3 rounded-xl ${styles.iconBg} backdrop-blur-sm`}>
            <Icon className="w-6 h-6" style={{ color: styles.accentColor }} />
          </div>
          
          {/* مؤشر النسبة إذا كانت متوفرة */}
          {percentage !== undefined && (
            <div className={`text-lg font-bold ${styles.textColor}`}>
              {percentage}%
            </div>
          )}
        </div>

        {/* العدد والعنوان */}
        <div className="mb-4">
          <div className="text-4xl font-bold text-white mb-1">{count}</div>
          <div className={`text-sm font-medium uppercase tracking-wider ${styles.textColor}`}>
            {title}
          </div>
        </div>

        {/* شريط التقدم */}
        <div className={`w-full h-2 rounded-full ${styles.progressBg} overflow-hidden`}>
          <div 
            className="h-full rounded-full transition-all duration-1000 ease-out"
            style={{ 
              width: `${percentage || 0}%`,
              backgroundColor: styles.accentColor
            }}
          />
        </div>

        {/* التسمية التوضيحية للتقدم */}
        {percentage !== undefined && (
          <div className="flex justify-between items-center mt-2 text-xs text-white/60">
            <span>Completion</span>
            <span>{percentage}%</span>
          </div>
        )}
      </div>

      {/* تأثير تحويم لامع */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000" />
    </div>
  );
};

export default TaskSummaryCard;