/*
================================================================================
File: src/components/Features.tsx
================================================================================
*/
"use client";
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { DollarSign, Clock, Wrench, BarChart3 } from 'lucide-react';

const icons: { [key: string]: React.ComponentType<any> } = {
    DollarSign,
    Clock,
    Wrench,
    BarChart3,
};

type Feature = {
    icon: string;
    title: string;
    description: string;
};

export const Features = ({ data }: { data: Feature[] }) => (
    <section id="features" className="w-full py-16 lg:py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-display">Actionable Insights, Not Just Data</h2>
                <p className="max-w-2xl mx-auto mt-4 text-slate-600 dark:text-slate-400">We transform your raw spreadsheets into clear, strategic advantages.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {data.map((feature) => {
                    const Icon = icons[feature.icon];
                    return (
                        <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                            <Card className="text-center p-6 h-full transition-all duration-300 hover:scale-105 hover:shadow-xl dark:hover:shadow-blue-500/10">
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50 mb-4">
                                    <Icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h3 className="text-xl font-bold mb-2 font-display">{feature.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400">{feature.description}</p>
                            </Card>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    </section>
);