
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { ArrowRight, Code, Upload, Sparkles, Star, Eye } from 'lucide-react';

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
      icon: Eye,
      title: 'Browse Elements',
      description: 'Explore a vast collection of UI elements created by our community. Find inspiration for your next project.'
    },
    {
      icon: Sparkles,
      title: 'Customizable Themes',
      description: 'Apply different styles and themes to your elements. From minimalist to neon, we have it all.'
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  return (
    <div className="min-h-screen overflow-hidden">
      <header className="py-6 px-4 glass fixed w-full z-10">
        <div className="container flex justify-between items-center">
          <Link to="/" className="font-display text-xl font-semibold text-white">
            <span className="bg-gradient-to-r from-purple-500 via-primary to-indigo-400 bg-clip-text text-transparent">
              Element Generator
            </span>
          </Link>
          
          <nav>
            <Link to={user ? "/dashboard" : "/auth"}>
              <button className="uiverse-button font-medium">
                {user ? 'Dashboard' : 'Get Started'}
                <ArrowRight className="ml-2 h-4 w-4 inline" />
              </button>
            </Link>
          </nav>
        </div>
      </header>
      
      <main className="pt-28">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-600 via-primary to-indigo-500 opacity-30 blur-xl"></div>
                <h1 className="relative text-4xl md:text-6xl font-display font-bold tracking-tight bg-gradient-to-r from-purple-200 via-white to-indigo-200 bg-clip-text text-transparent">
                  Generate Beautiful UI Elements in Seconds
                </h1>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-xl text-white/80"
              >
                Create stunning UI components for your web projects with our AI-powered element generator. 
                No design skills required.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link to={user ? "/dashboard" : "/auth"}>
                  <button className="uiverse-button font-medium group">
                    {user ? 'Go to Dashboard' : 'Get Started for Free'}
                    <ArrowRight className="ml-2 h-4 w-4 inline group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                
                <Link to="/dashboard/view">
                  <button className="uiverse-button font-medium">
                    Browse Elements
                    <Eye className="ml-2 h-4 w-4 inline" />
                  </button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-display font-bold bg-gradient-to-r from-purple-200 via-white to-indigo-200 bg-clip-text text-transparent inline-block">
                Features
              </h2>
              <p className="text-white/70 mt-2">Powerful tools to enhance your development workflow</p>
            </div>
            
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {features.map((feature, index) => {
                const Icon = feature.icon;
                
                return (
                  <motion.div
                    key={index}
                    variants={item}
                    className="glass-card p-6"
                  >
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/20 to-purple-900/20 flex items-center justify-center mb-4 animate-glow">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                    <p className="text-white/70">{feature.description}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Popular elements section */}
        <section className="py-20 px-4">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-display font-bold bg-gradient-to-r from-purple-200 via-white to-indigo-200 bg-clip-text text-transparent inline-block">
                Popular Elements
              </h2>
              <p className="text-white/70 mt-2">Discover the most loved UI components from our collection</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <motion.div 
                  key={item}
                  className="element-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: item * 0.05 }}
                >
                  <div className="h-40 bg-gradient-to-br from-purple-900/30 to-indigo-900/30 rounded-lg mb-4"></div>
                  <h3 className="text-lg font-medium text-white mb-1">Element #{item}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-white/60 text-sm">React + Tailwind</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
                      <span className="text-white/60 text-sm">{120 + item * 10}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Link to="/dashboard/view">
                <button className="uiverse-button font-medium">
                  View All Elements
                  <ArrowRight className="ml-2 h-4 w-4 inline" />
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="py-10 px-4 border-t border-white/5">
        <div className="container">
          <div className="text-center text-white/60">
            <p>© {new Date().getFullYear()} Element Generator. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
