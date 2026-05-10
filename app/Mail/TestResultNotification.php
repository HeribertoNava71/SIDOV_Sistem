<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class TestResultNotification extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public string $name,
        public string $profileName,
        public string $profileDescription,
        public array $topDimensions,
        public array $topCareers,
        public int $score
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: '¡Tus resultados del test vocacional están listos!',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.test-result',
        );
    }
}