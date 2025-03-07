
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';

interface PreviewDisplayProps {
  code: string;
  technology: string;
}

export default function PreviewDisplay({ code, technology }: PreviewDisplayProps) {
  const { toast } = useToast();
  const [iframeContent, setIframeContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!code) return;

    try {
      // Create appropriate HTML based on technology
      let htmlContent = '';
      
      if (technology === 'HTML+CSS') {
        htmlContent = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body {
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                margin: 0;
                background-color: #1a1a2e;
                color: white;
                font-family: 'Inter', sans-serif;
              }
            </style>
          </head>
          <body>
            ${code}
          </body>
          </html>
        `;
      } else if (technology === 'React' || technology === 'React+Tailwind') {
        // For React, we can't actually run the component, but we can show a representation
        // If it's simple JSX, we can try to render it directly
        
        const isSimpleJSX = !code.includes('function') && !code.includes('class') && !code.includes('import');
        
        if (isSimpleJSX) {
          htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <script src="https://cdn.tailwindcss.com"></script>
              <style>
                body {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  min-height: 100vh;
                  margin: 0;
                  background-color: #1a1a2e;
                  color: white;
                  font-family: 'Inter', sans-serif;
                }
              </style>
            </head>
            <body>
              <div>${code.replace(/className/g, 'class')}</div>
            </body>
            </html>
          `;
        } else {
          // For more complex React components, show message about preview limitations
          htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>
                body {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  min-height: 100vh;
                  margin: 0;
                  background-color: #1a1a2e;
                  color: white;
                  font-family: 'Inter', sans-serif;
                  text-align: center;
                }
                .preview-note {
                  max-width: 80%;
                  padding: 20px;
                  border-radius: 8px;
                  background: rgba(255,255,255,0.1);
                }
                code {
                  display: block;
                  margin-top: 15px;
                  padding: 10px;
                  background: rgba(0,0,0,0.2);
                  border-radius: 4px;
                  white-space: pre-wrap;
                  text-align: left;
                }
              </style>
            </head>
            <body>
              <div class="preview-note">
                <p>This React component can't be fully rendered in preview.</p>
                <p>Please copy the code to your project to see it in action.</p>
                <code>${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code>
              </div>
            </body>
            </html>
          `;
        }
      } else {
        // Handle Vue or other technologies with a message
        htmlContent = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body {
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                margin: 0;
                background-color: #1a1a2e;
                color: white;
                font-family: 'Inter', sans-serif;
                text-align: center;
              }
              .preview-note {
                max-width: 80%;
                padding: 20px;
                border-radius: 8px;
                background: rgba(255,255,255,0.1);
              }
            </style>
          </head>
          <body>
            <div class="preview-note">
              <p>Preview not available for ${technology}.</p>
              <p>Please copy the code to your project to see it in action.</p>
            </div>
          </body>
          </html>
        `;
      }
      
      setIframeContent(htmlContent);
      setError(null);
    } catch (err) {
      setError("Failed to generate preview");
      toast({
        title: "Preview Error",
        description: "Could not generate a preview for this code",
        variant: "destructive"
      });
    }
  }, [code, technology, toast]);

  if (!code) return null;
  if (error) return <div className="mt-4 p-4 bg-destructive/20 rounded-md text-destructive">{error}</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mt-8 border border-border rounded-lg overflow-hidden"
    >
      <div className="bg-secondary p-2 flex justify-between items-center">
        <h3 className="text-lg font-medium">Preview</h3>
      </div>
      <div className="bg-black/50 w-full h-[300px] overflow-hidden">
        {iframeContent && (
          <iframe
            title="Code Preview"
            srcDoc={iframeContent}
            className="w-full h-full border-0"
            sandbox="allow-scripts"
          />
        )}
      </div>
    </motion.div>
  );
}
