<?php

namespace App\Services\Admin;

use App\Models\User;
use App\Models\Role;
use App\Models\Permission;
use App\Models\AdminLog;
use Illuminate\Support\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class AdminService
{
    public function getUsers(array $filters = []): LengthAwarePaginator
    {
        $query = User::query()->with('roles');

        if (isset($filters['search']) && $filters['search']) {
            $query->where(function ($q) use ($filters) {
                $q->where('name', 'like', "%{$filters['search']}%")
                    ->orWhere('email', 'like', "%{$filters['search']}%");
            });
        }

        if (isset($filters['role']) && $filters['role']) {
            $query->whereHas('roles', function ($q) use ($filters) {
                $q->where('roles.id', $filters['role']);
            });
        }

        return $query->orderBy('created_at', 'desc')->paginate(15);
    }

    public function getUserById(int $id): ?User
    {
        return User::with('roles', 'roles.permissions')->find($id);
    }

    public function updateUserRoles(int $userId, array $roleIds): User
    {
        $user = User::findOrFail($userId);
        $oldRoles = $user->roles()->pluck('roles.id')->toArray();

        $user->roles()->sync($roleIds);

        AdminLog::log(
            auth()->id(),
            'update_user_roles',
            'users',
            $userId,
            ['role_ids' => $oldRoles],
            ['role_ids' => $roleIds]
        );

        return $user->fresh('roles');
    }

    public function getRoles(): Collection
    {
        return Role::with('permissions')->get();
    }

    public function getRoleById(int $id): ?Role
    {
        return Role::with('permissions')->find($id);
    }

    public function createRole(array $data): Role
    {
        $role = Role::create([
            'name' => $data['name'],
            'description' => $data['description'] ?? null,
            'color' => $data['color'] ?? '#6366f1',
            'is_default' => $data['is_default'] ?? false,
        ]);

        if (isset($data['permission_ids'])) {
            $role->permissions()->sync($data['permission_ids']);
        }

        AdminLog::log(
            auth()->id(),
            'create_role',
            'roles',
            $role->id,
            null,
            $role->toArray()
        );

        return $role;
    }

    public function updateRole(int $id, array $data): Role
    {
        $role = Role::findOrFail($id);
        $oldData = $role->toArray();

        $role->update([
            'name' => $data['name'],
            'description' => $data['description'] ?? $role->description,
            'color' => $data['color'] ?? $role->color,
            'is_default' => $data['is_default'] ?? $role->is_default,
        ]);

        if (isset($data['permission_ids'])) {
            $role->permissions()->sync($data['permission_ids']);
        }

        AdminLog::log(
            auth()->id(),
            'update_role',
            'roles',
            $role->id,
            $oldData,
            $role->fresh()->toArray()
        );

        return $role->fresh('permissions');
    }

    public function deleteRole(int $id): bool
    {
        $role = Role::findOrFail($id);

        if ($role->is_default) {
            return false;
        }

        $role->delete();

        AdminLog::log(
            auth()->id(),
            'delete_role',
            'roles',
            $id,
            $role->toArray(),
            null
        );

        return true;
    }

    public function getPermissions(): Collection
    {
        return Permission::orderBy('module')->orderBy('name')->get();
    }

    public function getPermissionsByModule(): array
    {
        $permissions = $this->getPermissions();

        return $permissions->groupBy('module')->toArray();
    }

    public function getAdminLogs(array $filters = []): LengthAwarePaginator
    {
        $query = AdminLog::query()->with('user');

        if (isset($filters['user_id']) && $filters['user_id']) {
            $query->where('user_id', $filters['user_id']);
        }

        if (isset($filters['action']) && $filters['action']) {
            $query->where('action', $filters['action']);
        }

        if (isset($filters['module']) && $filters['module']) {
            $query->where('module', $filters['module']);
        }

        return $query->orderBy('created_at', 'desc')->paginate(20);
    }

    public function getStats(): array
    {
        return [
            'total_users' => User::count(),
            'total_roles' => Role::count(),
            'total_permissions' => Permission::count(),
            'recent_logs' => AdminLog::count(),
        ];
    }
}