'use client';

import React from 'react';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';

const GlobalProgress: React.FC = () => {
  const fetching = useIsFetching();
  const mutating = useIsMutating();
  const active = fetching > 0 || mutating > 0;

  return (
    <div
      className={`pointer-events-none fixed left-0 right-0 top-0 z-[9998] transition-opacity duration-300 ${
        active ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="h-1 w-full animate-pulse bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600" />
    </div>
  );
};

export default GlobalProgress;
