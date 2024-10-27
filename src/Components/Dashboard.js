import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonModal from "./PopupModal";
import { TaskForm } from "./TaskForm";
import Calendar from "./Calender";

function Dashboard() {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const [taskData, setTaskData] = useState([]);
    const [filter, setFilter] = useState();

    const fetchData = async () => {
        const response = await fetch("http://localhost:3002/api/todos");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setTaskData(result);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const taskHandler = (mode) => {
        // navigate(`/task/create?${mode}`);
        setShowModal(!showModal);
    };

    const closeModalHandler = () => {
        setShowModal(false);
        fetchData();
    }

    const handleCheckboxChange = async (id, taskData) => {
        try {
            const formData = { ...taskData, isTaskCompleted: true };
            const response = await fetch(`http://localhost:3002/api/todos/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Failed to Completed the task');
            }
            fetchData();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3002/api/todos/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete the task');
            }
            fetchData();
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const handleEdit = (id) => {
        console.log(`Edit task with id: ${id}`);
    };

    const handleSearchChange = (event) => {
        setFilter(event.target.value);
    };

    const searchHandler = async () => {
        const response = await fetch(`http://localhost:3002/api/todos?searchTask=${encodeURIComponent(filter)}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTaskData(data);
    }
    return (
        <>
            <div className="dashboardContainer">
                {/* Search Bar */}
                <div className="searchBar">
                    <input type="text" placeholder="Search for a task" onChange={handleSearchChange} />
                    <button className="searchButton" onClick={searchHandler}>🔍</button>
                </div>
                <Calendar />
                {/* Weekly Progress Bar */}
                <div className="progressSection">
                    <p>Weekly Progress</p>
                    <div className="progressBar">
                        <div className="progressComplete"></div>
                        <div className="progressPending"></div>
                    </div>
                </div>

                {/* Task List Section */}
                <div className="taskListHeader">
                    <h3>Tasks Today</h3>
                    <a href="#">View All</a>
                </div>
                <ul className="taskList">
                    {taskData.map((task) => (
                        <li key={task.id}>
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => handleCheckboxChange(task.taskId, task)}
                            />
                            <span className={task?.isTaskCompleted ? 'strike' : ''}>{task.taskTitle}</span>
                            <button
                                className="deleteButton"
                                onClick={() => handleDelete(task.taskId)}
                            >
                                🗑️
                            </button>
                            <button
                                className="editButton"
                                onClick={() => handleEdit(task.taskId)}
                            >
                                ✏️
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="addTaskButton">
                    <button onClick={() => taskHandler("add")}>+</button>
                </div>
            </div>
            {showModal && <CommonModal isOpen={showModal} onClose={closeModalHandler} >
                <TaskForm onClose={closeModalHandler} />
            </CommonModal>
            }
        </>
    );
}

export default Dashboard;
