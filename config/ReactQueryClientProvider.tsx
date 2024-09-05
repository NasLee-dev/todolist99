'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

interface ReactQueryClientProviderProps {
  children: React.ReactNode;
}

export const queryClient = new QueryClient({});

export default function ReactQueryClientProvider({ children }: ReactQueryClientProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
