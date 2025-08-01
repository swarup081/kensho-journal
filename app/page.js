// app/page.js
'use client';

import Navbar from '@/components/shared/Navbar';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, CalendarDays, BarChart3, Lock } from 'lucide-react';

// A reusable component for showcasing features
const FeatureShowcase = ({ icon: Icon, title, description, imageSrc, reverse = false }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className={`grid grid-cols-1 md:grid-cols-2 items-center gap-12 py-12 ${reverse ? 'md:grid-flow-row-dense' : ''}`}
  >
    <div className={`order-2 ${reverse ? 'md:order-1' : 'md:order-2'}`}>
      <div className="flex items-center gap-3">
        <div className="p-2 bg-purple-500/10 rounded-lg">
          <Icon className="h-6 w-6 text-purple-400" />
        </div>
        <h3 className="text-2xl font-bold font-lora text-gray-800">{title}</h3>
      </div>
      <p className="mt-4 text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
    <div className={`order-1 ${reverse ? 'md:order-2' : 'md:order-1'}`}>
      <img src={imageSrc} alt={title} className="rounded-xl shadow-2xl border border-gray-200/60" />
    </div>
  </motion.div>
);


export default function Home() {
  return (
    <div className="min-h-screen text-gray-900 flex flex-col items-center p-4">
      <div className="relative z-10 bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/80 w-full max-w-4xl">
        <Navbar />
        {/* --- Hero Section --- */}
        <main className="px-6 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold font-lora mb-4 leading-tight">
            The Journal That Talks Back.
          </h1>
          <p className="text-lg text-gray-600 mb-10 max-w-xl mx-auto">
            Unlock Your Inner Wisdom Through Interactive Journaling
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link 
              href="/sign-up"
              className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-purple-500 text-white font-semibold py-3 px-8 rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300">
                 Start Your Journey
            </Link>
          </div>
        </main>
      </div>
      
      {/* --- Merged "Learn More" Content --- */}
      <div className="w-full max-w-4xl px-6 mt-20">
        <FeatureShowcase
          icon={Sparkles}
          title="Instant, Insightful Analysis"
          description="The moment you finish writing, Kensho provides a beautiful, AI-powered analysis. Understand your emotions, identify key themes, and receive a thoughtful question to guide your self-reflection even further."
          imageSrc="/ss/feature-insight.png" // Assumes you have this screenshot
        />
        <FeatureShowcase
          icon={CalendarDays}
          title="Revisit Your Journey"
          description="Your calendar transforms into a visual timeline of your personal growth. Click on any day to open a 'Daily Digest,' a curated summary of your thoughts, feelings, and reflections from that day, helping you see how far you've come."
          imageSrc="/ss/feature-calendar.png" // Assumes you have this screenshot
          reverse={true}
        />
        <FeatureShowcase
          icon={BarChart3}
          title="Track Your Progress"
          description="Your personal profile is your sanctuary's command center. Track your total entries, monitor your journaling streaks, and watch as your self-awareness grows over time. It's a powerful motivator to keep your journey going."
          imageSrc="/ss/feature-profile.png" // Assumes you have this screenshot
        />
      </div>

      {/* --- Philosophy / Why Kensho Section --- */}
      <div className="w-full max-w-4xl text-center my-24 px-6">
         <div className="inline-block p-3 bg-white/50 rounded-lg border border-gray-200/80">
            <Lock className="h-8 w-8 text-gray-500" />
        </div>
        <h2 className="text-3xl font-bold font-lora mt-4">Your Sanctuary is Sacred.</h2>
        <p className="text-gray-600 mt-2 max-w-xl mx-auto">
          Privacy isn't an afterthought; it's our foundation. Your journal entries are yours alone. We believe in creating a safe, judgment-free space for your most important conversations.
        </p>
      </div>

      {/* --- Final Call to Action --- */}
      <div className="w-full max-w-4xl text-center bg-white/70 backdrop-blur-xl p-12 rounded-2xl border border-gray-200/80 mb-20">
        <h2 className="text-4xl font-bold font-lora">Ready to Begin?</h2>
        <p className="text-gray-600 mt-2 mb-8">
          Start your journey of self-discovery today.
        </p>
        <Link 
          href="/sign-up"
          className="bg-gradient-to-r from-yellow-400 to-purple-500 text-white font-semibold py-3 px-8 rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300">
             Start for Free
        </Link>
      </div>
    </div>
  );
}