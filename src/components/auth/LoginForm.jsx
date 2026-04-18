import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  AlertCircle,
  AtSign,
  CheckCircle2,
  Eye,
  EyeOff,
  LoaderCircle,
  Lock,
  Sparkles,
} from 'lucide-react';
import { brand } from '../../config/brand';
import { env } from '../../config/env';
import { loginDefaultValues, loginSchema } from '../../lib/validation';
import InputField from '../ui/InputField';
import SocialLoginButton from './SocialLoginButton';

export default function LoginForm({ onLogin, onSuccess }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [socialMessage, setSocialMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: loginDefaultValues,
    mode: 'onBlur',
  });

  const onSubmit = async (values) => {
    setSubmitError('');
    setSubmitSuccess('');
    setSocialMessage('');

    try {
      await onLogin(values);
      setSubmitSuccess('Authentication successful. Redirecting to dashboard...');
      reset({
        ...loginDefaultValues,
        email: values.rememberMe ? values.email : '',
        rememberMe: values.rememberMe,
      });
      window.setTimeout(() => onSuccess?.(), 350);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Unable to authenticate right now. Please retry.';

      setSubmitError(message);
    }
  };

  const handleGoogleClick = () => {
    setSubmitError('');
    setSubmitSuccess('');
    setSocialMessage(
      'Google sign-in is not connected yet. Keep this button only if your backend will expose an OAuth flow.',
    );
  };

  return (
    <div className="space-y-6">
      <SocialLoginButton disabled={isSubmitting} onClick={handleGoogleClick} />

      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-ink-200" aria-hidden="true" />
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-400">
          Or continue with email
        </span>
        <span className="h-px flex-1 bg-ink-200" aria-hidden="true" />
      </div>

      {socialMessage && (
        <div
          className="rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-800"
          role="status"
          aria-live="polite"
        >
          {socialMessage}
        </div>
      )}

      {submitError && (
        <div
          className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
          role="alert"
          aria-live="polite"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <p>{submitError}</p>
        </div>
      )}

      {submitSuccess && (
        <div
          className="flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
          role="status"
          aria-live="polite"
        >
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <p>{submitSuccess}</p>
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
        <InputField
          id="email"
          label="Work email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          icon={AtSign}
          registration={register('email')}
          error={errors.email}
          disabled={isSubmitting}
          description={
            env.useMockApi ? `Demo email: ${brand.demoCredentials.email}` : 'Use your real workspace email.'
          }
        />

        <InputField
          id="password"
          label="Password"
          type={isPasswordVisible ? 'text' : 'password'}
          autoComplete="current-password"
          placeholder="Enter your password"
          icon={Lock}
          registration={register('password')}
          error={errors.password}
          disabled={isSubmitting}
          description={
            env.useMockApi
              ? `Demo password: ${brand.demoCredentials.password}`
              : 'Enter your workspace password.'
          }
          rightElement={
            <button
              type="button"
              onClick={() => setIsPasswordVisible((visible) => !visible)}
              disabled={isSubmitting}
              className="inline-flex rounded-md p-1 text-ink-500 transition hover:bg-ink-100 hover:text-ink-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 disabled:cursor-not-allowed disabled:opacity-60"
              aria-label={
                isPasswordVisible ? 'Hide password value' : 'Show password value'
              }
            >
              {isPasswordVisible ? (
                <EyeOff className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Eye className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          }
        />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <label
            htmlFor="rememberMe"
            className="inline-flex cursor-pointer items-center gap-2 text-sm text-ink-600"
          >
            <input
              id="rememberMe"
              type="checkbox"
              {...register('rememberMe')}
              disabled={isSubmitting}
              className="h-4 w-4 rounded border-ink-300 text-brand-600 focus:ring-2 focus:ring-brand-400 focus:ring-offset-0 disabled:cursor-not-allowed"
            />
            <span>Remember me</span>
          </label>

          <span className="text-sm text-ink-500">Backend can wire forgot-password later.</span>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-ink-900 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-ink-900/20 transition duration-200 hover:-translate-y-0.5 hover:bg-ink-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
              Signing in...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Sign in
            </>
          )}
        </button>
      </form>
    </div>
  );
}
