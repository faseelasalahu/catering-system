import React, { useState, useEffect } from 'react';
import { db, auth } from '../lib/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore';
import{ useAuthStore }from '../Store/useAuthStore'
import { User, Phone, MapPin, Mail, Edit2, Save, X } from 'lucide-react'; // ഐക്കണുകൾക്കായി

export default function Profile() {
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({ name: '', phone: '', address: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user?.uid) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) setProfileData(docSnap.data());
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user]);

  const handleUpdate = async () => {
    try {
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, profileData);
      setIsEditing(false);
      alert("Profile Updated!");
    } catch (error) { console.error(error); }
  };

  if (loading) return <div className="text-center p-20">Loading Profile...</div>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl border border-gray-100">
      {/* Header with Avatar */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-4xl font-bold mb-4 border-4 border-orange-50">
          {profileData.name ? profileData.name[0].toUpperCase() : user?.email[0].toUpperCase()}
        </div>
        <h2 className="text-2xl font-bold text-gray-800">{profileData.name || 'Your Name'}</h2>
        <p className="text-gray-500 text-sm">{user?.email}</p>
      </div>

      {/* Info Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
          <User className="text-orange-500" size={20} />
          <div className="flex-1">
            <p className="text-xs text-gray-400 uppercase font-bold">Full Name</p>
            {isEditing ? (
              <input value={profileData.name} onChange={e => setProfileData({...profileData, name: e.target.value})} className="w-full bg-white border-b border-orange-300 outline-none" />
            ) : (
              <p className="text-gray-700 font-medium">{profileData.name || 'Not set'}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
          <Phone className="text-orange-500" size={20} />
          <div className="flex-1">
            <p className="text-xs text-gray-400 uppercase font-bold">Phone</p>
            {isEditing ? (
              <input value={profileData.phone} onChange={e => setProfileData({...profileData, phone: e.target.value})} className="w-full bg-white border-b border-orange-300 outline-none" />
            ) : (
              <p className="text-gray-700 font-medium">{profileData.phone || 'Not set'}</p>
            )}
          </div>
        </div>

        <div className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
          <MapPin className="text-orange-500 mt-1" size={20} />
          <div className="flex-1">
            <p className="text-xs text-gray-400 uppercase font-bold">Delivery Address</p>
            {isEditing ? (
              <textarea value={profileData.address} onChange={e => setProfileData({...profileData, address: e.target.value})} className="w-full bg-white border-b border-orange-300 outline-none" rows="2" />
            ) : (
              <p className="text-gray-700 font-medium text-sm">{profileData.address || 'No address added yet'}</p>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8">
        {isEditing ? (
          <div className="flex gap-2">
            <button onClick={handleUpdate} className="flex-1 bg-orange-600 text-white py-2 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-orange-200">
              <Save size={18} /> Save Changes
            </button>
            <button onClick={() => setIsEditing(false)} className="px-4 py-2 bg-gray-200 text-gray-600 rounded-xl font-bold hover:bg-gray-300">
              <X size={18} />
            </button>
          </div>
        ) : (
          <button onClick={() => setIsEditing(true)} className="w-full border-2 border-orange-600 text-orange-600 py-2 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-orange-50 transition">
            <Edit2 size={18} /> Edit Profile
          </button>
        )}
      </div>
    </div>
  );
}
