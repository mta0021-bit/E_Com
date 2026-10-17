"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "@/lib/types";

const AUTH_KEY = "auth_v1";
const USERS_KEY = "users_v1";

type AuthContextType = {
  user: User | null;
  users: User[];
  login: (email: string, password: string) => { ok: boolean; error?: string };
  register: (name: string, email: string, password: string) => {
    ok: boolean;
    error?: string;
  };
  logout: () => void;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let isMounted = true;
    try {
      const storedUser = localStorage.getItem(AUTH_KEY);
      const parsedUser = storedUser ? (JSON.parse(storedUser) as User) : null;
      const storedUsers = localStorage.getItem(USERS_KEY);
      if (storedUsers) {
        const parsedUsers = JSON.parse(storedUsers) as User[];
        if (isMounted) {
          setUsers(parsedUsers);
        }
        if (isMounted && parsedUser) {
          setUser(parsedUser);
        }
      } else {
        const seedAdmin: User = {
          id: "admin1",
          name: "Admin",
          email: "admin@grocery.local",
          role: "admin",
        };
        if (isMounted) {
          setUsers([seedAdmin]);
        }
        if (isMounted && parsedUser) {
          setUser(parsedUser);
        }
        localStorage.setItem(USERS_KEY, JSON.stringify([seedAdmin]));
      }
    } catch {
      const seedAdmin: User = {
        id: "admin1",
        name: "Admin",
        email: "admin@grocery.local",
        role: "admin",
      };
      if (isMounted) {
        setUsers([seedAdmin]);
        setUser(null);
      }
    }
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (user) localStorage.setItem(AUTH_KEY, JSON.stringify(user));
      else localStorage.removeItem(AUTH_KEY);
    } catch {
      // ignore
    }
  }, [user]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    } catch (err) {
      // ignore
    }
  }, [users]);

  const login = (email: string, _password: string) => {
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!found) return { ok: false, error: "No account found with that email" };
    setUser(found);
    return { ok: true };
  };

  const register = (name: string, email: string, _password: string) => {
    const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) return { ok: false, error: "Email already in use" };
    const newUser: User = {
      id: `u_${Date.now()}`,
      name,
      email,
      role: "customer",
    };
    setUsers((prev) => [...prev, newUser]);
    setUser(newUser);
    return { ok: true };
  };

  const logout = () => setUser(null);

  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{ user, users, login, register, logout, isAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
