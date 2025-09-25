"use client";
import { localStorageDataNames } from '@/lib/constants';
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, ZAxis, Label } from 'recharts';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';

const SentimentAnalysis = () => {

    const router = useRouter();  
    
    const [data, setData] = useState({
          analysisTitle: "",
          competitorsAnalyzedNumber: 0,
          totalReview: 0,
          avgGoogleRating: 0,
          competitorsAnalyzed: [
              {
                  name: "",
                  googleRating: 0,
                  reviewsAnalyzed: 0,
                  positivePercentage: 0,
                  negativePercentage: 0,
                  avgSentiment: 0
              }
          ],
          competitorsDetails: [
              {
                  address: "",
                  googleMaps: "",
                  aiInsights: ""
              }
          ],
          competitorSentimentComparisonChart: [
              { name: "", negative: 0, positive: 0, neutral: 0 }
          ],
          competitorRating_averageSentiment_chart: [
              { googleRating: 0, averageSentiment: 0, competitorName: "" }
          ],
          pieChart: {
              title: "",
              positive: 0,
              negative: 0,
              neutral: 0
          },
          reviewsAnalyzedPerCompetitor: [
              { name: "", reviews: 0 },
          ]
      });

    useEffect(()=>{
        
      if(!localStorage.getItem(localStorageDataNames.SENTIMENT_ANALYSIS)){
          return router.push("/");
      }

      setData(JSON.parse(localStorage.getItem(localStorageDataNames.SENTIMENT_ANALYSIS)!));

    }, []);

    function handleDeleteAnalysis(){
      localStorage.removeItem(localStorageDataNames.SENTIMENT_ANALYSIS);
      router.push("/");
    }

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
            
            {/* title */}
            <header className="mb-12">
                <h1 className="text-5xl font-extrabold text-center text-white mb-4">
                    {data.analysisTitle}
                </h1>
                <p className="text-center text-gray-400 text-lg">
                    Comprehensive insights into your customer sentiment and competitive landscape.
                </p>
                <div className="flex justify-center mt-6">
                  <Button onClick={handleDeleteAnalysis} size="lg" className="bg-background text-red-600 hover:bg-background/90 shadow-lg transform hover:scale-105">
                    Delete this analysis
                  </Button>
                </div>
            </header>

            {/* first 3 crads */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                <div className="bg-gray-800 rounded-lg shadow-xl p-6 text-center">
                    <h2 className="text-xl font-semibold text-gray-200 mb-2">Total Competitors Analyzed</h2>
                    <p className="text-5xl font-bold text-blue-400">{data.competitorsAnalyzedNumber}</p>
                </div>
                <div className="bg-gray-800 rounded-lg shadow-xl p-6 text-center">
                    <h2 className="text-xl font-semibold text-gray-200 mb-2">Total Reviews Analyzed</h2>
                    <p className="text-5xl font-bold text-green-400">{data.totalReview}</p>
                </div>
                <div className="bg-gray-800 rounded-lg shadow-xl p-6 text-center">
                    <h2 className="text-xl font-semibold text-gray-200 mb-2">Average Google Rating</h2>
                    <p className="text-5xl font-bold text-yellow-400">{data.avgGoogleRating.toFixed(1)} ⭐</p>
                </div>
            </section>

            {/* competitors break down */}
            <section className="mb-12">
                <h2 className="text-4xl font-bold text-white mb-8 text-center">Competitor Breakdown</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {data.competitorsAnalyzed.map((competitor, index) => (
                        <div key={index} className="bg-gray-800 rounded-lg shadow-xl p-8 border border-gray-700 hover:border-blue-500 transition-all duration-300">
                            <h3 className="text-3xl font-bold text-blue-400 mb-4">{competitor.name}</h3>
                            <div className="space-y-3 text-lg">
                                <p><span className="font-semibold text-gray-300">Google Rating:</span> <span className="text-yellow-400">{competitor.googleRating.toFixed(1)} ⭐</span></p>
                                <p><span className="font-semibold text-gray-300">Reviews Analyzed:</span> {competitor.reviewsAnalyzed}</p>
                                <p><span className="font-semibold text-gray-300">Positive:</span> <span className="text-green-400">{competitor.positivePercentage}%</span></p>
                                <p><span className="font-semibold text-gray-300">Negative:</span> <span className="text-red-400">{competitor.negativePercentage}%</span></p>
                                <p><span className="font-semibold text-gray-300">Average Sentiment:</span> {competitor.avgSentiment.toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Charts Section */}
            <section className="mb-12">
              <h2 className="text-4xl font-bold text-white mb-8 text-center">Sentiment Analysis Visualizations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Pie Chart: Overall Sentiment Score */}
                  <div className="bg-gray-800 rounded-lg shadow-xl p-6">
                      <h3 className="text-xl font-semibold text-gray-200 mb-4 text-center">{data.pieChart.title}</h3>
                      <ResponsiveContainer width="100%" height={300}>
                          <PieChart>
                              <Pie
                                  data={[
                                      { name: 'Positive', value: data.pieChart.positive },
                                      { name: 'Negative', value: data.pieChart.negative },
                                      { name: 'Neutral', value: data.pieChart.neutral },
                                  ]}
                                  cx="50%"
                                  cy="50%"
                                  labelLine={false}
                                  outerRadius={100}
                                  fill="#8884d8"
                                  dataKey="value"
                                  label={({ name, percent }: any) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              >
                                  <Cell key="cell-0" fill="#34D399" /> {/* Green for Positive */}
                                  <Cell key="cell-1" fill="#EF4444" /> {/* Red for Negative */}
                                  <Cell key="cell-2" fill="#60A5FA" /> {/* Blue for Neutral */}
                              </Pie>
                              <Tooltip />
                              <Legend />
                          </PieChart>
                      </ResponsiveContainer>
                  </div>

                  {/* Stacked Bar Chart: Sentiment Analysis for Each Competitor */}
                  <div className="bg-gray-800 rounded-lg shadow-xl p-6">
                      <h3 className="text-xl font-semibold text-gray-200 mb-4 text-center">Competitor Sentiment Comparison</h3>
                      <ResponsiveContainer width="100%" height={300}>
                          <BarChart
                              data={data.competitorSentimentComparisonChart}
                              margin={{
                                  top: 20, right: 30, left: 20, bottom: 5,
                              }}
                          >
                              <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                              <XAxis dataKey="name" stroke="#9CA3AF" />
                              <YAxis stroke="#9CA3AF" />
                              <Tooltip />
                              <Legend />
                              <Bar dataKey="positive" stackId="a" fill="#34D399" name="Positive" />
                              <Bar dataKey="negative" stackId="a" fill="#EF4444" name="Negative" />
                              <Bar dataKey="neutral" stackId="a" fill="#60A5FA" name="Neutral" />
                          </BarChart>
                      </ResponsiveContainer>
                  </div>

                  {/* Scatter Chart: Google Score vs. Average Sentiment Score */}
                  <div className="bg-gray-800 rounded-lg shadow-xl p-6">
                      <h3 className="text-xl font-semibold text-gray-200 mb-4 text-center">Google Rating vs. Average Sentiment</h3>
                      <ResponsiveContainer width="100%" height={300}>
                          <ScatterChart
                              margin={{
                                  top: 20, right: 20, bottom: 20, left: 20,
                              }}
                          >
                              <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                              <XAxis type="number" dataKey="googleRating" name="Google Rating" stroke="#9CA3AF" />
                              <YAxis  type="number" dataKey="averageSentiment" name="Average Sentiment" stroke="#9CA3AF" />
                              <ZAxis dataKey="competitorName" name="Competitor" />
                              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                              <Legend />
                              <Scatter name="Competitors" data={data.competitorRating_averageSentiment_chart} fill="#8884d8" />
                          </ScatterChart>
                      </ResponsiveContainer>
                  </div>

                  {/* Bar Chart: Reviews Analyzed Per Competitor */}
                  <div className="bg-gray-800 rounded-lg shadow-xl p-6">
                      <h3 className="text-xl font-semibold text-gray-200 mb-4 text-center">Reviews Analyzed Per Competitor</h3>
                      <ResponsiveContainer width="100%" height={300}>
                          <BarChart
                              data={data.reviewsAnalyzedPerCompetitor}
                              margin={{
                                  top: 20, right: 30, left: 20, bottom: 5,
                              }}
                          >
                              <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                              <XAxis dataKey="name" stroke="#9CA3AF" />
                              <YAxis stroke="#9CA3AF" />
                              <Tooltip />
                              <Legend />
                              <Bar dataKey="reviews" fill="#82ca9d" name="Reviews" />
                          </BarChart>
                      </ResponsiveContainer>
                  </div>
              </div>
            </section>

            {/* ai powered insights */}
            <section className="mb-12">
                <h2 className="text-4xl font-bold text-white mb-8 text-center">AI-Powered Competitive Insights</h2>
                <div className="space-y-8">
                    {data.competitorsDetails.map((detail, index) => (
                        <div key={index} className="bg-gray-800 rounded-lg shadow-xl p-8 border border-gray-700">
                            <h3 className="text-2xl font-bold text-blue-400 mb-4">Insights for {data.competitorsAnalyzed[index]?.name || `Competitor ${index + 1}`}</h3>
                            <div className="text-gray-300 leading-relaxed mb-4"><ReactMarkdown>{detail.aiInsights}</ReactMarkdown></div>
                            <div className="flex items-center space-x-4">
                                <span className="font-semibold text-gray-300">Address:</span>
                                <p className="text-gray-400">{detail.address}</p>
                                {detail.googleMaps && (
                                    <a href={detail.googleMaps} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                        View on Google Maps
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
};

export default SentimentAnalysis;