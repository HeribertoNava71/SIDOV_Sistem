<?php

namespace App\Listeners;

use App\Events\TestCompleted;
use App\Mail\TestResultNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Mail;

class SendTestResultNotification implements ShouldQueue
{
    public function handle(TestCompleted $event): void
    {
        $topDimensions = array_slice($event->topDimensions, 0, 3);
        $score = $event->result['score'] ?? 0;
        
        $careers = collect($event->topCareers)->map(function ($career) {
            if (isset($career['name'])) {
                return $career;
            }
            if (isset($career['carrera'])) {
                return [
                    'name' => $career['carrera']['nombre'] ?? 'Carrera',
                    'university' => $career['carrera']['universidad'] ?? '',
                    'match' => $career['afinidad'] ?? 0,
                ];
            }
            return ['name' => 'Carrera', 'university' => '', 'match' => 0];
        })->toArray();

        Mail::to($event->user->email)->send(new TestResultNotification(
            $event->user->name,
            $event->profileName,
            $event->profileDescription,
            $topDimensions,
            $careers,
            $score
        ));
    }
}