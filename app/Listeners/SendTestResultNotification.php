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

        Mail::to($event->user->email)->send(new TestResultNotification(
            name: $event->user->name,
            profileName: $event->profileName,
            profileDescription: $event->profileDescription,
            topDimensions: $topDimensions,
            topCareers: $event->topCareers,
            score: $score
        ));
    }
}