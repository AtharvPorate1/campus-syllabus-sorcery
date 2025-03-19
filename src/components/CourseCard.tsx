
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, CalendarDays, ArrowRight } from 'lucide-react';
import { Course, CourseStatus } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface CourseCardProps {
  course: Course;
  onStatusChange?: (courseId: string, status: CourseStatus) => void;
}

const statusConfig = {
  completed: {
    icon: CheckCircle,
    text: 'Completed',
    color: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-100 dark:bg-green-900/20'
  },
  ongoing: {
    icon: Clock,
    text: 'In Progress',
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-100 dark:bg-blue-900/20'
  },
  planned: {
    icon: CalendarDays,
    text: 'Planned',
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-100 dark:bg-amber-900/20'
  }
};

const CourseCard = ({ course, onStatusChange }: CourseCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  
  const { icon: StatusIcon, text: statusText, color, bg } = statusConfig[course.status];
  
  // Format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };
  
  const handleContinue = () => {
    navigate(`/classroom/course/${course.id}`);
  };

  return (
    <motion.div
      className="course-card flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-medium mb-0">{course.title}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${bg} ${color}`}>
          <StatusIcon className="w-3 h-3 mr-1" />
          {statusText}
        </span>
      </div>
      
      <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{course.description}</p>
      
      {course.status !== 'planned' && (
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Progress</span>
            <span>{course.progress}%</span>
          </div>
          <Progress value={course.progress} className="h-2" />
        </div>
      )}
      
      <div className="mt-auto pt-4 flex items-center justify-between text-xs text-muted-foreground">
        <span>Updated: {formatDate(course.updatedAt)}</span>
        <Button 
          variant="ghost" 
          className="p-0 h-auto text-primary hover:text-primary/80 hover:bg-transparent"
          onClick={handleContinue}
        >
          <span className="mr-1">{course.status === 'planned' ? 'Start' : 'Continue'}</span>
          <ArrowRight className="w-3 h-3" />
        </Button>
      </div>
    </motion.div>
  );
};

export default CourseCard;
