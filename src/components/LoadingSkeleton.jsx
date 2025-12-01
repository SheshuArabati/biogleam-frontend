import { motion } from 'framer-motion';

export function Skeleton({ className = '', variant = 'rectangular' }) {
  const baseClasses = 'skeleton';
  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  return (
    <motion.div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      animate={{
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

export function StatCardSkeleton() {
  return (
    <div className="card p-6">
      <Skeleton variant="text" className="w-24 h-4 mb-4" />
      <Skeleton variant="text" className="w-16 h-8" />
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div className="card p-6">
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex gap-4">
            <Skeleton variant="text" className="flex-1 h-4" />
            <Skeleton variant="text" className="w-24 h-4" />
            <Skeleton variant="text" className="w-20 h-4" />
          </div>
        ))}
      </div>
    </div>
  );
}
