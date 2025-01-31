"use client";

import { AuthUserType } from "@/types/auth";
import { auth } from "@/utils/firebaseConfig";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, UserCredential } from "firebase/auth";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: AuthUserType | null;
  signIn: () => Promise<UserCredential>;
  logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>("");
  const router = useRouter()

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsuscribe();
  }, []);

  const signIn = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const logOut = () => {
    return signOut(auth);
  };

  return <AuthContext.Provider value={{ user, signIn, logOut }}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  return useContext(AuthContext);
}
