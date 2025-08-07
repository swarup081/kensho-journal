// components/Editor.js
'use client';

import { EditorContent, BubbleMenu } from '@tiptap/react';
import { Bold, Italic, Underline as UnderlineIcon, Strikethrough } from 'lucide-react';

const Editor = ({ editor }) => {
  if (!editor) {
    return (
        <div className="prose prose-invert prose-lg w-full h-full text-gray-500">
            <p>Loading Editor...</p>
        </div>
    );
  }

  // Helper function for bubble menu button classes
  const getBubbleButtonClass = (name) => {
    return `p-2 transition-colors ${
      editor.isActive(name) ? 'text-purple-400' : 'text-gray-400'
    } hover:bg-gray-700/50 hover:text-white`;
  }

  return (
    <>
      <BubbleMenu
        editor={editor}
        tippyOptions={{ duration: 100 }}
        className="bg-gray-800 border border-gray-700/50 shadow-xl rounded-lg overflow-hidden flex"
      >
        <button onClick={() => editor.chain().focus().toggleBold().run()} className={getBubbleButtonClass('bold')}><Bold className="h-5 w-5" /></button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className={getBubbleButtonClass('italic')}><Italic className="h-5 w-5" /></button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={getBubbleButtonClass('underline')}><UnderlineIcon className="h-5 w-5" /></button>
        <button onClick={() => editor.chain().focus().toggleStrike().run()} className={getBubbleButtonClass('strike')}><Strikethrough className="h-5 w-5" /></button>
      </BubbleMenu>
      
      <EditorContent editor={editor} className="h-full" />
    </>
  );
};

export default Editor;