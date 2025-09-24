"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, LogIn, LogOut, UserCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Header = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    // TODO: Logout user
    
    router.push('/');
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="py-4 px-4 sm:px-8 bg-background/80 backdrop-blur-md sticky top-0 z-50 border-b border-border"
    >
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Logo  */}
        <Link href="/" className="flex items-center space-x-2">
          <Zap className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
            Transformellica
          </span>
        </Link>

        {/* Nav Bar */}
        <nav className="flex items-center space-x-4 sm:space-x-6">
          
          {/* Home  */}
          <Link href="/" className="text-sm sm:text-base text-foreground/80 hover:text-primary transition-colors">Home</Link>
          
          {/* How it works */}
          <Link href="/how-it-works" className="text-sm sm:text-base text-foreground/80 hover:text-primary transition-colors">How It Works</Link>
          
          {/* Sign in / Sign out button  */}
          { false ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                     <UserCircle className="h-7 w-7 text-primary hover:text-primary/80" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">My Account</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        user email goes here
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              // <Button onClick={() => router.push('/auth')} size="sm" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg">
              //   <LogIn className="mr-2 h-4 w-4" /> Sign In
              // </Button>
              <></>
            )
          }

        </nav>


      </div>
    </motion.header>
  );
};

export default Header;
