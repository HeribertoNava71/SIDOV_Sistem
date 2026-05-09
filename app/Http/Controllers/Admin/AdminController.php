<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\AdminService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function __construct(
        private AdminService $adminService
    ) {}

    public function users(Request $request): JsonResponse
    {
        $filters = $request->only(['search', 'role']);
        $users = $this->adminService->getUsers($filters);

        return response()->json([
            'data' => $users->items(),
            'current_page' => $users->currentPage(),
            'last_page' => $users->lastPage(),
            'total' => $users->total(),
        ]);
    }

    public function user(int $id): JsonResponse
    {
        $user = $this->adminService->getUserById($id);

        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        return response()->json([
            'data' => $user,
        ]);
    }

    public function updateUserRoles(Request $request, int $id): JsonResponse
    {
        $validated = $request->validate([
            'role_ids' => 'required|array',
            'role_ids.*' => 'exists:roles,id',
        ]);

        $user = $this->adminService->updateUserRoles($id, $validated['role_ids']);

        return response()->json([
            'data' => $user,
            'message' => 'Roles actualizados correctamente',
        ]);
    }

    public function roles(): JsonResponse
    {
        $roles = $this->adminService->getRoles();

        return response()->json([
            'data' => $roles,
        ]);
    }

    public function role(int $id): JsonResponse
    {
        $role = $this->adminService->getRoleById($id);

        if (!$role) {
            return response()->json(['message' => 'Rol no encontrado'], 404);
        }

        return response()->json([
            'data' => $role,
        ]);
    }

    public function createRole(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:50|unique:roles,name',
            'description' => 'nullable|string|max:255',
            'color' => 'nullable|string|max:20',
            'is_default' => 'nullable|boolean',
            'permission_ids' => 'nullable|array',
            'permission_ids.*' => 'exists:permissions,id',
        ]);

        $role = $this->adminService->createRole($validated);

        return response()->json([
            'data' => $role,
            'message' => 'Rol creado correctamente',
        ], 201);
    }

    public function updateRole(Request $request, int $id): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:50|unique:roles,name,' . $id,
            'description' => 'nullable|string|max:255',
            'color' => 'nullable|string|max:20',
            'is_default' => 'nullable|boolean',
            'permission_ids' => 'nullable|array',
            'permission_ids.*' => 'exists:permissions,id',
        ]);

        $role = $this->adminService->updateRole($id, $validated);

        return response()->json([
            'data' => $role,
            'message' => 'Rol actualizado correctamente',
        ]);
    }

    public function deleteRole(int $id): JsonResponse
    {
        $deleted = $this->adminService->deleteRole($id);

        if (!$deleted) {
            return response()->json(['message' => 'No se puede eliminar el rol por defecto'], 400);
        }

        return response()->json(['message' => 'Rol eliminado correctamente']);
    }

    public function permissions(): JsonResponse
    {
        $permissions = $this->adminService->getPermissions();

        return response()->json([
            'data' => $permissions,
            'by_module' => $this->adminService->getPermissionsByModule(),
        ]);
    }

    public function logs(Request $request): JsonResponse
    {
        $filters = $request->only(['user_id', 'action', 'module']);
        $logs = $this->adminService->getAdminLogs($filters);

        return response()->json([
            'data' => $logs->items(),
            'current_page' => $logs->currentPage(),
            'last_page' => $logs->lastPage(),
            'total' => $logs->total(),
        ]);
    }

    public function stats(): JsonResponse
    {
        $stats = $this->adminService->getStats();

        return response()->json($stats);
    }
}