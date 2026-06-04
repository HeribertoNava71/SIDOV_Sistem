interface AdminPaginationProps {
    currentPage: number;
    lastPage: number;
    total: number;
    label?: string;
    onPageChange: (page: number) => void;
}

export default function AdminPagination({
    currentPage,
    lastPage,
    total,
    label = 'registros en total',
    onPageChange,
}: AdminPaginationProps) {
    if (lastPage <= 1) return null;

    const pages = Array.from({ length: lastPage }, (_, i) => i + 1);
    const visiblePages = pages.filter(
        p => p === 1 || p === lastPage || Math.abs(p - currentPage) <= 2
    );

    return (
        <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
            <span>
                {total} {label}
            </span>
            <div className="flex gap-1 flex-wrap">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 disabled:opacity-40 hover:bg-slate-50 transition-colors"
                    aria-label="Página anterior"
                >
                    ‹ Anterior
                </button>
                {visiblePages.map((p, idx) => {
                    const prev = visiblePages[idx - 1];
                    const showEllipsis = prev !== undefined && p - prev > 1;
                    return (
                        <span key={p} className="flex items-center gap-1">
                            {showEllipsis && (
                                <span className="px-2 py-1.5 text-slate-400">…</span>
                            )}
                            <button
                                onClick={() => onPageChange(p)}
                                aria-current={p === currentPage ? 'page' : undefined}
                                className={`px-3 py-1.5 rounded-lg border transition-colors ${
                                    p === currentPage
                                        ? 'bg-violet-600 text-white border-violet-600'
                                        : 'border-slate-300 hover:bg-slate-50'
                                }`}
                            >
                                {p}
                            </button>
                        </span>
                    );
                })}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === lastPage}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 disabled:opacity-40 hover:bg-slate-50 transition-colors"
                    aria-label="Página siguiente"
                >
                    Siguiente ›
                </button>
            </div>
        </div>
    );
}
