// app/page.js
'use client';

import Navbar from '@/components/shared/Navbar';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, CalendarDays, BarChart3, Lock } from 'lucide-react';
import Footer from '@/components/shared/Footer';

// A reusable component for showcasing features
const FeatureShowcase = ({ icon: Icon, title, description, imageSrc, reverse = false }) => (
    <div className={`grid grid-cols-1 md:grid-cols-2 items-center gap-16 py-16 ${reverse ? 'md:grid-flow-row-dense' : ''}`}>
        <div className={`order-2 ${reverse ? 'md:order-1' : 'md:order-2'}`}>
            <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-500/10 rounded-xl">
                    <Icon className="h-7 w-7 text-purple-500" />
                </div>
                <h3 className="text-3xl font-bold font-lora text-gray-800">{title}</h3>
            </div>
            <p className="mt-5 text-gray-600 leading-relaxed text-lg">
                {description}
            </p>
        </div>
        <div className={`order-1 ${reverse ? 'md:order-2' : 'md:order-1'}`}>
            <img src={imageSrc} alt={title} className="rounded-2xl shadow-2xl border-4 border-white" />
        </div>
    </div>
);


export default function Home() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: 'easeOut' }
        }
    };

    // Animation variants for the scrolling sections
    const scrollAnimationVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    return (
        <div className="min-h-screen text-gray-900 flex flex-col items-center p-4 overflow-x-hidden">
            <Navbar />
            <main className="w-full flex-grow flex flex-col items-center">
                {/* --- Hero Section --- */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="w-full max-w-4xl text-center pt-48 pb-16"
                >
                    <motion.h1
                        variants={itemVariants}
                        className="text-6xl md:text-7xl font-bold font-lora mb-6 leading-tight"
                    >
                        The Journal That Talks Back.
                    </motion.h1>
                    <motion.p
                        variants={itemVariants}
                        className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto"
                    >
                        Unlock your inner wisdom through interactive, AI-powered journaling. Kensho is your private sanctuary for reflection and growth.
                    </motion.p>
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row justify-center items-center gap-4"
                    >
                        <Link
                            href="/sign-up"
                            className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-orange-400 text-white font-semibold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-lg">
                            Start Your Journey
                        </Link>
                    </motion.div>
                </motion.div>

                {/* --- Features Section --- */}
                <div className="w-full max-w-4xl px-6">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-2 items-center gap-16 py-16"
                    >
                        {/* NOTE: Corrected the order. Image is now on the left on desktop (md:order-1) */}
                        <motion.div variants={itemVariants} className="order-1 md:order-1">
                            <img src="/ss/feature-insight.png" alt="Instant, Insightful Analysis" className="rounded-2xl shadow-2xl border-4 border-white" />
                        </motion.div>
                        {/* Text is on the right on desktop (md:order-2) */}
                        <motion.div variants={itemVariants} className="order-2 md:order-2">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-purple-500/10 rounded-xl">
                                    <Sparkles className="h-7 w-7 text-purple-500" />
                                </div>
                                <h3 className="text-3xl font-bold font-lora text-gray-800">Instant, Insightful Analysis</h3>
                            </div>
                            <p className="mt-5 text-gray-600 leading-relaxed text-lg">
                                The moment you finish writing, Kensho provides a beautiful, AI-powered analysis. Understand your emotions, identify key themes, and receive a thoughtful question to guide your self-reflection even further.
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Second feature has scroll animation */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={scrollAnimationVariants}
                    >
                        <FeatureShowcase
                            icon={CalendarDays}
                            title="Revisit Your Journey"
                            description="Your calendar transforms into a visual timeline of your personal growth. Click on any day to open a 'Daily Digest,' a curated summary of your thoughts, feelings, and reflections from that day."
                            imageSrc="/ss/feature-calendar.png"
                            reverse={true}
                        />
                    </motion.div>

                    {/* Third feature has scroll animation */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={scrollAnimationVariants}
                    >
                        <FeatureShowcase
                            icon={BarChart3}
                            title="Track Your Progress"
                            description="Your personal profile is your sanctuary's command center. Track your total entries, monitor your journaling streaks, and watch as your self-awareness grows over time. A powerful motivator to keep your journey going."
                            imageSrc="/ss/feature-profile.png"
                        />
                    </motion.div>
                </div>

                {/* --- Philosophy / Why Kensho Section --- */}
                <div className="w-full max-w-4xl text-center my-24 px-6">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="inline-block p-4 bg-white/60 rounded-xl border border-gray-200/80 shadow-md"
                    >
                        <Lock className="h-10 w-10 text-gray-500" />
                    </motion.div>
                    <h2 className="text-4xl font-bold font-lora mt-6">Your Sanctuary is Sacred.</h2>
                    <p className="text-lg text-gray-600 mt-4 max-w-xl mx-auto">
                        Privacy isn't an afterthought; it's our foundation. Your journal entries are yours alone. We believe in creating a safe, judgment-free space for your most important conversations.
                    </p>
                </div>

                {/* --- Final Call to Action --- */}
                <div className="w-full max-w-4xl text-center bg-white/70 backdrop-blur-xl p-16 rounded-3xl border border-gray-200/80 mb-20 shadow-xl">
                    <h2 className="text-5xl font-bold font-lora">Ready to Begin?</h2>
                    <p className="text-xl text-gray-600 mt-4 mb-10">
                        Start your journey of self-discovery today. It's free.
                    </p>
                    <Link
                        href="/sign-up"
                        className="bg-gradient-to-r from-purple-500 to-orange-400 text-white font-semibold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-lg">
                        Start for Free
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    );
}