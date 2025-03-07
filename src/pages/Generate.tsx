
import { useState, FormEvent } from 'react';
import { api } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/use-toast';
import CodeDisplay from '@/components/CodeDisplay';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Wand2 } from 'lucide-react';

const technologies = [
  { value: 'HTML+CSS', label: 'HTML + CSS' },
  { value: 'React', label: 'React' },
  { value: 'React+Tailwind', label: 'React + Tailwind' },
  { value: 'Vite+TypeScript', label: 'Vite + TypeScript' },
  { value: 'Vue', label: 'Vue' }
];

export default function Generate() {
  const { token } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [element, setElement] = useState('');
  const [technology, setTechnology] = useState('HTML+CSS');
  const [theme, setTheme] = useState('');
  const [enhancement, setEnhancement] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!element || !theme) {
      toast({
        title: "Missing fields",
        description: "Please fill in both the Element and Theme fields.",
        variant: "destructive"
      });
      return;
    }
    
    if (!token) {
      toast({
        title: "Authentication required",
        description: "Please log in to generate elements.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    const response = await api.elements.generate(
      token, 
      element, 
      technology, 
      theme, 
      enhancement
    );
    
    setIsLoading(false);
    
    if (response.success && response.code) {
      setGeneratedCode(response.code);
      toast({
        title: "Element generated!",
        description: `Your ${element} has been successfully generated.`,
      });
    } else {
      toast({
        title: "Generation failed",
        description: response.message || "Could not generate element",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-2xl font-display">Generate UI Element</CardTitle>
            <CardDescription>
              Describe the element you want to create and get beautiful code
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="element" className="text-sm font-medium">
                  Element Type
                </label>
                <Input
                  id="element"
                  placeholder="e.g., button, card, navbar"
                  value={element}
                  onChange={(e) => setElement(e.target.value)}
                  className="glass-dark"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="technology" className="text-sm font-medium">
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
                <label htmlFor="theme" className="text-sm font-medium">
                  Theme
                </label>
                <Input
                  id="theme"
                  placeholder="e.g., neon, glass, minimalist"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="glass-dark"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="enhancement" className="text-sm font-medium">
                  Enhancement (optional)
                </label>
                <Input
                  id="enhancement"
                  placeholder="e.g., add hover animation, pulsing effect"
                  value={enhancement}
                  onChange={(e) => setEnhancement(e.target.value)}
                  className="glass-dark"
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={isLoading} 
                className="w-full"
              >
                <Wand2 className="mr-2 h-4 w-4" />
                {isLoading ? 'Generating...' : 'Generate Element'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
      
      <CodeDisplay code={generatedCode} />
    </div>
  );
}
