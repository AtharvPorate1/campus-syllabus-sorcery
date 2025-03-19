
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, BookOpen, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useStore } from '@/store/useStore';
import CourseCard from '@/components/CourseCard';
import EmptyState from '@/components/EmptyState';
import PageTransition from '@/components/PageTransition';
import { Button } from '@/components/ui/button';
import { getOpenAIKey } from '@/services/openai';

const Classroom = () => {
  const [searchInput, setSearchInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const { courses } = useStore();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) {
      toast.error('Please enter a topic to search');
      return;
    }
    
    const apiKey = getOpenAIKey();
    if (!apiKey) {
      toast.error('Please set your OpenAI API key first');
      return;
    }
    
    setIsSearching(true);
    // Generate a random ID for the syllabus
    const syllabusId = Math.random().toString(36).substring(2, 15);
    
    // Navigate to the syllabus page with the topic and ID
    setTimeout(() => {
      setIsSearching(false);
      navigate(`/classroom/syllabus/${syllabusId}`, { 
        state: { topic: searchInput } 
      });
    }, 1000);
  };

  return (
    <PageTransition>
      <div className="page-content">
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl mb-4">Discover Knowledge</h1>
        <p className="text-muted-foreground max-w-2xl mb-8">
          Search for any topic to generate a personalized learning syllabus.
        </p>
        
        <div className="mb-12">
          <form onSubmit={handleSearch} className="relative">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                className="search-input pl-10 py-4 text-lg"
                placeholder="What would you like to learn today?"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <Button
                type="submit"
                className="absolute right-2 top-2 px-4"
                disabled={isSearching}
              >
                {isSearching ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    <span>Generate Syllabus</span>
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
        
        <section>
          <h2 className="text-2xl font-display mb-6">Your Learning Journey</h2>
          
          {courses.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {courses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </motion.div>
          ) : (
            <EmptyState
              icon={<BookOpen className="w-full h-full" />}
              title="No courses yet"
              description="Search for a topic above to start your learning journey."
              action={
                <Button onClick={() => {
                  setSearchInput('Introduction to Machine Learning');
                }}>
                  Try "Introduction to Machine Learning"
                </Button>
              }
            />
          )}
        </section>
      </div>
    </PageTransition>
  );
};

export default Classroom;
