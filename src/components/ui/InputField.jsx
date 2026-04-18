import { fx } from '../../lib/futureUi';

export default function InputField({
  id,
  label,
  type = 'text',
  placeholder = '',
  autoComplete,
  inputMode,
  icon: Icon,
  registration,
  error,
  disabled = false,
  description,
  rightElement,
  variant = 'default',
}) {
  const isFx = variant === 'futuristic';
  const describedBy = [
    description ? `${id}-description` : null,
    error ? `${id}-error` : null,
  ]
    .filter(Boolean)
    .join(' ');

  const labelClass = isFx
    ? 'block text-sm font-semibold text-zinc-200'
    : 'block text-sm font-semibold text-ink-700';

  const iconClass = isFx
    ? 'pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500 transition-colors duration-200 group-focus-within:text-cyan-400'
    : 'pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400 transition-colors duration-200 group-focus-within:text-brand-500';

  const inputClass = isFx
    ? `${fx.input} py-3 text-[15px] disabled:cursor-not-allowed disabled:opacity-65 ${
        Icon ? 'pl-10' : 'pl-3.5'
      } ${rightElement ? 'pr-12' : 'pr-3.5'} ${
        error
          ? 'border-rose-500/50 focus:border-rose-400 focus:ring-rose-500/20'
          : ''
      }`
    : `w-full rounded-xl border bg-white py-3 text-[15px] text-ink-900 outline-none transition duration-200 placeholder:text-ink-400 disabled:cursor-not-allowed disabled:opacity-65 ${
        Icon ? 'pl-10' : 'pl-3.5'
      } ${rightElement ? 'pr-12' : 'pr-3.5'} ${
        error
          ? 'border-rose-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-100'
          : 'border-ink-200 group-hover:border-ink-300 focus:border-brand-500 focus:ring-4 focus:ring-brand-100'
      }`;

  return (
    <div className="space-y-2">
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>

      <div className="group relative">
        {Icon && (
          <Icon className={iconClass} aria-hidden="true" />
        )}

        <input
          id={id}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          inputMode={inputMode}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy || undefined}
          className={inputClass}
          {...registration}
        />

        {rightElement && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {rightElement}
          </div>
        )}
      </div>

      {description && (
        <p
          id={`${id}-description`}
          className={isFx ? 'text-xs text-zinc-500' : 'text-xs text-ink-500'}
        >
          {description}
        </p>
      )}

      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className={isFx ? 'text-sm text-rose-300' : 'text-sm text-rose-600'}
        >
          {error.message}
        </p>
      )}
    </div>
  );
}
