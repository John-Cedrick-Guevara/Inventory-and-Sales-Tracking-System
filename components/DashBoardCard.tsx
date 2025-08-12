import { LucideIcon } from "lucide-react";
import React from "react";

interface DashBoardCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon; // if you're using Lucide or other SVG icon components
  color?: "blue" | "green" | "purple" | "orange";
}

const DashBoardCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  color = "blue",
}: DashBoardCardProps) => {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600 border-blue-200",
    green: "bg-green-50 text-green-600 border-green-200",
    purple: "bg-purple-50 text-purple-600 border-purple-200",
    orange: "bg-orange-50 text-orange-600 border-orange-200",
  };
  return (
    <div className="bg-white dark:bg-gray-800  dark:border-gray-600 rounded-xl shadow-sm card p-6 hover:shadow-md transition-shadow w-full max-w-xl min-w-fit border-l-blue-500 dark:border-l-blue-800 border-l-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1 dark:text-white">{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1  dark:text-gray-300">{subtitle}</p>
          )}
        </div>
        <div className={`p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600 ${colorClasses[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};

export default DashBoardCard;
