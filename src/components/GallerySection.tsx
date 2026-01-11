import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import gallery1 from '@/assets/gallery1.jpg';
import gallery2 from '@/assets/gallery2.jpg';
import gallery3 from '@/assets/gallery3.jpg';
import gallery4 from '@/assets/gallery4.jpg';


interface GalleryItem {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Team ID Cards",
    category: "Merchandise",
    description: "Custom-designed hoodies featuring our signature lightning bolt emblem. Each piece represents our team's electric energy and unity.",
    image: gallery1,
  },
  {
    id: 2,
    title: "Gifts & Packages",
    category: "Gifts",
    description: "Handcrafted gift packages for team members and partners, wrapped in our cosmic theme with golden accents.",
    image: gallery2,
  },
  {
    id: 3,
    title: "Group Discussions",
    category: "Activities",
    description: "Snapshots from our brainstorming and collaboration sessions, capturing the essence of teamwork and innovation.",
    image: gallery3,
  },
  {
    id: 4,
    title: "Achievement Trophy",
    category: "Achievements",
    description: "Custom golden trophy celebrating our team's milestones and collective accomplishments throughout the journey.",
    image: gallery4,
  },
];

export const GallerySection = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-golden">What We Built & Shared</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From merchandise to memories — every creation tells our story.
          </p>
        </motion.div>

        {/* Gallery grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 perspective-1000">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ 
                scale: 1.02, 
                rotateY: -2,
                z: 30,
              }}
              className="group cursor-pointer preserve-3d"
              onClick={() => setSelectedItem(item)}
            >
              <div className="relative h-[300px] md:h-[350px] rounded-2xl overflow-hidden glass-card border-glow">
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-cosmic-deep via-cosmic-deep/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-golden/20 text-golden border border-golden/30 mb-3">
                    {item.category}
                  </span>
                  <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2 group-hover:text-golden transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-silver text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.description}
                  </p>
                </div>

                {/* View more indicator */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="p-2 rounded-full glass-panel">
                    <ExternalLink className="w-4 h-4 text-golden" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cosmic-deep/90 backdrop-blur-lg"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-3xl glass-card rounded-3xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full glass-panel hover:bg-golden/20 transition-colors"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>

              {/* Image */}
              <div className="h-[300px] md:h-[400px]">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-golden/20 text-golden border border-golden/30 mb-4">
                  {selectedItem.category}
                </span>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {selectedItem.title}
                </h3>
                <p className="text-silver leading-relaxed">
                  {selectedItem.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
