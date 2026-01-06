import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Zap,
  Star,
  Users,
  Lightbulb,
  Heart,
  Sparkles,
  Target,
  Award,
} from "lucide-react";
import member1 from "@/assets/member1.jpg";
import member2 from "@/assets/member2.jpg";
import member3 from "@/assets/member3.jpg";
import member4 from "@/assets/member4.jpg";
import member5 from "@/assets/member5.jpg";
import member6 from "@/assets/member6.jpg";
import member7 from "@/assets/member7.jpg";
import member8 from "@/assets/member8.jpg";
import member9 from "@/assets/member9.jpg";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  skill: string;
  description: string;
  image: string;
  icon: React.ReactNode;
}

const teamMembers: TeamMember[] = [
  {
    id: 4,
    name: "Acty Theres Pauly",
    role: "Captain",
    skill: "Team Spirit",
    description: "Energizes the team with enthusiasm and positive vibes.",
    image: member4,
    icon: <Sparkles className="w-4 h-4" />,
  },
  {
    id: 7,
    name: "Karthik",
    role: "Vice Captain",
    skill: "Collaboration",
    description: "Builds bridges and fosters strong team connections.",
    image: member7,
    icon: <Users className="w-4 h-4" />,
  },
  {
    id: 6,
    name: "Aadhithyan G",
    role: "Research and Verification",
    skill: "Technical Excellence",
    description: "Guides and inspires others towards achieving team goals.",
    image: member6,
    icon: <Award className="w-4 h-4" />,
  },
  {
    id: 5,
    name: "Nirmal",
    role: "Technical Lead",
    skill: "Problem Solving",
    description: "Masters technical challenges with precision and expertise.",
    image: member5,
    icon: <Star className="w-4 h-4" />,
  },
  {
    id: 1,
    name: "Gouri Sudesh",
    role: "Tutor",
    skill: "Creative Vision",
    description:
      "Brings innovative ideas and creative solutions to every challenge.",
    image: member1,
    icon: <Lightbulb className="w-4 h-4" />,
  },
  {
    id: 2,
    name: "Neha B S",
    role: "Coordination",
    skill: "Strategic Thinking",
    description: "Analyzes complex problems and develops effective strategies.",
    image: member2,
    icon: <Target className="w-4 h-4" />,
  },
  {
    id: 3,
    name: "R.Varun Thampi",
    role: "Quality Assurance",
    skill: "Problem Solving",
    description: "Tackles challenges head-on with determination and skill.",
    image: member3,
    icon: <Zap className="w-4 h-4" />,
  },
  {
    id: 8,
    name: "Rose Merin John",
    role: "Design Head",
    skill: "Dedication",
    description: "Committed to excellence in every task undertaken.",
    image: member8,
    icon: <Heart className="w-4 h-4" />,
  },
  {
    id: 9,
    name: "Krishna Jyothish",
    role: "Content Head",
    skill: "Innovation",
    description: "Pushes boundaries and explores new possibilities.",
    image: member9,
    icon: <Sparkles className="w-4 h-4" />,
  },
];

export const TeamCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Section header */}
      <div className="container mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-golden">Meet The Team</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            United by passion, driven by purpose — the minds behind the magic.
          </p>
        </motion.div>
      </div>

      {/* Carousel navigation */}
      <div className="absolute top-1/2 left-4 md:left-8 z-20 -translate-y-1/2">
        <button
          onClick={() => scroll("left")}
          className="p-3 rounded-full glass-card hover:bg-golden/20 transition-all duration-300 group"
        >
          <ChevronLeft className="w-6 h-6 text-silver group-hover:text-golden transition-colors" />
        </button>
      </div>
      <div className="absolute top-1/2 right-4 md:right-8 z-20 -translate-y-1/2">
        <button
          onClick={() => scroll("right")}
          className="p-3 rounded-full glass-card hover:bg-golden/20 transition-all duration-300 group"
        >
          <ChevronRight className="w-6 h-6 text-silver group-hover:text-golden transition-colors" />
        </button>
      </div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-8 overflow-x-auto scrollbar-hide px-8 md:px-20 py-8"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex-shrink-0"
            style={{ scrollSnapAlign: "center" }}
            onMouseEnter={() => setHoveredId(member.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <motion.div
              className="relative w-[300px] md:w-[380px] h-[450px] md:h-[520px] rounded-3xl overflow-hidden cursor-pointer perspective-1000"
              animate={{
                scale: hoveredId === member.id ? 1.05 : 1,
                rotateY: hoveredId === member.id ? -5 : 0,
                z: hoveredId === member.id ? 50 : 0,
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Card background image */}
              <div className="absolute inset-0">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-cosmic-deep via-cosmic-deep/60 to-transparent" />
              </div>

              {/* Glow border on hover */}
              <motion.div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                animate={{
                  boxShadow:
                    hoveredId === member.id
                      ? "0 0 40px hsla(45, 100%, 50%, 0.4), inset 0 0 20px hsla(45, 100%, 50%, 0.1)"
                      : "0 0 0px transparent",
                }}
                style={{
                  border:
                    hoveredId === member.id
                      ? "2px solid hsla(45, 90%, 55%, 0.6)"
                      : "1px solid hsla(220, 40%, 30%, 0.3)",
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                {/* Skill badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: hoveredId === member.id ? 1 : 0.7,
                    y: hoveredId === member.id ? 0 : 10,
                  }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel mb-3"
                >
                  <span className="text-golden">{member.icon}</span>
                  <span className="text-xs font-medium text-silver-light">
                    {member.skill}
                  </span>
                </motion.div>

                {/* Name & Role */}
                <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-golden font-medium mb-3">{member.role}</p>

                {/* Description - shows on hover */}
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: hoveredId === member.id ? 1 : 0,
                    height: hoveredId === member.id ? "auto" : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="text-silver text-sm leading-relaxed overflow-hidden"
                >
                  {member.description}
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
