import { useState, useEffect } from 'react';
import './App.css';
import { Menu, X, Download, Mail, Phone, MapPin, Calendar, Linkedin, Instagram, Twitter, Facebook, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import ModelViewer from '@/components/ui/mymodel';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [typedText, setTypedText] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  // Animation type mapping for different sections
  const animationMap: { [key: string]: string } = {
    home: 'rotate',
    about: 'flip',
    skills: 'pendulum',
    projects: 'spiral',
    contact: 'bounce'
  };

  const currentAnimation = animationMap[activeSection] || 'rotate';

  const fullText = 'A Freelancer Web Designer.';

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent successfully! I will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const skills = [
    { name: 'HTML', level: 90 },
    { name: 'CSS', level: 90 },
    { name: 'JavaScript', level: 70 },
    { name: 'C++', level: 80 },
    { name: 'DSA', level: 65 },
    { name: 'DBMS', level: 85 },
    { name: 'Editing', level: 79 },
    { name: 'MS Office', level: 75 },
  ];

  const projects = [
    {
      title: 'Weather Monitoring App',
      image: '/images/weather-app-4.png',
      description: 'A weather app using APIs to retrieve weather data for all cities and countries with dynamic background images.',
      tech: ['HTML', 'CSS', 'JavaScript', 'API'],
    },
    {
      title: 'Amazon Clone',
      image: '/images/amazon.jpg',
      description: 'A fully responsive e-commerce website clone with product listings, cart functionality, and modern UI.',
      tech: ['HTML', 'CSS', 'JavaScript'],
    },
    {
      title: 'Railway Management System',
      image: '/images/railway.png',
      description: 'A database system for managing railway operations, passenger details, and employee management using SQL.',
      tech: ['SQL', 'Database Design'],
    },
    {
      title: 'Portfolio Website',
      image: '/images/portfolio.png',
      description: 'A personal portfolio website showcasing projects, skills, and experience with modern design.',
      tech: ['HTML', 'CSS', 'JavaScript'],
    },
  ];

  const education = [
    { degree: 'B.C.A', institution: 'IIMT Group of College', location: 'Greater Noida', year: 'Pursuing' },
    { degree: '12th Grade', institution: 'Pt. Deen Dayal Inter College', location: 'Maharajganj', year: 'Completed' },
    { degree: '10th Grade', institution: 'Pt. Deen Dayal Inter College', location: 'Maharajganj', year: 'Completed' },
  ];

  return (
    <div className="relative min-h-screen text-white font-sans" style={{ backgroundColor: '#000' }}>
      {/* Fixed 3D Model Background */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      >
        <ModelViewer 
          sketchfabModelUrl="/mymdels/scene.gltf"
          height="100vh"
          isFullScreen={true}
          animationType={currentAnimation}
        />
      </div>

      {/* Semi-transparent overlay for better text visibility */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          backgroundColor: 'rgba(26, 25, 29, 0.7)',
          pointerEvents: 'none'
        }}
      />

      {/* Main Content Container */}
      <div style={{ position: 'relative', zIndex: 10 }}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[rgb(26,25,29)]/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <img src="/images/mcc.jpg" alt="Logo" className="h-10 w-auto" />
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`relative px-3 py-2 text-sm font-medium transition-colors duration-300 ${
                      activeSection === item.toLowerCase() ? 'text-[rgb(211,119,43)]' : 'text-white hover:text-[rgb(211,119,43)]'
                    }`}
                  >
                    {item}
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-[rgb(211,119,43)] transition-all duration-300 ${
                        activeSection === item.toLowerCase() ? 'w-full' : 'w-0'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-[rgb(211,119,43)] transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[rgb(26,25,29)] border-t border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    activeSection === item.toLowerCase()
                      ? 'text-[rgb(211,119,43)] bg-gray-800'
                      : 'text-white hover:text-[rgb(211,119,43)] hover:bg-gray-800'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1 text-center lg:text-left">
              <span className="text-xl text-gray-300 mb-4 block">Hello !</span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
                I'm <span className="text-[rgb(211,119,43)]">Manish Chaudhary</span>
              </h1>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white h-12">
                {typedText}
                <span className="animate-pulse">|</span>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  onClick={() => scrollToSection('contact')}
                  className="bg-[rgb(211,119,43)] hover:bg-[rgb(180,100,35)] text-white px-8 py-3 rounded-full"
                >
                  Hire Me
                </Button>
                <Button
                  variant="outline"
                  onClick={() => scrollToSection('projects')}
                  className="border-[rgb(211,119,43)] text-[rgb(211,119,43)] hover:bg-[rgb(211,119,43)] hover:text-white px-8 py-3 rounded-full"
                >
                  View Projects
                </Button>
              </div>
            </div>
            <div className="flex-1 flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[rgb(211,119,43)] to-orange-500 rounded-full blur-3xl opacity-20"></div>
                <img
                  src="/images/profile.png"
                  alt="Manish Chaudhary"
                  onError={(e) => { const t = e.currentTarget as HTMLImageElement; t.src = '/images/MANI.jpg'; }}
                  className="relative w-72 h-72 sm:w-96 sm:h-96 object-cover rounded-full border-4 border-[rgb(211,119,43)] shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              About <span className="text-[rgb(211,119,43)]">Me</span>
            </h2>
            <div className="w-24 h-1 bg-[rgb(211,119,43)] mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <img
                src="/images/intro.jpg"
                alt="About Me"
                onError={(e) => { const t = e.currentTarget as HTMLImageElement; t.src = '/images/mani1.jpg'; }}
                className="w-80 h-96 object-cover rounded-2xl shadow-2xl border-2 border-[rgb(211,119,43)]/30"
              />
            </div>

            <div className="space-y-6">
              <p className="text-gray-300 text-lg leading-relaxed">
                I'm Manish, a front-end developer currently pursuing a Bachelor of Computer Application at IIMT College of Management. 
                I'm passionate about creating beautiful and functional web experiences.
              </p>

              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 text-[rgb(211,119,43)]">Career Objective</h3>
                <p className="text-gray-300">
                  To work for an organization which provides me the opportunity to improve my skills and knowledge 
                  to grow along with the organization objective. Flexible and being open to feedback. 
                  Eager to learn new technologies and methodologies.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[rgb(211,119,43)]/20 rounded-full flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-[rgb(211,119,43)]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Date of Birth</p>
                    <p className="font-medium">March 05, 2003</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[rgb(211,119,43)]/20 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[rgb(211,119,43)]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Address</p>
                    <p className="font-medium">Maharajganj (U.P)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[rgb(211,119,43)]/20 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[rgb(211,119,43)]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="font-medium">manishkc8269@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[rgb(211,119,43)]/20 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[rgb(211,119,43)]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Phone</p>
                    <p className="font-medium">+91 9793798356</p>
                  </div>
                </div>
              </div>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-white text-black hover:bg-gray-200 px-8 py-3 rounded-full mt-4">
                  <Download className="w-4 h-4 mr-2" />
                  Download CV
                </Button>
              </a>
            </div>
          </div>

          {/* Education Section */}
          <div className="mt-20">
            <h3 className="text-2xl font-bold text-center mb-8">
              My <span className="text-[rgb(211,119,43)]">Education</span>
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-[rgb(211,119,43)] transition-all duration-300 hover:transform hover:-translate-y-2"
                >
                  <div className="w-12 h-12 bg-[rgb(211,119,43)]/20 rounded-full flex items-center justify-center mb-4">
                    <span className="text-[rgb(211,119,43)] font-bold">{edu.degree.charAt(0)}</span>
                  </div>
                  <h4 className="text-lg font-semibold mb-2">{edu.degree}</h4>
                  <p className="text-gray-400">{edu.institution}</p>
                  <p className="text-gray-500 text-sm">{edu.location}</p>
                  <span className="inline-block mt-3 px-3 py-1 bg-[rgb(211,119,43)]/20 text-[rgb(211,119,43)] text-sm rounded-full">
                    {edu.year}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section (replaced) */}
      <section id="skills" className="section dark py-20">
        <div className="container">
          <h3 className="text-4xl font-bold mb-4">Skills</h3>

          <div className="skills-grid icons mt-8">
            <div className="skill">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" alt="Figma" />
              <span>Figma</span>
            </div>

            <div className="skill">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg" alt="Photoshop" />
              <span>Photoshop</span>
            </div>

            <div className="skill">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="HTML" />
              <span>HTML</span>
            </div>

            <div className="skill">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS" />
              <span>CSS</span>
            </div>

            <div className="skill">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" />
              <span>JavaScript</span>
            </div>

            <div className="skill">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" alt="C++" />
              <span>C / OOPS / DSA</span>
            </div>

            <div className="skill">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git" />
              <span>Git & GitHub</span>
            </div>

            <div className="skill">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" alt="VS Code" />
              <span>VS Code</span>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              My <span className="text-[rgb(211,119,43)]">Projects</span>
            </h2>
            <div className="w-24 h-1 bg-[rgb(211,119,43)] mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-[rgb(211,119,43)] transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-[rgb(211,119,43)]/20"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-[rgb(211,119,43)] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-[rgb(211,119,43)]/20 text-[rgb(211,119,43)] text-sm rounded-full"
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

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Contact <span className="text-[rgb(211,119,43)]">Me</span>
            </h2>
            <div className="w-24 h-1 bg-[rgb(211,119,43)] mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Info */}
            <div className="bg-white rounded-2xl p-8 text-black">
              <h3 className="text-2xl font-bold mb-6">Let's get in touch</h3>
              <img
                src="/images/contact.png"
                alt="Contact"
                className="w-full h-48 object-contain mb-6"
              />
              <p className="text-gray-600 mb-6">Connect with me:</p>
              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/in/manish-kumar-chaudhary-736b17257"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center hover:bg-[rgb(211,119,43)] transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/mani_sh_chaudhary"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center hover:bg-[rgb(211,119,43)] transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com/Mr_Manish0503"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center hover:bg-[rgb(211,119,43)] transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="https://www.facebook.com/mr.manish0503"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center hover:bg-[rgb(211,119,43)] transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-800 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-white">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Your Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-white">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={4}
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-white text-black hover:bg-gray-200"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[rgb(26,25,29)] py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Manish Kumar Chaudhary. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Designed & Built with ❤️
          </p>
        </div>
      </footer>
      </div>
    </div>
  );
}

export default App;
