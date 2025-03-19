
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, CheckCircle, Circle } from 'lucide-react';
import { toast } from 'sonner';
import { useStore, Course as CourseType } from '@/store/useStore';
import PageTransition from '@/components/PageTransition';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

const Course = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { courses, updateCourse, markChapterCompleted } = useStore();
  const [course, setCourse] = useState<CourseType | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  
  useEffect(() => {
    if (id) {
      const foundCourse = courses.find(c => c.id === id);
      if (foundCourse) {
        setCourse(foundCourse);
        
        // Set first incomplete chapter as selected by default
        const firstIncomplete = foundCourse.chapters?.find(chapter => !chapter.completed);
        if (firstIncomplete) {
          setSelectedChapter(firstIncomplete.id);
        } else if (foundCourse.chapters && foundCourse.chapters.length > 0) {
          setSelectedChapter(foundCourse.chapters[0].id);
        }
      } else {
        toast.error('Course not found');
        navigate('/dashboard');
      }
    }
  }, [id, courses, navigate]);
  
  const handleChapterClick = (chapterId: string) => {
    setSelectedChapter(chapterId);
  };
  
  const handleChapterCompletion = (chapterId: string, completed: boolean) => {
    if (course) {
      markChapterCompleted(course.id, chapterId, completed);
      
      // Update the local course state to reflect changes
      const updatedCourse = courses.find(c => c.id === course.id);
      if (updatedCourse) {
        setCourse(updatedCourse);
      }
      
      if (completed) {
        toast.success('Chapter marked as completed');
      } else {
        toast.info('Chapter marked as incomplete');
      }
    }
  };
  
  if (!course) {
    return (
      <PageTransition>
        <div className="page-content flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading course content...</p>
          </div>
        </div>
      </PageTransition>
    );
  }
  
  const selectedChapterContent = course.chapters?.find(chapter => chapter.id === selectedChapter);
  
  return (
    <PageTransition>
      <div className="page-content">
        <Button
          variant="ghost"
          className="mb-4 p-0 h-auto hover:bg-transparent"
          onClick={() => navigate('/dashboard')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span>Back to Dashboard</span>
        </Button>
        
        <div className="bg-card rounded-lg shadow-page overflow-hidden">
          <div className="p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-display mb-2">{course.title}</h1>
            <p className="text-muted-foreground mb-4">{course.description}</p>
            
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span>{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-2" />
            </div>
            
            <Separator className="my-6" />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="col-span-1 order-2 lg:order-1">
                <h3 className="text-lg font-medium mb-4">Course Content</h3>
                <div className="space-y-2">
                  {course.chapters?.map((chapter, index) => (
                    <motion.div
                      key={chapter.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <button
                        onClick={() => handleChapterClick(chapter.id)}
                        className={`flex items-start w-full text-left p-3 rounded-md transition-colors ${
                          selectedChapter === chapter.id
                            ? 'bg-primary/10 text-primary'
                            : 'hover:bg-accent'
                        }`}
                      >
                        <div className="mr-3 mt-1">
                          {chapter.completed ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <Circle className="w-4 h-4 text-muted-foreground" />
                          )}
                        </div>
                        <div>
                          <span className="text-sm">{index + 1}. {chapter.title}</span>
                        </div>
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="lg:col-span-2 order-1 lg:order-2">
                {selectedChapterContent ? (
                  <div className="bg-accent/30 p-6 rounded-md">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-medium">{selectedChapterContent.title}</h2>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleChapterCompletion(
                          selectedChapterContent.id, 
                          !selectedChapterContent.completed
                        )}
                      >
                        {selectedChapterContent.completed ? (
                          <>
                            <Circle className="mr-2 h-4 w-4" />
                            <span>Mark as Incomplete</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            <span>Mark as Complete</span>
                          </>
                        )}
                      </Button>
                    </div>
                    
                    <div className="prose prose-stone dark:prose-invert max-w-none">
                      {selectedChapterContent.content.split('\n').map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-64 bg-accent/30 rounded-md">
                    <div className="text-center">
                      <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Select a chapter to start learning</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Course;
