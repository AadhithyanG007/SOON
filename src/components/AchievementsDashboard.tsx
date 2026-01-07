import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Trophy, CheckCircle, Calendar, Clock } from 'lucide-react';

interface StatItem {
  id: number;
  label: string;
  value: number;
  suffix: string;
  icon: React.ReactNode;
  color: string;
}

interface DayTask {
  day: string;
  date: string;
  tasks: string[];
  status?: "completed" | "inProgress";
}

const stats: StatItem[] = [
  { id: 1, label: "Total Points", value: 28341, suffix: "", icon: <Trophy className="w-6 h-6" />, color: "text-golden" },
  { id: 2, label: "Tasks Completed", value: 14, suffix: "", icon: <CheckCircle className="w-6 h-6" />, color: "text-accent" },
];

const dayTasks: DayTask[] = [
  {
    day: "Day 1",
    date: "First Day",
    tasks: [
      "Team formation & introduction",
      "Brainstorming session for ideas",
      "Understanding the task and outlining our plan to create the gym advertisement.",
      "Completed the introspection and icebreaker activities to understand myself better and connect with the team.",
      "Learned how to create a professional resume and identified mistakes in our body language.",
      "Prepared a PPT introducing our team name, logo, and member roles."
    ],
    status: "completed",
  },
  {
    day: "Day 2",
    date: "Second Day",
    tasks: ["Learned the importance of preparation and planning by observing how teams earned points and executed their ideas effectively.",
            "Submitted the icebreaker, introspection form, and diary, and understood the need for clear communication and verifying tasks within the team.",
            "Presented our updated PPT (logo, name, tagline, roles, and ideas implemented) and improved teamwork, confidence, and presentation skills.",
            "Participated in activities like the Bread-Butter-Jam task and reflections, which strengthened focus, presence of mind, and learning from mistakes.",
            "Updated my resume to make it more professional and industry-ready.",
            "Learned key interview concepts — answering “Tell me about yourself,” strengths and weaknesses, salary questions, stress interviews, and “Where do you see yourself in 5 years?” confidently."

    ],
    status: "completed",
  },
  {
    day: "Day 3",
    date: "In Progress",
    tasks: [],
    status: "inProgress",
  }
];

const CountUpNumber = ({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    
    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, inView]);

  return (
    <span className="font-display text-4xl md:text-5xl font-bold">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

export const AchievementsDashboard = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-golden/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[100px]" />
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
            <span className="text-gradient-golden">Achievements & Milestones</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every number tells a story of dedication, growth, and collective triumph.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-4 md:gap-6 mb-16 max-w-2xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="glass-card p-6 md:p-8 rounded-2xl h-full border border-border/30 hover:border-golden/40 transition-all duration-300 hover:shadow-lg hover:shadow-golden/10">
                {/* Icon */}
                <div className={`inline-flex p-3 rounded-xl mb-4 glass-panel ${stat.color}`}>
                  {stat.icon}
                </div>

                {/* Value */}
                <div className={stat.color}>
                  <CountUpNumber value={stat.value} suffix={stat.suffix} inView={isInView} />
                </div>

                {/* Label */}
                <p className="text-silver text-sm md:text-base mt-2 font-medium">
                  {stat.label}
                </p>

                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" 
                  style={{ boxShadow: '0 0 40px hsla(45, 100%, 50%, 0.15)' }} 
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* 3 Days Tasks Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-card rounded-3xl p-6 md:p-10 border border-border/30"
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <Calendar className="w-6 h-6 text-golden" />
            <h3 className="font-display text-xl md:text-2xl font-bold text-foreground text-center">
              Our 3-Day Journey
            </h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {dayTasks.map((day, dayIndex) => (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 + dayIndex * 0.15 }}
                className="relative"
              >
                <div
                  className={`glass-panel rounded-2xl p-6 h-full border border-border/20 transition-all duration-300 group ${
                    day.status === "inProgress"
                      ? "opacity-80"
                      : "hover:border-golden/30"
                  }`}
                >
                  {/* Day header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-golden to-golden-light">
                      <Clock className="w-4 h-4 text-cosmic-deep" />
                    </div>
                    <div>
                      <h4 className="font-display text-lg font-bold text-golden">{day.day}</h4>
                      <p className="text-xs text-silver">{day.date}</p>
                    </div>
                  </div>

                  {/* Tasks list */}
                  {day.status === "inProgress" ? (
                    <div className="flex items-center gap-2 rounded-xl border border-border/20 px-3 py-2 text-sm text-silver">
                      <Clock className="w-4 h-4 text-golden" />
                      <span>In Progress</span>
                    </div>
                  ) : (
                    <ul className="space-y-3">
                      {day.tasks.map((task, taskIndex) => (
                        <motion.li
                          key={taskIndex}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 0.6 + dayIndex * 0.15 + taskIndex * 0.1 }}
                          className="flex items-start gap-2"
                        >
                          <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-silver-light leading-relaxed">{task}</span>
                        </motion.li>
                      ))}
                    </ul>
                  )}

                  {/* Glow on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ boxShadow: '0 0 30px hsla(45, 100%, 50%, 0.1)' }}
                  />
                </div>

                {/* Connector line (hidden on mobile) */}
                {dayIndex < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-golden/50 to-golden/20" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
