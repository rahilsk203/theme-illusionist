
import { useState, useEffect } from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Eye, Download } from 'lucide-react';
import CodeDisplay from '@/components/CodeDisplay';

const technologies = [
  { value: 'HTML+CSS', label: 'HTML + CSS' },
  { value: 'React', label: 'React' },
  { value: 'React+Tailwind', label: 'React + Tailwind' },
  { value: 'Vite+TypeScript', label: 'Vite + TypeScript' },
  { value: 'Vue', label: 'Vue' }
];

interface Component {
  id: string;
  element: string;
  technology: string;
  theme: string;
  code: string;
}

export default function ViewComponents() {
  const { token } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [components, setComponents] = useState<Component[]>([]);
  const [filteredComponents, setFilteredComponents] = useState<Component[]>([]);
  const [selectedTechnology, setSelectedTechnology] = useState('');
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);

  // Mock data for demonstration (in a real app, fetch from API)
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockComponents = [
        {
          id: '1',
          element: 'Button',
          technology: 'React+Tailwind',
          theme: 'Neon',
          code: '<button className="px-4 py-2 bg-purple-600 text-white rounded-md shadow-lg hover:bg-purple-700 hover:shadow-purple-500/50 transition-all duration-300">Neon Button</button>'
        },
        {
          id: '2',
          element: 'Card',
          technology: 'HTML+CSS',
          theme: 'Glass',
          code: '<div class="card">\n  <h3>Glass Card</h3>\n  <p>This is a glass morphism card example</p>\n</div>\n\n<style>\n.card {\n  background: rgba(255, 255, 255, 0.2);\n  backdrop-filter: blur(10px);\n  border-radius: 10px;\n  padding: 20px;\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n}\n</style>'
        },
        {
          id: '3',
          element: 'Navbar',
          technology: 'React',
          theme: 'Minimalist',
          code: 'function Navbar() {\n  return (\n    <nav className="navbar">\n      <div className="logo">Brand</div>\n      <ul className="nav-links">\n        <li>Home</li>\n        <li>About</li>\n        <li>Contact</li>\n      </ul>\n    </nav>\n  );\n}'
        }
      ];
      
      setComponents(mockComponents);
      setFilteredComponents(mockComponents);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleTechnologyFilter = (tech: string) => {
    setSelectedTechnology(tech);
    if (tech === '') {
      setFilteredComponents(components);
    } else {
      setFilteredComponents(components.filter(comp => comp.technology === tech));
    }
  };

  const viewComponent = (component: Component) => {
    setSelectedComponent(component);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      <Card className="glass">
        <CardHeader>
          <CardTitle className="text-2xl font-display">View Components</CardTitle>
          <CardDescription>
            Browse and view component templates created by the community
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="mb-6">
            <label htmlFor="technologyFilter" className="text-sm font-medium block mb-2">
              Filter by Technology
            </label>
            <Select
              value={selectedTechnology}
              onValueChange={handleTechnologyFilter}
            >
              <SelectTrigger className="glass-dark">
                <SelectValue placeholder="All technologies" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All technologies</SelectItem>
                {technologies.map((tech) => (
                  <SelectItem key={tech.value} value={tech.value}>
                    {tech.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-pulse-gentle text-lg">Loading components...</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredComponents.length > 0 ? (
                filteredComponents.map((component) => (
                  <Card key={component.id} className="glass-dark h-full">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{component.element}</CardTitle>
                      <CardDescription className="flex flex-col gap-1">
                        <span>{component.technology}</span>
                        <span>Theme: {component.theme}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => viewComponent(component)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Code
                      </Button>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-8 text-muted-foreground">
                  No components found matching your filter criteria.
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {selectedComponent && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="glass">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>
                  {selectedComponent.element} <span className="text-muted-foreground">({selectedComponent.technology})</span>
                </CardTitle>
                <CardDescription>Theme: {selectedComponent.theme}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <CodeDisplay code={selectedComponent.code} />
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}
