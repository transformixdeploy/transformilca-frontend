"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
// import ReportFormModal from '@/components/ReportFormModal';
import { ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-background to-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
      </div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight"
        >
          The World's First All-in-One 
          <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">AI Marketing Analytics</span> Platform
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-2xl sm:text-3xl font-semibold text-muted-foreground mb-8"
        >
          Stop Guessing. Start Growing.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-lg sm:text-xl text-foreground/80 max-w-2xl mx-auto mb-10"
        >
          Transform your marketing strategy with the industry's most advanced AI-powered analytics suite. Get instant, comprehensive reports that reveal exactly what's working, what's not, and what to do next.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          {/* <ReportFormModal>
            <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-primary-foreground shadow-lg transform hover:scale-105">
              Generate Your Complete Analysis Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </ReportFormModal> */}
          <Link href={"/how-it-works"}>
            <Button size="lg" variant="outline" className="group transform hover:scale-105 transition-transform w-full sm:w-auto border-primary/50 hover:bg-primary/10">
              <Zap className="mr-2 h-5 w-5 text-primary group-hover:text-accent transition-colors" /> See AI in Action
            </Button>
          </Link>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default HeroSection;