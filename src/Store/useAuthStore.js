import { create } from 'zustand';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { loadBundle } from 'firebase/firestore';
import { LogOut } from 'lucide-react';

export const useAuthStore = create((set) => ({
  user: null, // there is no user first
  loading: true,
  // to check whether user or not when page load //
checkAuth:()=>{
  onAuthStateChanged(auth, (user)=>{
    if(user){
      set({user:user, loading:false})
    }else{
      set({user:null, loading:false})
    }
  })
},
  logout:async()=>{
    await signOut(auth)
    set({user:null})
  }
}));
