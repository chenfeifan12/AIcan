interface ProgressBarProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  color?: 'accent' | 'success' | 'primary';
  showLabel?: boolean;
  animated?: boolean;
}

export default function ProgressBar({
  value,
  max = 100,
  size = 'md',
  color = 'accent',
  showLabel = false,
  animated = true
}: ProgressBarProps) {
  const percent = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4'
  };

  const colorClasses = {
    accent: 'bg-gradient-to-r from-accent to-accent-light',
    success: 'bg-gradient-to-r from-success to-emerald-400',
    primary: 'bg-gradient-to-r from-primary to-primary-light'
  };

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between mb-1">
          <span className="text-sm text-gray-600 dark:text-gray-400">{value}/{max}</span>
          <span className="text-sm font-medium text-accent">{Math.round(percent)}%</span>
        </div>
      )}
      <div className={`w-full ${sizeClasses[size]} bg-gray-200 dark:bg-primary-light rounded-full overflow-hidden`}>
        <div
          className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full transition-all duration-500 ${
            animated ? '' : 'transition-none'
          }`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
