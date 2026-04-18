import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Application Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="grid min-h-screen place-items-center bg-ink-50 px-4 text-center dark:bg-slate-950">
          <div className="max-w-md rounded-3xl border border-ink-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h1 className="text-2xl font-semibold text-ink-950 dark:text-white">
              Something went wrong
            </h1>
            <p className="mt-3 text-sm text-ink-600 dark:text-slate-300">
              An unexpected error occurred while rendering the application.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-5 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              Reload Application
            </button>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}