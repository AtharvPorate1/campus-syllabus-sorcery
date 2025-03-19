
import { useState } from 'react';
import { ChevronLeft, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Chapter } from '@/store/useStore';

interface CourseMenuProps {
  chapters: Chapter[];
  activeChapterId: string | null;
  onSelectChapter: (chapterId: string) => void;
  courseTitle: string;
}

const CourseMenu = ({ chapters, activeChapterId, onSelectChapter, courseTitle }: CourseMenuProps) => {
  const [open, setOpen] = useState(false);
  
  const handleChapterClick = (chapterId: string) => {
    onSelectChapter(chapterId);
    setOpen(false);
  };
  
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[85%] sm:w-[350px] pr-0">
        <div className="flex flex-col h-full">
          <div className="py-4 border-b">
            <div className="flex items-center mb-2">
              <ChevronLeft className="mr-2 h-4 w-4" />
              <h2 className="text-lg font-medium">{courseTitle}</h2>
            </div>
            <p className="text-sm text-muted-foreground">Course content</p>
          </div>
          
          <div className="flex-1 overflow-auto py-4">
            <div className="space-y-1">
              {chapters?.map((chapter, index) => (
                <button
                  key={chapter.id}
                  onClick={() => handleChapterClick(chapter.id)}
                  className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors flex items-start ${
                    activeChapterId === chapter.id ? 'bg-primary/10 text-primary' : 'hover:bg-accent'
                  }`}
                >
                  <span className="mr-3 font-medium">{index + 1}.</span>
                  <span className="flex-1">{chapter.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CourseMenu;
