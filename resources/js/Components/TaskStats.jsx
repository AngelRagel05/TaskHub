import React from "react";

const TaskStats = ({ total, completed, progress }) => {
    return (
        <div className="flex justify-between mb-4 p-2 bg-gray-100 rounded shadow">
            <div className="text-center">
                <p className="font-bold">Total</p>
                <p>{total}</p>
            </div>
            <div className="text-center">
                <p className="font-bold">Completadas</p>
                <p>{completed}</p>
            </div>
            <div className="text-center">
                <p className="font-bold">Progreso</p>
                <p>{progress}%</p>
            </div>
        </div>
    );
};

export default TaskStats;
