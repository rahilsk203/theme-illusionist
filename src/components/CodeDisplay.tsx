
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check, Eye } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import PreviewDisplay from './PreviewDisplay';

interface CodeDisplayProps {
  code: string;
  technology?: string;
}

export default function CodeDisplay({ code, technology = 'HTML+CSS' }: CodeDisplayProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    
    toast({
      title: "Copied!",
      description: "Code has been copied to clipboard",
    });
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const togglePreview = () => {
    setShowPreview(prev => !prev);
  };
  
  if (!code) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="mt-8"
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium">Generated Code</h3>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="glass-dark"
            onClick={togglePreview}
          >
            <Eye className="h-4 w-4 mr-2" />
            {showPreview ? 'Hide Preview' : 'Show Preview'}
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="glass-dark"
            onClick={copyToClipboard}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2" />
                Copy Code
              </>
            )}
          </Button>
        </div>
      </div>
      
      <pre className="code-block custom-scrollbar">{code}</pre>
      
      {showPreview && <PreviewDisplay code={code} technology={technology} />}
    </motion.div>
  );
}
