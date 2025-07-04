/*
================================================================================
File: src/components/Testimonials.tsx
================================================================================
*/
"use client";
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter } from '@/components/ui/card'; // Import Card components from shadcn
import { Star } from 'lucide-react';

type Testimonial = {
    quote: string;
    name: string;
    company: string;
};

export const Testimonials = ({ data }: { data: Testimonial[] }) => (
    <section id="testimonials" className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-display">Trusted by Contractors Like You</h2>
                <p className="max-w-2xl mx-auto mt-4 text-slate-600 dark:text-slate-400">Don't just take our word for it. Here's what our clients are saying.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {data.map((testimonial) => (
                    <motion.div key={testimonial.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                        <Card className="h-full flex flex-col">
                           <CardContent className="p-6 flex-grow">
                                <div className="flex mb-4">{[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />)}</div>
                                <blockquote className="italic text-slate-700 dark:text-slate-300">“{testimonial.quote}”</blockquote>
                            </CardContent>
                            <CardFooter>
                                <div>
                                    <p className="font-semibold">{testimonial.name}</p>
                                    <p className="text-sm text-slate-500">{testimonial.company}</p>
                                </div>
                            </CardFooter>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);