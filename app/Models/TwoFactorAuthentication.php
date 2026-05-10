<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TwoFactorAuthentication extends Model
{
    protected $fillable = [
        'user_id',
        'secret',
        'enabled',
        'enabled_at',
        'recovery_codes',
        'last_used_at',
    ];

    protected $casts = [
        'enabled' => 'boolean',
        'enabled_at' => 'datetime',
        'last_used_at' => 'datetime',
        'recovery_codes' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function isEnabled(): bool
    {
        return $this->enabled === true;
    }

    public function enable(): void
    {
        $this->update([
            'enabled' => true,
            'enabled_at' => now(),
        ]);
    }

    public function disable(): void
    {
        $this->update([
            'enabled' => false,
            'secret' => null,
            'recovery_codes' => null,
        ]);
    }

    public function generateSecret(): string
    {
        return base64_encode(random_bytes(20));
    }

    public function generateRecoveryCodes(int $count = 8): array
    {
        $codes = [];
        for ($i = 0; $i < $count; $i++) {
            $codes[] = str_pad((string) random_int(0, 999999), 6, '0', STR_PAD_LEFT);
        }
        $this->update(['recovery_codes' => $codes]);
        return $codes;
    }

    public function verifyCode(string $code): bool
    {
        $secret = $this->secret;
        if (!$secret) {
            return false;
        }

        $code = trim($code);
        $hash = $this->generateTOTPCode($secret);

        if (hash_equals($hash, $code)) {
            $this->update(['last_used_at' => now()]);
            return true;
        }

        return false;
    }

    private function generateTOTPCode(string $secret): string
    {
        $time = floor(time() / 30);
        $data = pack('J', $time);
        $key = base64_decode($secret);

        $hash = hash_hmac('sha1', $data, $key, true);
        $offset = ord($hash[strlen($hash) - 1]) & 0x0F;

        $binary = (
            ((ord($hash[$offset]) & 0x7F) << 24) |
            ((ord($hash[$offset + 1]) & 0xFF) << 16) |
            ((ord($hash[$offset + 2]) & 0xFF) << 8) |
            (ord($hash[$offset + 3]) & 0xFF)
        );

        $otp = $binary % 1000000;
        return str_pad((string) $otp, 6, '0', STR_PAD_LEFT);
    }

    public function verifyRecoveryCode(string $code): bool
    {
        $codes = $this->recovery_codes ?? [];
        $code = trim($code);

        $index = array_search($code, $codes);
        if ($index !== false) {
            unset($codes[$index]);
            $this->update(['recovery_codes' => array_values($codes)]);
            $this->update(['last_used_at' => now()]);
            return true;
        }

        return false;
    }

    public function getQRCodeUrl(string $email): string
    {
        $secret = $this->secret;
        $encoded = urlencode("otpauth://totp/Orienta.me:{$email}?secret={$secret}&issuer=Orienta.me");
        return "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data={$encoded}";
    }
}