
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Button, Card } from '../components/UI';

const PAGE_MOCKUPS = [
  { 
    name: 'student-home.jpg', 
    description: 'A high-fidelity minimalist UI design for "Elo" student home page. Modern SaaS aesthetic, white theme, clean Inter typography. Hero section text: "Speak Chinese with a human, right now." Large indigo primary button "Start speaking now". Grid of scenario cards for "Coffee Shop Chat" and "Finding Your Way" with HSK level badges. Very clean spacing.'
  },
  { 
    name: 'matching.jpg', 
    description: 'A high-fidelity minimalist UI design for a "Matching" state. Central pulsing indigo rings with a white microphone icon inside. Reassuring text: "Finding a friendly coach for you..." and "Take a deep breath." Clean white background, non-academic style, focus on emotional safety.'
  },
  { 
    name: 'session.jpg', 
    description: 'A high-fidelity minimalist UI design for an "In-Session" voice-only page. Left: Voice wave visualization (indigo bars), timer showing "09:45", Coach "Li Xiao" profile. Right: Topic hints card for "Coffee Shop Chat" with vocabulary and phrases in Chinese and English. Red "End Session" button. Clean, calm dashboard.'
  },
  { 
    name: 'review.jpg', 
    description: 'A high-fidelity minimalist UI design for a "Session Review" page. Large emerald checkmark icon. Header: "You found your flow!". Sections for "Moments that clicked" and "Natural Upgrades" with side-by-side Chinese phrase corrections. Encouraging and light aesthetic.'
  },
  { 
    name: 'coach-hub.jpg', 
    description: 'A high-fidelity minimalist UI design for the "Coach Hub". Header: "Coach Hub". Online/Offline toggle. Main indigo card showing "¥280.00" earnings. List of "Suggested Topics" with Chinese text and arrow icons. Modern SaaS dashboard look.'
  }
];

const ScreenshotGallery: React.FC = () => {
  const [images, setImages] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  const generateScreenshot = async (pageName: string, description: string) => {
    setLoading(prev => ({ ...prev, [pageName]: true }));
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: description }],
        },
        config: {
          imageConfig: {
            aspectRatio: "16:9"
          }
        }
      });

      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const imageUrl = `data:image/png;base64,${part.inlineData.data}`;
          setImages(prev => ({ ...prev, [pageName]: imageUrl }));
          break;
        }
      }
    } catch (error) {
      console.error('Failed to generate image:', error);
    } finally {
      setLoading(prev => ({ ...prev, [pageName]: false }));
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-zinc-900">Design Screenshots</h1>
        <p className="text-zinc-500 max-w-2xl mx-auto">
          Generated high-fidelity mockups representing the refined MVP user interface. 
          Click "Generate" to visualize each page using Gemini.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {PAGE_MOCKUPS.map((page) => (
          <Card key={page.name} className="flex flex-col gap-4 overflow-hidden">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-zinc-800">{page.name}</h3>
              <Button 
                onClick={() => generateScreenshot(page.name, page.description)} 
                variant={images[page.name] ? 'secondary' : 'primary'}
                className="px-4 py-1.5 text-xs"
                disabled={loading[page.name]}
              >
                {loading[page.name] ? 'Generating...' : images[page.name] ? 'Regenerate' : 'Generate'}
              </Button>
            </div>
            
            <div className="aspect-video bg-zinc-100 rounded-xl flex items-center justify-center relative group overflow-hidden border border-zinc-200">
              {images[page.name] ? (
                <img 
                  src={images[page.name]} 
                  alt={page.name} 
                  className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700"
                />
              ) : (
                <div className="text-center p-8">
                  <p className="text-zinc-400 text-sm italic">
                    {loading[page.name] ? 'Visualizing your design...' : 'Click generate to see the mockup'}
                  </p>
                </div>
              )}
              {loading[page.name] && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ScreenshotGallery;
