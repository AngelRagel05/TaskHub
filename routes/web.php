<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Memoria Temporal4

$tareas = [];

// Página Pública de Bienvenida

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Crear Tarea

Route::get('/crear-tarea', function () {
    return Inertia::render('CrearTarea');
})->name('crear-tarea');

Route::post('/crear-tarea', function (\Illuminate\Http\Request $request) use (&$tareas) {
    $nuevaTarea = [
        'id' => count($tareas) + 1,
        'titulo' => $request->titulo,
    ];
    $tareas[] = $nuevaTarea;

    // Redirige al listado después de crear
    return redirect()->route('tasks.index');
})->name('tareas.store');

// Listar Tareas

Route::get('/tasks', function () use ($tareas) {

    return Inertia::render('Tasks/Index', [
        'tareasIniciales' => $tareas
    ]);

})->name('tasks.index');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
