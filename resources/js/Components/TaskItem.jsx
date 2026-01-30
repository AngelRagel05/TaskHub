import React, { useState } from "react";

const TaskItem = ({ task, onToggleComplete, onUpdateTitle }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);

    const handleBlur = () => {
        if (title.trim() === "") {
            setTitle(task.title);
        } else {
            onUpdateTitle(task.id, title);
        }
        setIsEditing(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleBlur();
        }
    };

    return (
        <div className="flex items-center mb-2">
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggleComplete(task.id)}
                className="mr-2"
            />
            {isEditing ? (
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    className="border p-1 flex-1"
                    autoFocus
                />
            ) : (
                <p
                    onClick={() => setIsEditing(true)}
                    className={`flex-1 ${task.completed ? "line-through text-gray-500" : ""}`}
                >
                    {task.title}
                </p>
            )}
        </div>
    );
};

export default TaskItem;
