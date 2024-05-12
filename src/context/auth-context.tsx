import { User } from "firebase/auth"
import {ReactNode, useEffect, useState, createContext} from "react";
import {userStateListener, signOutUser} from "../services/firebaseService";

interface Props {
    children?: ReactNode
}

export const AuthContext = createContext({
    currentUser: {} as User | null,
    setCurrentUser: (_user: User) => {},
    signOut: () => {}
});

export function AuthProvider({ children }: Props) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
       const unsubscribe = userStateListener((user) => {
           if (user) {
               setCurrentUser(user)
           }
       });
       return unsubscribe;
    });

    function signOut() {
        signOutUser()
            .then(() => {
                setCurrentUser(null)
            })
    }

    const value = {
        currentUser,
        setCurrentUser,
        signOut
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}