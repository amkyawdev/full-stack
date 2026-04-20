'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type LoaderType = 'spinner' | 'dots' | 'pulse' | 'skeleton';
type LoaderSize = 'sm' | 'md' | 'lg';

interface LoaderProps {
  type?: LoaderType;
  size?: LoaderSize;
  className?: string;
  text?: string;
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
};

export default function Loader({ type = 'spinner', size = 'md', className, text }: LoaderProps) {
  const renderLoader = () => {
    switch (type) {
      case 'spinner':
        return (
          <motion.div
            className={cn('border-2 border-cyan-500/30 border-t-cyan-500 rounded-full', sizeClasses[size], className)}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        );

      case 'dots':
        return (
          <div className={cn('flex gap-2', className)}>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className={cn('bg-cyan-500 rounded-full', 
                  size === 'sm' ? 'w-2 h-2' : size === 'lg' ? 'w-4 h-4' : 'w-3 h-3'
                )}
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        );

      case 'pulse':
        return (
          <div className={cn('flex gap-1', className)}>
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className={cn('bg-gradient-to-t from-cyan-500 to-purple-500 rounded-full',
                  size === 'sm' ? 'w-1' : size === 'lg' ? 'w-3' : 'w-2',
                  size === 'sm' ? 'h-4' : size === 'lg' ? 'h-12' : 'h-8'
                )}
                animate={{ scaleY: [0.3, 1, 0.3] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        );

      case 'skeleton':
        return (
          <div className={cn('space-y-3 w-full', className)}>
            <div className="flex items-center gap-3">
              <motion.div
                className="w-10 h-10 rounded-full bg-gray-700"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <div className="space-y-2 flex-1">
                <motion.div
                  className="h-3 bg-gray-700 rounded w-3/4"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
                />
                <motion.div
                  className="h-2 bg-gray-800 rounded w-1/2"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                />
              </div>
            </div>
            <motion.div
              className="h-20 bg-gray-800 rounded-lg"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {renderLoader()}
      {text && (
        <motion.p
          className="text-sm text-gray-400"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
}