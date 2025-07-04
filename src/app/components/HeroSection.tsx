/*
================================================================================
File: src/components/HeroSection.tsx
================================================================================
*/
"use client";
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export const HeroSection = ({ onScroll }: { onScroll: (id: string) => void }) => (
    <section id="home" className="w-full py-20 lg:py-32">
        <div className="container mx-auto text-center px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter mb-6 font-display">Turn Your Job Data Into Profit</h1>
                <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10">Stop guessing. We analyze your job data to find hidden cost savings and efficiency gains, empowering you to make smarter business decisions.</p>
                <div className="flex justify-center gap-4">
                    <Button onClick={() => onScroll('#upload')} size="lg">Get Your Free Analysis</Button>
                    <Button onClick={() => onScroll('#features')} variant="outline" size="lg">Learn More</Button>
                </div>
            </motion.div>
        </div>
    </section>
);