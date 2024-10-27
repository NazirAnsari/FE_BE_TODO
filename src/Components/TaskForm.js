import React, { useState } from "react";

export const TaskForm = ({ onClose }) => {
    const [taskData, setTaskData] = useState();
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:3002/api/todos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(taskData),
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const result = await response.json();
            if (onClose) {
                onClose()
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setTaskData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>ADD NEW TASK</h1>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                        <div className="sm:col-span-6">
                            <label htmlFor="taskTitle" className="block text-sm font-medium leading-6 text-gray-900">Task Title</label>
                            <div className="mt-2">
                                <input id="taskTitle" name="taskTitle" onChange={handleChange} autoComplete="off" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2" />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="startTime" className="block text-sm font-medium leading-6 text-gray-900">Start Time</label>
                            <div className="mt-2">
                                <input type="time" name="startTime" onChange={handleChange} id="startTime" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2" />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="end-time" className="block text-sm font-medium leading-6 text-gray-900">End Time</label>
                            <div className="mt-2">
                                <input type="time" name="endTime" id="endTime" onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2" />
                            </div>
                        </div>

                        <div className="sm:col-span-6">
                            <label htmlFor="startDate" className="block text-sm font-medium leading-6 text-gray-900">Set Date</label>
                            <div className="mt-2">
                                <input id="startDate" name="startDate" type="date" onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2" />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">Description</label>
                            <div className="mt-2">
                                <textarea id="description" name="description" rows="4" onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2" />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <button type="submit" className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2">
                                Add Task
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </form>
    );
};
