
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { ArrowRight, Code, Upload, Sparkles } from 'lucide-react';

export default function Landing() {
  const { user } = useAuth();
  
  const features = [
    {
      icon: Code,
      title: 'Generate Beautiful UI Elements',
      description: 'Create stunning UI components with just a few clicks. Choose from various technologies and themes.'
    },
    {
      icon: Upload,
      title: 'Upload Your Own Templates',
      description: 'Share your designs with the community. Upload your custom UI elements and help others.'
    },
    {
      icon: Sparkles,
      title: 'Customizable Themes',
      description: 'Apply different styles and themes to your elements. From minimalist to neon, we have it all.'
    }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20">
      <header className="py-6 px-4 glass fixed w-full z-10">
        <div className="container flex justify-between items-center">
          <Link to="/" className="font-display text-xl font-semibold text-primary">
            Element Generator
          </Link>
          
          <nav>
            <Link to={user ? "/dashboard" : "/auth"}>
              <Button>
                {user ? 'Dashboard' : 'Get Started'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </nav>
        </div>
      </header>
      
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-6xl font-display font-bold tracking-tight text-foreground"
              >
                Generate Beautiful UI Elements in Seconds
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-xl text-muted-foreground"
              >
                Create stunning UI components for your web projects with our AI-powered element generator. No design skills required.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Link to={user ? "/dashboard" : "/auth"}>
                  <Button size="lg" className="mt-4">
                    {user ? 'Go to Dashboard' : 'Get Started for Free'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 px-4 bg-accent/20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-display font-bold">Features</h2>
              <p className="text-muted-foreground mt-2">Powerful tools to enhance your development workflow</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="glass p-6 rounded-lg"
                  >
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      
      <footer className="py-10 px-4 border-t border-border">
        <div className="container text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} Element Generator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
