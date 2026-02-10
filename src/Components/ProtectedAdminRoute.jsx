import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth, db } from '../lib/firebase' 
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const ProtectedAdminRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "user", user.uid));
          if (userDoc.exists() && userDoc.data().role === 'admin') {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  if (loading) return <div className="p-10 text-center">Checking Authentication...</div>;

  return isAdmin ? children : <Navigate to="/login" replace />;
};

export default ProtectedAdminRoute;
