
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, ChevronRight, GraduationCap, PenLine, TestTube } from 'lucide-react';
import { useStore, CourseStatus } from '@/store/useStore';
import CourseCard from '@/components/CourseCard';
import CourseFilters from '@/components/CourseFilters';
import EmptyState from '@/components/EmptyState';
import PageTransition from '@/components/PageTransition';
import ApiKeyForm from '@/components/ApiKeyForm';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const { courses, updateCourseStatus } = useStore();
  const [filter, setFilter] = useState<CourseStatus | 'all'>('all');
  
  const filteredCourses = filter === 'all' 
    ? courses 
    : courses.filter(course => course.status === filter);
  
  const coursesByStatus = {
    ongoing: courses.filter(course => course.status === 'ongoing'),
    completed: courses.filter(course => course.status === 'completed'),
    planned: courses.filter(course => course.status === 'planned')
  };
  
  const handleStatusChange = (courseId: string, status: CourseStatus) => {
    updateCourseStatus(courseId, status);
  };
  
  const contentVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      } 
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <PageTransition>
      <div className="page-content">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-4xl">Your Learning Journey</h1>
            <p className="text-muted-foreground max-w-2xl">
              Track your progress, continue learning, or discover new topics to explore.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <ApiKeyForm />
          </div>
        </div>
      
        <section className="mb-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
            <h2 className="text-2xl font-display mb-0">Learning Paths</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/classroom">
              <motion.div 
                className="book-cover flex items-center h-36 rounded-md"
                whileHover={{ y: -5, boxShadow: '0 15px 30px -10px rgba(0, 0, 0, 0.2)' }}
              >
                <div className="flex flex-col items-start">
                  <h3 className="text-xl mb-1 font-display font-medium">Classroom</h3>
                  <p className="text-book-title/90 text-sm mb-3">Discover and learn new topics</p>
                  <div className="flex items-center text-xs">
                    <span>Explore now</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
                <div className="ml-auto">
                  <PenLine className="w-10 h-10 opacity-80" />
                </div>
              </motion.div>
            </Link>
            
            <Link to="/reviseroom">
              <motion.div 
                className="book-cover flex items-center h-36 rounded-md"
                whileHover={{ y: -5, boxShadow: '0 15px 30px -10px rgba(0, 0, 0, 0.2)' }}
              >
                <div className="flex flex-col items-start">
                  <h3 className="text-xl mb-1 font-display font-medium">Revise Room</h3>
                  <p className="text-book-title/90 text-sm mb-3">Review and solidify your knowledge</p>
                  <div className="flex items-center text-xs">
                    <span>Review now</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
                <div className="ml-auto">
                  <GraduationCap className="w-10 h-10 opacity-80" />
                </div>
              </motion.div>
            </Link>
            
            <Link to="/testroom">
              <motion.div 
                className="book-cover flex items-center h-36 rounded-md"
                whileHover={{ y: -5, boxShadow: '0 15px 30px -10px rgba(0, 0, 0, 0.2)' }}
              >
                <div className="flex flex-col items-start">
                  <h3 className="text-xl mb-1 font-display font-medium">Test Room</h3>
                  <p className="text-book-title/90 text-sm mb-3">Test your knowledge with quizzes</p>
                  <div className="flex items-center text-xs">
                    <span>Start testing</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
                <div className="ml-auto">
                  <TestTube className="w-10 h-10 opacity-80" />
                </div>
              </motion.div>
            </Link>
          </div>
        </section>
        
        <section>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
            <h2 className="text-2xl font-display mb-0">Your Courses</h2>
            <div className="mt-3 sm:mt-0">
              <CourseFilters activeFilter={filter} onFilterChange={setFilter} />
            </div>
          </div>
          
          {filteredCourses.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredCourses.map(course => (
                <motion.div key={course.id} variants={itemVariants}>
                  <CourseCard 
                    course={course} 
                    onStatusChange={handleStatusChange}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <EmptyState
              icon={<BookOpen className="w-full h-full" />}
              title="No courses found"
              description={`You don't have any ${filter !== 'all' ? filter : ''} courses yet.`}
              action={
                <Link to="/classroom">
                  <Button>Find new topics to learn</Button>
                </Link>
              }
            />
          )}
        </section>
      </div>
    </PageTransition>
  );
};

export default Dashboard;
