<?php

namespace App\Providers;

use App\Events\TestCompleted;
use App\Listeners\SendTestResultNotification;
use App\Listeners\SendWelcomeEmail;
use Illuminate\Auth\Events\Registered;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    protected $listen = [
        Registered::class => [
            \Illuminate\Auth\Listeners\SendEmailVerificationNotification::class,
            SendWelcomeEmail::class,
        ],
        TestCompleted::class => [
            SendTestResultNotification::class,
        ],
    ];

    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        parent::boot();
    }
}