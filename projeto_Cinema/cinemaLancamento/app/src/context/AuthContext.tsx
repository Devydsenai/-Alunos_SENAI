import React, { createContext, ReactNode, useContext, useState } from 'react';

type UserRole = 'cliente' | 'admin';

interface AuthContextData {
  userRole: UserRole;
  isAdmin: boolean;
  loginAsAdmin: (password: string) => boolean;
  loginAsClient: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// Senha simples para demonstração (em produção, seria no backend)
const ADMIN_PASSWORD = 'admin123';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userRole, setUserRole] = useState<UserRole>('cliente');

  const loginAsAdmin = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setUserRole('admin');
      return true;
    }
    return false;
  };

  const loginAsClient = () => {
    setUserRole('cliente');
  };

  const logout = () => {
    setUserRole('cliente');
  };

  const isAdmin = userRole === 'admin';

  return (
    <AuthContext.Provider
      value={{
        userRole,
        isAdmin,
        loginAsAdmin,
        loginAsClient,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}

