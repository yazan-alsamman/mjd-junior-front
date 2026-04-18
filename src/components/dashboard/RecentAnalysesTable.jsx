import { Link } from 'react-router-dom';
import { formatDateTime, formatStatusLabel } from '../../lib/formatters';
import { fx, fxStatusBadge } from '../../lib/futureUi';

export default function RecentAnalysesTable({ items = [] }) {
  if (!items.length) {
    return <div className="px-5 py-6 text-sm text-zinc-500">No analyses available yet.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-white/[0.08]">
            <th className={`px-5 py-3 font-semibold ${fx.tableHead}`}>Analysis ID</th>
            <th className={`px-5 py-3 font-semibold ${fx.tableHead}`}>Brand</th>
            <th className={`px-5 py-3 font-semibold ${fx.tableHead}`}>Status</th>
            <th className={`px-5 py-3 font-semibold ${fx.tableHead}`}>Confidence</th>
            <th className={`px-5 py-3 font-semibold ${fx.tableHead}`}>Source</th>
            <th className={`px-5 py-3 font-semibold ${fx.tableHead}`}>Scanned</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item.id} className={fx.tableRow}>
              <td className="px-5 py-4 font-mono text-xs text-zinc-500">
                <Link to={`/history/${item.id}`} className="text-cyan-300/90 hover:text-cyan-200">
                  {item.id}
                </Link>
              </td>

              <td className="px-5 py-4 font-semibold text-white">{item.brandName}</td>

              <td className="px-5 py-4">
                <span className={fxStatusBadge(item.status)}>{formatStatusLabel(item.status)}</span>
              </td>

              <td className="px-5 py-4 font-semibold text-white">{Math.round(item.confidence)}%</td>

              <td className="px-5 py-4 capitalize text-zinc-500">{item.sourceType || 'user-upload'}</td>

              <td className="px-5 py-4 text-zinc-500">{formatDateTime(item.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
