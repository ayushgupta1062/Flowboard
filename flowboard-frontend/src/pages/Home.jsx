import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Users,
  ShieldCheck,
  ArrowRight,
  LayoutDashboard,
  Zap,
  Globe,
  Star,
  PlayCircle,
  BarChart3,
  Layers,
  Sparkles
} from 'lucide-react';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] selection:bg-indigo-100 selection:text-indigo-900 font-sans overflow-x-hidden">
      {/* Premium Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/70 backdrop-blur-xl border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="w-11 h-11 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-[14px] flex items-center justify-center shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform duration-300">
                <LayoutDashboard className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-black text-gray-900 tracking-tight">Flow<span className="text-indigo-600">board</span></span>
            </div>

            <div className="hidden lg:flex items-center space-x-10">
              <a href="#features" className="text-sm font-semibold text-gray-600 hover:text-indigo-600 transition-colors">Features</a>
              <a href="#solutions" className="text-sm font-semibold text-gray-600 hover:text-indigo-600 transition-colors">Solutions</a>
              <a href="#pricing" className="text-sm font-semibold text-gray-600 hover:text-indigo-600 transition-colors">Pricing</a>
            </div>

            <div className="flex items-center space-x-6">
              <Link to="/login" className="text-sm font-bold text-gray-700 hover:text-indigo-600 transition-colors hidden sm:block">
                Log in
              </Link>
              <Link
                to="/signup"
                className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-gray-900 text-sm font-bold text-white shadow-2xl hover:bg-indigo-600 transition-all hover:-translate-y-0.5 active:scale-95"
              >
                Start for free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 lg:pt-48 pb-20 overflow-hidden">
        {/* Animated & Glassy Background Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200/40 blur-[120px] rounded-full animate-pulse"></div>
          <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-violet-200/40 blur-[100px] rounded-full"></div>

          {/* Glassy Unsplash Background */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1649478443254-b1a21cc9ed96?q=80&w=1334&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="w-full h-full object-cover opacity-[0.45]"
            />
            <div className="absolute inset-0 backdrop-blur-[10px] bg-white/30"></div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white border border-indigo-100 shadow-sm mb-10">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span className="text-xs font-bold text-gray-800 uppercase tracking-[0.1em]">Reimagining Collaboration</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-black text-gray-900 tracking-tightest leading-[0.95] mb-8"
            >
              Bring all your <br />
              tasks into <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 bg-300% animate-gradient">Flow.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="max-w-3xl mx-auto text-xl text-gray-500 mb-12 leading-relaxed font-medium"
            >
              The intuitive platform that combines project management with effortless
              team collaboration. Achieve more, stress less.
            </motion.p>

            <motion.div variants={itemVariants} className="mb-20">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-4">
                <Link
                  to="/signup"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-indigo-600 text-base font-bold text-white shadow-[0_20px_50px_-15px_rgba(79,70,229,0.4)] hover:bg-indigo-500 hover:shadow-indigo-300 transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2"
                >
                  Get Started - It's Free <ArrowRight className="w-5 h-5" />
                </Link>
                <button className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white text-base font-bold text-gray-900 border-2 border-gray-100 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all flex items-center justify-center gap-2">
                  <PlayCircle className="w-5 h-5 text-indigo-600" />
                  Watch Video
                </button>
              </div>
              <p className="text-center text-[11px] text-gray-400 font-medium">No credit card required • Unlimited users</p>
            </motion.div>

            {/* Premium Mockup */}
            <motion.div
              variants={itemVariants}
              className="relative group mx-auto max-w-5xl"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-[32px] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white rounded-[28px] shadow-2xl border border-gray-200 overflow-hidden">
                <div className="h-8 bg-gray-50 border-b border-gray-200 flex items-center px-4 gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                </div>
                <img
                  src="/assets/hero.png"
                  alt="Flowboard Dashboard"
                  className="w-full h-auto object-cover transform hover:scale-[1.01] transition-transform duration-700"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-12">Trusted by 50,000+ modern teams</p>
          <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            <span className="text-2xl font-black text-gray-900 italic">TRELLO</span>
            <span className="text-2xl font-black text-gray-900">asana</span>
            <span className="text-2xl font-black text-gray-900 tracking-tighter">monday.com</span>
            <span className="text-2xl font-black text-gray-900">Slack</span>
            <span className="text-2xl font-black text-gray-900">NOTION</span>
          </div>
        </div>
      </section>

      {/* Feature Section 1 - Left Image */}
      <section id="features" className="py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -top-10 -left-10 w-64 h-64 bg-indigo-100 rounded-full blur-3xl -z-10"></div>
              <img
                src="/assets/collab.png"
                alt="Teamwork"
                className="w-full h-auto rounded-[40px] shadow-2xl border border-white"
              />
              <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-3xl shadow-2xl border border-gray-100 max-w-[240px] hidden md:block">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-success-light text-success rounded-full flex items-center justify-center">
                    <CheckCircle2 size={20} />
                  </div>
                  <span className="font-bold text-gray-900">Task Complete</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">Marketing campaign assets have been finalized and approved.</p>
              </div>
            </motion.div>

            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 font-bold text-[10px] uppercase tracking-widest">
                Real-time Sync
              </div>
              <h2 className="text-4xl font-black text-gray-900 leading-[1.1]">Collaborate like <br /> you're in the same room.</h2>
              <p className="text-lg text-gray-500 leading-relaxed">
                Invite team members to boards, assign tasks, and watch progress happen in real-time.
                Flowboard keeps everyone on the same page, no matter where they are.
              </p>

              <ul className="space-y-5">
                {[
                  { icon: <Users size={18} />, text: "Unlimited team members per project" },
                  { icon: <Zap size={18} />, text: "Instant notifications and activity feed" },
                  { icon: <ShieldCheck size={18} />, text: "Enterprise-grade role permissions" }
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      {item.icon}
                    </div>
                    <span className="text-gray-700 font-semibold">{item.text}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-6">
                <Link to="/signup" className="group inline-flex items-center text-indigo-600 font-bold gap-2">
                  Learn more about team management <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="py-32 bg-[#111827] text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#4F46E5_1px,transparent_1px)] [background-size:40px_40px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-5xl font-black mb-6">Designed for <br className="sm:hidden" /> high-velocity teams</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Focus on building great products, we'll handle the logistics of project tracking.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 p-10 rounded-[32px] bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 flex flex-col justify-between group hover:border-indigo-500/50 transition-colors">
              <div>
                <div className="w-14 h-14 bg-indigo-500 rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-indigo-500/20">
                  <BarChart3 className="text-white w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Deep Analytics</h3>
                <p className="text-gray-400 leading-relaxed text-lg max-w-md">Track performance across every project with detailed velocity charts and member workload summaries.</p>
              </div>
              <div className="mt-12 overflow-hidden rounded-2xl border border-gray-700">
                <div className="h-40 bg-gray-950 flex items-end px-4 gap-2">
                  {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      className="flex-1 bg-indigo-500 rounded-t-lg"
                    ></motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-10 rounded-[32px] bg-gradient-to-br from-indigo-600 to-violet-700 border border-indigo-400/30 group hover:scale-[1.02] transition-all">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8">
                <Layers className="text-white w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Kanban Perfected</h3>
              <p className="text-indigo-100 leading-relaxed text-lg mb-8">The most fluid drag-and-drop experience you'll ever use. Manage tasks across To Do, In Progress, and Done effortlessly.</p>
              <div className="space-y-3">
                <div className="h-2 bg-white/20 rounded-full w-full"></div>
                <div className="h-2 bg-white/20 rounded-full w-[80%]"></div>
                <div className="h-2 bg-white/20 rounded-full w-[60%]"></div>
              </div>
            </div>

            <div className="p-10 rounded-[32px] bg-gray-800 border border-gray-700/50 group hover:border-indigo-500/50 transition-colors">
              <div className="w-14 h-14 bg-gray-700 rounded-2xl flex items-center justify-center mb-8">
                <Globe className="text-white w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Global Search</h3>
              <p className="text-gray-400 leading-relaxed">Quickly find any task or project across your entire workspace with our powerful indexing engine.</p>
            </div>

            <div className="p-10 rounded-[32px] bg-gray-800 border border-gray-700/50 group hover:border-indigo-500/50 transition-colors">
              <div className="w-14 h-14 bg-gray-700 rounded-2xl flex items-center justify-center mb-8">
                <Star className="text-white w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Priority First</h3>
              <p className="text-gray-400 leading-relaxed">Mark critical tasks and ensure your team is focused on what moves the needle most.</p>
            </div>

            <div className="p-10 rounded-[32px] bg-gray-800 border border-gray-700/50 group hover:border-indigo-500/50 transition-colors">
              <div className="w-14 h-14 bg-gray-700 rounded-2xl flex items-center justify-center mb-8">
                <ShieldCheck className="text-white w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Secure Access</h3>
              <p className="text-gray-400 leading-relaxed">Fine-grained RBAC permissions ensure that your project data stays in the right hands.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 relative">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="p-16 rounded-[48px] bg-white border border-gray-100 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-10 opacity-5">
              <Sparkles className="w-64 h-64 text-indigo-600" />
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8 leading-[1.1]">Ready to boost <br /> your team's output?</h2>
            <p className="text-xl text-gray-500 mb-12 max-w-xl mx-auto font-medium">Join 50k+ professionals and start managing projects with elegance and ease.</p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup" className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gray-900 text-base font-bold text-white hover:bg-indigo-600 transition-all active:scale-95 shadow-xl">
                Get Started Now
              </Link>
              <Link to="/login" className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gray-50 text-base font-bold text-gray-900 hover:bg-gray-100 transition-all active:scale-95 border border-gray-200">
                Sign in
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="py-24 border-t border-gray-800 bg-[#111827]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
                  <LayoutDashboard size={22} />
                </div>
                <span className="text-xl font-black text-white">Flowboard</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">The modern standard for project management and team collaboration. Built for velocity.</p>
              <div className="flex space-x-4">
                {[Globe, Zap, Users].map((Icon, i) => (
                  <div key={i} className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-indigo-400 hover:bg-indigo-400/10 transition-all cursor-pointer">
                    <Icon size={18} />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Product</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><a href="#" className="hover:text-indigo-600">Overview</a></li>
                <li><a href="#" className="hover:text-indigo-600">Features</a></li>
                <li><a href="#" className="hover:text-indigo-600">Integrations</a></li>
                <li><a href="#" className="hover:text-indigo-600">Roadmap</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Company</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><a href="#" className="hover:text-indigo-600">About Us</a></li>
                <li><a href="#" className="hover:text-indigo-600">Careers</a></li>
                <li><a href="#" className="hover:text-indigo-600">Blog</a></li>
                <li><a href="#" className="hover:text-indigo-600">Press</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Resources</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><a href="#" className="hover:text-indigo-600">Documentation</a></li>
                <li><a href="#" className="hover:text-indigo-600">Help Center</a></li>
                <li><a href="#" className="hover:text-indigo-600">Community</a></li>
                <li><a href="#" className="hover:text-indigo-600">Security</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 flex flex-col md:row justify-between items-center gap-4">
            <p className="text-xs text-gray-400 font-medium">© 2026 Flowboard Inc. All rights reserved.</p>
            <div className="flex gap-8 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              <a href="#" className="hover:text-indigo-600">Privacy Policy</a>
              <a href="#" className="hover:text-indigo-600">Terms of Service</a>
              <a href="#" className="hover:text-indigo-600">Cookie Settings</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
