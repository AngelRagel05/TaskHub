<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;

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

Route::post('/crear-tarea', function (Request $request) {

    $tareas = json_decode(Storage::get('tareas.json'), true);

    $tareas[] = [
        'id' => count($tareas) + 1,
        'titulo' => $request->titulo,
    ];

    Storage::put('tareas.json', json_encode($tareas));

    return back(); // se queda en crear
});

// Listar Tareas

Route::get('/tasks', function () {

    $tareas = json_decode(Storage::get('tareas.json'), true);

    return Inertia::render('Tasks/Index', [
        'tareasIniciales' => $tareas,
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
