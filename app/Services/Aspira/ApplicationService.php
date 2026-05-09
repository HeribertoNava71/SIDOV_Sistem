<?php

namespace App\Services\Aspira;

use App\Models\Application;
use App\Models\Scholarship;
use Illuminate\Database\Eloquent\Collection;

class ApplicationService
{
    public function apply(int $userId, int $scholarshipId, array $notes = []): Application
    {
        $existing = Application::where('user_id', $userId)
            ->where('scholarship_id', $scholarshipId)
            ->first();

        if ($existing) {
            return $existing;
        }

        return Application::create([
            'user_id' => $userId,
            'scholarship_id' => $scholarshipId,
            'status' => 'pending',
            'notes' => $notes['notes'] ?? null,
            'submitted_at' => now(),
        ]);
    }

    public function getUserApplications(int $userId): Collection
    {
        return Application::where('user_id', $userId)
            ->with('scholarship')
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function getUserPendingApplications(int $userId): Collection
    {
        return Application::where('user_id', $userId)
            ->pending()
            ->with('scholarship')
            ->get();
    }

    public function getUserApprovedApplications(int $userId): Collection
    {
        return Application::where('user_id', $userId)
            ->approved()
            ->with('scholarship')
            ->get();
    }

    public function getApplication(int $id): ?Application
    {
        return Application::with(['scholarship', 'user'])->find($id);
    }

    public function updateStatus(int $id, string $status, ?string $adminNotes = null): Application
    {
        $application = Application::findOrFail($id);

        $application->update([
            'status' => $status,
            'admin_notes' => $adminNotes,
            'reviewed_at' => now(),
        ]);

        return $application->fresh();
    }

    public function getStats(int $userId): array
    {
        $applications = Application::where('user_id', $userId)->get();

        return [
            'total' => $applications->count(),
            'pending' => $applications->where('status', 'pending')->count(),
            'under_review' => $applications->where('status', 'under_review')->count(),
            'approved' => $applications->where('status', 'approved')->count(),
            'rejected' => $applications->where('status', 'rejected')->count(),
            'waitlisted' => $applications->where('status', 'waitlisted')->count(),
        ];
    }

    public function cancelApplication(int $id): bool
    {
        $application = Application::findOrFail($id);

        if ($application->status !== 'pending') {
            return false;
        }

        return $application->delete();
    }

    public function hasUserApplied(int $userId, int $scholarshipId): bool
    {
        return Application::where('user_id', $userId)
            ->where('scholarship_id', $scholarshipId)
            ->exists();
    }
}