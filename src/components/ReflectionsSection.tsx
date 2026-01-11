import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

interface Reflection {
  id: number;
  quote: string;
  author: string;
  role: string;
}

const reflections: Reflection[] = [
  {
    id: 1,
    quote: "The moment we stopped competing and started collaborating, magic happened. We became unstoppable.",
    author: "Acty Theres Pauly",
    role: "Captian",
  },
  {
    id: 2,
    quote: "Creativity isn't about having the best ideas :- it's about making each other's ideas better.",
    author: "Karthik S.",
    role: "Vise Captain",
  },
  {
    id: 3,
    quote: "Every challenge we faced became a stepping stone. We learned to embrace the unknown.",
    author: "Aadhithyan G.",
    role: "Research and Verification",
  },
  {
    id: 4,
    quote: "True leadership is about lifting others up. Our strength is in our unity.",
    author: "Nirmal M.",
    role: "Technical Lead",
  },
];

export const ReflectionsSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Calm space background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at center, hsl(220 60% 12%) 0%, transparent 70%)',
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-silver">Learning Moments</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Wisdom gathered along the way — reflections that shaped who we are.
          </p>
        </motion.div>

        {/* Reflections grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {reflections.map((reflection, index) => (
            <motion.div
              key={reflection.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="glass-card p-6 md:p-8 rounded-2xl h-full border border-border/20 hover:border-silver/30 transition-all duration-300 relative overflow-hidden">
                {/* Quote icon */}
                <Quote className="w-8 h-8 text-golden/30 mb-4" />

                {/* Quote text */}
                <p className="text-foreground text-lg md:text-xl font-light leading-relaxed mb-6 italic">
                  "{reflection.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-golden to-transparent rounded-full" />
                  <div>
                    <p className="text-foreground font-medium">{reflection.author}</p>
                    <p className="text-muted-foreground text-sm">{reflection.role}</p>
                  </div>
                </div>

                {/* Subtle hover glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ boxShadow: 'inset 0 0 60px hsla(220, 15%, 70%, 0.05)' }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
