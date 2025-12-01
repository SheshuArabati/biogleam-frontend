import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import ServiceCard from '../components/ServiceCard';

export default function Services() {
  return (
    <>
      <Helmet>
        <title>Services — Biogleam | Shine Your Brand Online</title>
        <meta
          name="description"
          content="Biogleam — Shine Your Brand Online. We offer custom website solutions for restaurants, hotels, e-commerce, fitness, interior designers, photo studios, and more."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-slate-900 to-primary text-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 text-center relative z-10"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">
              Our Services
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We specialize in building custom websites and web applications for specific industries and use cases.
          </p>
        </motion.div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: 'Restaurant Websites',
                description: 'Complete online presence for restaurants with ordering, reservations, and more.',
                features: [
                  'Online ordering system',
                  'POS integration',
                  'Menu management',
                  'Reservation system',
                  'Delivery tracking',
                ],
              },
              {
                title: 'Interior Design Portfolios',
                description: 'Showcase your design work and attract new clients.',
                features: [
                  'Portfolio showcase',
                  'Client galleries',
                  'Booking system',
                  'Project management',
                  'Before/after galleries',
                ],
              },
              {
                title: 'Photo Studio Websites',
                description: 'Professional websites for photographers and studios.',
                features: [
                  'Online booking',
                  'Image galleries',
                  'Client proofing',
                  'Digital delivery',
                  'Payment processing',
                ],
              },
              {
                title: 'Hotel Booking Platforms',
                description: 'Complete booking and management systems for hotels.',
                features: [
                  'Online booking system',
                  'Room availability calendar',
                  'Payment processing',
                  'Guest management',
                  'Review and rating system',
                ],
              },
              {
                title: 'E-commerce Websites',
                description: 'Full-featured online stores for any business.',
                features: [
                  'Product catalog management',
                  'Shopping cart & checkout',
                  'Payment gateway integration',
                  'Order management system',
                  'Inventory tracking',
                ],
              },
              {
                title: 'Fitness Platforms',
                description: 'Comprehensive solutions for gyms and fitness centers.',
                features: [
                  'Class scheduling system',
                  'Member management portal',
                  'Workout plan builder',
                  'Progress tracking',
                  'Online booking & payments',
                ],
              },
              {
                title: 'Custom Web Applications',
                description: 'Tailored solutions for unique business needs.',
                features: [
                  'Custom dashboards',
                  'CRM systems',
                  'CMS integrations',
                  'API development',
                  'Third-party integrations',
                ],
              },
            ].map((service, index) => (
              <ServiceCard key={service.title} index={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
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
              Our <span className="gradient-text">Process</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A streamlined approach to delivering exceptional results
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { step: '01', title: 'Discovery', description: 'We understand your business, goals, and target audience', icon: '🔍' },
              { step: '02', title: 'Design', description: 'Create beautiful, user-friendly designs that reflect your brand', icon: '🎨' },
              { step: '03', title: 'Development', description: 'Build with modern technologies and best practices', icon: '⚙️' },
              { step: '04', title: 'Launch', description: 'Deploy, optimize, and provide ongoing support', icon: '🚀' },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="text-center p-6 rounded-2xl bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <div className="text-sm font-bold text-accent mb-2">STEP {item.step}</div>
                <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
