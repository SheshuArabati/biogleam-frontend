import { motion } from 'framer-motion';
import { fadeUp } from '../lib/animationUtils';

export default function ServiceCard({ title, description, features, index = 0 }) {
  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      whileHover={{ y: -8, scale: 1.02 }}
      className="card-hover p-8 group relative overflow-hidden gpu-accelerated"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Animated border - Simplified for performance */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none">
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-accent/20 transition-colors duration-300" />
      </div>

      <div className="relative z-10">
        {/* Icon placeholder with gradient */}
        <div className="mb-6">
          <motion.div
            className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent to-cyan-500 flex items-center justify-center shadow-lg shadow-accent/30 relative overflow-hidden"
            whileHover={{ rotate: [0, -5, 5, -5, 0] }}
            transition={{ duration: 0.4 }}
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
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * idx }}
                className="flex items-start text-gray-700 group-hover:text-gray-900 transition-colors"
              >
                <span className="text-accent mr-3 mt-1">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span className="flex-1">{feature}</span>
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}
