
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Key } from 'lucide-react';
import { setOpenAIKey, getOpenAIKey } from '@/services/openai';
import { toast } from 'sonner';

const ApiKeyForm = () => {
  const [apiKey, setApiKey] = useState(getOpenAIKey() || '');
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      setOpenAIKey(apiKey.trim());
      toast.success('API key saved successfully');
      setOpen(false);
    } else {
      toast.error('Please enter a valid API key');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Key className="h-4 w-4" />
          <span>API Key</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Set OpenAI API Key</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="apiKey" className="text-sm font-medium">
              Enter your OpenAI API key to enable AI features
            </label>
            <input
              id="apiKey"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="search-input"
              placeholder="sk-..."
              required
            />
            <p className="text-xs text-muted-foreground">
              Your API key is stored only in your browser's local storage and never sent to our servers.
            </p>
          </div>
          <div className="flex justify-end">
            <Button type="submit">Save API Key</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyForm;
