import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import gallery1 from "@/assets/gallery1.jpg";
import gallery2 from "@/assets/gallery2.jpg";
import gallery3 from "@/assets/gallery3.jpg";
import gallery4 from "@/assets/gallery4.jpg";

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
    description:
      "Custom-designed hoodies featuring our signature lightning bolt emblem. Each piece represents our team's electric energy and unity.",
    image: gallery1,
  },
  {
    id: 2,
    title: "Gifts & Packages",
    category: "Gifts",
    description:
      "Handcrafted gift packages for team members and partners, wrapped in our cosmic theme with golden accents.",
    image: gallery2,
  },
  {
    id: 3,
    title: "Group Discussions",
    category: "Activities",
    description:
      "Snapshots from our brainstorming and collaboration sessions, capturing the essence of teamwork and innovation.",
    image: gallery3,
  },
  {
    id: 4,
    title: "Achievement Trophy",
    category: "Achievements",
    description:
      "Custom golden trophy celebrating our team's milestones and collective accomplishments throughout the journey.",
    image: gallery4,
  },
];

export const GallerySection = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  return (
    <section className="py-12 sm:py-16 md:py-24 relative">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold mb-3 md:mb-4">
            <span className="text-gradient-golden">What We Built & Shared</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
            From merchandise to memories — every creation tells our story.
          </p>
        </motion.div>

        {/* Gallery grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 perspective-1000">
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
              <div className="relative h-[220px] sm:h-[260px] md:h-[350px] rounded-xl sm:rounded-2xl overflow-hidden glass-card border-glow">
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-cosmic-deep via-cosmic-deep/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6">
                  <span className="inline-block px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium bg-golden/20 text-golden border border-golden/30 mb-2 sm:mb-3">
                    {item.category}
                  </span>
                  <h3 className="font-display text-base sm:text-lg md:text-2xl font-bold text-foreground mb-1 sm:mb-2 group-hover:text-golden transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-silver text-xs sm:text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
              className="relative w-full max-w-3xl glass-card rounded-2xl sm:rounded-3xl overflow-hidden mx-2"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 p-1.5 sm:p-2 rounded-full glass-panel hover:bg-golden/20 transition-colors"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
              </button>

              {/* Image */}
              <div className="h-[200px] sm:h-[280px] md:h-[400px]">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6 md:p-8">
                <span className="inline-block px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium bg-golden/20 text-golden border border-golden/30 mb-3 sm:mb-4">
                  {selectedItem.category}
                </span>
                <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3 sm:mb-4">
                  {selectedItem.title}
                </h3>
                <p className="text-silver text-sm sm:text-base leading-relaxed">
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
