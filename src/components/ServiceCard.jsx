import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function ServiceCard({ title, description, features, index = 0 }) {
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
      whileHover={{ y: -8, scale: 1.02 }}
      className="card-hover p-8 group relative overflow-hidden"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Animated border */}
      <div className="absolute inset-0 rounded-2xl">
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-transparent"
          animate={{
            borderColor: ['transparent', 'rgba(6, 182, 212, 0.3)', 'transparent'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Icon placeholder with gradient */}
        <div className="mb-6">
          <motion.div
            className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent to-cyan-500 flex items-center justify-center shadow-lg shadow-accent/30 group-hover:scale-110 transition-transform duration-300 relative overflow-hidden"
            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
            <span className="text-2xl relative z-10">✨</span>
          </motion.div>
        </div>

        <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-accent transition-colors">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
        
        {features && features.length > 0 && (
          <ul className="space-y-3">
            {features.map((feature, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: (index * 0.1) + (idx * 0.05) + 0.3 }}
                className="flex items-start text-gray-700 group-hover:text-gray-900 transition-colors"
              >
                <motion.span
                  className="text-accent mr-3 mt-1"
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
                <span className="flex-1">{feature}</span>
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}
