<?php

namespace App\Listeners;

use App\Mail\WelcomeUser;
use Illuminate\Auth\Events\Registered;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Mail;

class SendWelcomeEmail implements ShouldQueue
{
    public function handle(Registered $event): void
    {
        Mail::to($event->user->email)->send(new WelcomeUser($event->user->name));
    }
}