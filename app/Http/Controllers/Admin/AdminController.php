<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use App\Services\Admin\AdminService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public const ADMIN_GRANT_CONFIRMATION = 'AGREGAR_ADMIN';
    public const ADMIN_REVOKE_CONFIRMATION = 'QUITAR_ADMIN';

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
            'confirmation' => 'nullable|string',
        ]);

        $targetUser = User::with('roles')->find($id);
        if (!$targetUser) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        $newRoleIds = array_map('intval', $validated['role_ids']);
        $oldRoleIds = $targetUser->roles->pluck('id')->map(fn ($v) => (int) $v)->all();

        $adminRole = Role::where('name', 'admin')->first();
        if ($adminRole === null) {
            return response()->json(['message' => 'Rol admin no existe en el sistema'], 500);
        }

        $isGrantingAdmin = in_array($adminRole->id, $newRoleIds, true)
            && !in_array($adminRole->id, $oldRoleIds, true);

        $isRevokingAdmin = in_array($adminRole->id, $oldRoleIds, true)
            && !in_array($adminRole->id, $newRoleIds, true);

        $confirmation = $validated['confirmation'] ?? null;

        if ($isGrantingAdmin && $confirmation !== self::ADMIN_GRANT_CONFIRMATION) {
            return response()->json([
                'message' => 'Otorgar privilegios de administrador requiere confirmación explícita.',
                'requires_confirmation' => 'admin_grant',
                'expected_token' => self::ADMIN_GRANT_CONFIRMATION,
            ], 422);
        }

        if ($isRevokingAdmin) {
            if ($confirmation !== self::ADMIN_REVOKE_CONFIRMATION) {
                return response()->json([
                    'message' => 'Quitar privilegios de administrador requiere confirmación explícita.',
                    'requires_confirmation' => 'admin_revoke',
                    'expected_token' => self::ADMIN_REVOKE_CONFIRMATION,
                ], 422);
            }

            $adminCount = User::whereHas('roles', fn ($q) => $q->where('roles.id', $adminRole->id))->count();
            if ($adminCount <= 1) {
                return response()->json([
                    'message' => 'No se puede quitar el rol admin: es el último administrador del sistema.',
                ], 422);
            }

            if ($targetUser->id === auth()->id()) {
                return response()->json([
                    'message' => 'No puedes quitarte el rol admin a ti mismo. Pide a otro administrador hacerlo.',
                ], 422);
            }
        }

        $user = $this->adminService->updateUserRoles($id, $newRoleIds);

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