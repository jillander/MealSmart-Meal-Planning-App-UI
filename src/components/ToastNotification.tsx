import React from 'react';
import { CheckCircleIcon } from 'lucide-react';
interface ToastNotificationProps {
  message: string;
}
export const ToastNotification: React.FC<ToastNotificationProps> = ({
  message
}) => {
  return <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
      <div className="bg-[#1A1A1A] text-white px-4 py-3 rounded-lg shadow-lg flex items-center">
        <CheckCircleIcon size={20} className="mr-2 text-[#4CAF50]" />
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>;
};