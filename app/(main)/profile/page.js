'use client';

import { useState } from 'react';
import { User, Settings, Edit3, Shield, Bell, BookOpen, Repeat, Zap, UploadCloud, Trash2, X, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Sample Data & Themed Avatars ---
const user = {
  name: 'Swarup',
  email: 'swarup@example.com',
  memberSince: 'July 2025',
  avatarUrl: 'https://placehold.co/128x128/A78BFA/FFFFFF/png?text=S',
  notifications: true,
};

// I've created these themed placeholder avatars for you. You don't need to upload anything.
const defaultAvatars = [
    'https://placehold.co/128x128/A78BFA/FFFFFF/png?text=K',
    'https://placehold.co/128x128/F97316/FFFFFF/png?text=J',
    'https://placehold.co/128x128/10B981/FFFFFF/png?text=S',
    'https://placehold.co/128x128/3B82F6/FFFFFF/png?text=A',
    'https://placehold.co/128x128/EC4899/FFFFFF/png?text=N',
    'https://placehold.co/128x128/F59E0B/FFFFFF/png?text=H',
];

const stats = {
  totalEntries: 42,
  currentStreak: 7,
  longestStreak: 21,
};

// --- Reusable UI Components ---

const TabButton = ({ label, icon: Icon, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`relative flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50
      ${isActive ? 'text-white' : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'}
    `}
  >
    <Icon className="h-5 w-5" />
    <span>{label}</span>
    {isActive && (
      <motion.div
        layoutId="activeTabIndicator"
        className="absolute -bottom-px left-0 right-0 h-0.5 bg-purple-500"
      />
    )}
  </button>
);

const InsightCard = ({ icon: Icon, label, value, color }) => (
    <div className="bg-gradient-to-br from-gray-900/80 to-black/30 p-6 rounded-xl shadow-lg border border-gray-800/50 flex items-center gap-5">
        <div className={`p-3 rounded-full bg-${color}-500/10`}>
            <Icon className={`h-7 w-7 text-${color}-400`} />
        </div>
        <div>
            <p className="text-sm text-gray-400">{label}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
        </div>
    </div>
);

const ToggleSwitch = ({ checked, onChange }) => (
  <div
    onClick={() => onChange(!checked)}
    className={`flex items-center w-14 h-8 flex-shrink-0 rounded-full p-1 cursor-pointer transition-colors duration-300
      ${checked ? 'bg-purple-600 justify-end' : 'bg-gray-700 justify-start'}
    `}
  >
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 700, damping: 30 }}
      className="h-6 w-6 bg-white rounded-full shadow-md"
    />
  </div>
);

const ActionButton = ({ children, ...props }) => (
    <button {...props} className="font-semibold bg-gray-700/80 hover:bg-gray-700 text-white py-2 px-5 rounded-lg transition-colors duration-200">
        {children}
    </button>
);

// --- NEW Redesigned Avatar Management Modal ---
const AvatarModal = ({ isOpen, onClose, currentAvatar, onAvatarSelect }) => (
    <AnimatePresence>
        {isOpen && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="bg-gray-900 border border-gray-700/50 rounded-2xl shadow-2xl w-full max-w-lg"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
                        <h2 className="text-xl font-bold text-white">Edit Profile Picture</h2>
                        <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-800">
                            <X size={20} />
                        </button>
                    </div>
                    
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Side */}
                        <div className="flex flex-col items-center justify-center bg-black/20 p-6 rounded-lg">
                            <img src={currentAvatar} alt="Current Avatar" className="h-32 w-32 rounded-full ring-4 ring-purple-500/30" />
                            <p className="text-sm text-gray-400 mt-4">Your current avatar</p>
                            <div className="mt-6 w-full space-y-3">
                                <button className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-purple-600/80 hover:bg-purple-600 text-white font-semibold transition-colors">
                                    <UploadCloud size={18} /> Upload Photo
                                </button>
                                <button className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-gray-700/50 hover:bg-gray-700 text-white font-semibold transition-colors">
                                    <Trash2 size={18} /> Remove Photo
                                </button>
                            </div>
                        </div>
                        {/* Right Side */}
                        <div className="p-6 bg-black/10 rounded-lg">
                            <h3 className="font-semibold text-white mb-4 text-center md:text-left">Or choose a new avatar</h3>
                            <div className="grid grid-cols-3 gap-4">
                                {defaultAvatars.map(avatar => (
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
);


// --- Main Profile Page Component ---

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [userName, setUserName] = useState(user.name);
  const [userAvatar, setUserAvatar] = useState(user.avatarUrl);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(user.notifications);

  const handleAvatarSelect = (avatar) => {
    setUserAvatar(avatar);
    setIsModalOpen(false);
  };

  return (
    <>
      <AvatarModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        currentAvatar={userAvatar}
        onAvatarSelect={handleAvatarSelect}
      />
      <div className="h-full p-4 sm:p-8 lg:p-12">
        <div className="max-w-4xl mx-auto">
          <header className="pb-6">
            <h1 className="text-3xl font-bold text-gray-100" style={{ fontFamily: "'Lora', serif" }}>
              Profile & Settings
            </h1>
            <p className="text-gray-400 mt-1">Your personal space to manage your account and preferences.</p>
          </header>

          <div className="mt-8">
            <div className="flex items-center gap-4 border-b border-gray-700/50">
              <TabButton label="Profile" icon={User} isActive={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
              <TabButton label="Settings" icon={Settings} isActive={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
            </div>

            <div className="mt-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeTab === 'profile' && (
                    <div>
                      <div className="bg-black/10 rounded-2xl shadow-2xl p-8">
                          <div className="flex flex-col sm:flex-row items-center gap-8">
                              <button onClick={() => setIsModalOpen(true)} className="relative group flex-shrink-0">
                                  <img src={userAvatar} alt="User Avatar" className="h-32 w-32 rounded-full ring-4 ring-purple-500/30" />
                                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                      <Edit3 className="text-white h-8 w-8"/>
                                  </div>
                              </button>
                              <div className="flex-grow text-center sm:text-left">
                                 <h2 className="text-3xl font-bold text-white">{userName}</h2>
                                 <p className="text-gray-400 mt-1">{user.email}</p>
                                 <p className="text-xs text-gray-500 mt-2">Member since {user.memberSince}</p>
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