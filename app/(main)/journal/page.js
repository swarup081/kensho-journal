// app/(main)/journal/page.js
'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import InsightModal from '@/components/InsightModal';
import PwaInstallPopup from '@/components/shared/PwaInstallPopup';
import InsightModalSkeleton from '@/components/InsightModalSkeleton';
import { convertToMarkdown } from '@/lib/markdownConverter';
import dynamic from 'next/dynamic';
import AudioPlayer from '@/components/AudioPlayer';

// Tiptap Imports
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';

// Component Imports
import JournalSkeleton from '@/components/JournalSkeleton';
const EditorToolbar = dynamic(() => import('@/components/EditorToolbar'), { ssr: false });
const Editor = dynamic(() => import('@/components/Editor'), { ssr: false });

const JournalPage = () => {
  const [entryHtml, setEntryHtml] = useState('');
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [modalAnalysis, setModalAnalysis] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPwaPopup, setShowPwaPopup] = useState(false);
  const [activeSound, setActiveSound] = useState(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        paragraph: {
          dropcursor: false,
        },
      }),
      Underline,
      Placeholder.configure({
        placeholder: "Let your thoughts flow...",
      }),
    ],
    content: entryHtml,
    onUpdate: ({ editor }) => {
      setEntryHtml(editor.getHTML());
    },
    editable: !isLoading && !isSaving,
    editorProps: {
      attributes: {
        class: 'prose prose-invert prose-lg focus:outline-none w-full h-full',
      },
    },
  });

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setTimeout(() => setIsLoading(false), 300); 
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (editor) {
      editor.setEditable(!isLoading && !isSaving);
    }
  }, [isLoading, isSaving, editor]);
  
  const handleSaveEntry = async () => {
    const markdownContent = convertToMarkdown(entryHtml);
    if (markdownContent.trim() === '' || !user || isSaving) return;

    setIsSaving(true);
    setModalAnalysis(null);
    setIsModalOpen(true);

    const { data, error } = await supabase
      .from('journal_entries')
      .insert([{ content: markdownContent, user_id: user.id }])
      .select('id').single();

    if (error) {
      console.error('Error saving entry:', error);
      setIsSaving(false); setIsModalOpen(false); return;
    }

    const demoAnalysisResult = {
        summary: "It sounds like you're navigating a period of significant personal growth, balancing the excitement of new opportunities with a natural sense of uncertainty.",
        emotions: [ { "emotion": "Optimism", "score": 8 }, { "emotion": "Anxiety", "score": 5 }, { "emotion": "Curiosity", "score": 7 } ],
        keywords: ["new beginnings", "personal growth", "uncertainty", "opportunity", "reflection"],
        insightfulQuestion: "What one small step could you take tomorrow that honors both your excitement and your need for stability?"
    };

    setTimeout(() => {
      setModalAnalysis({ ...demoAnalysisResult, entryId: data.id });
      setEntryHtml('');
      editor?.commands.clearContent(true);
      setIsSaving(false);
    }, 2500);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      if (localStorage.getItem('pwaInstallCompleted')) return;
      const count = parseInt(localStorage.getItem('insightClosedCount') || '0', 10) + 1;
      localStorage.setItem('insightClosedCount', count.toString());
      if ([1, 6, 15, 21].includes(count)) setShowPwaPopup(true);
    }, 300);
  };

  const handlePopupDismiss = (installed) => {
    setShowPwaPopup(false);
    if (installed) localStorage.setItem('pwaInstallCompleted', 'true');
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  if (isLoading) {
    return <JournalSkeleton />;
  }

  return (
    <>
      <AudioPlayer activeSound={activeSound} />
      <InsightModal isOpen={isModalOpen} onClose={handleCloseModal} analysis={modalAnalysis} fallback={<InsightModalSkeleton />} />
      <PwaInstallPopup show={showPwaPopup} onDismiss={handlePopupDismiss} />
      <div className="h-full p-4 sm:p-8 lg:p-12">
        <div className="max-w-4xl mx-auto h-full flex flex-col">
          <header className="pb-6 border-b border-gray-700/50">
            <h1 className="text-3xl font-bold text-gray-100" style={{ fontFamily: "'Lora', serif" }}>My Journal</h1>
            <p className="text-gray-400 mt-1">{currentDate}</p>
          </header>
          <div className="flex-grow py-8">
            <div className="bg-black/10 rounded-lg shadow-2xl h-full flex flex-col">
              <div className="p-6 flex-grow relative">
                <Editor editor={editor} />
              </div>
              <div className="p-4 bg-gray-900/40 border-t border-gray-700/50 flex items-center">
                <div className="flex-grow">
                  <EditorToolbar editor={editor} onSoundSelect={setActiveSound} activeSound={activeSound} />
                </div>
                <button
                  onClick={handleSaveEntry}
                  disabled={(editor && editor.isEmpty) || isSaving}
                  className="bg-gradient-to-r from-purple-600 to-orange-400 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JournalPage;