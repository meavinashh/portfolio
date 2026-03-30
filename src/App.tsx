import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaDownload, FaArrowRight, FaExternalLinkAlt, FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaInstagram } from "react-icons/fa";
import { SiReact, SiJavascript, SiHtml5, SiCss3, SiTailwindcss, SiPython, SiFirebase, SiNodedotjs, SiGit, SiVite } from "react-icons/si";

// Particle Background Component
const Particles = () => {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 20,
    duration: 15 + Math.random() * 10,
  }));

  return (
    <div className="particles">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.left}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

// Glass Navbar Component
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "py-2" : "py-4"}`}
    >
      <div className="glass-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-xl font-bold gradient-text cursor-pointer"
              onClick={() => scrollToSection("home")}
            >
              Avinash Shukla
            </motion.div>

            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'skills', 'projects', 'experience', 'contact'].map((item, index) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, color: "#00f2fe" }}
                  onClick={() => scrollToSection(item)}
                  className="capitalize text-gray-300 hover:text-white transition-colors"
                >
                  {item}
                </motion.button>
              ))}
            </div>

            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="space-y-1">
                <div className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}></div>
                <div className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? "opacity-0" : ""}`}></div>
                <div className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}></div>
              </div>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass-card mx-4 mt-2"
            >
              <div className="px-4 py-4 space-y-2">
                {['home', 'about', 'skills', 'projects', 'experience', 'contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="block w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors capitalize"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

// Typing Animation Component
const TypingAnimation = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      let i = 0;
      const typeInterval = setInterval(() => {
        if (i < text.length) {
          setDisplayText((prev) => prev + text.charAt(i));
          i++;
        } else {
          clearInterval(typeInterval);
          setIsTyping(false);
        }
      }, 50);
    }, delay * 1000);

    return () => clearTimeout(startTimer);
  }, [text, delay]);

  return (
    <span>
      {displayText}
      {isTyping && <span className="animate-pulse">|</span>}
    </span>
  );
};

// Skill Card Component
const SkillCard = ({ icon: Icon, name, color }: { icon: any; name: string; color: string }) => (
  <motion.div
    whileHover={{ scale: 1.05, y: -5 }}
    className="glass-card p-4 flex items-center space-x-3 neon-glow-hover cursor-pointer"
  >
    <Icon className={`text-2xl ${color}`} />
    <span className="text-white">{name}</span>
  </motion.div>
);

// Project Card Component
const ProjectCard = ({ title, description, tech, links }: { title: string; description: string; tech: string[]; links: { github?: string; demo?: string } }) => (
  <motion.div
    whileHover={{ scale: 1.02, y: -5 }}
    className="glass-card p-6 neon-glow-hover"
  >
    <h3 className="text-xl font-bold gradient-text mb-3">{title}</h3>
    <p className="text-gray-300 mb-4">{description}</p>
    <div className="flex flex-wrap gap-2 mb-4">
      {tech.map((t) => (
        <span key={t} className="px-3 py-1 text-xs bg-blue-500/20 text-blue-300 rounded-full">
          {t}
        </span>
      ))}
    </div>
    <div className="flex space-x-3">
      {links.github && (
        <motion.a
          whileHover={{ scale: 1.1 }}
          href={links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-white transition-colors"
        >
          <FaGithub size={20} />
        </motion.a>
      )}
      {links.demo && (
        <motion.a
          whileHover={{ scale: 1.1 }}
          href={links.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-white transition-colors"
        >
          <FaExternalLinkAlt size={18} />
        </motion.a>
      )}
    </div>
  </motion.div>
);

// Timeline Component
const TimelineItem = ({ title, description, date }: { title: string; description: string; date: string }) => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="relative pl-8 pb-8"
  >
    <div className="absolute left-0 top-2 w-4 h-4 bg-blue-500 rounded-full neon-glow"></div>
    <div className="absolute left-2 top-6 w-0.5 h-full bg-gradient-to-b from-blue-500 to-transparent"></div>
    <div className="glass-card p-4 ml-4">
      <h3 className="font-bold text-white mb-1">{title}</h3>
      <p className="text-sm text-blue-300 mb-2">{date}</p>
      <p className="text-gray-300">{description}</p>
    </div>
  </motion.div>
);

export function App() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    // Scroll reveal animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your message! I'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black">
      <Particles />
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
              <span className="text-white">Hi, I'm </span>
              <span className="gradient-text">Avinash Shukla</span>
            </h1>
            <div className="text-xl sm:text-2xl md:text-3xl text-gray-300 h-12 flex items-center justify-center">
              <TypingAnimation text="Frontend & Full Stack Developer | Data & AI Enthusiast" delay={0.5} />
            </div>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              BSc Computer Science | React.js Expert | Building Scalable Applications
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold neon-glow shimmer-btn"
            >
              View Projects <FaArrowRight className="inline ml-2" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-3 glass-card text-white rounded-full font-semibold neon-glow-hover"
            >
              Hire Me
            </motion.button>
            
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#"
              className="px-8 py-3 glass-card text-white rounded-full font-semibold neon-glow-hover inline-flex items-center"
            >
              <FaDownload className="mr-2" /> Download Resume
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="mt-12 flex justify-center space-x-6"
          >
            <motion.a
              whileHover={{ scale: 1.2, y: -5 }}
              href="https://github.com/meavinashh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <FaGithub size={24} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2, y: -5 }}
              href="https://www.linkedin.com/in/avinash-shukla-2848a0388/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <FaLinkedin size={24} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2, y: -5 }}
              href="https://www.instagram.com/avii_shukla/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <FaInstagram size={24} />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12 gradient-text"
          >
            About Me
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card p-8 max-w-4xl mx-auto reveal"
          >
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              I'm a <span className="gradient-text font-semibold">self-taught developer</span> with a passion for creating beautiful, functional web applications. With strong expertise in <span className="gradient-text font-semibold">React.js</span> and modern web technologies, I build real-world applications that solve complex problems.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              My journey in tech is driven by a passion for <span className="gradient-text font-semibold">UI/UX design</span> and building scalable systems. I specialize in creating responsive, performant applications with exceptional user experiences.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              Beyond frontend development, I'm deeply interested in <span className="gradient-text font-semibold">Data Analytics, AI & Machine Learning</span>. I'm currently exploring the intersection of web development and artificial intelligence to build intelligent applications.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              <span className="gradient-text font-semibold">Currently seeking full-time opportunities</span> where I can contribute my skills and continue growing as a developer.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12 gradient-text"
          >
            Technical Skills
          </motion.h2>
          
          <div className="space-y-8">
            {/* Frontend Skills */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="reveal"
            >
              <h3 className="text-2xl font-semibold text-blue-300 mb-4">Frontend Development</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                <SkillCard icon={SiReact} name="React.js" color="text-blue-400" />
                <SkillCard icon={SiJavascript} name="JavaScript" color="text-yellow-400" />
                <SkillCard icon={SiHtml5} name="HTML5" color="text-orange-500" />
                <SkillCard icon={SiCss3} name="CSS3" color="text-blue-500" />
                <SkillCard icon={SiTailwindcss} name="Tailwind CSS" color="text-cyan-400" />
              </div>
            </motion.div>

            {/* Programming */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="reveal"
            >
              <h3 className="text-2xl font-semibold text-purple-300 mb-4">Programming</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                <SkillCard icon={SiPython} name="Python" color="text-green-400" />
              </div>
            </motion.div>

            {/* Backend & Tools */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="reveal"
            >
              <h3 className="text-2xl font-semibold text-green-300 mb-4">Backend & Tools</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                <SkillCard icon={SiFirebase} name="Firebase" color="text-yellow-500" />
                <SkillCard icon={SiNodedotjs} name="Node.js (Basic)" color="text-green-500" />
                <SkillCard icon={SiGit} name="Git & GitHub" color="text-orange-500" />
                <SkillCard icon={SiVite} name="Vite" color="text-purple-400" />
              </div>
            </motion.div>

            {/* Data Analytics & Data Science */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="reveal"
            >
              <h3 className="text-2xl font-semibold text-yellow-300 mb-4">Data Analytics & Data Science</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="glass-card p-4 neon-glow-hover">
                  <span className="text-white">DADS (Data Analytics & Data Science)</span>
                </div>
                <div className="glass-card p-4 neon-glow-hover">
                  <span className="text-white">SQL</span>
                </div>
                <div className="glass-card p-4 neon-glow-hover">
                  <span className="text-white">Power BI</span>
                </div>
                <div className="glass-card p-4 neon-glow-hover">
                  <span className="text-white">Tableau</span>
                </div>
                <div className="glass-card p-4 neon-glow-hover">
                  <span className="text-white">Advanced Excel</span>
                </div>
              </div>
            </motion.div>

            {/* AI & Machine Learning */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="reveal"
            >
              <h3 className="text-2xl font-semibold text-red-300 mb-4">AI & Machine Learning</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="glass-card p-4 neon-glow-hover">
                  <span className="text-white">AI Fundamentals</span>
                </div>
                <div className="glass-card p-4 neon-glow-hover">
                  <span className="text-white">Machine Learning Basics</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12 gradient-text"
          >
            Featured Projects
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
            <ProjectCard
              title="Amazon Clone"
              description="Full-featured e-commerce UI with shopping cart system, product listings, and checkout flow. Built with React.js and modern web technologies."
              tech={["React.js", "JavaScript", "CSS3", "Firebase"]}
              links={{ github: "#", demo: "#" }}
            />
            
            <ProjectCard
              title="Instagram Clone"
              description="Social media platform with user authentication, post creation, likes, comments, and real-time notifications system."
              tech={["React.js", "Node.js", "Firebase", "Tailwind CSS"]}
              links={{ github: "#", demo: "#" }}
            />
            
            <ProjectCard
              title="LetsChat - WhatsApp Clone"
              description="Real-time chat application with messaging, group chats, and modern UI. Features responsive design and smooth animations."
              tech={["React.js", "Firebase", "JavaScript", "CSS3"]}
              links={{ github: "#", demo: "#" }}
            />
            
            <ProjectCard
              title="Cab Booking Data Analysis"
              description="Comprehensive data analysis project using SQL for cab booking system. Includes data visualization and business insights."
              tech={["SQL", "Python", "Power BI", "Data Analytics"]}
              links={{ github: "#" }}
            />
          </div>
        </div>
      </section>

      {/* Experience / Learning Journey */}
      <section id="experience" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12 gradient-text"
          >
            Learning Journey
          </motion.h2>
          
          <div className="max-w-3xl mx-auto">
            <TimelineItem
              title="Self-Taught Developer"
              description="Started learning web development through online resources, building projects, and contributing to open source."
              date="2021 - Present"
            />
            <TimelineItem
              title="React.js Mastery"
              description="Developed expertise in React.js ecosystem, building complex applications with state management and modern patterns."
              date="2022 - Present"
            />
            <TimelineItem
              title="Data Analytics & AI Exploration"
              description="Expanded into data analytics and AI/ML, working on projects that combine web development with data science."
              date="2023 - Present"
            />
            <TimelineItem
              title="Full Stack Development"
              description="Building end-to-end applications with frontend, backend, and database integration using modern tech stack."
              date="2024 - Present"
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12 gradient-text"
          >
            Get In Touch
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 reveal"
            >
              <h3 className="text-2xl font-semibold mb-6 text-blue-300">Send Me a Message</h3>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Message</label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors h-32 resize-none"
                    placeholder="Your message..."
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold neon-glow shimmer-btn flex items-center justify-center gap-2"
                >
                  <FaPaperPlane /> Send Message
                </motion.button>
              </form>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6 reveal"
            >
              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold mb-4 text-purple-300">Contact Information</h3>
                  <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-gray-300">
                    <FaEnvelope className="text-blue-400" />
                    <span>avinashshuklaashish@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300">
                    <FaPhone className="text-blue-400" />
                    <span>+91 8412962654</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300">
                    <FaMapMarkerAlt className="text-blue-400" />
                    <span>India</span>
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold mb-4 text-green-300">Connect With Me</h3>
                <div className="flex space-x-4">
                  <motion.a
                    whileHover={{ scale: 1.2, y: -5 }}
                    href="https://github.com/meavinashh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    <FaGithub size={28} />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.2, y: -5 }}
                    href="https://www.linkedin.com/in/avinash-shukla-2848a0388/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    <FaLinkedin size={28} />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.2, y: -5 }}
                    href="https://www.instagram.com/avii_shukla/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    <FaInstagram size={28} />
                  </motion.a>
                </div>
              </div>
              
              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold mb-4 text-yellow-300">Availability</h3>
                <p className="text-gray-300">
                  Currently seeking full-time opportunities. Open to remote positions worldwide.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <h3 className="text-2xl font-bold gradient-text mb-2">Avinash Shukla</h3>
            <p className="text-gray-400">Frontend & Full Stack Developer | Data & AI Enthusiast</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-center space-x-6 mb-4"
          >
            <motion.a
              whileHover={{ scale: 1.2, y: -5 }}
              href="https://github.com/meavinashh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <FaGithub size={20} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2, y: -5 }}
              href="https://www.linkedin.com/in/avinash-shukla-2848a0388/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <FaLinkedin size={20} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2, y: -5 }}
              href="https://www.instagram.com/avii_shukla/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <FaInstagram size={20} />
            </motion.a>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-500 text-sm"
          >
            © 2024 Avinash Shukla. All rights reserved. | Crafted with <span className="text-red-500">❤</span> and React
          </motion.p>
        </div>
      </footer>
    </div>
  );
}
