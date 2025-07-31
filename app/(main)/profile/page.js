'use client';

import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { User, Settings, Edit3, Shield, Bell, BookOpen, Repeat, Zap, UploadCloud, Trash2, X, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { updateProfileName } from './actions';

const defaultAvatars = [
    '/Avatar/male_avatar_for_kenshoprofile_1.png',
    '/Avatar/female_avatar_for_kenshoprofile_1.png',
    '/Avatar/male_avatar_for_kenshoprofile_2.png',
    '/Avatar/female_avatar_for_kenshoprofile_2.png',
    '/Avatar/male_avatar_for_kenshoprofile_3.png',
    '/Avatar/female_avatar_for_kenshoprofile_3.png',
    '/Avatar/male_avatar_for_kenshoprofile_4.png',
    '/Avatar/female_avatar_for_kenshoprofile_4.png',
];

// --- Reusable UI Components (Unchanged) ---
const TabButton = ({ label, icon: Icon, isActive, onClick }) => (
    <button onClick={onClick} className={`relative flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-colors duration-200 focus:outline-none ${isActive ? 'text-white' : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'}`}>
      <Icon className="h-5 w-5" />
      <span>{label}</span>
      {isActive && <motion.div layoutId="activeTabIndicator" className="absolute -bottom-px left-0 right-0 h-0.5 bg-purple-500" />}
    </button>
);
const InsightCard = ({ icon: Icon, label, value, color }) => (
    <div className="bg-gradient-to-br from-gray-900/80 to-black/30 p-6 rounded-xl shadow-lg border border-gray-800/50 flex items-center gap-5">
        <div className={`p-3 rounded-full bg-${color}-500/10`}><Icon className={`h-7 w-7 text-${color}-400`} /></div>
        <div>
            <p className="text-sm text-gray-400">{label}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
        </div>
    </div>
);
const ToggleSwitch = ({ checked, onChange }) => (
    <div onClick={() => onChange(!checked)} className={`flex items-center w-14 h-8 flex-shrink-0 rounded-full p-1 cursor-pointer transition-colors duration-300 ${checked ? 'bg-purple-600 justify-end' : 'bg-gray-700 justify-start'}`}>
      <motion.div layout transition={{ type: "spring", stiffness: 700, damping: 30 }} className="h-6 w-6 bg-white rounded-full shadow-md" />
    </div>
);
const ActionButton = ({ children, ...props }) => (<button {...props} className="font-semibold bg-gray-700/80 hover:bg-gray-700 text-white py-2 px-5 rounded-lg transition-colors duration-200">{children}</button>);

const AvatarModal = ({ isOpen, onClose, currentAvatar, onAvatarSelect, userName, onFileUpload, onRemovePhoto, isUploading }) => {
    const fileInputRef = useRef(null);
    const placeholderAvatar = `https://placehold.co/128x128/A78BFA/FFFFFF/png?text=${userName?.[0] || 'K'}`;
    const allAvatars = [placeholderAvatar, ...defaultAvatars];

    return (
    <AnimatePresence>
        {isOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
                <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} className="bg-gray-900 border border-gray-700/50 rounded-2xl shadow-2xl w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
                        <h2 className="text-xl font-bold text-white">Edit Profile Picture</h2>
                        <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-800"><X size={20} /></button>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col items-center justify-center bg-black/20 p-6 rounded-lg">
                            <img src={currentAvatar} alt="Current Avatar" className="h-32 w-32 rounded-full ring-4 ring-purple-500/30" />
                            <p className="text-sm text-gray-400 mt-4">Your current avatar</p>
                            <div className="mt-6 w-full space-y-3">
                                <input type="file" ref={fileInputRef} onChange={onFileUpload} accept="image/png, image/jpeg" style={{ display: 'none' }} />
                                <button onClick={() => fileInputRef.current.click()} disabled={isUploading} className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-purple-600/80 hover:bg-purple-600 text-white font-semibold transition-colors disabled:opacity-50">
                                    <ImageIcon size={18} /> {isUploading ? 'Uploading...' : 'Upload Photo'}
                                </button>
                                <button onClick={onRemovePhoto} disabled={isUploading} className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-gray-700/50 hover:bg-gray-700 text-white font-semibold transition-colors disabled:opacity-50">
                                    <Trash2 size={18} /> Remove Photo
                                </button>
                            </div>
                        </div>
                        <div className="p-6 bg-black/10 rounded-lg">
                            <h3 className="font-semibold text-white mb-4 text-center md:text-left">Or choose a new avatar</h3>
                            <div className="grid grid-cols-3 gap-4">
                                {allAvatars.map(avatar => (
                                    <button key={avatar} onClick={() => onAvatarSelect(avatar)} className={`rounded-full ring-2 transition-all ${currentAvatar === avatar ? 'ring-purple-500' : 'ring-transparent hover:ring-gray-600'}`}>
                                        <img src={avatar} alt="Avatar option" className="rounded-full" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>
)};

// --- Main Profile Page Component ---
const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState({ name: '', avatar_url: '' });
    const [stats, setStats] = useState({ totalEntries: 0, currentStreak: 0, longestStreak: 0 });
    const [loading, setLoading] = useState(true);
    const [isEditingName, setIsEditingName] = useState(false);
    const [newName, setNewName] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUser(user);
                let { data: profileData } = await supabase.from('users').select(`name, avatar_url`).eq('id', user.id).single();
                if (profileData) {
                    setProfile(profileData);
                    setNewName(profileData.name || '');
                }
                const { data: entries } = await supabase.from('journal_entries').select('created_at').order('created_at', { ascending: false });
                if (entries) {
                    const { currentStreak, longestStreak } = calculateStreaks(entries);
                    setStats({ totalEntries: entries.length, currentStreak, longestStreak });
                }
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    const calculateStreaks = (entries) => { /* ... (your existing streak logic) ... */ return { currentStreak: 0, longestStreak: 0 }; };

    const updateAvatarUrlInDb = async (avatarUrl) => {
        if (!user) return;
        const { error } = await supabase.from('users').update({ avatar_url: avatarUrl }).eq('id', user.id);
        if (!error) {
            setProfile(prev => ({ ...prev, avatar_url: avatarUrl }));
        }
    };

   // In app/(main)/profile/page.js

// Replace the existing handleFileUpload function with this one
const handleFileUpload = async (event) => {
  if (!event.target.files || event.target.files.length === 0 || !user) return;
  
  const file = event.target.files[0];
  
  const maxFileSize = 2 * 1024 * 1024; // 2MB
  if (file.size > maxFileSize) {
      alert('File is too large. Please select an image smaller than 2MB.');
      return;
  }
  
  // --- NEW: Logic to delete the old photo ---
  // Check if the current avatar URL is a Supabase storage URL before trying to delete
  if (profile.avatar_url && profile.avatar_url.includes(supabase.storage.url)) {
      const oldFilePath = profile.avatar_url.split('/avatars/')[1];
      if (oldFilePath) {
          const { error: deleteError } = await supabase.storage.from('avatars').remove([oldFilePath]);
          if (deleteError) {
              console.error('Error deleting old avatar:', deleteError);
          }
      }
  }
  // --- End of new logic ---

  const fileExt = file.name.split('.').pop();
  const filePath = `${user.id}/${Date.now()}.${fileExt}`;

  setIsUploading(true);
  const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file);

  if (uploadError) {
      console.error('Error uploading avatar:', uploadError);
  } else {
      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      if (data) {
          await updateAvatarUrlInDb(data.publicUrl);
      }
  }
  setIsUploading(false);
  setIsModalOpen(false);
};
    
    const handleRemovePhoto = async () => {
        if (!user || !profile.avatar_url) return;
        if (!profile.avatar_url.includes(supabase.storage.url)) return;

        const filePath = profile.avatar_url.split('/avatars/')[1];
        const { error } = await supabase.storage.from('avatars').remove([filePath]);

        if (error) {
            console.error('Error removing photo:', error);
        } else {
            const placeholder = `https://placehold.co/128x128/A78BFA/FFFFFF/png?text=${profile.name?.[0] || 'K'}`;
            await updateAvatarUrlInDb(placeholder);
        }
        setIsModalOpen(false);
    };

    const handleAvatarSelect = async (avatarUrl) => {
        await updateAvatarUrlInDb(avatarUrl);
        setIsModalOpen(false);
    };

    const handleNameChange = async (e) => {
        e.preventDefault();
        const trimmedName = newName.trim();
        if (!user || !trimmedName) return;
        setProfile(prev => ({ ...prev, name: trimmedName }));
        setIsEditingName(false);
        await updateProfileName(trimmedName);
    };
    
    const memberSince = user ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : '...';

    if (loading) return <div className="h-full flex items-center justify-center"><p>Loading profile...</p></div>;

    return (
        <>
            <AvatarModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                currentAvatar={profile.avatar_url}
                onAvatarSelect={handleAvatarSelect}
                userName={profile.name}
                onFileUpload={handleFileUpload}
                onRemovePhoto={handleRemovePhoto}
                isUploading={isUploading}
            />
            <div className="h-full p-4 sm:p-8 lg:p-12">
                <div className="max-w-4xl mx-auto">
                    <header className="pb-6">
                        <h1 className="text-3xl font-bold text-gray-100" style={{ fontFamily: "'Lora', serif" }}>Profile & Settings</h1>
                        <p className="text-gray-400 mt-1">Your personal space to manage your account and preferences.</p>
                    </header>
                    <div className="mt-8">
                        <div className="flex items-center gap-4 border-b border-gray-700/50">
                            <TabButton label="Profile" icon={User} isActive={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
                            <TabButton label="Settings" icon={Settings} isActive={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
                        </div>
                        <div className="mt-8">
                            <AnimatePresence mode="wait">
                                <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                                    {activeTab === 'profile' && (
                                        <div>
                                            <div className="bg-black/10 rounded-2xl shadow-2xl p-8">
                                                <div className="flex flex-col sm:flex-row items-center gap-8">
                                                    <button onClick={() => setIsModalOpen(true)} className="relative group flex-shrink-0">
                                                        <img src={profile.avatar_url} alt="User Avatar" className="h-32 w-32 rounded-full ring-4 ring-purple-500/30" />
                                                        <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                            <Edit3 className="text-white h-8 w-8"/>
                                                        </div>
                                                    </button>
                                                    <div className="flex-grow text-center sm:text-left">
                                                        {isEditingName ? (
                                                            <form onSubmit={handleNameChange} className="flex items-center gap-2">
                                                                <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} className="text-3xl font-bold text-white bg-gray-800 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500" autoFocus />
                                                                <button type="submit" className="font-semibold bg-green-600 hover:bg-green-700 text-white py-1.5 px-4 rounded-lg transition-colors">Save</button>
                                                                <button type="button" onClick={() => setIsEditingName(false)} className="font-semibold bg-gray-700/80 hover:bg-gray-700 text-white py-1.5 px-4 rounded-lg transition-colors">Cancel</button>
                                                            </form>
                                                        ) : (
                                                            <div className="flex items-center gap-3">
                                                                <h2 className="text-3xl font-bold text-white">{profile.name}</h2>
                                                                <button onClick={() => setIsEditingName(true)} className="text-gray-400 hover:text-white"><Edit3 size={18} /></button>
                                                            </div>
                                                        )}
                                                        <p className="text-gray-400 mt-1">{user?.email}</p>
                                                        <p className="text-xs text-gray-500 mt-2">Member since {memberSince}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-8">
                                                <h3 className="text-xl font-bold text-white mb-4" style={{ fontFamily: "'Lora', serif" }}>Your Journaling Insights</h3>
                                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                                    <InsightCard icon={BookOpen} label="Total Entries" value={stats.totalEntries} color="purple" />
                                                    <InsightCard icon={Repeat} label="Current Streak" value={`${stats.currentStreak} days`} color="orange" />
                                                    <InsightCard icon={Zap} label="Longest Streak" value={`${stats.longestStreak} days`} color="green" />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {activeTab === 'settings' && (
                                        <div className="bg-black/10 rounded-2xl shadow-2xl p-8">
                                            <h2 className="text-xl font-bold text-white mb-2">Account Settings</h2>
                                            <div className="divide-y divide-gray-700/50">
                                                <div className="py-6 flex items-center justify-between">
                                                    <div>
                                                        <h3 className="font-semibold text-white">Change Password</h3>
                                                        <p className="text-gray-400 text-sm mt-1">Update your password for enhanced security.</p>
                                                    </div>
                                                    <ActionButton>Change</ActionButton>
                                                </div>
                                                <div className="py-6 flex items-center justify-between">
                                                    <div>
                                                        <h3 className="font-semibold text-white">Email Notifications</h3>
                                                        <p className="text-gray-400 text-sm mt-1">Receive occasional updates and reminders.</p>
                                                    </div>
                                                    <ToggleSwitch checked={notificationsEnabled} onChange={setNotificationsEnabled} />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfilePage;