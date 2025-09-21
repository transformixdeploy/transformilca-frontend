import React from 'react';
import { BarChartBig, Globe, Brain, Palette, Package, FileText, Image as ImageIcon } from 'lucide-react';

export const services = [
  { id: 'social_media_swot', name: 'Social Media SWOT Analysis', icon: <BarChartBig className="w-6 h-6 mb-1 text-primary" />, description: "Analyze social media strengths, weaknesses, opportunities, threats." },
  { id: 'website_audit_swot', name: 'Website Audit SWOT', icon: <Globe className="w-6 h-6 mb-1 text-primary" />, description: "SWOT analysis of website performance and structure." },
  { id: 'customer_sentiment', name: 'Customer Sentiment Analysis', icon: <Brain className="w-6 h-6 mb-1 text-primary" />, description: "Understand customer perception from online reviews." },
  { id: 'branding_audit', name: 'Branding Audit', icon: <Palette className="w-6 h-6 mb-1 text-primary" />, description: "Evaluate brand identity, consistency, and positioning." },
  { id: 'all_in_one', name: 'All-in-One Package', icon: <Package className="w-6 h-6 mb-1 text-primary" />, description: "Comprehensive: social, website, sentiment, branding." },
];

export const questionsConfig = {
  common: [
    { id: 'companyName', label: "Company Name?", type: 'text', placeholder: "e.g., Transformix Inc.", required: true },
    { id: 'businessDescription', label: "Business Description (for a 6th grader)?", type: 'textarea', placeholder: "e.g., We help businesses grow online!", required: true },
    { id: 'goal', label: "Main Goal for this Analysis?", type: 'text', placeholder: "e.g., Increase engagement", required: true },
    { id: 'country', label: "Primary Target Audience Country?", type: 'text', placeholder: "e.g., United States", required: true },
  ],
  social_media_swot: [
    { id: 'instagramLink', label: "Instagram Profile Link?", type: 'url', placeholder: "https://instagram.com/yourprofile", required: true },
  ],
  website_audit_swot: [
    { id: 'websiteUrl', label: "Company Website URL?", type: 'url', placeholder: "https://yourcompany.com", required: true },
  ],
  customer_sentiment: [
    { id: 'websiteUrlSentiment', label: "Company Website URL (for context)?", type: 'url', placeholder: "https://yourcompany.com", required: true },
    { id: 'googleMapsLink', label: "Google Maps Business Profile Link?", type: 'url', placeholder: "https://maps.google.com/?cid=...", required: false },
    { id: 'trustpilotLink', label: "Trustpilot Page Link (optional)?", type: 'url', placeholder: "https://trustpilot.com/review/yourcompany", required: false },
    { id: 'otherReviewsLink', label: "Other Review Links (optional, comma-separated)?", type: 'text', placeholder: "e.g., Yelp, Capterra", required: false },
  ],
  branding_audit: [
    { id: 'logoUpload', label: "Upload Company Logo", type: 'file', accept: 'image/*', required: true, icon: <ImageIcon className="w-4 h-4 mr-2" /> },
    { id: 'brandGuidelinesUpload', label: "Upload Brand Guidelines PDF (optional)", type: 'file', accept: '.pdf', required: false, icon: <FileText className="w-4 h-4 mr-2" /> },
  ],
};

export const getQuestionsForService = (serviceId) => {
  let serviceQuestions = [];
  const commonQuestions = JSON.parse(JSON.stringify(questionsConfig.common)); 

  if (serviceId === 'all_in_one') {
    serviceQuestions = [
      ...questionsConfig.social_media_swot,
      ...questionsConfig.website_audit_swot,
      ...questionsConfig.customer_sentiment.filter(q => q.id !== 'websiteUrlSentiment'), 
      ...questionsConfig.branding_audit,
    ];
    
    const websiteUrlFromWebsiteAudit = questionsConfig.website_audit_swot.find(q => q.id === 'websiteUrl');
    if (websiteUrlFromWebsiteAudit) {
        const existingWebsiteQuestion = serviceQuestions.find(q => q.id === 'websiteUrl');
        if(!existingWebsiteQuestion) {
            serviceQuestions.unshift(websiteUrlFromWebsiteAudit);
        }
    }

    const uniqueQuestions = [];
    const questionIds = new Set();
    for (const q of serviceQuestions) {
      if (!questionIds.has(q.id)) {
        uniqueQuestions.push(q);
        questionIds.add(q.id);
      }
    }
    serviceQuestions = uniqueQuestions;
  } else {
    serviceQuestions = questionsConfig[serviceId] ? [...questionsConfig[serviceId]] : [];
  }
  
  if (serviceId === 'social_media_swot') {
     const businessDescriptionSocial = commonQuestions.find(q => q.id === 'businessDescription');
     if (businessDescriptionSocial) {
        businessDescriptionSocial.label = "Business Description?";
     }
  }


  return [...commonQuestions, ...serviceQuestions];
};
