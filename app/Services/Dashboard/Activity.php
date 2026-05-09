<?php

namespace App\Services\Dashboard;

use DateTimeInterface;

class Activity
{
    public function __construct(
        public readonly int $id,
        public readonly string $action,
        public readonly string $description,
        public readonly string $icon,
        public readonly string $color,
        public readonly DateTimeInterface $timestamp,
    ) {}

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'action' => $this->action,
            'description' => $this->description,
            'icon' => $this->icon,
            'color' => $this->color,
            'timestamp' => $this->timestamp->format('Y-m-d H:i:s'),
            'timeAgo' => $this->timeAgo(),
        ];
    }

    private function timeAgo(): string
    {
        $diff = time() - $this->timestamp->getTimestamp();

        if ($diff < 60) {
            return 'Hace un momento';
        } elseif ($diff < 3600) {
            $minutes = floor($diff / 60);
            return "Hace {$minutes} minuto" . ($minutes > 1 ? 's' : '');
        } elseif ($diff < 86400) {
            $hours = floor($diff / 3600);
            return "Hace {$hours} hora" . ($hours > 1 ? 's' : '');
        } elseif ($diff < 604800) {
            $days = floor($diff / 86400);
            return "Hace {$days} día" . ($days > 1 ? 's' : '');
        }

        return $this->timestamp->format('d/m/Y');
    }
}