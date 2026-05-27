<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use PragmaRX\Google2FA\Google2FA;

class TwoFactorAuthentication extends Model
{
    protected $fillable = [
        'user_id',
        'secret',
        'enabled',
        'enabled_at',
        'recovery_codes',
        'recovery_codes_hash',
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
            'recovery_codes_hash' => null,
        ]);
    }

    public function generateSecret(): string
    {
        $google2fa = new Google2FA();
        return $google2fa->generateSecretKey(32);
    }

    public function generateRecoveryCodes(int $count = 8): array
    {
        $codes = [];
        $hashedCodes = [];
        
        for ($i = 0; $i < $count; $i++) {
            $code = str_pad((string) random_int(0, 999999), 6, '0', STR_PAD_LEFT);
            $codes[] = $code;
            $hashedCodes[] = hash('sha256', $code);
        }
        
        $this->update([
            'recovery_codes' => $codes,
            'recovery_codes_hash' => $hashedCodes,
        ]);
        
        return $codes;
    }

    public function verifyCode(string $code): bool
    {
        $secret = $this->secret;
        if (!$secret) {
            return false;
        }

        $code = trim($code);
        $google2fa = new Google2FA();
        
        $valid = $google2fa->verifyKey($secret, $code);
        
        if ($valid) {
            $this->update(['last_used_at' => now()]);
            return true;
        }

        return false;
    }

    public function verifyRecoveryCode(string $code): bool
    {
        $hashedCodes = $this->recovery_codes_hash ?? [];
        $codes = $this->recovery_codes ?? [];
        $code = trim($code);
        $codeHash = hash('sha256', $code);

        $index = array_search($codeHash, $hashedCodes);
        if ($index !== false) {
            unset($hashedCodes[$index]);
            unset($codes[$index]);
            
            $this->update([
                'recovery_codes' => array_values($codes),
                'recovery_codes_hash' => array_values($hashedCodes),
            ]);
            $this->update(['last_used_at' => now()]);
            return true;
        }

        return false;
    }

    public function getQRCodeUrl(string $email): string
    {
        $google2fa = new Google2FA();
        $secret = $this->secret;
        
        return $google2fa->getQRCodeUrl(
            'Orienta.me',
            $email,
            $secret
        );
    }

    public function getSecretKey(): string
    {
        return $this->secret;
    }
}