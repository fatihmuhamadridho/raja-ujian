import { useEffect, useState } from "react";
import { AuthContext, useAuth } from "./auth.context";
import { useRouter } from "next/router";
import { AuthService } from "@/services/authService/auth";

export const AuthProvider = ({ children }: { children: any }) => {
  const [initializing, setInitializing] = useState<boolean>(true);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function loadUser() {
      const token = localStorage.getItem("at");
      if (token) {
        try {
          const response = await AuthService.getPrivileges();
          if (response.status === 200) {
            setUser(response.data.data);
            setAuthenticated(true);
          }
        } catch (error: any) {
          console.error(error.stack);
          localStorage.removeItem("at");
        }
      }
      setInitializing(false);
    }

    loadUser();
  }, [setAuthenticated, setInitializing, setUser]);

  function onLogin({ user }: { user: any }) {
    setUser(user);
    setAuthenticated(true);
  }

  function onLogout(localName: string) {
    setUser(null);
    setAuthenticated(false);
    localStorage.removeItem(localName);
  }

  return (
    <AuthContext.Provider
      value={{
        initializing,
        setInitializing,
        authenticated,
        setAuthenticated,
        user,
        setUser,
        onLogin,
        onLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function withoutAuth(Component: any) {
  return function WithoutAuth(props: any) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { authenticated, initializing } = useAuth();

    useEffect(() => {
      if (
        authenticated &&
        !initializing &&
        (router.asPath === "/login" || router.asPath === "/register")
      )
        router.push("/");
      if (!authenticated && !initializing) setIsLoading(false);
    }, [authenticated, initializing, router]);

    if (isLoading) return <div>Loading...</div>;

    return <Component {...props} />;
  };
}

export function withAdminAuth(Component: any) {
  return function WithAuth(props: any) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { authenticated, initializing } = useAuth();

    useEffect(() => {
      if (!authenticated && !initializing) router.push("/admin/login");
      if (authenticated && !initializing) setIsLoading(false);
    }, [authenticated, initializing, router]);

    if (isLoading) return <div title="Loading...">Loading...</div>;

    return <Component {...props} />;
  };
}

export function withoutAdminAuth(Component: any) {
  return function WithoutAuth(props: any) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { authenticated, initializing } = useAuth();

    useEffect(() => {
      if (authenticated && !initializing) router.push("/admin");
      if (!authenticated && !initializing) setIsLoading(false);
    }, [authenticated, initializing, router]);

    if (isLoading) return <div>Loading...</div>;

    return <Component {...props} />;
  };
}
