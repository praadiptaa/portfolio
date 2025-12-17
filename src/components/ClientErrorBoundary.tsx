"use client";
import React from "react";

type State = { hasError: boolean; error?: Error };

export default class ClientErrorBoundary extends React.Component<React.PropsWithChildren<{}>, State> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: any) {
    console.error('ClientErrorBoundary caught error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full min-h-screen flex items-center justify-center bg-background text-foreground">
          <div className="max-w-md text-center p-6">
            <h2 className="text-xl font-bold mb-3">Application error</h2>
            <p className="mb-3 text-sm">A client-side exception occurred. Check the console for details.</p>
            <pre className="text-xs text-left bg-zinc-900 p-3 rounded text-red-400">{String(this.state.error)}</pre>
          </div>
        </div>
      );
    }
    return this.props.children as React.ReactElement;
  }
}
