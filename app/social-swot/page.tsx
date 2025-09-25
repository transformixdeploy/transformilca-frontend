"use client";
import { localStorageDataNames } from '@/lib/constants';
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

const SocialSWOT = () => {
  const router = useRouter();

  const [data, setData] = useState({
    analysisTitle: "",
    followers: 0,
    following: 0,
    engagementRate: 0,
    profileInfo: {
      basicInfo: {
        name: "",
        bio: "",
        verified: false,
        private: true,
        website: ""
      },
      additionalMetrics: {
        postsCount: 0,
        averageLikes: 0,
        averageComments: 0,
        EngagementPerPost: 0
      }
    },
    topHashTags: [
      { tag: "", frequency: 0 }
    ],
    fullSocialAnalysis: "",
    competitiveAnalysis: [""]
  });

  useEffect(() => {
    if (!localStorage.getItem(localStorageDataNames.SOCIAL_MEDIA_SWOT)) {
      return router.push("/");
    }
    setData(JSON.parse(localStorage.getItem(localStorageDataNames.SOCIAL_MEDIA_SWOT)!));
  }, []);

  function handleDeleteAnalysis() {
    localStorage.removeItem(localStorageDataNames.SOCIAL_MEDIA_SWOT);
    router.push("/");
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      
      {/* title */}
      <header className="mb-12">
        <h1 className="text-5xl font-extrabold text-center text-white mb-4 break-words">
          {data.analysisTitle || "Social Media Analysis"}
        </h1>
        <p className="text-center text-gray-400 text-lg mb-6">
          Detailed insights into your social media performance and competitive landscape.
        </p>
        <div className="flex justify-center">
          <Button onClick={handleDeleteAnalysis} size="lg" className="bg-background text-red-600 hover:bg-background/90 shadow-lg transform hover:scale-105">
            Delete this analysis
          </Button>
        </div>
      </header>

      {/* 3 cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-gray-800 rounded-lg shadow-xl p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-200 mb-2">Followers</h2>
          <p className="text-5xl font-bold text-purple-400">{data.followers}</p>
        </div>
        <div className="bg-gray-800 rounded-lg shadow-xl p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-200 mb-2">Following</h2>
          <p className="text-5xl font-bold text-teal-400">{data.following}</p>
        </div>
        <div className="bg-gray-800 rounded-lg shadow-xl p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-200 mb-2">Engagement Rate</h2>
          <p className="text-5xl font-bold text-pink-400">{data.engagementRate}%</p>
        </div>
      </section>

      {/* profile */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Profile Information */}
        <div className="bg-gray-800 rounded-lg shadow-xl p-8 border border-gray-700">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Profile Information</h2>
          <div className="space-y-4 text-lg">
            <p><span className="font-semibold text-gray-300">Name:</span> {data.profileInfo.basicInfo.name}</p>
            <p><span className="font-semibold text-gray-300">Bio:</span> {data.profileInfo.basicInfo.bio}</p>
            <p><span className="font-semibold text-gray-300">Verified:</span> {data.profileInfo.basicInfo.verified ? 'Yes' : 'No'}</p>
            <p><span className="font-semibold text-gray-300">Private:</span> {data.profileInfo.basicInfo.private ? 'Yes' : 'No'}</p>
            <p><span className="font-semibold text-gray-300">Website:</span> <Link href={data.profileInfo.basicInfo.website} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{data.profileInfo.basicInfo.website}</Link></p>
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="bg-gray-800 rounded-lg shadow-xl p-8 border border-gray-700">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Additional Metrics</h2>
          <div className="space-y-4 text-lg">
            <p><span className="font-semibold text-gray-300">Posts Count:</span> {data.profileInfo.additionalMetrics.postsCount}</p>
            <p><span className="font-semibold text-gray-300">Average Likes:</span> {data.profileInfo.additionalMetrics.averageLikes}</p>
            <p><span className="font-semibold text-gray-300">Average Comments:</span> {data.profileInfo.additionalMetrics.averageComments}</p>
            <p><span className="font-semibold text-gray-300">Engagement Per Post:</span> {data.profileInfo.additionalMetrics.EngagementPerPost}</p>
          </div>
        </div>
      </section>

      {/* Top Hashtags Chart */}
      <section className="mb-12">
        <h2 className="text-4xl font-bold text-white mb-8 text-center">Top Hashtags Usage</h2>
        <div className="bg-gray-800 rounded-lg shadow-xl p-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data.topHashTags}
              margin={{
                top: 20, right: 30, left: 20, bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
              <XAxis dataKey="tag" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip />
              <Legend />
              <Bar dataKey="frequency" fill="#82ca9d" name="Frequency" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Full Social Analysis */}
      <section className="mb-12">
        <h2 className="text-4xl font-bold text-white mb-8 text-center">Full Social Analysis</h2>
        <div className="bg-gray-800 rounded-lg shadow-xl p-8 border border-gray-700">
          <div className="prose prose-invert text-gray-300 leading-relaxed">
            <ReactMarkdown>
              {data.fullSocialAnalysis}
            </ReactMarkdown>
          </div>
        </div>
      </section>

      {/* Competitive Analysis */}
      <section className="mb-12">
        <h2 className="text-4xl font-bold text-white mb-8 text-center">Competitive Analysis</h2>
        <div className="bg-gray-800 rounded-lg shadow-xl p-8 border border-gray-700">
          <ul className="list-disc text-gray-300 leading-relaxed">
            {data.competitiveAnalysis.map((item, index) => (
              <li key={index}><ReactMarkdown>{item}</ReactMarkdown></li>
            ))}
          </ul>
        </div>
      </section>

    </div>
  );
};

export default SocialSWOT;