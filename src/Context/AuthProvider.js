import React, { createContext, useEffect, useState } from 'react'
import  { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile, signInWithPopup } from "firebase/auth"
import app from "../Firebase/firebase.config"

export const AuthContext = createContext();
const auth = getAuth(app)
const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);

    const createUser = (email,password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password);
    }
    const SignIn = (email,password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password);
    }

    const updateUser = (userInfo) =>{
        return updateProfile(auth.currentUser,userInfo);
    }

    const providerLogin = (provider)=>{
        return signInWithPopup(auth,provider)

    }

    const logout = ()=>{
        setLoading(true)
        return signOut(auth)
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,currentUser =>{
            console.log("user observing")
            setUser(currentUser);
            setLoading(false);
        })
        return () => unsubscribe();
        
    },[])
    const authInfo = {
        createUser,
        SignIn,
        user,
        logout,
        updateUser,
        loading,
        providerLogin
    }
  return (
    <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider