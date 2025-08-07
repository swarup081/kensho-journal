// components/EditorToolbar.js
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Type,
  Bold, Italic, Underline, Strikethrough, List, ListOrdered,
  Quote, Music, Droplets, Coffee, Sofa
} from 'lucide-react';

const EditorToolbar = ({ editor, onSoundSelect }) => {
  const [activeMenu, setActiveMenu] = useState(null);

  // --- FIX: Render a placeholder to prevent layout shift ---
  if (!editor) {
    return <div className="mr-auto"></div>;
  }

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const menuVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.95, transition: { duration: 0.1 } },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.1 } },
  };

  const getButtonClass = (name) => {
    return `p-2 rounded-md transition-colors ${
      editor.isActive(name) ? 'text-purple-400' : 'text-gray-400'
    } hover:bg-gray-700/50 hover:text-white`;
  };

  return (
    <div className="flex items-center gap-1 mr-auto relative">
      {/* --- Text Formatting Menu --- */}
      <div className="relative">
        <button
          onClick={() => toggleMenu('text')}
          className={`p-2 rounded-md transition-colors ${
            activeMenu === 'text' ? 'bg-gray-700/50 text-white' : 'text-gray-400'
          } hover:bg-gray-700/50 hover:text-white`}
        >
          <Type className="h-5 w-5" />
        </button>
        <AnimatePresence>
          {activeMenu === 'text' && (
            <motion.div
              variants={menuVariants} initial="hidden" animate="visible" exit="hidden"
              className="absolute bottom-full mb-2 bg-gray-800 border border-gray-700/50 shadow-xl rounded-lg overflow-hidden flex"
            >
              <button onClick={() => editor.chain().focus().toggleBold().run()} className={getButtonClass('bold')}><Bold className="h-5 w-5" /></button>
              <button onClick={() => editor.chain().focus().toggleItalic().run()} className={getButtonClass('italic')}><Italic className="h-5 w-5" /></button>
              <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={getButtonClass('underline')}><Underline className="h-5 w-5" /></button>
              <button onClick={() => editor.chain().focus().toggleStrike().run()} className={getButtonClass('strike')}><Strikethrough className="h-5 w-5" /></button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- List Formatting Menu --- */}
      <div className="relative">
        <button
          onClick={() => toggleMenu('list')}
           className={`p-2 rounded-md transition-colors ${
            activeMenu === 'list' ? 'bg-gray-700/50 text-white' : 'text-gray-400'
          } hover:bg-gray-700/50 hover:text-white`}
        >
          <List className="h-5 w-5" />
        </button>
        <AnimatePresence>
          {activeMenu === 'list' && (
            <motion.div
              variants={menuVariants} initial="hidden" animate="visible" exit="hidden"
              className="absolute bottom-full mb-2 bg-gray-800 border border-gray-700/50 shadow-xl rounded-lg overflow-hidden flex"
            >
              <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={getButtonClass('bulletList')}><List className="h-5 w-5" /></button>
              <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={getButtonClass('orderedList')}><ListOrdered className="h-5 w-5" /></button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- Blockquote Button --- */}
      <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={getButtonClass('blockquote')}>
        <Quote className="h-5 w-5" />
      </button>

      {/* --- Audio Menu --- */}
      <div className="relative">
        <button
          onClick={() => toggleMenu('audio')}
          className={`p-2 rounded-md transition-colors ${
            activeMenu === 'audio' ? 'bg-gray-700/50 text-white' : 'text-gray-400'
          } hover:bg-gray-700/50 hover:text-white`}
        >
          <Music className="h-5 w-5" />
        </button>
        <AnimatePresence>
          {activeMenu === 'audio' && (
            <motion.div
              variants={menuVariants} initial="hidden" animate="visible" exit="hidden"
              className="absolute bottom-full mb-2 bg-gray-800 border border-gray-700/50 shadow-xl rounded-lg overflow-hidden flex"
            >
              <button onClick={() => { onSoundSelect('rain'); toggleMenu(null); }} className="p-2 text-gray-400 hover:bg-gray-700"><Droplets className="h-5 w-5" /></button>
              <button onClick={() => { onSoundSelect('comfort'); toggleMenu(null); }} className="p-2 text-gray-400 hover:bg-gray-700"><Sofa className="h-5 w-5" /></button>
              <button onClick={() => { onSoundSelect('cafe'); toggleMenu(null); }} className="p-2 text-gray-400 hover:bg-gray-700"><Coffee className="h-5 w-5" /></button>
              <button onClick={() => { onSoundSelect(null); toggleMenu(null); }} className="p-2 text-gray-400 hover:bg-gray-700">Off</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EditorToolbar;