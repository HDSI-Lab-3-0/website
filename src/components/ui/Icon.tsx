import * as Icons from "lucide-react";

interface IconProps {
  icon: string;
  size?: number | string;
  className?: string;
  strokeWidth?: number;
  style?: any;
}

export function Icon({
  icon,
  size = 24,
  className = "",
  strokeWidth = 2,
  style
}: IconProps) {
  const IconComponent = (Icons as any)[icon];
  
  return (
    <IconComponent
      size={size}
      className={className}
      strokeWidth={strokeWidth}
      style={style}
    />
  );
}