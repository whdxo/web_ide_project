import React from 'react';

export const Modal = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded">{children}</div>
    </div>
  );
};
