/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'motion/react';
import { 
  Menu, X, ArrowRight, CheckCircle2, Star, 
  Plus, Minus, Facebook, Instagram, Linkedin, 
  ShoppingBag, Monitor, Megaphone, Headphones, 
  Users, TrendingUp, ShieldCheck, Mail, Phone, MapPin
} from 'lucide-react';

// --- Utility Components ---

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="inline-block px-3 py-1 border border-brand-gold/30 rounded-full text-[9px] font-semibold text-brand-gold tracking-[0.2em] mb-6 uppercase"
  >
    {children}
  </motion.div>
);

const AnimatedNumber = ({ value }: { value: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value.replace(/\D/g, ''));
      if (isNaN(end)) {
        setDisplayValue(value);
        return;
      }
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(start).toLocaleString() + (value.includes('+') ? '+' : value.match(/\D/g)?.[0] || ''));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return <span ref={ref}>{displayValue}</span>;
};

// --- Sections ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'About Us', href: '#about' },
    { name: 'Our Work', href: '#work' },
    { name: 'Pricing', href: '#pricing' },
  ];

  return (
    <nav className={`fixed top-0 w-full h-16 z-50 transition-all duration-300 flex items-center justify-between transition-colors ${isScrolled ? 'glass border-b border-white/5 px-10' : 'bg-transparent px-10 pt-4'}`}>
      <div className="font-heading text-xl font-bold tracking-tighter flex items-center">
        <span className="text-white">ECOM</span>
        <span className="text-brand-gold font-extrabold">FLEX</span>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center space-x-8 text-[10px] font-medium tracking-widest text-brand-muted uppercase">
        {navLinks.map((link) => (
          <a key={link.name} href={link.href} className="hover:text-white transition-colors">
            {link.name}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button className="hidden sm:block bg-brand-gold hover:bg-brand-gold-dark text-black font-bold text-[10px] px-6 py-2.5 rounded-full tracking-widest transition-all">
          BOOK A CALL →
        </button>
        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(true)} className="md:hidden text-brand-text">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 glass z-[60] flex flex-col items-center justify-center space-y-8 p-6"
          >
            <button onClick={() => setIsOpen(false)} className="absolute top-6 right-10 text-brand-text">
              <X className="w-8 h-8" />
            </button>
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className="text-xl font-bold tracking-widest uppercase text-brand-text hover:text-brand-gold"
              >
                {link.name}
              </a>
            ))}
            <button className="bg-brand-gold text-black font-bold px-10 py-4 rounded-full text-sm tracking-widest">
              BOOK A CALL →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative pt-16 min-h-[700px] grid lg:grid-cols-12 gap-0 overflow-hidden">
      {/* Hero Content Left */}
      <div className="lg:col-span-7 flex flex-col justify-center px-10 lg:px-20 py-20 relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-brand-gold/5 rounded-full blur-[100px] -z-10" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <SectionLabel>✦ SHOPIFY EXPERTS. ECOM GROWTH PARTNERS.</SectionLabel>
          <h1 className="font-heading text-5xl lg:text-7xl font-extrabold leading-[1.05] text-white mb-6">
            Flexible Solutions.<br />
            Real <span className="text-brand-gold">Ecom</span> Results.
          </h1>
          <p className="text-brand-muted text-lg max-w-lg leading-relaxed mb-10">
            We help brands build, optimize and scale profitable Shopify stores with strategy, design and performance that converts.
          </p>
          <div className="flex flex-wrap gap-4 mb-16">
            <button className="bg-brand-gold hover:bg-brand-gold-dark text-black font-bold px-8 py-4 rounded-md text-sm transition-all hover:translate-y-[-2px]">
              OUR SERVICES →
            </button>
            <button className="border border-white/20 text-white font-bold px-8 py-4 rounded-md text-sm hover:border-brand-gold transition-all">
              BOOK A STRATEGY CALL
            </button>
          </div>
          
          <div className="flex flex-wrap items-center gap-8 opacity-40 grayscale hover:opacity-60 transition-all duration-500">
            <span className="text-[10px] font-bold tracking-widest">SHOPIFY PARTNER</span>
            <span className="text-[10px] font-bold tracking-widest">KLAVIYO</span>
            <span className="text-[10px] font-bold tracking-widest">LOOX</span>
            <span className="text-[10px] font-bold tracking-widest">TIKTOK ADSPARTNER</span>
          </div>
        </motion.div>
      </div>

      {/* Hero Visual Right */}
      <div className="lg:col-span-5 bg-[#111111] relative flex items-center justify-center p-12 overflow-hidden border-l border-white/5">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(var(--color-brand-gold) 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative w-full max-w-md"
        >
          <div className="w-full aspect-[4/3] mockup-gradient rounded-xl shadow-2xl relative overflow-hidden p-2">
            <div className="w-full h-full bg-brand-card rounded-lg border border-white/5 p-6 flex flex-col">
              <div className="flex space-x-1.5 mb-6">
                <div className="w-2 h-2 rounded-full bg-white/10" />
                <div className="w-2 h-2 rounded-full bg-white/10" />
                <div className="w-2 h-2 rounded-full bg-white/10" />
              </div>
              <div className="h-4 w-1/3 bg-white/5 rounded mb-6" />
              <div className="grid grid-cols-2 gap-4 flex-1">
                <div className="bg-brand-gold/10 rounded-lg flex items-end p-4">
                   <div className="w-full h-8 bg-brand-gold/20 rounded" />
                </div>
                <div className="bg-white/5 rounded-lg flex items-end p-4">
                   <div className="w-full h-12 bg-white/10 rounded" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Floating Phone Mockup */}
          <div className="absolute -bottom-8 -right-8 w-32 h-64 bg-black border-[3px] border-[#222] rounded-[24px] shadow-glow-gold p-1 overflow-hidden hidden sm:block">
            <div className="w-full h-full bg-[#181818] rounded-[20px] flex flex-col p-4">
              <div className="w-10 h-1 bg-white/20 mx-auto rounded-full mb-6" />
              <div className="h-3 w-3/4 bg-brand-gold rounded mb-3" />
              <div className="h-16 w-full bg-white/5 rounded mb-3" />
              <div className="mt-auto h-10 w-full bg-brand-gold rounded-full flex items-center justify-center">
                 <div className="w-4 h-4 bg-black rounded-full" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      icon: <ShoppingBag className="w-10 h-10 text-brand-gold" />,
      title: "Shopify Management",
      desc: "End-to-end store management so your business runs smoothly."
    },
    {
      icon: <Monitor className="w-10 h-10 text-brand-gold" />,
      title: "Store Design & CRO",
      desc: "High-converting designs built for a seamless user experience."
    },
    {
      icon: <Megaphone className="w-10 h-10 text-brand-gold" />,
      title: "Marketing & Ads",
      desc: "Data-driven campaigns that drive traffic, increase sales and scale profitably."
    },
    {
      icon: <Headphones className="w-10 h-10 text-brand-gold" />,
      title: "Customer Support",
      desc: "Professional support that delights your customers and builds loyalty."
    },
    {
      icon: <Users className="w-10 h-10 text-brand-gold" />,
      title: "Dedicated Team",
      desc: "A skilled team working behind the scenes to grow your brand."
    }
  ];

  return (
    <section id="services" className="py-24 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-4">
          <div className="max-w-2xl">
            <SectionLabel>→ WHAT WE DO</SectionLabel>
            <h2 className="font-heading text-4xl lg:text-5xl font-bold mb-4">
              Full-Service Shopify <span className="text-brand-gold">Growth</span> Solutions
            </h2>
            <p className="text-brand-muted text-lg">
              From design to marketing and everything in between — we handle it all so you can focus on your brand.
            </p>
          </div>
          <button className="text-brand-gold font-bold hover:text-brand-gold-light transition-colors flex items-center gap-2 group text-sm tracking-widest uppercase">
            EXPLORE SERVICES <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 bg-brand-card rounded-xl border border-white/5 hover:shadow-glow-gold hover:border-brand-gold/30 transition-all hover:-translate-y-1 group relative overflow-hidden"
            >
              <div className="mb-8">{s.icon}</div>
              <h3 className="font-heading text-xl font-bold mb-4">{s.title}</h3>
              <p className="text-brand-muted leading-relaxed text-sm">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const StatsStrip = () => {
  return (
    <div className="bg-black border-y border-brand-gold/20 py-8 lg:py-0 lg:h-24 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 items-center px-6 lg:px-10 text-center">
      <div className="lg:border-r border-white/5 py-4">
        <div className="text-brand-gold font-heading text-xl font-bold"><AnimatedNumber value="250+" /></div>
        <div className="text-[10px] text-brand-muted uppercase tracking-tighter">Stores Managed</div>
      </div>
      <div className="lg:border-r border-white/5 py-4">
        <div className="text-brand-gold font-heading text-xl font-bold"><AnimatedNumber value="$50M+" /></div>
        <div className="text-[10px] text-brand-muted uppercase tracking-tighter">Revenue Generated</div>
      </div>
      <div className="lg:border-r border-white/5 py-4">
        <div className="text-brand-gold font-heading text-xl font-bold"><AnimatedNumber value="98%" /></div>
        <div className="text-[10px] text-brand-muted uppercase tracking-tighter">Client Satisfaction</div>
      </div>
      <div className="lg:border-r border-white/5 py-4">
        <div className="text-white font-medium text-[10px] tracking-widest uppercase">Shopify Management</div>
      </div>
      <div className="lg:border-r border-white/5 py-4">
        <div className="text-white font-medium text-[10px] tracking-widest uppercase">CRO & Design</div>
      </div>
      <div className="py-4">
        <div className="text-white font-medium text-[10px] tracking-widest uppercase">Ad Scaling</div>
      </div>
    </div>
  );
};

const Work = () => {
  const cases = [
    {
      category: "Skincare Brand",
      metric: "+243% Revenue Increase",
      gradient: "from-pink-900/20 to-brand-bg"
    },
    {
      category: "Fashion Retailer",
      metric: "4.8x ROAS Scale",
      gradient: "from-blue-900/20 to-brand-bg"
    },
    {
      category: "Tech Gadgets",
      metric: "+115% Conversion Rate",
      gradient: "from-cyan-900/20 to-brand-bg"
    }
  ];

  return (
    <section id="work" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <SectionLabel>→ OUR WORK</SectionLabel>
            <h2 className="font-heading text-4xl lg:text-5xl font-bold mb-4">
              Results That Speak For <span className="text-brand-gold">Themselves</span>
            </h2>
          </div>
          <button className="border border-brand-gold/50 text-brand-gold font-bold hover:bg-brand-gold/10 px-8 py-3 rounded-full transition-all">
            VIEW ALL CASE STUDIES →
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {cases.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className={`aspect-[4/5] rounded-3xl mb-8 overflow-hidden bg-gradient-to-tr ${c.gradient} border border-white/5 group-hover:border-brand-gold/40 transition-all duration-500 relative`}>
                <div className="absolute inset-0 flex items-center justify-center opacity-40">
                   <TrendingUp className="w-24 h-24 text-brand-gold group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="absolute bottom-10 left-10">
                   <div className="px-4 py-1 bg-brand-gold text-brand-bg text-[10px] font-black rounded-full mb-4 inline-block tracking-widest uppercase shadow-lg shadow-brand-gold/20">
                     {c.category}
                   </div>
                   <div className="text-4xl font-heading font-black text-brand-gold mb-2">{c.metric}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-950 border border-white/10 group"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000')] bg-cover bg-center opacity-30 grayscale group-hover:grayscale-0 transition-all duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-bg to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 p-8 rounded-lg bg-brand-bg/60 backdrop-blur-md border border-white/10">
             <div className="text-brand-gold font-bold mb-2 text-xs tracking-widest uppercase">FOUNDED 2020</div>
             <div className="text-sm text-brand-muted">A vision to redefine e-commerce partnerships through transparency and raw results.</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <SectionLabel>→ ABOUT US</SectionLabel>
          <h2 className="font-heading text-4xl lg:text-5xl font-bold mb-8 leading-tight">
            Your Growth Is Our <span className="text-brand-gold">Mission</span>
          </h2>
          <p className="text-brand-muted text-lg mb-10 leading-relaxed">
            EcomFlex Agency is a full-service eCommerce partner dedicated to helping brands build, scale and dominate their niche. We don't just run ads; we engineer growth ecosystems that sustain long-term profitability.
          </p>
          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            {['Result-Driven Strategies', 'Transparent Communication', 'Expert Team', 'Long-Term Partnership'].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-gold flex-shrink-0" />
                <span className="font-bold text-brand-text whitespace-nowrap text-sm">{item}</span>
              </div>
            ))}
          </div>
          <button className="bg-brand-gold hover:bg-brand-gold-dark text-black font-bold px-10 py-4 rounded-md transition-all flex items-center gap-2 text-sm tracking-widest uppercase">
            LEARN MORE ABOUT US →
          </button>
        </motion.div>
      </div>
    </section>
  );
};

const TrustStrip = () => {
  return (
    <div className="bg-brand-bg-secondary py-12 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-12 lg:gap-24">
        {[
          { icon: <ShieldCheck className="w-6 h-6" />, text: "Trusted by Ecommerce Brands" },
          { icon: <ShieldCheck className="w-6 h-6" />, text: "Secure & Reliable Processes" },
          { icon: <TrendingUp className="w-6 h-6" />, text: "Performance Focused" },
          { icon: <Star className="w-6 h-6" />, text: "Your Success Is Our Priority" }
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3 text-brand-muted">
            <span className="text-brand-gold">{item.icon}</span>
            <span className="text-sm font-bold tracking-tight">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      name: "Marcus Thorne",
      role: "Founder, Zenith Skincare",
      text: "Working with EcomFlex was the turning point for our brand. They didn't just rebuild our store; they rebuilt our entire strategy. We saw a 3x ROI in the first 90 days."
    },
    {
      name: "Elena Rodriguez",
      role: "CEO, Aura Fashion",
      text: "The communication and dedication are unlike any other agency we've worked with. They truly treat our brand as if it were their own. Highly recommend for any scale-up brand."
    },
    {
      name: "Sam Peterson",
      role: "Marketing Director, TechGo",
      text: "Our conversion rate jumped from 1.2% to 3.5% after their CRO audit and layout redesign. Their attention to detail in UX is exceptional."
    }
  ];

  return (
    <section className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-heading text-4xl lg:text-5xl font-bold mb-16 text-center">
          What Our <span className="text-brand-gold">Clients</span> Say
        </h2>

        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 bg-brand-card rounded-3xl border border-white/5 relative group"
            >
              <div className="text-brand-gold text-5xl font-serif mb-8 opacity-40 group-hover:opacity-100 transition-opacity">❝</div>
              <p className="text-brand-text text-lg mb-8 italic leading-relaxed">"{t.text}"</p>
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-brand-gold text-brand-gold" />)}
              </div>
              <div>
                <div className="font-heading font-bold text-brand-text">{t.name}</div>
                <div className="text-xs text-brand-muted uppercase tracking-widest mt-1">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "$997",
      features: ["Shopify Management", "Basic Design Updates", "Email Support", "Monthly Report"]
    },
    {
      name: "Growth",
      price: "$1,997",
      popular: true,
      features: ["Everything in Starter", "Store CRO", "Marketing & Ads Management", "Dedicated Account Manager", "24/7 Support"]
    },
    {
      name: "Scale",
      price: "$3,497",
      features: ["Everything in Growth", "Full Custom Design", "TikTok + Meta Ads", "Advanced Analytics", "Priority Support"]
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-brand-bg border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <SectionLabel>→ PRICING</SectionLabel>
          <h2 className="font-heading text-4xl lg:text-5xl font-bold">
            Simple, <span className="text-brand-gold">Transparent</span> Pricing
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-10 rounded-xl border flex flex-col ${plan.popular ? 'bg-brand-card border-brand-gold shadow-glow-gold' : 'bg-brand-card/50 border-white/5'}`}
            >
              {plan.popular && <div className="bg-brand-gold text-black font-black text-[9px] tracking-widest px-4 py-1 rounded-full self-start mb-6 uppercase">MOST POPULAR</div>}
              <h3 className="font-heading text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-heading font-black text-brand-gold">{plan.price}</span>
                <span className="text-brand-muted text-sm uppercase tracking-tighter">/mo</span>
              </div>
              <div className="space-y-4 mb-12 flex-1">
                {plan.features.map((f, j) => (
                  <div key={j} className="flex gap-3 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                    <span className="text-brand-text leading-tight">{f}</span>
                  </div>
                ))}
              </div>
              <button className={`w-full py-4 rounded-md font-bold transition-all text-xs tracking-widest uppercase ${plan.popular ? 'bg-brand-gold hover:bg-brand-gold-dark text-black' : 'border border-brand-gold/30 text-brand-gold hover:bg-brand-gold/5'}`}>
                GET STARTED →
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = [
    { q: "What makes EcomFlex Agency different from other agencies?", a: "We focus on 'Flexible Growth.' Instead of rigid contracts and cookie-cutter templates, we tailor our management and design teams to your specific scale and goals, focusing strictly on high-conversion results and transparency." },
    { q: "How quickly can I expect to see results?", a: "While every brand is different, our clients typically see store improvements within 14 days and marketing performance shifts within 30-45 days of full implementation." },
    { q: "Do you work with new Shopify stores or only established ones?", a: "We work with both! For new stores, our 'Starter' plan is perfect to build a solid foundation. For established brands doing $10k+/mo, our 'Growth' and 'Scale' plans offer the horsepower needed to dominate." },
    { q: "What platforms do you run ads on?", a: "We specialize in TikTok, Meta (Facebook/Instagram), and Google Ads, with a heavy focus on TikTok creative strategy for modern e-com consumers." },
    { q: "Is there a minimum contract length?", a: "We believe in earning your business every month. While we recommend at least 3 months for full data optimization, we offer flexible month-to-month terms." },
    { q: "How do I get started?", a: "Simply click 'Book A Call' to schedule a free strategy session. We'll audit your current store and present a custom growth plan." }
  ];

  return (
    <section className="py-24">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="font-heading text-4xl lg:text-5xl font-bold mb-16 text-center">
          Frequently Asked <span className="text-brand-gold">Questions</span>
        </h2>

        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div key={i} className="bg-brand-card rounded-2xl border border-white/5 overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-6 flex justify-between items-center text-left hover:bg-white/5 transition-colors"
              >
                <span className="font-bold text-lg pr-8">{f.q}</span>
                {openIndex === i ? <Minus className="w-5 h-5 text-brand-gold" /> : <Plus className="w-5 h-5 text-brand-gold" />}
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <div className="p-6 pt-0 text-brand-muted leading-relaxed">
                      {f.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTABanner = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-brand-gold/5 -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-gold/5 blur-[150px] rounded-full -z-10" />
      
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="font-heading text-5xl lg:text-7xl font-extrabold mb-8">
          Ready to Scale Your <span className="text-brand-gold">Ecom Brand</span>?
        </h2>
        <p className="text-brand-muted text-xl max-w-2xl mx-auto mb-12">
          Book a free strategy call and let's build your growth plan.
        </p>
        <button className="bg-brand-gold hover:bg-brand-gold-light text-brand-bg font-heading font-black px-12 py-6 rounded-full text-xl shadow-2xl shadow-brand-gold/30 transition-all mb-8 flex items-center justify-center gap-3 mx-auto group">
          BOOK YOUR FREE CALL <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-brand-muted font-medium">
           <span>No commitment required</span>
           <span className="text-brand-gold opacity-30">•</span>
           <span>Free 30-min strategy session</span>
           <span className="text-brand-gold opacity-30">•</span>
           <span>Expert advice</span>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-brand-bg pt-24 pb-12 border-t border-brand-gold/20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div>
          <div className="font-heading text-xl font-bold tracking-tighter mb-6">
            <span className="text-white">ECOM</span>
            <span className="text-brand-gold font-extrabold">FLEX</span>
          </div>
          <p className="text-brand-muted text-xs leading-relaxed mb-8 max-w-xs uppercase tracking-tight">
            Flexible solutions for real eCommerce results. Based in the Philippines, scaling brands globally.
          </p>
          <div className="flex gap-3">
            {[Facebook, Instagram, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="p-2 rounded bg-brand-card hover:bg-brand-gold text-brand-muted hover:text-black transition-all">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-[10px] font-bold text-white uppercase tracking-widest mb-8">Services</h4>
          <ul className="space-y-4 text-xs text-brand-muted font-medium uppercase tracking-tighter">
            <li><a href="#" className="hover:text-brand-gold transition-colors">Shopify Management</a></li>
            <li><a href="#" className="hover:text-brand-gold transition-colors">Store Design & CRO</a></li>
            <li><a href="#" className="hover:text-brand-gold transition-colors">Marketing & Ads</a></li>
            <li><a href="#" className="hover:text-brand-gold transition-colors">Customer Support</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] font-bold text-white uppercase tracking-widest mb-8">Agency</h4>
          <ul className="space-y-4 text-xs text-brand-muted font-medium uppercase tracking-tighter">
            <li><a href="#about" className="hover:text-brand-gold transition-colors">About Us</a></li>
            <li><a href="#work" className="hover:text-brand-gold transition-colors">Our Work</a></li>
            <li><a href="#pricing" className="hover:text-brand-gold transition-colors">Pricing</a></li>
            <li><a href="#contact" className="hover:text-brand-gold transition-colors">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] font-bold text-white uppercase tracking-widest mb-8">Contact</h4>
          <ul className="space-y-6 text-xs text-brand-muted font-medium uppercase tracking-tighter">
            <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-brand-gold" /> hello@ecomflex.agency</li>
            <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-brand-gold" /> +63 900 000 0000</li>
            <li className="flex items-start gap-3"><MapPin className="w-4 h-4 text-brand-gold" /> Manila, PH</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 pt-12 border-t border-white/5 text-center text-[9px] text-brand-muted font-bold tracking-[0.2em] uppercase">
        © 2025 EcomFlex Agency. All Rights Reserved.
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <StatsStrip />
        <Work />
        <About />
        <TrustStrip />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}
