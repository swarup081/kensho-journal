// components/PlusMenu.js
'use client';

import { FloatingMenu } from '@tiptap/react';
import { Plus, List, ListOrdered, Quote } from 'lucide-react';

const PlusMenu = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <FloatingMenu
      editor={editor}
      tippyOptions={{ duration: 100, placement: 'left-start' }}
      shouldShow={({ state }) => {
        const { $from } = state.selection;
        const currentNode = $from.node($from.depth);
        // Show the menu only on an empty paragraph
        return currentNode.isTextblock && currentNode.content.size === 0;
      }}
      className="flex items-center bg-gray-800 border border-gray-700/50 shadow-xl rounded-lg overflow-hidden p-1"
    >
      <div className="relative group">
        <button className="p-2 text-gray-400">
          <Plus className="h-5 w-5" />
        </button>
        <div className="absolute bottom-0 right-full mr-2 hidden group-hover:flex flex-col bg-gray-800 border border-gray-700/50 shadow-xl rounded-lg overflow-hidden w-40">
          <button onClick={() => editor.chain().focus().toggleBulletList().run()} className="p-2 text-left text-gray-300 hover:bg-gray-700 flex items-center gap-2"><List className="h-5 w-5" /> Bullet List</button>
          <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className="p-2 text-left text-gray-300 hover:bg-gray-700 flex items-center gap-2"><ListOrdered className="h-5 w-5" /> Numbered List</button>
          <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className="p-2 text-left text-gray-300 hover:bg-gray-700 flex items-center gap-2"><Quote className="h-5 w-5" /> Blockquote</button>
        </div>
      </div>
    </FloatingMenu>
  );
};

export default PlusMenu;