import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PermissionContextProps {
  permissions: string[];
  setPermissions: (permissions: string[]) => void;
}

const PermissionContext = createContext<PermissionContextProps | undefined>(undefined);

export const PermissionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [permissions, setPermissions] = useState<string[]>([]);

  return (
    <PermissionContext.Provider value={{ permissions, setPermissions }}>
      {children}
    </PermissionContext.Provider>
  );
};

export const usePermission = (): PermissionContextProps => {
  const context = useContext(PermissionContext);
  if (!context) {
    throw new Error('usePermission must be used within a PermissionProvider');
  }
  return context;
};
