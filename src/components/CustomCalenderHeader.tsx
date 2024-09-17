import React from 'react';
import {getMonth, getYear} from 'date-fns';

interface CustomHeaderProps {
  date: Date;
  changeYear: (year: number) => void;
  changeMonth: (month: number) => void;
  decreaseMonth: () => void;
  increaseMonth: () => void;
  prevMonthButtonDisabled: boolean;
  nextMonthButtonDisabled: boolean;
}

function CustomHeader({
  date,
  changeYear,
  changeMonth,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}: CustomHeaderProps): React.ReactElement {
  const years = Array.from(
    {length: 100},
    (_, i) => getYear(new Date()) - 99 + i,
  );
  const months = [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ];

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white">
      <div className="flex items-center gap-2">
        <select
          value={getYear(date)}
          onChange={({target: {value}}) => changeYear(Number(value))}
          className="text-base font-bold text-green100 bg-transparent border-none cursor-pointer"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}년
            </option>
          ))}
        </select>
        <select
          value={getMonth(date)}
          onChange={({target: {value}}) => changeMonth(Number(value))}
          className="text-base font-bold text-green100 bg-transparent border-none cursor-pointer"
        >
          {months.map((month, index) => (
            <option key={month} value={index}>
              {month}
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-3">
        <button
          onClick={decreaseMonth}
          disabled={prevMonthButtonDisabled}
          className="bg-gray50 rounded-xl px-2 py-0 text-green100 text-sm font-bold disabled:text-gray-300"
        >
          〈
        </button>
        <button
          onClick={increaseMonth}
          disabled={nextMonthButtonDisabled}
          className="bg-gray50 rounded-xl px-2 py-0 text-green100 text-sm font-bold disabled:text-gray-300"
        >
          〉
        </button>
      </div>
    </div>
  );
}

export default CustomHeader;
