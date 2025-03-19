import { toast } from "sonner";

const API_URL = 'https://api.openai.com/v1/chat/completions';

// Default API key (can be overridden by users)
let OPENAI_API_KEY = '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';

export const setOpenAIKey = (key: string) => {
  OPENAI_API_KEY = key;
  localStorage.setItem('openai_key', key);
};

export const getOpenAIKey = () => {
  if (!OPENAI_API_KEY) {
    OPENAI_API_KEY = localStorage.getItem('openai_key') || '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';
  }
  return OPENAI_API_KEY;
};

export interface SyllabusChapter {
  title: string;
  content: string;
}

export const generateSyllabus = async (topic: string): Promise<SyllabusChapter[]> => {
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
            content: "You are an expert educational content creator specialized in creating comprehensive course syllabi. Structure your response as a JSON array without any additional text."
          },
          {
            role: "user",
            content: `Create a detailed syllabus for learning about "${topic}". 
            Return a JSON array of chapters, where each chapter has a "title" and "content" fields. 
            The content should be a comprehensive overview of what will be covered in that chapter.
            Include 8-12 chapters that cover the topic thoroughly from beginner to advanced concepts.
            Format your response ONLY as a valid JSON array, with no additional explanations or text outside the JSON.`
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "Failed to generate syllabus");
    }
    
    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Parse the JSON response
    try {
      const syllabusContent = JSON.parse(content);
      if (Array.isArray(syllabusContent)) {
        return syllabusContent;
      } else {
        throw new Error("Invalid response format");
      }
    } catch (e) {
      console.error("Failed to parse syllabus JSON:", content);
      throw new Error("Failed to parse syllabus data");
    }
  } catch (error) {
    console.error("Error generating syllabus:", error);
    toast.error("Failed to generate syllabus. Please try again.");
    throw error;
  }
};
