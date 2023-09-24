import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useState } from "react";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const getCurrentDate = () => {
  const currentDate = new Date();
  const month = currentDate.getMonth();
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();

  return { month, day, year };
}




const MyCalendar = () => {
  //Create a calendar component that will be used in the calendar page
  return( 
  <div>
    <CalendarHeader/>
    {/* <CalendarBodyMonthView/> */}
  </div>)

};

interface DayCellProps {
  day:number;
  selectedDate:Date;
}

const DayCell:React.FC<DayCellProps> = ({day,selectedDate}) => {
  return (
    <div tabIndex={0}>
      <div className="border border-blue-200 relative">
        <div className="absolute top-0 left-0 w-full h-full bg-blue-200 opacity-50"></div>
        <div className="relative z-10 p-2">
          <div className="text-sm text-gray-900">{day}</div>
        </div>
      </div>
    </div>
  );
};

const CalendarHeader = () => {
  const {month, day, year} = getCurrentDate();

 
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="text-2xl font-bold">{months[month]} {day} {year}</div>
        <div className="flex gap-x-2">
          <button className="bg-green-200 p-2 rounded-full">
            <ArrowLeft />
          </button>
          <button className="bg-green-200 p-2 rounded-full">
            <ArrowRight />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.map((day,idx) => (
          <div key={idx} className="text-center text-xs text-gray-500">{day}</div>
        ))}
      </div>
    </div>
  );
}

// const CalendarBodyMonthView = () => {
//    //create a function that returns the number of days in the month
//    const [selectedDate, setSelectedDate] = useState(getCurrentDate());
//    const getdaysInMonth = (month:number, year:number) => {
//     return new Date(year, month, 0).getDate();
//   }

//   //create an array of days in the month
//   const daysInMonth = getdaysInMonth(getCurrentDate().month, getCurrentDate().year);
//   const monthDays = Array.from(Array(daysInMonth).keys());
//   return (
//     <div>
//       <div className="grid grid-cols-7 gap-2">
//         {monthDays.map((day,idx) => (
//           <DayCell day={day} key={idx} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default MyCalendar;
