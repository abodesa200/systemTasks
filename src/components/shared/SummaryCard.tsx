import React from "react";

type Variant = "todo" | "progress" | "review" | "hold" | "custom";

const VARIANT_STYLES: Record<
  Exclude<Variant, "custom">,
  {
    gradient: string;
    textColor: string;
    progressBg: string;
    iconBg: string;
  }
> = {
  todo: {
    gradient: "from-blue-500/20 to-cyan-500/20",
    textColor: "text-blue-400",
    progressBg: "bg-blue-500/30",
    iconBg: "bg-blue-500/20",
  },
  progress: {
    gradient: "from-amber-500/20 to-orange-500/20",
    textColor: "text-amber-400",
    progressBg: "bg-amber-500/30",
    iconBg: "bg-amber-500/20",
  },
  review: {
    gradient: "from-purple-500/20 to-pink-500/20",
    textColor: "text-purple-400",
    progressBg: "bg-purple-500/30",
    iconBg: "bg-purple-500/20",
  },
  hold: {
    gradient: "from-gray-500/20 to-slate-500/20",
    textColor: "text-gray-400",
    progressBg: "bg-gray-500/30",
    iconBg: "bg-gray-500/20",
  },
};

interface TaskSummaryCardProps {
  title: string;
  count: number | string;
  icon: React.ReactNode;
  variant?: Variant;
  subtitle?: string;
  customColor?: string; 
}

const SummaryCard: React.FC<TaskSummaryCardProps> = ({
  title,
  count,
  icon,
  variant = "todo",
  subtitle,
  customColor,
}) => {
  const styles =
    variant === "custom"
      ? {
          gradient: "from-slate-800/50 to-slate-900/30",
          textColor: customColor || "text-slate-300",
          progressBg: "bg-slate-700",
          iconBg: "bg-slate-700/30",
        }
      : VARIANT_STYLES[variant];

  return (
    <div
      className={`
        relative rounded-xl p-3 overflow-hidden group
        bg-gradient-to-br ${styles.gradient} 
        border border-white/10 backdrop-blur-sm
        transition-all duration-300 hover:scale-[1.02] hover:shadow-lg
        animate-fade-in
      `}
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <div className={`p-2 rounded-lg ${styles.iconBg} backdrop-blur-sm`}>
            {icon}
          </div>
        </div>

        <div className="mb-2">
          <div
            className={`text-2xl font-bold mb-0.5 ${
              customColor || "text-white"
            }`}
          >
            {count}
          </div>
          <div
            className={`text-xs font-medium uppercase tracking-wider ${
              customColor || styles.textColor
            }`}
          >
            {title}
          </div>
          {subtitle && (
            <div className="text-sm text-slate-400 mt-1">{subtitle}</div>
          )}
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000" />
    </div>
  );
};

export default SummaryCard;
