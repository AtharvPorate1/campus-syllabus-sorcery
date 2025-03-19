
import { toast } from "sonner";
import { getOpenAIKey } from "./openai";

const API_URL = 'https://api.openai.com/v1/chat/completions';

export const generateChapterContent = async (chapterTitle: string): Promise<string> => {
  const apiKey = getOpenAIKey();
  
  if (!apiKey) {
    toast.error("OpenAI API key is not set. Please enter your API key in settings.");
    throw new Error("OpenAI API key is not set");
  }
  
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are an expert educational content creator specialized in creating comprehensive, engaging and educational content. Format your response with clear headings, paragraphs, and use proper markdown for any mathematical formulas, code blocks, or specialized notation."
          },
          {
            role: "user",
            content: `Create detailed educational content for a chapter titled "${chapterTitle}". 
            Include:
            - Clear explanations of key concepts
            - Examples to illustrate points
            - Any relevant mathematical formulas (use proper LaTeX notation)
            - Key takeaways
            
            Format your response with proper markdown where needed, especially for mathematical formulas.
            The content should be educational, engaging and comprehensive.`
          }
        ],
        temperature: 0.7,
        max_tokens: 2500
      })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "Failed to generate content");
    }
    
    const data = await response.json();
    return data.choices[0].message.content;
    
  } catch (error) {
    console.error("Error generating chapter content:", error);
    toast.error("Failed to generate chapter content. Please try again.");
    throw error;
  }
};
