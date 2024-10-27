import React, { useEffect, useState } from 'react';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(currentDate.getDate());
    const [taskCount, setTaskCount] = useState();

    const fetchData = async () => {
        const response = await fetch("http://localhost:3002/api/todos/thisWeekTask");

        const result = await response.json();
        setTaskCount(result);
    };


    useEffect(() => {
        fetchData();
    }, []);

    // Calculate the start of the week (Monday)
    const startOfWeek = new Date(currentDate);
    const dayOfWeek = startOfWeek.getDay();
    const mondayOffset = (dayOfWeek + 6) % 7; // Offset to get to Monday
    startOfWeek.setDate(currentDate.getDate() - mondayOffset);

    // Create an array of dates for the week
    const weekDates = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);
        return date;
    });

    // Format the dates for display
    const formattedDates = weekDates.map(date => date.getDate().toString().padStart(2, '0'));

    // Handle date selection
    const handleSelectDate = (date) => {
        setSelectedDate(date.getDate());
    };

    return (
        <>
            <div className="calendar">
                <div className="calendarDays">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                </div>
                <div className="calendarDates">
                    {weekDates.map((date, index) => (
                        <span
                            key={index}
                            className={selectedDate === date.getDate() ? 'activeDate' : ''}
                            onClick={() => handleSelectDate(date)}
                        >
                            {formattedDates[index]}
                        </span>
                    ))}
                </div>
            </div>
            <div className="taskSummary">
                <div className="taskCard complete">
                    <div className="icon">✅</div>
                    <div className="taskInfo">
                        <p>Task Complete</p>
                        <h2>
                            {taskCount?.data?.completedTasksCount || 0} <small>This Week</small>
                        </h2>
                    </div>
                </div>
                <div className="taskCard pending">
                    <div className="icon">❌</div>
                    <div className="taskInfo">
                        <p>Task Pending</p>
                        <h2>
                            {taskCount?.data?.notCompletedTasksCount || 0} <small>This Week</small>
                        </h2>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Calendar;
