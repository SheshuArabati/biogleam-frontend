import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function CapabilityCard({ title, description, icon, index = 0 }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ x: 10, scale: 1.02 }}
      className="flex items-start p-6 rounded-xl bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 group"
    >
      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent to-cyan-500 flex items-center justify-center text-white text-xl font-bold mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-bold text-primary mb-2 group-hover:text-accent transition-colors">
          {title}
        </h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
}

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const capabilities = [
    {
      title: 'Custom Web Design',
      description: 'Unique, brand-aligned designs that stand out',
      icon: '🎨',
    },
    {
      title: 'E-commerce Solutions',
      description: 'Full-featured online stores with payment integration',
      icon: '🛒',
    },
    {
      title: 'Booking Platforms',
      description: 'Seamless reservation and scheduling systems',
      icon: '📅',
    },
    {
      title: 'Content Management',
      description: 'Easy-to-use CMS for content updates',
      icon: '📝',
    },
    {
      title: 'API Integrations',
      description: 'Connect with POS, payment gateways, and more',
      icon: '🔌',
    },
    {
      title: 'Performance Optimization',
      description: 'Fast loading times and SEO optimization',
      icon: '⚡',
    },
    {
      title: 'Hosting & Maintenance',
      description: 'Reliable hosting with ongoing support',
      icon: '☁️',
    },
  ];

  const values = [
    {
      title: 'Craft',
      description: 'We take pride in clean, maintainable code and pixel-perfect design that exceeds expectations.',
      icon: '✨',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Reliability',
      description: 'We deliver on time and provide ongoing support to ensure your website runs smoothly.',
      icon: '🛡️',
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: 'ROI',
      description: 'Every feature we build is designed to help your business grow and generate measurable results.',
      icon: '📈',
      color: 'from-purple-500 to-pink-500',
    },
  ];

  return (
    <>
      <Helmet>
        <title>About — Biogleam | Shine Your Brand Online</title>
        <meta
          name="description"
          content="Learn about Biogleam — Shine Your Brand Online. We design, build, and launch sites that grow businesses."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-slate-900 to-primary text-white">
        <div className="absolute inset-0 particle-bg" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 text-center relative z-10"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">
              We design, build, and launch sites that grow businesses.
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Shine Your Brand Online
          </p>
        </motion.div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="prose prose-lg max-w-none"
          >
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              Biogleam is a web studio specializing in custom websites and web applications for
              restaurants, hotels, e-commerce stores, fitness centers, interior designers, photo studios, and creative businesses. We combine
              thoughtful design with robust development to deliver digital experiences that drive
              results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Our Core <span className="gradient-text">Values</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative group"
              >
                <div className="h-full p-8 rounded-2xl bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  <div className="relative z-10">
                    <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      {value.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-accent transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section ref={ref} className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Our <span className="gradient-text">Capabilities</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive solutions for all your web needs
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {capabilities.map((capability, index) => (
              <CapabilityCard key={capability.title} {...capability} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-accent via-cyan-500 to-purple-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px]" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 text-center relative z-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Work Together?</h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Let's discuss your project and see how we can help bring your vision to life
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <a
              href="/contact"
              className="bg-white text-accent px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 inline-block"
            >
              Get in Touch →
            </a>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
