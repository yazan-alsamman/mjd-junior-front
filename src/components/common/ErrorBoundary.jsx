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
        <main className="dark relative grid min-h-screen place-items-center overflow-x-hidden bg-[#030308] px-4 text-center">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,80,255,0.25),transparent)]" />
          <div className="relative max-w-md rounded-3xl border border-white/[0.1] bg-black/50 p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset] backdrop-blur-xl">
            <h1 className="font-syne text-2xl font-bold text-white">Something went wrong</h1>
            <p className="mt-3 text-sm text-zinc-400">
              An unexpected error occurred while rendering the application.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-6 w-full rounded-xl bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-cyan-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_0_32px_-8px_rgba(168,85,247,0.5)] transition hover:brightness-110"
            >
              Reload application
            </button>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}
