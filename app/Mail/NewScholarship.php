<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class NewScholarship extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public string $name,
        public string $title,
        public string $provider,
        public string $amount,
        public string $level,
        public ?string $deadline,
        public string $url
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Nueva beca disponible - ' . $this->title,
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.new-scholarship',
        );
    }
}