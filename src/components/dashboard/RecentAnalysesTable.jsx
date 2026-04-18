import { Link } from 'react-router-dom';
import { formatDateTime, formatStatusLabel } from '../../lib/formatters';

const statusStyles = {
  authentic: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  suspicious: 'bg-amber-50 text-amber-700 ring-amber-200',
  counterfeit: 'bg-rose-50 text-rose-700 ring-rose-200',
  unknown: 'bg-ink-100 text-ink-700 ring-ink-200',
};

export default function RecentAnalysesTable({ items = [] }) {
  if (!items.length) {
    return (
      <div className="px-5 py-6 text-sm text-ink-500 dark:text-slate-400">
        No analyses available yet.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="text-left text-xs uppercase tracking-[0.12em] text-ink-500 dark:text-slate-400">
            <th className="px-5 py-3 font-semibold">Analysis ID</th>
            <th className="px-5 py-3 font-semibold">Brand</th>
            <th className="px-5 py-3 font-semibold">Status</th>
            <th className="px-5 py-3 font-semibold">Confidence</th>
            <th className="px-5 py-3 font-semibold">Source</th>
            <th className="px-5 py-3 font-semibold">Scanned</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr
              key={item.id}
              className="border-t border-ink-100 text-sm text-ink-700 dark:border-slate-800 dark:text-slate-300"
            >
              <td className="px-5 py-4 font-mono text-xs text-ink-600 dark:text-slate-400">
                <Link to={`/history/${item.id}`} className="hover:text-brand-600">
                  {item.id}
                </Link>
              </td>

              <td className="px-5 py-4 font-semibold text-ink-900 dark:text-white">
                {item.brandName}
              </td>

              <td className="px-5 py-4">
                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${
                    statusStyles[item.status] || statusStyles.unknown
                  }`}
                >
                  {formatStatusLabel(item.status)}
                </span>
              </td>

              <td className="px-5 py-4 font-semibold text-ink-900 dark:text-white">
                {Math.round(item.confidence)}%
              </td>

              <td className="px-5 py-4 text-ink-500 capitalize dark:text-slate-400">
                {item.sourceType || 'user-upload'}
              </td>

              <td className="px-5 py-4 text-ink-500 dark:text-slate-400">
                {formatDateTime(item.createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
