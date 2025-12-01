import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { getReviews } from '../lib/api';
import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import { staggerContainer, fadeUp, scaleIn, mobileBlobVariants, desktopBlobVariants } from '../lib/animationUtils';

function StatCard({ number, label, icon, index = 0 }) {
  const scaleUp = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        delay: index * 0.1 + 0.2,
        type: 'spring',
        stiffness: 200
      }
    }
  };

  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      className="text-center p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 gpu-accelerated"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <motion.div
        className="text-4xl md:text-5xl font-bold gradient-text mb-2"
        variants={scaleUp}
      >
        {number}
      </motion.div>
      <p className="text-gray-600 font-medium">{label}</p>
    </motion.div>
  );
}

function FeatureShowcase() {
  const isMobile = window.innerWidth < 768;

  const features = [
    {
      icon: '🎨',
      title: 'Modern Design',
      description: 'Cutting-edge UI/UX that captivates your audience',
      color: 'from-pink-500 to-rose-500',
    },
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Optimized for speed and performance',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: '🔒',
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security and uptime',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: '📱',
      title: 'Fully Responsive',
      description: 'Perfect on all devices and screen sizes',
      color: 'from-blue-500 to-cyan-500',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl will-change-transform"
          variants={isMobile ? mobileBlobVariants : desktopBlobVariants([0, 50, 0], [0, 30, 0])}
          animate="animate"
        />
        <motion.div
          className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl will-change-transform"
          variants={isMobile ? mobileBlobVariants : desktopBlobVariants([0, -50, 0], [0, -30, 0])}
          animate="animate"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Why Choose <span className="gradient-text">Biogleam</span>?
          </motion.h2>
          <motion.p variants={fadeUp} className="text-xl text-gray-600 max-w-2xl mx-auto">
            We combine cutting-edge technology with beautiful design to create digital experiences that drive results.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={fadeUp}
              whileHover={{ y: -10, scale: 1.05 }}
              className="relative group gpu-accelerated"
            >
              <div className="h-full p-8 rounded-2xl bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />

                <div className="relative z-10">
                  <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ReviewCard({ review, index = 0 }) {
  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      whileHover={{ y: -8 }}
      className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 gpu-accelerated"
    >
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="text-gray-700 mb-6 leading-relaxed italic">"{review.reviewText}"</p>
      <div className="flex items-center">
        {review.avatarUrl ? (
          <img
            src={review.avatarUrl}
            alt={review.name}
            className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-gray-200"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-cyan-500 flex items-center justify-center text-white font-bold text-lg mr-4">
            {review.name.charAt(0)}
          </div>
        )}
        <div>
          <p className="font-semibold text-primary">{review.name}</p>
          <p className="text-sm text-gray-600">
            {review.position && `${review.position}${review.company ? ' at ' : ''}`}
            {review.company || ''}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const { data: reviews = [], isLoading: reviewsLoading } = useQuery({
    queryKey: ['reviews', 'featured'],
    queryFn: () => getReviews({ featured: true, limit: 6 }),
  });

  return (
    <>
      <Helmet>
        <title>Biogleam — Shine Your Brand Online | Web & Digital Solutions</title>
        <meta
          name="description"
          content="Biogleam — Shine Your Brand Online. We build custom websites and web apps for restaurants, hotels, e-commerce, fitness, interiors, photo studios, and more. End-to-end design, development and deployment."
        />
      </Helmet>

      <Hero
        title="Websites that make your business look and work like a pro."
        subtitle="Custom websites and web apps for restaurants, hotels, e-commerce, fitness, interior designers, photo studios, and more."
        primaryCTA={{ text: 'Get a quote', to: '/contact' }}
        secondaryCTA={{ text: 'See our work', to: '/projects' }}
      />

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-primary via-slate-900 to-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold mb-4">Our Impact in Numbers</motion.h2>
            <motion.p variants={fadeUp} className="text-gray-300 text-lg">Delivering excellence across industries</motion.p>
          </motion.div>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <StatCard number="200+" label="Projects Delivered" icon="🚀" index={0} />
            <StatCard number="150+" label="Happy Clients" icon="😊" index={1} />
            <StatCard number="50+" label="Industries Served" icon="🏢" index={2} />
            <StatCard number="99%" label="Client Satisfaction" icon="⭐" index={3} />
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-primary mb-4">
              What We <span className="gradient-text">Offer</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive web solutions tailored to your business needs
            </motion.p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            <ServiceCard
              title="Custom Design"
              description="Brand-first websites that convert visitors into customers."
              features={[
                'Unique brand identity',
                'User-centered design',
                'Conversion optimization',
                'A/B testing',
              ]}
              index={0}
            />
            <ServiceCard
              title="Fast & Secure"
              description="Performance-optimized, SEO-ready builds that rank."
              features={[
                'Lightning-fast load times',
                'SSL encryption',
                'SEO optimization',
                'Mobile-first approach',
              ]}
              index={1}
            />
            <ServiceCard
              title="Full-stack Delivery"
              description="Frontend, backend, hosting and ongoing maintenance."
              features={[
                'Complete development',
                'Cloud hosting setup',
                '24/7 monitoring',
                'Regular updates',
              ]}
              index={2}
            />
          </motion.div>
        </div>
      </section>

      {/* Feature Showcase */}
      <FeatureShowcase />

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-primary mb-4">
              What Our <span className="gradient-text">Clients Say</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from businesses we've helped grow
            </motion.p>
          </motion.div>
          {reviewsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 animate-pulse">
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="h-24 bg-gray-200 rounded mb-6"></div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : reviews.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
            >
              {reviews.slice(0, 6).map((review, index) => (
                <ReviewCard key={review.id} review={review} index={index} />
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No reviews available yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Client Logos Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeUp} className="text-3xl font-bold text-primary mb-4">Trusted by Industry Leaders</motion.h2>
            <motion.p variants={fadeUp} className="text-gray-600 mb-8">
              We've helped restaurants, hotels, e-commerce stores, fitness centers, interior designers, and photo studios establish their online presence.
            </motion.p>
          </motion.div>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              { name: 'Restaurant', icon: '🍽️', color: 'from-orange-400 to-red-500' },
              { name: 'Hotel', icon: '🏨', color: 'from-blue-400 to-cyan-500' },
              { name: 'E-commerce', icon: '🛒', color: 'from-purple-400 to-pink-500' },
              { name: 'Fitness', icon: '💪', color: 'from-green-400 to-emerald-500' },
              { name: 'Interior', icon: '🏠', color: 'from-yellow-400 to-orange-500' },
              { name: 'Photo Studio', icon: '📸', color: 'from-indigo-400 to-purple-500' },
            ].map((client, index) => (
              <motion.div
                key={client.name}
                variants={scaleIn}
                whileHover={{ scale: 1.1, y: -5 }}
                className="h-32 rounded-2xl bg-gradient-to-br bg-white border-2 border-gray-100 shadow-lg hover:shadow-xl flex flex-col items-center justify-center transition-all duration-300 group cursor-pointer gpu-accelerated"
              >
                <div className={`text-4xl mb-2 transform group-hover:scale-110 transition-transform`}>
                  {client.icon}
                </div>
                <p className="text-sm font-semibold text-gray-700 group-hover:text-accent transition-colors">
                  {client.name}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-accent via-cyan-500 to-purple-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="container mx-auto px-4 text-center relative z-10"
        >
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold mb-6">Ready to Shine Online?</motion.h2>
          <motion.p variants={fadeUp} className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Let's discuss how we can help transform your business with a stunning website
          </motion.p>
          <motion.div
            variants={fadeUp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <a
              href="/contact"
              className="bg-white text-accent px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 inline-block"
            >
              Get Started Today →
            </a>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
