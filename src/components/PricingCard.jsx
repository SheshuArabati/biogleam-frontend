import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function PricingCard({
  name,
  price,
  description,
  features,
  ctaText,
  popular = false,
  index = 0,
}) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -12, scale: popular ? 1.03 : 1.02 }}
      className={`relative card-hover p-8 group ${popular ? 'border-2 border-accent shadow-glow' : ''
        }`}
    >
      {popular && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={inView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
          transition={{ delay: index * 0.1 + 0.3, type: 'spring', stiffness: 200 }}
          className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-max"
        >
          <span className="bg-gradient-to-r from-accent to-cyan-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg shadow-accent/50 whitespace-nowrap">
            ⭐ Popular
          </span>
        </motion.div>
      )}

      {/* Gradient background for popular */}
      {popular && (
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-cyan-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}

      <div className="relative z-10">
        <motion.h3
          className="text-2xl font-bold text-primary mb-3 group-hover:text-accent transition-colors"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: index * 0.1 + 0.2 }}
        >
          {name}
        </motion.h3>

        <motion.p
          className="text-gray-600 mb-6"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: index * 0.1 + 0.3 }}
        >
          {description}
        </motion.p>

        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ delay: index * 0.1 + 0.4, type: 'spring' }}
        >
          <span className="text-5xl font-bold gradient-text">{price}</span>
        </motion.div>

        <ul className="space-y-4 mb-8">
          {features.map((feature, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: index * 0.1 + 0.5 + idx * 0.05 }}
              className="flex items-start"
            >
              <motion.span
                className="text-accent mr-3 mt-1 flex-shrink-0"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.3 }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.span>
              <span className="text-gray-700">{feature}</span>
            </motion.li>
          ))}
        </ul>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to={`/contact${name.toLowerCase() !== 'enterprise' ? `?package=${name.toLowerCase()}` : ''}`}
            className={`block text-center py-4 rounded-xl font-semibold transition-all duration-300 ${popular
              ? 'bg-gradient-to-r from-accent to-cyan-500 text-white shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40'
              : 'bg-primary text-white hover:bg-slate-800 shadow-lg hover:shadow-xl'
              }`}
          >
            {ctaText}
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
