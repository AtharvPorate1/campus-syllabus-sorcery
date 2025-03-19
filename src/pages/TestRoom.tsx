
import { TestTube } from 'lucide-react';
import EmptyState from '@/components/EmptyState';
import PageTransition from '@/components/PageTransition';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const TestRoom = () => {
  return (
    <PageTransition>
      <div className="page-content">
        <h1 className="font-display text-4xl">Test Room</h1>
        <p className="text-muted-foreground max-w-2xl mb-8">
          Challenge yourself with quizzes and assessments to test your knowledge.
        </p>
        
        <EmptyState
          icon={<TestTube className="w-full h-full" />}
          title="Coming Soon"
          description="The Test Room is under development. Visit the Classroom to start learning."
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

export default TestRoom;
