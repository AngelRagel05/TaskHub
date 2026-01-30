import React, { useState } from "react";
import TaskItem from "../components/TaskItem";
import TaskStats from "../components/TaskStats";

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    const addTask = () => {
        if (newTask.trim().length === 0) return;

        setTasks([
            ...tasks,
            { id: Date.now(), title: newTask.trim(), completed: false },
        ]);
        setNewTask("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            addTask();
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">
                Lista de tareas pendientes
            </h1>

            <TaskStats
                total={tasks.length}
                completed={tasks.filter((t) => t.completed).length}
                progress={
                    tasks.length === 0
                        ? 0
                        : Math.round(
                              (tasks.filter((t) => t.completed).length /
                                  tasks.length) *
                                  100,
                          )
                }
            />

            <div className="flex mb-4">
                <input
                    type="text"
                    placeholder="Añadir nueva tarea"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="border p-2 flex-1 mr-2"
                />
                <button
                    onClick={addTask}
                    className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
                >
                    Añadir
                </button>
            </div>
        </div>
    );
};

export default Tasks;
