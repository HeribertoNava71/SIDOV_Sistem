<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdminLog;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class UserAdminController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        AdminLog::log(auth()->id(), 'create', 'user', $user->id, null, [
            'name' => $user->name,
            'email' => $user->email,
        ]);

        return response()->json(['data' => $user, 'message' => 'Usuario creado exitosamente'], 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        $rules = [
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|max:255|unique:users,email,' . $id,
        ];

        if ($request->filled('password')) {
            $rules['password'] = ['nullable', Rules\Password::defaults()];
        }

        $validated = $request->validate($rules);

        $oldData = ['name' => $user->name, 'email' => $user->email];

        if (!empty($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }

        $user->update($validated);

        AdminLog::log(auth()->id(), 'update', 'user', $user->id, $oldData, [
            'name' => $user->name,
            'email' => $user->email,
        ]);

        return response()->json(['data' => $user->fresh(), 'message' => 'Usuario actualizado exitosamente']);
    }

    public function destroy(int $id): JsonResponse
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        if ($user->id === auth()->id()) {
            return response()->json(['message' => 'No puedes eliminar tu propia cuenta'], 422);
        }

        $snapshot = ['name' => $user->name, 'email' => $user->email];
        $user->delete();

        AdminLog::log(auth()->id(), 'delete', 'user', $user->id, $snapshot, null);

        return response()->json(['message' => 'Usuario eliminado exitosamente']);
    }
}
