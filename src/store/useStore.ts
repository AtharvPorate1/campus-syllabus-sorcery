
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CourseStatus = 'completed' | 'ongoing' | 'planned';

export interface Course {
  id: string;
  title: string;
  description: string;
  status: CourseStatus;
  progress: number;
  createdAt: string;
  updatedAt: string;
  chapters?: Chapter[];
}

export interface Chapter {
  id: string;
  title: string;
  content: string;
  completed: boolean;
}

interface StoreState {
  courses: Course[];
  activeCourse: Course | null;
  syllabus: {
    id: string;
    topic: string;
    chapters: Chapter[];
    loading: boolean;
  } | null;
  addCourse: (course: Course) => void;
  updateCourse: (courseId: string, updates: Partial<Course>) => void;
  removeCourse: (courseId: string) => void;
  setActiveCourse: (course: Course | null) => void;
  setSyllabus: (syllabus: StoreState['syllabus']) => void;
  markChapterCompleted: (courseId: string, chapterId: string, completed: boolean) => void;
  updateCourseStatus: (courseId: string, status: CourseStatus) => void;
}

// Create some sample courses for testing
const sampleCourses: Course[] = [
  {
    id: '1',
    title: 'Introduction to Machine Learning',
    description: 'Learn the fundamentals of machine learning algorithms and applications.',
    status: 'completed',
    progress: 100,
    createdAt: '2023-05-15T10:00:00Z',
    updatedAt: '2023-06-20T14:30:00Z',
    chapters: [
      { id: '1-1', title: 'What is Machine Learning?', content: 'Introduction to the field...', completed: true },
      { id: '1-2', title: 'Supervised Learning', content: 'Classification and regression...', completed: true },
      { id: '1-3', title: 'Unsupervised Learning', content: 'Clustering and dimensionality reduction...', completed: true },
    ]
  },
  {
    id: '2',
    title: 'Web Development with React',
    description: 'Master modern web development using React and its ecosystem.',
    status: 'ongoing',
    progress: 65,
    createdAt: '2023-07-10T09:15:00Z',
    updatedAt: '2023-08-05T16:45:00Z',
    chapters: [
      { id: '2-1', title: 'React Fundamentals', content: 'Components, props, and state...', completed: true },
      { id: '2-2', title: 'Hooks and State Management', content: 'useState, useEffect, and Context API...', completed: true },
      { id: '2-3', title: 'Routing and Navigation', content: 'React Router implementation...', completed: false },
      { id: '2-4', title: 'Advanced Patterns', content: 'Render props, HOCs, and more...', completed: false },
    ]
  },
  {
    id: '3',
    title: 'Data Structures and Algorithms',
    description: 'Comprehensive guide to common data structures and algorithms.',
    status: 'planned',
    progress: 0,
    createdAt: '2023-08-20T11:30:00Z',
    updatedAt: '2023-08-20T11:30:00Z',
    chapters: [
      { id: '3-1', title: 'Arrays and Strings', content: 'Basic operations and manipulations...', completed: false },
      { id: '3-2', title: 'Linked Lists', content: 'Singly and doubly linked lists...', completed: false },
      { id: '3-3', title: 'Trees and Graphs', content: 'Binary trees, BSTs, and graph algorithms...', completed: false },
      { id: '3-4', title: 'Sorting and Searching', content: 'Efficient algorithms for organizing data...', completed: false },
    ]
  }
];

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      courses: sampleCourses,
      activeCourse: null,
      syllabus: null,
      
      addCourse: (course) => set((state) => ({ 
        courses: [...state.courses, course] 
      })),
      
      updateCourse: (courseId, updates) => set((state) => ({ 
        courses: state.courses.map(course => 
          course.id === courseId ? { ...course, ...updates, updatedAt: new Date().toISOString() } : course
        ) 
      })),
      
      removeCourse: (courseId) => set((state) => ({ 
        courses: state.courses.filter(course => course.id !== courseId) 
      })),
      
      setActiveCourse: (course) => set({ activeCourse: course }),
      
      setSyllabus: (syllabus) => set({ syllabus }),
      
      markChapterCompleted: (courseId, chapterId, completed) => set((state) => {
        const updatedCourses = state.courses.map(course => {
          if (course.id === courseId && course.chapters) {
            const updatedChapters = course.chapters.map(chapter => 
              chapter.id === chapterId ? { ...chapter, completed } : chapter
            );
            
            // Calculate new progress
            const totalChapters = updatedChapters.length;
            const completedChapters = updatedChapters.filter(ch => ch.completed).length;
            const newProgress = totalChapters > 0 ? Math.round((completedChapters / totalChapters) * 100) : 0;
            
            return {
              ...course,
              chapters: updatedChapters,
              progress: newProgress,
              updatedAt: new Date().toISOString()
            };
          }
          return course;
        });
        
        return { courses: updatedCourses };
      }),
      
      updateCourseStatus: (courseId, status) => set((state) => ({
        courses: state.courses.map(course => 
          course.id === courseId 
            ? { ...course, status, updatedAt: new Date().toISOString() } 
            : course
        )
      })),
    }),
    {
      name: 'acampus-storage',
    }
  )
);
