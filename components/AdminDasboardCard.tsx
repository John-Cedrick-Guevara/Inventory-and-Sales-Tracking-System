import React from "react";
import { LucideIcon } from "lucide-react";

interface CardProps {
  title: string;
  subData: string;
  data: string | number;
  icon: LucideIcon;
  className?: string;
}

const DashBoardCard: React.FC<CardProps> = ({
  title,
  subData,
  data,
  icon: Icon,
  className = "",
}) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow duration-200 ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        
        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
          <p className="text-xs text-gray-500">{subData}</p>
        </div>
        {/* icon */}
        <div className="p-2 bg-blue-50 rounded-lg">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
      </div>

      <div className="text-2xl font-bold text-gray-900">{data}</div>
    </div>
  );
};

export default DashBoardCard;
