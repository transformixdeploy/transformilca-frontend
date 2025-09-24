"use client";

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import ReactMarkdown from 'react-markdown'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const WebsiteSWOT = () => {
  
    const router = useRouter();

    const [data, setData] = useState({
        "pageSpeedScore": 0,
        "internalLinks": 0,
        "externalLinks": 0,
        "contentInfo": {
            "imagesCount": 0,
            "imagesMissingAltTage": 0
        },
        "pageInfo": {
            "title": "",
            "titleLength": 0,
            "metaDescription": "",
            "metaDescriptionLength": 0,
            "https": false,
            "canonicalUrl": ""
        },
        "headingStructure": {
            "h1Tages": [""],
            "h2Tages": [""],
            "h3Tages": [""],
            "h4Tages": [""],
            "h5Tages": [""],
            "h6Tages": [""]
        },
        "schemaMarkup": [""],
        "socialLinks": [""],
        "openGraphTags": {
            "title": "",
            "description": "",
            "url": "",
            "type": "",
            "siteName": ""
        },
        "summary": "",
        "fullSocialAnalysis": ""
    });

    useEffect(()=>{
        
        if(!localStorage.getItem("websiteSWOTData")){
            return router.push("/");
        }

        setData(JSON.parse(localStorage.getItem("websiteSWOTData")!));

    }, []);

  return (
    <div className="container mx-auto py-8">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0 }}
        className="text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-primary via-secondary to-accent text-transparent bg-clip-text font-display"
      >
        Website SWOT Analysis
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        

        {/* Heading Structure */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className='row-span-6'
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold border-b-4 p-1">Heading Structure</CardTitle>
            </CardHeader>
            <CardContent className="text-foreground space-y-2">
              
              <div className='mb-3'>
                <div className='text-secondary font-bold'>H1 Tags: </div>
                <div className='flex flex-col'>
                    {data.headingStructure.h1Tages.map((tag, index)=>(
                        tag.length > 0 ? <span key={index} className='me-3'> <span className='text-white font-extrabold '>-</span> {tag},</span> : <p key={index}></p>
                    ))}
                </div>
              </div>

              <div className='mb-3'>
                <div className='text-secondary font-bold'>H2 Tags: </div>
                <div className='flex flex-col'>
                    {data.headingStructure.h2Tages.map((tag, index)=>(
                        tag.length > 0 ? <span key={index} className='me-3'> <span className='text-white font-extrabold '>-</span> {tag},</span> : <p key={index}></p>
                    ))}
                </div>
              </div>

              <div className='mb-3'>
                <div className='text-secondary font-bold'>H3 Tags: </div>
                <div className='flex flex-col'>
                    {data.headingStructure.h3Tages.map((tag, index)=>(
                        tag.length > 0 ? <span key={index} className='me-3'> <span className='text-white font-extrabold '>-</span> {tag},</span> : <p key={index}></p>
                    ))}
                </div>
              </div>
              
              <div className='mb-3'>
                <div className='text-secondary font-bold'>H4 Tags: </div>
                <div className='flex flex-col'>
                    {data.headingStructure.h4Tages.map((tag, index)=>(
                        tag.length > 0 ? <span key={index} className='me-3'> <span className='text-white font-extrabold '>-</span> {tag},</span> : <p key={index}></p>
                    ))}
                </div>
              </div>
              
              <div className='mb-3'>
                <div className='text-secondary font-bold'>H5 Tags: </div>
                <div className='flex flex-col'>
                    {data.headingStructure.h5Tages.map((tag, index)=>(
                        tag.length > 0 ? <span key={index} className='me-3'> <span className='text-white font-extrabold '>-</span> {tag},</span> : <p key={index}></p>
                    ))}
                </div>
              </div>
              
              <div className='mb-3'>
                <div className='text-secondary font-bold'>H6 Tags: </div>
                <div className='flex flex-col'>
                    {data.headingStructure.h6Tages.map((tag, index)=>(
                        tag.length > 0 ? <span key={index} className='me-3'> <span className='text-white font-extrabold '>-</span> {tag},</span> : <p key={index}></p>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>


        {/* Page Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold border-b-4 p-1">Page Details</CardTitle>
            </CardHeader>
            <CardContent className="text-foreground space-y-2">
              <p><strong>Title:</strong> <span className="text-secondary">{data.pageInfo.title}</span> ({data.pageInfo.titleLength} chars)</p>
              <p><strong>Meta Description:</strong> <span className="text-secondary">{data.pageInfo.metaDescription}</span> ({data.pageInfo.metaDescriptionLength} chars)</p>
              <p><strong>HTTPS:</strong> <span className="text-green-500">{data.pageInfo.https ? 'Yes' : 'No'}</span></p>
              <strong className='me-2'>Canonical URL:</strong>
              <Link href={data.pageInfo.canonicalUrl} className='text-blue-600 underline hover:text-primary' >{data.pageInfo.canonicalUrl}</Link>
            </CardContent>
          </Card>
        </motion.div>

        {/* Open Graph Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold border-b-4 p-1">Open Graph Tags</CardTitle>
            </CardHeader>
            <CardContent className="text-foreground space-y-2">
              <p><strong>Title:</strong> <span className="text-secondary">{data.openGraphTags.title}</span></p>
              <p><strong>Description:</strong> <span className="text-secondary">{data.openGraphTags.description}</span></p>
              <p><strong>Type:</strong> <span className="text-secondary">{data.openGraphTags.type}</span></p>
              <p><strong>Site Name:</strong> <span className="text-secondary">{data.openGraphTags.siteName}</span></p>
              <strong>URL:</strong> <Link href={data.openGraphTags.url} className="text-blue-600 underline hover:text-primary">{data.openGraphTags.url}</Link>
            </CardContent>
          </Card>
        </motion.div>

        

        {/* Page Speed and Link Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold border-b-4 p-1">Performance & Links</CardTitle>
            </CardHeader>
            <CardContent className="text-foreground space-y-2">
              <p>Page Speed Score: <span className="text-secondary">{data.pageSpeedScore}</span></p>
              <p>Internal Links: <span className="text-secondary">{data.internalLinks}</span></p>
              <p>External Links: <span className="text-secondary">{data.externalLinks}</span></p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Content Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold border-b-4 p-1">Content Overview</CardTitle>
            </CardHeader>
            <CardContent className="text-foreground space-y-2">
              <p>Images Count: <span className="text-secondary">{data.contentInfo.imagesCount}</span></p>
              <p>Images Missing Alt Tags: <span className="text-destructive">{data.contentInfo.imagesMissingAltTage}</span></p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold border-b-4 p-1">Social Links</CardTitle>
            </CardHeader>
            <CardContent className="text-foreground space-y-2">
              <ul className='ms-5'>
                {data.socialLinks.map((link, index)=>(
                    <li key={index} className='list-disc break-all overflow-hidden'>
                        <Link href={link} className='text-blue-600 underline hover:text-primary'><div className='bg-white inline-block w-1.5 h-1.5 rounded-4xl me-3'></div>{link}</Link>
                    </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>


        {/* Schema Markup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold border-b-4 p-1">Schema Markup</CardTitle>
            </CardHeader>
            <CardContent className="text-foreground space-y-2">
              {data.schemaMarkup.map((markup, index)=>(
                <span key={index} className='me-3'>{markup},</span>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        

        
      </div>

      {/* Summary */}
      <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-5"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold border-b-4 p-1">Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-foreground">
              <ReactMarkdown>{data.summary}</ReactMarkdown>
            </CardContent>
          </Card>
        </motion.div>

        {/* Full Social Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="mt-5"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold border-b-4 p-1">Full Social Analysis</CardTitle>
            </CardHeader>
            <CardContent className="text-foreground">
              <ReactMarkdown>{data.fullSocialAnalysis}</ReactMarkdown>
            </CardContent>
          </Card>
        </motion.div>
    </div>
  );
};

export default WebsiteSWOT;