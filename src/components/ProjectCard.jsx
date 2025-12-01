import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function ProjectCard({ slug, title, summary, image, client, index = 0 }) {
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
      whileHover={{ y: -8 }}
      className="group"
    >
      <Link
        to={`/projects/${slug}`}
        className="block card-hover overflow-hidden"
      >
        {image ? (
          <div className="relative h-64 overflow-hidden">
            <motion.img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5 }}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Hover effect overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-accent/20 to-purple-500/20"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        ) : (
          <div className="relative h-64 bg-gradient-to-br from-accent/20 via-purple-500/20 to-cyan-500/20 overflow-hidden">
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2306b6d4' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl mb-2">📸</div>
                <p className="text-sm text-gray-600 font-medium">Project Image</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="p-6 relative">
          {client && (
            <motion.p
              className="text-sm text-gray-500 mb-2 font-medium"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
            >
              {client}
            </motion.p>
          )}
          
          <motion.h3
            className="text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
          >
            {title}
          </motion.h3>
          
          <motion.p
            className="text-gray-600 mb-4 line-clamp-3"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: index * 0.1 + 0.4 }}
          >
            {summary}
          </motion.p>
          
          <motion.div
            className="flex items-center text-accent font-semibold group-hover:gap-2 transition-all"
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ delay: index * 0.1 + 0.5 }}
          >
            <span>View case study</span>
            <motion.span
              className="inline-block"
              animate={{ x: [0, 5, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              →
            </motion.span>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}
