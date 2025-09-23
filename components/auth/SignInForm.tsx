"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Loader2, Mail, Lock } from 'lucide-react';

const SignInForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Sign in user
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* email  */}
      <div>
        {/* label */}
        <Label htmlFor="email-signin" className="text-sm font-medium text-foreground/80">Email address</Label>
        
        {/* input */}
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            id="email-signin"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="pl-10 bg-input border-border/50 focus:ring-primary focus:border-primary"
          />
        </div>

      </div>

      {/* password */}
      <div>
        {/* label */}
        <Label htmlFor="password-signin" className="text-sm font-medium text-foreground/80">Password</Label>
      
        {/* input */}
         <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            id="password-signin"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="pl-10 bg-input border-border/50 focus:ring-primary focus:border-primary"
          />
        </div>
        
      </div>

      {/* submit button */}
      <div>
        <Button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground">
          Sign In
        </Button>
      </div>

    </form>
  );
};

export default SignInForm;
