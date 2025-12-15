'use client';

import React from 'react';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import { Spin } from 'antd';

const GlobalBlockingOverlay: React.FC = () => {
  const fetching = useIsFetching();
  const mutating = useIsMutating();
  const active = fetching > 0 || mutating > 0;

  // Trì hoãn để tránh nháy overlay cho request rất nhanh
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    let timer: number | undefined;
    if (active) {
      timer = window.setTimeout(() => setVisible(true), 200);
    } else {
      setVisible(false);
    }
    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, [active]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9997] flex items-center justify-center bg-black/25 backdrop-blur-sm">
      <div className="flex items-center gap-3 rounded-lg bg-white px-5 py-4 shadow">
        <Spin />
        <span className="text-sm text-gray-700">Đang xử lý, vui lòng chờ...</span>
      </div>
    </div>
  );
};

export default GlobalBlockingOverlay;
