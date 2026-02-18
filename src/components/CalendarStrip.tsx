import React from 'react';
interface CalendarStripProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}
export const CalendarStrip: React.FC<CalendarStripProps> = ({
  selectedDate,
  onDateSelect
}) => {
  const getDayDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = -3; i <= 3; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };
  const formatDay = (date: Date) => {
    return date.
    toLocaleDateString('en-US', {
      weekday: 'short'
    }).
    toUpperCase();
  };
  const isSelected = (date: Date) => {
    return date.toDateString() === selectedDate.toDateString();
  };
  const isToday = (date: Date) => {
    return date.toDateString() === new Date().toDateString();
  };
  return (
    <div className="flex overflow-x-auto py-4 -mx-6 px-6 space-x-6 no-scrollbar">
      {getDayDates().map((date) =>
      <button
        key={date.toISOString()}
        onClick={() => onDateSelect(date)}
        className="flex flex-col items-center min-w-[48px]">

          <span
          className={`text-xs font-medium mb-2 ${isSelected(date) ? 'text-black' : 'text-gray-400'}`}>

            {formatDay(date)}
          </span>
          <div
          className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${isSelected(date) ? 'bg-black text-white' : isToday(date) ? 'bg-gray-100 text-black' : 'text-gray-700'}`}>

            <span className="text-lg font-medium">{date.getDate()}</span>
          </div>
        </button>
      )}
    </div>);

};