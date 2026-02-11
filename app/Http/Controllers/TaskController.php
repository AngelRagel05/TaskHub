<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index()
    {
        return Inertia::render('Welcome', [
            'tasks' => Task::orderBy('created_at', 'desc')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'prioridad' => 'required|in:baja,media,alta',
        ]);

        Task::create([
            'title' => $request->title,
            'description' => $request->description,
            'prioridad' => $request->prioridad,
            'is_completed' => false,
        ]);

        return back();
    }

    public function update(Request $request, Task $task)
    {
        $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|nullable|string',
            'is_completed' => 'sometimes|boolean',
            'prioridad' => 'sometimes|required|in:baja,media,alta',
        ]);

        $task->update($request->all());

        return back();
    }

    public function destroy(Task $task)
    {
        $task->delete();

        return back();
    }
}
