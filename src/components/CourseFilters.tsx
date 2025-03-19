
import { useState } from 'react';
import { CheckIcon, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CourseStatus } from '@/store/useStore';

interface CourseFiltersProps {
  activeFilter: CourseStatus | 'all';
  onFilterChange: (filter: CourseStatus | 'all') => void;
}

const CourseFilters = ({ activeFilter, onFilterChange }: CourseFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const filters: { value: CourseStatus | 'all'; label: string }[] = [
    { value: 'all', label: 'All Courses' },
    { value: 'ongoing', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'planned', label: 'Planned' },
  ];

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full md:w-48"
      >
        <span>{filters.find(f => f.value === activeFilter)?.label || 'All Courses'}</span>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </Button>
      
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-card rounded-md shadow-lg border border-border animate-fade-in">
          <ul className="py-1">
            {filters.map((filter) => (
              <li key={filter.value}>
                <button
                  className="flex items-center justify-between w-full px-4 py-2 text-left text-sm hover:bg-accent"
                  onClick={() => {
                    onFilterChange(filter.value);
                    setIsOpen(false);
                  }}
                >
                  <span>{filter.label}</span>
                  {activeFilter === filter.value && <CheckIcon className="h-4 w-4" />}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CourseFilters;
