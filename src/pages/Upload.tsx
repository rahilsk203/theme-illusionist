
import { useState, FormEvent } from 'react';
import { api } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Upload as UploadIcon } from 'lucide-react';

const technologies = [
  { value: 'HTML+CSS', label: 'HTML + CSS' },
  { value: 'React', label: 'React' },
  { value: 'React+Tailwind', label: 'React + Tailwind' },
  { value: 'Vite+TypeScript', label: 'Vite + TypeScript' },
  { value: 'Vue', label: 'Vue' }
];

export default function Upload() {
  const { token } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [element, setElement] = useState('');
  const [technology, setTechnology] = useState('HTML+CSS');
  const [theme, setTheme] = useState('');
  const [code, setCode] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!element || !theme || !code) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    if (!token) {
      toast({
        title: "Authentication required",
        description: "Please log in to upload templates.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    const response = await api.elements.uploadTemplate(
      token, 
      element, 
      technology, 
      theme, 
      code
    );
    
    setIsLoading(false);
    
    if (response.success) {
      toast({
        title: "Template uploaded!",
        description: `Your ${element} template has been successfully uploaded.`,
      });
      
      // Reset form
      setElement('');
      setTechnology('HTML+CSS');
      setTheme('');
      setCode('');
    } else {
      toast({
        title: "Upload failed",
        description: response.message || "Could not upload template",
        variant: "destructive"
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="glass">
        <CardHeader>
          <CardTitle className="text-2xl font-display">Upload Template</CardTitle>
          <CardDescription>
            Share your custom UI elements with the community
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="uploadElement" className="text-sm font-medium">
                Element Type
              </label>
              <Input
                id="uploadElement"
                placeholder="e.g., button, card, navbar"
                value={element}
                onChange={(e) => setElement(e.target.value)}
                className="glass-dark"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="uploadTechnology" className="text-sm font-medium">
                Technology
              </label>
              <Select
                value={technology}
                onValueChange={setTechnology}
              >
                <SelectTrigger className="glass-dark">
                  <SelectValue placeholder="Select technology" />
                </SelectTrigger>
                <SelectContent>
                  {technologies.map((tech) => (
                    <SelectItem key={tech.value} value={tech.value}>
                      {tech.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="uploadTheme" className="text-sm font-medium">
                Theme
              </label>
              <Input
                id="uploadTheme"
                placeholder="e.g., neon, glass, minimalist"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="glass-dark"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="uploadCode" className="text-sm font-medium">
                Code
              </label>
              <Textarea
                id="uploadCode"
                placeholder="Paste your element code here"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="glass-dark min-h-[200px] font-mono text-sm"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              disabled={isLoading} 
              className="w-full"
            >
              <UploadIcon className="mr-2 h-4 w-4" />
              {isLoading ? 'Uploading...' : 'Upload Template'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
