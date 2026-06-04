import { useMemo, useState } from 'react';

interface Role {
    id: number;
    name: string;
    description?: string | null;
    color?: string | null;
}

interface UserLite {
    id: number;
    name: string;
    email: string;
    roles?: { id: number; name: string }[];
}

interface Props {
    user: UserLite;
    allRoles: Role[];
    currentUserId: number;
    onClose: () => void;
    onSuccess: (message?: string) => void;
}

const ADMIN_GRANT_TOKEN = 'AGREGAR_ADMIN';
const ADMIN_REVOKE_TOKEN = 'QUITAR_ADMIN';

export default function RolesModal({ user, allRoles, currentUserId, onClose, onSuccess }: Props) {
    const adminRole = useMemo(() => allRoles.find(r => r.name === 'admin') ?? null, [allRoles]);
    const initialRoleIds = useMemo(
        () => (user.roles ?? []).map(r => r.id),
        [user.roles]
    );

    const [selectedIds, setSelectedIds] = useState<number[]>(initialRoleIds);
    const [confirmation, setConfirmation] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);

    const isGrantingAdmin = adminRole !== null
        && selectedIds.includes(adminRole.id)
        && !initialRoleIds.includes(adminRole.id);

    const isRevokingAdmin = adminRole !== null
        && initialRoleIds.includes(adminRole.id)
        && !selectedIds.includes(adminRole.id);

    const requiresConfirmation = isGrantingAdmin || isRevokingAdmin;
    const expectedToken = isGrantingAdmin ? ADMIN_GRANT_TOKEN : ADMIN_REVOKE_TOKEN;

    const isSelfTarget = user.id === currentUserId;
    const blockSelfDemote = isRevokingAdmin && isSelfTarget;

    const toggle = (id: number): void => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
        );
    };

    const handleSave = async (): Promise<void> => {
        setError(null);

        if (blockSelfDemote) {
            setError('No puedes quitarte el rol admin a ti mismo.');
            return;
        }

        if (requiresConfirmation && confirmation !== expectedToken) {
            setError(`Escribe exactamente "${expectedToken}" para confirmar.`);
            return;
        }

        setSaving(true);
        try {
            const csrfToken = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content ?? '';
            const res = await fetch(`/api/admin/users/${user.id}/roles`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
                credentials: 'include',
                body: JSON.stringify({
                    role_ids: selectedIds,
                    confirmation: requiresConfirmation ? confirmation : undefined,
                }),
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                setError(data.message ?? 'Error al actualizar roles');
                setSaving(false);
                return;
            }

            onSuccess(data.message ?? 'Roles actualizados');
            onClose();
        } catch {
            setError('Error de conexión');
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-200 p-6">
                    <div>
                        <h3 className="text-xl font-bold text-slate-900">Roles de {user.name}</h3>
                        <p className="text-sm text-slate-500">{user.email}</p>
                    </div>
                    <button
                        onClick={onClose}
                        aria-label="Cerrar"
                        className="rounded-lg p-2 hover:bg-slate-100"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="space-y-4 p-6">
                    {error && (
                        <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600" role="alert">
                            {error}
                        </p>
                    )}

                    <div className="space-y-2">
                        {allRoles.map(role => {
                            const checked = selectedIds.includes(role.id);
                            const isAdmin = role.name === 'admin';
                            return (
                                <label
                                    key={role.id}
                                    className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition-colors ${
                                        checked
                                            ? isAdmin
                                                ? 'border-red-300 bg-red-50'
                                                : 'border-[#46178F] bg-[#46178F]/5'
                                            : 'border-slate-200 hover:bg-slate-50'
                                    }`}
                                >
                                    <input
                                        type="checkbox"
                                        checked={checked}
                                        onChange={() => toggle(role.id)}
                                        className="mt-1 h-4 w-4 rounded border-slate-300 text-[#46178F] focus:ring-[#46178F]"
                                    />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium capitalize text-slate-900">{role.name}</span>
                                            {isAdmin && (
                                                <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-700">
                                                    Privilegios totales
                                                </span>
                                            )}
                                        </div>
                                        {role.description && (
                                            <p className="text-xs text-slate-500">{role.description}</p>
                                        )}
                                    </div>
                                </label>
                            );
                        })}
                    </div>

                    {requiresConfirmation && !blockSelfDemote && (
                        <div className="rounded-xl border-2 border-red-300 bg-red-50 p-4">
                            <div className="mb-2 flex items-start gap-2">
                                <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <p className="text-sm font-semibold text-red-800">
                                    {isGrantingAdmin
                                        ? 'Estás a punto de otorgar privilegios totales de administrador.'
                                        : 'Estás a punto de revocar privilegios de administrador.'}
                                </p>
                            </div>
                            <p className="mb-3 text-xs text-red-700">
                                Esta acción se registra en los logs de auditoría. Para confirmar, escribe literalmente
                                {' '}
                                <code className="rounded bg-red-100 px-1.5 py-0.5 font-mono text-red-900">{expectedToken}</code>
                                {' '}en el campo siguiente.
                            </p>
                            <input
                                type="text"
                                value={confirmation}
                                onChange={e => setConfirmation(e.target.value)}
                                placeholder={expectedToken}
                                autoComplete="off"
                                className="w-full rounded-lg border border-red-300 px-3 py-2 font-mono text-sm focus:border-red-500 focus:ring-2 focus:ring-red-500"
                            />
                        </div>
                    )}

                    {blockSelfDemote && (
                        <div className="rounded-xl border-2 border-amber-300 bg-amber-50 p-4 text-sm text-amber-800">
                            No puedes quitarte el rol admin a ti mismo. Pide a otro administrador hacerlo.
                        </div>
                    )}

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 rounded-xl border border-slate-300 px-4 py-2.5 font-medium text-slate-700 hover:bg-slate-50"
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            onClick={handleSave}
                            disabled={saving || blockSelfDemote}
                            className="flex-1 rounded-xl bg-[#46178F] px-4 py-2.5 font-medium text-white hover:bg-[#3a156f] disabled:opacity-50"
                        >
                            {saving ? 'Guardando...' : 'Guardar roles'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
