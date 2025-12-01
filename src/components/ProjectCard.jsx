import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeUp } from '../lib/animationUtils';

export default function ProjectCard({ slug, title, summary, image, client, index = 0 }) {
  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      whileHover={{ y: -8 }}
      className="group gpu-accelerated"
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
              className="w-full h-full object-cover will-change-transform"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5 }}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
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
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {client}
            </motion.p>
          )}

          <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors">
            {title}
          </h3>

          <p className="text-gray-600 mb-4 line-clamp-3">
            {summary}
          </p>

          <div className="flex items-center text-accent font-semibold group-hover:gap-2 transition-all">
            <span>View case study</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
