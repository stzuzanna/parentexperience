import React from 'react';
import { useDeviceDetection } from '../../hooks/useDeviceDetection';

interface DemoHeaderProps {
  showFrame: boolean;
}

export const DemoHeader: React.FC<DemoHeaderProps> = ({ showFrame }) => {
  const { isMobile, isTouch } = useDeviceDetection();
  
  // Hide on mobile/touch devices; show on desktop regardless of frame
  if (isMobile || isTouch) return null;

  return (
    <div className="bg-white border-b border-gray-200 p-4 text-center">
      <h1 className="text-lg font-semibold text-gray-800">Famly Parent Experience Demo</h1>
      <p className="text-sm text-gray-600 mt-1">Experience what parents see in the Famly app</p>
    </div>
  );
};