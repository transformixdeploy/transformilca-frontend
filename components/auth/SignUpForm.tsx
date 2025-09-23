"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Loader2, Mail, Lock, User, Briefcase, Building, Phone, Globe } from 'lucide-react';
import { JSX } from 'react';

interface InputField {
  id: string;
  label: string;
  type: string;
  value: string;
  setter: React.Dispatch<React.SetStateAction<string>>;
  icon: JSX.Element;
  placeholder: string;
  required?: boolean;
}

const SignUpForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [jobRole, setJobRole] = useState<string>('');
  const [website, setWebsite] = useState<string>('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TOOD: Sign up user
  };

  const inputFields: InputField[] = [
    { id: 'fullName', label: 'Full Name', type: 'text', value: fullName, setter: setFullName, icon: <User className="h-5 w-5 text-gray-400" />, placeholder: "Your Full Name" },
    { id: 'email-signup', label: 'Email address', type: 'email', value: email, setter: setEmail, icon: <Mail className="h-5 w-5 text-gray-400" />, placeholder: "you@example.com" },
    { id: 'password-signup', label: 'Password', type: 'password', value: password, setter: setPassword, icon: <Lock className="h-5 w-5 text-gray-400" />, placeholder: "Create a password" },
    { id: 'phoneNumber', label: 'Phone Number', type: 'tel', value: phoneNumber, setter: setPhoneNumber, icon: <Phone className="h-5 w-5 text-gray-400" />, placeholder: "+1234567890" },
    { id: 'company', label: 'Company', type: 'text', value: company, setter: setCompany, icon: <Building className="h-5 w-5 text-gray-400" />, placeholder: "Your Company Name" },
    { id: 'jobRole', label: 'Job Role', type: 'text', value: jobRole, setter: setJobRole, icon: <Briefcase className="h-5 w-5 text-gray-400" />, placeholder: "e.g., Marketing Manager" },
    { id: 'website', label: 'Website (Optional)', type: 'url', value: website, setter: setWebsite, icon: <Globe className="h-5 w-5 text-gray-400" />, placeholder: "https://yourcompany.com", required: false },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      
      {/* map through all input fields */}
      {inputFields.map(field => (
        <div key={field.id}>

          {/* label */}
          <Label htmlFor={field.id} className="text-sm font-medium text-foreground/80">{field.label}</Label>
          
          {/* input */}
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {field.icon}
            </div>
            <Input
              id={field.id}
              name={field.id}
              type={field.type}
              required={field.required !== false}
              value={field.value}
              onChange={(e) => field.setter(e.target.value)}
              placeholder={field.placeholder}
              className="pl-10 bg-input border-border/50 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
      ))}
      
      {/* submit button */}
      <div>
        <Button type="submit" className="mt-3 w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground">
          Sign Up
        </Button>
      </div>
    </form>
  );
};

export default SignUpForm;
