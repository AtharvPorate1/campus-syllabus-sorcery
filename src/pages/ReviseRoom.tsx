
import { BookOpen } from 'lucide-react';
import EmptyState from '@/components/EmptyState';
import PageTransition from '@/components/PageTransition';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ReviseRoom = () => {
  return (
    <PageTransition>
      <div className="page-content">
        <h1 className="font-display text-4xl">Revise Room</h1>
        <p className="text-muted-foreground max-w-2xl mb-8">
          Review and reinforce your knowledge with personalized revision materials.
        </p>
        
        <EmptyState
          icon={<BookOpen className="w-full h-full" />}
          title="Coming Soon"
          description="The Revise Room is under development. Visit the Classroom to start learning."
          action={
            <Link to="/classroom">
              <Button>Go to Classroom</Button>
            </Link>
          }
        />
      </div>
    </PageTransition>
  );
};

export default ReviseRoom;
