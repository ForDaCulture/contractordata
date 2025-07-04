/*
================================================================================
File: src/components/DashboardPreview.tsx
================================================================================
*/
"use client";
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

export const DashboardPreview = () => (
    <section id="dashboard" className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-display">Your Business at a Glance</h2>
                <p className="max-w-2xl mx-auto mt-4 text-slate-600 dark:text-slate-400">Our dashboards are designed for clarity, giving you the power to make informed decisions quickly.</p>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                <Card className="overflow-hidden shadow-2xl">
                    <img src="https://placehold.co/1200x783/0f172a/e0e7ff/png?text=Job+Profitability+Dashboard&font=poppins" alt="Contractor Data Insights Dashboard Preview" className="w-full h-auto object-cover" />
                </Card>
            </motion.div>
        </div>
    </section>
);