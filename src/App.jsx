import React, { useState, useEffect } from 'react';
import { Mail, Github, Linkedin, ExternalLink, Download, Code, Cpu, Database, Globe, X, Menu, ChevronDown, BookOpen, BarChart3, FileSpreadsheet, TrendingUp, Brain, Sigma } from 'lucide-react';
// force vercel redeploy

// Main App Component
export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');

  // Smooth scroll handler
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  // Intersection Observer for section highlighting
  useEffect(() => {
    const observers = [];
    const sections = ['home', 'about', 'skills', 'projects', 'blogs', 'resume', 'contact'];
    
    sections.forEach(section => {
      const element = document.getElementById(section);
      if (element) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActiveSection(section);
            }
          },
          { threshold: 0.5 }
        );
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => observers.forEach(obs => obs.disconnect());
  }, []);

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("https://formspree.io/f/xrbrgyyl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      setFormStatus("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } else {
      setFormStatus("Failed to send message. Try again.");
    }

    setTimeout(() => setFormStatus(""), 3000);
  };

  // Skills data - Updated for Data Analyst/Data Scientist
  const skills = [
    { name: 'Python', icon: <Code className="w-6 h-6" /> },
    { name: 'SQL', icon: <Database className="w-6 h-6" /> },
    { name: 'Machine Learning', icon: <Brain className="w-6 h-6" /> },
    { name: 'Deep Learning', icon: <Cpu className="w-6 h-6" /> },
    { name: 'GenAI / LLMs', icon: <Globe className="w-6 h-6" /> },
    { name: 'Power BI', icon: <BarChart3 className="w-6 h-6" /> },
    { name: 'MS Excel', icon: <FileSpreadsheet className="w-6 h-6" /> },
    { name: 'Time Series Analysis', icon: <TrendingUp className="w-6 h-6" /> },
    { name: 'Statistics', icon: <Sigma className="w-6 h-6" /> },
  ];

  // Projects data
  const projects = [
    {
      id: 1,
      title: 'Customer Segmentation & Personalized Marketing (Clustering + BI)',
      description: 'ML-based customer clustering and behavior analysis',
      tech: ['Python', 'Pandas', 'Matplotlib', 'Scikit-learn', 'Power BI'],
      image: 'https://www.xsights.co.uk/wp-content/uploads/2024/05/musteri-segmentasyonu.png',
      details:
        'Performed RFM analysis and K-means clustering on customer transaction data. Identified 5 distinct customer segments, enabling targeted marketing campaigns that increased customer retention by 28%.',
      link: 'https://github.com/AkshayShetty7/Customer-Segmentation-Personalized-Marketing-in-Retail',
    },
    {
      id: 2,
      title: 'Chronic Kidney Disease Prediction (ML Classification)',
      description:
        'Machine learning–based classification model to predict the likelihood of chronic kidney disease using clinical and laboratory data.',
      tech: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Streamlit'],
      image:
        'https://www.citlprojects.com/hubfs/featured-image/analysis-of-chronic-kidney-disease-prediction-1024x683.webp',
      details:
        'Developed an ML model using logistic regression and decision trees to predict CKD likelihood with 96% accuracy. Deployed as an interactive Streamlit app for clinicians to assess risk in real-time.',
      link: 'https://github.com/AkshayShetty7/Chronic-Kidney-Disease',
    },
    {
      id: 3,
      title: 'Marketing Campaign Analysis (SQL + Power BI)',
      description: 'Data-driven insights to optimize marketing campaign performance.',
      tech: ['Power BI', 'SQL', 'Excel'],
      image: 'https://www.aimtechnologies.co/wp-content/uploads/2024/07/Campaign-Analytics-Tools.jpg',
      details:
        'Created an automated data pipeline that extracts, transforms, and loads financial data from multiple sources. Reduced manual reporting time by 70% and improved data accuracy through validation checks.',
      link: 'https://github.com/AkshayShetty7/Marketing_Campaign_Analysis',
    },
  ];

  // Blogs data
  const blogs = [
    {
      id: 1,
      title: 'Beyond Accuracy: How ROC-AUC Reveals the True Power of Your Model',
      excerpt:
        'Discover how ROC-AUC goes beyond accuracy to evaluate model performance, revealing a classifier\'s true ability to distinguish between classes with deeper insight and reliability...',
      date: 'Sep 30, 2025',
      readTime: '5 min read',
      image:
        'https://cdn.prod.website-files.com/660ef16a9e0687d9cc27474a/662c42679571ef35419c9968_64760779d5dc484958a3f917_classification_metrics_017-min.png',
      tags: ['Machine Learning', 'Model Evaluation', 'ROC-AUC', 'Data Science'],
      link: 'https://dev.to/akshay_shetty_686041/from-toy-boxes-to-code-a-simple-intro-to-roc-auc-omf',
    },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-gray-100 min-h-screen font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/95 backdrop-blur-sm z-50 border-b border-slate-700/50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Portfolio
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex gap-6 xl:gap-8">
            {['home', 'about', 'skills', 'projects', 'blogs', 'resume', 'contact'].map(section => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`capitalize transition-all text-sm xl:text-base whitespace-nowrap ${
                  activeSection === section
                    ? 'text-cyan-400 font-semibold'
                    : 'text-gray-300 hover:text-cyan-300'
                }`}
              >
                {section === 'blogs' ? 'My Blogs' : section}
              </button>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden text-cyan-400"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-slate-800 border-t border-slate-700">
            {['home', 'about', 'skills', 'projects', 'blogs', 'resume', 'contact'].map(section => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="block w-full text-left px-6 py-3 capitalize hover:bg-slate-700 transition-colors"
              >
                {section === 'blogs' ? 'My Blogs' : section}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20 relative">
        <div className="max-w-4xl text-center animate-fadeIn">
          <div className="mb-6 animate-slideDown">
            {/* Profile Photo */}
            <div className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-cyan-500 shadow-lg shadow-cyan-500/50">
              <img 
                src="/akshay.jpg" 
                alt="Akshay Shetty"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 pb-3 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Akshay Shetty
            </h1>
            <p className="text-3xl md:text-3xl text-gray-300 mb-6">
              Data Analyst & AI/ML Enthusiast
            </p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
              Transforming data into actionable insights through analytics and machine learning
            </p>
          </div>
          
          <div className="flex gap-4 justify-center mb-8 animate-slideUp">
            <button 
              onClick={() => scrollToSection('projects')}
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all transform hover:scale-105"
            >
              View Projects
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-8 py-3 bg-slate-800 border-2 border-cyan-500 rounded-lg font-semibold hover:bg-slate-700 transition-all transform hover:scale-105"
            >
              Contact Me
            </button>
          </div>

          <div className="flex gap-6 justify-center animate-slideUp">
            <a 
              href="https://github.com/AkshayShetty7" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors transform hover:scale-110"
            >
              <Github className="w-6 h-6" />
            </a>

            <a 
              href="https://www.linkedin.com/in/akshay-shetty-25b3a624a/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors transform hover:scale-110"
            >
              <Linkedin className="w-6 h-6" />
            </a>

            <a 
              href="mailto:akshayshetty747@gmail.com"
              className="text-gray-400 hover:text-cyan-400 transition-colors transform hover:scale-110"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 border border-slate-700/50 hover:border-cyan-500/50 transition-all">
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              I'm a data analyst and aspiring AI/ML engineer with hands-on experience in Python, SQL, and data visualization tools like Power BI. I enjoy working with data and uncovering meaningful patterns.
            </p>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              My analytical journey combines statistical modeling, machine learning, and business intelligence to solve real-world problems. I excel at building predictive models, creating interactive dashboards, and performing advanced analytics including time series forecasting, customer segmentation, and trend analysis.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              I'm actively exploring AI, deep learning, and GenAI while learning through practical projects and experimentation.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="min-h-screen flex items-center px-6 py-20">
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Technical Skills
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, idx) => (
              <div 
                key={idx}
                className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all hover:transform hover:scale-105 group"
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="p-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg group-hover:scale-110 transition-transform">
                    {skill.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{skill.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen flex items-center px-6 py-20">
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-4xl font-bold mb-12 pb-3 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div 
                key={project.id}
                className="bg-slate-800/50 backdrop-blur rounded-2xl overflow-hidden border border-slate-700/50 hover:border-cyan-500/50 transition-all hover:transform hover:scale-105 cursor-pointer group"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative overflow-hidden h-48">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 bg-slate-700 rounded-full text-sm text-cyan-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-fadeIn"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-700 animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-64">
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 bg-slate-900/80 rounded-full hover:bg-slate-900 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-8">
              <h3 className="text-3xl font-bold mb-4 text-cyan-400">{selectedProject.title}</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">{selectedProject.details}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tech.map((tech, idx) => (
                  <span 
                    key={idx}
                    className="px-4 py-2 bg-slate-700 rounded-full text-cyan-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <a
                href={selectedProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold text-sm hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                View Project
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Blogs Section */}
      <section id="blogs" className="min-h-screen flex items-center px-6 py-20">
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-4xl font-bold mb-12 pb-3 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            My Blogs
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <a
                key={blog.id}
                href={blog.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800/50 backdrop-blur rounded-2xl overflow-hidden border border-slate-700/50 hover:border-cyan-500/50 transition-all hover:transform hover:scale-105 cursor-pointer group block"
              >
                <div className="relative overflow-hidden h-48">
                  <img 
                    src={blog.image} 
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {blog.readTime}
                    </span>
                    <span>{blog.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-gray-400 mb-4">{blog.excerpt}</p>
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 bg-slate-700 rounded-full text-sm text-cyan-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="min-h-screen flex items-center px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Resume
          </h2>
          <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-12 border border-slate-700/50 hover:border-cyan-500/50 transition-all">
            <p className="text-lg text-gray-300 mb-8">
              Download my complete resume to learn more about my experience, education, and accomplishments.
            </p>
            <a 
              href="/Resume.pdf?v=3"
              download="Resume.pdf"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all transform hover:scale-105"
            >
              <Download className="w-6 h-6" />
              Download Resume (PDF)
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center px-6 py-20">
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 border border-slate-700/50">
            <div className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2 font-semibold">Name</label>
                <input 
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors text-gray-100"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2 font-semibold">Email</label>
                <input 
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors text-gray-100"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2 font-semibold">Message</label>
                <textarea 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows="5"
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors text-gray-100 resize-none"
                />
              </div>
              <button 
                onClick={handleSubmit}
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all transform hover:scale-105"
              >
                Send Message
              </button>
              {formStatus && (
                <p className="text-center text-cyan-400 animate-fadeIn">{formStatus}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-700 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-gray-400">
          <p>© 2025 Akshay Shetty. All Rights Reserved.</p>
          <p className="mt-2">Crafted with React & Tailwind CSS</p>
        </div>
      </footer>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideDown {
          from { 
            opacity: 0;
            transform: translateY(-30px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(30px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideRight {
          from { width: 0; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        .animate-slideDown {
          animation: slideDown 0.8s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.8s ease-out;
        }
        .animate-slideRight {
          animation: slideRight 1.5s ease-out;
        }
      `}</style>
    </div>
  );
}