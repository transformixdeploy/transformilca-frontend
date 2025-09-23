"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle as CardTitleComponent } from './ui/card';
// import { useToast } from './ui/use-toast';
import { Loader2, CheckCircle } from 'lucide-react';
import ProgressBar from './ProgressBar';
import MotivationalMessage from './MotivationalMessage';
import ServiceSelectionStep from './form/ServiceSelectionStep';
import QuestionRenderer from './form/QuestionRenderer';
import FormNavigation from './form/FormNavigation';
import { services, getQuestionsForService, Service, Question } from '../lib/formConfig';
import { useRouter } from 'next/navigation';

const slideVariants: Variants = {
  enter: (direction: number) => ({ x: direction > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction < 0 ? '100%' : '-100%', opacity: 0 }),
}; 

interface FormData {
  [key: string]: string | File | null;
}

interface FormErrors {
  [key: string]: string;
}

interface MultiStepFormWizardProps {
  onClose?: () => void; // Added onClose prop
}

// As this wizard is being called by another page that renders a modal to show this 
// wizard so the page should page the "onClose" function so the wizard can use it to close the modal that was opened earlier
const MultiStepFormWizard: React.FC<MultiStepFormWizardProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [formData, setFormData] = useState<FormData>({});
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [direction, setDirection] = useState<number>(0);
  const router = useRouter();
  // const { toast } = useToast();

  const wizardSteps: Question[] = selectedService ? getQuestionsForService(selectedService.id) : [];
  const totalQuestionSteps: number = selectedService ? wizardSteps.length : 0;
  const totalWizardableSteps: number = totalQuestionSteps + 1; 
  const progress: number = selectedService ? ((currentStep) / totalWizardableSteps) * 100 : 0;

  const validateField = (id: string, value: string | File | null): string => {
    const question = wizardSteps.find(q => q.id === id);
    if (!question || !question.required) return '';
    if (question.type === 'file' && (!value)) return `${question.label} is required.`;
    if (typeof value === 'string' && !value.trim()) return `${question.label} is required.`;
    if (question.type === 'url') {
      try {
        if (typeof value === 'string') new URL(value);
        else return 'Please enter a valid URL (e.g., https://example.com).';
      } catch (_) {
        return 'Please enter a valid URL (e.g., https://example.com).';
      }
    }
    return '';
  };

  // we will pass this function to the "ServiceSelectionStep" component so it can use this function to set the "selectedService" variable here 
  // as the "ServiceSelectionStep" component is expecting a function called "onSelect()" in its props
  const handleServiceSelect = (service: Service) => {
    setDirection(1);
    setSelectedService(service);
    setCurrentStep(1);
    setFormData({}); 
    setFormErrors({});
  };

  // we will pass this function to the "QuestionRenderer" component so it can use this function to set the "formData" variable here
  // basically add new field to the "formData" variable
  const handleChange = (id: string, value: string | File | null) => {
    setFormData(prev => ({ ...prev, [id]: value }));
    if (formErrors[id]) {
      setFormErrors(prev => ({ ...prev, [id]: validateField(id, value) }));
    }
  };

  const currentQuestion = currentStep > 0 && selectedService ? wizardSteps[currentStep - 1] : null;

  const handleNext = () => {
    if (currentStep > 0 && currentQuestion) {
      const error = validateField(currentQuestion.id, formData[currentQuestion.id]);
      if (error) {
        setFormErrors(prev => ({ ...prev, [currentQuestion.id]: error }));
        return;
      }
      setFormErrors(prev => ({ ...prev, [currentQuestion.id]: '' }));
    }
    setDirection(1);
    if (currentStep < totalQuestionSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    setDirection(-1);
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  const handleSubmit = async () => {
    // No user concept, no authentication check
    
    
    const submissionData = {
      service_id: selectedService?.id,
      service_name: selectedService?.name,
      company_name: formData.companyName || null,
      business_description: formData.businessDescription || null,
      goal: formData.goal || null,
      country: formData.country || null,
      instagram_link: formData.instagramLink || null,
      website_url: formData.websiteUrl || null,
      website_url_sentiment: formData.websiteUrlSentiment || null,
      google_maps_link: formData.googleMapsLink || null,
      trustpilot_link: formData.trustpilotLink || null,
      other_reviews_link: formData.otherReviewsLink || null,
      logo_upload_details: formData.logoUpload instanceof File ? `File: ${formData.logoUpload.name} (Type: ${formData.logoUpload.type}, Size: ${formData.logoUpload.size} bytes)` : null,
      brand_guidelines_upload_details: formData.brandGuidelinesUpload instanceof File ? `File: ${formData.brandGuidelinesUpload.name} (Type: ${formData.brandGuidelinesUpload.type}, Size: ${formData.brandGuidelinesUpload.size} bytes)` : null,
      raw_form_data: formData 
    };

    console.log(submissionData);
    

    try {

      if (onClose) {
        onClose(); // Call onClose to close the modal
      }
      setTimeout(() => {
        setSelectedService(null);
        setCurrentStep(0);
        setFormData({});
      }, 500);

    } catch (error: any) {
      console.error('Supabase submission error:', error);
    }
  };
  
  const isCurrentFieldValid = currentQuestion ? !validateField(currentQuestion.id, formData[currentQuestion.id]) : true;
  
  const wizardContent = (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className="flex flex-col flex-grow">
      <CardHeader className="items-center">
        <CardTitleComponent className="text-xl md:text-2xl text-center font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
          {selectedService ? selectedService.name : "Craft Your AI Analysis Report"}
        </CardTitleComponent>
        {currentStep === 0 && (
          // <DialogDescription className="text-center text-muted-foreground pt-1 text-sm md:text-base">
          <p className="text-center text-muted-foreground pt-1 text-sm md:text-base">
            What type of analysis are you looking for?
          </p>
        )}
      </CardHeader>

      {selectedService && currentStep > 0 && (
        <div className="px-4 md:px-6 pt-2 pb-2 md:pb-4">
          <ProgressBar progress={progress} currentStep={currentStep} totalSteps={totalQuestionSteps} />
          <MotivationalMessage progress={progress} />
        </div>
      )}
      
      <CardContent className="pt-0 px-4 md:px-6 py-4 flex-grow overflow-y-auto relative min-h-[250px] md:min-h-[300px]">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          {!selectedService || currentStep === 0 ? (
            <ServiceSelectionStep
              key="serviceSelection"
              services={services}
              onSelect={handleServiceSelect}
              direction={direction}
              variants={slideVariants}
            />
          ) : currentStep <= totalQuestionSteps && currentQuestion ? (
            <QuestionRenderer
              key={`question-${currentQuestion.id}`}
              question={currentQuestion}
              value={formData[currentQuestion.id] || ''}
              error={formErrors[currentQuestion.id]}
              onChange={handleChange}
              onFileChange={handleChange} 
              direction={direction}
              variants={slideVariants}
            />
          ) : (
            <motion.div
              key="finalConfirmation"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'spring', stiffness: 300, damping: 30, duration: 0.3 }}
              className="text-center space-y-3 md:space-y-4 flex flex-col items-center justify-center h-full"
            >
              <CheckCircle className="w-12 h-12 md:w-16 md:h-16 text-green-500 mx-auto" />
              <h3 className="text-lg md:text-xl font-semibold">All Set!</h3>
              <p className="text-muted-foreground text-sm md:text-base">You've answered all questions. Ready to submit your request?</p>
            </motion.div>
          )}

          {/*isSubmitting && (
            <motion.div 
              key="submitting"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-card/80 backdrop-blur-sm z-50"
            >
              <Loader2 className="h-10 w-10 md:h-12 md:w-12 animate-spin text-primary mb-3 md:mb-4" />
              <p className="text-md md:text-lg font-medium text-foreground">Submitting your request...</p>
              <p className="text-xs md:text-sm text-muted-foreground">This might take a moment.</p>
            </motion.div>
          )*/}
        </AnimatePresence>
      </CardContent>

      <div className="p-6 pt-2 border-t border-border/30">
        <FormNavigation
          currentStep={currentStep}
          totalSteps={totalQuestionSteps}
          onBack={handleBack}
          onNext={handleNext}
          isSubmitting={false}
          isContinueDisabled={!!(currentQuestion && currentQuestion.required && !isCurrentFieldValid)}
          showCancel={false} // Always hide cancel button
          submitButtonText="Submit Request"
        />
        {/* Removed conditional cancel button for modal version */}
      </div>
    </motion.div>
  );

  return (
    <Card className="w-full max-w-xl mx-auto shadow-xl max-h-full overflow-y-auto">
      {wizardContent}
    </Card>
  );
};

export default MultiStepFormWizard;
