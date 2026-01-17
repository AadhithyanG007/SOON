import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import instaQr from "@/assets/insta qr.jpeg";

export const Footer = () => {
  return (
    <footer className="py-8 sm:py-10 md:py-12 relative border-t border-border/30">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center text-center">
          {/* Lightning icon */}
          <motion.div
            animate={{
              opacity: [0.6, 1, 0.6],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-4 sm:mb-5 md:mb-6"
          >
            <Zap className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-golden fill-golden/20" />
          </motion.div>

          {/* Team tagline */}
          <h3 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-1.5 sm:mb-2">
            Something Out of Nothing
          </h3>
          <p className="text-muted-foreground text-xs sm:text-sm md:text-base mb-5 sm:mb-6 md:mb-8 max-w-md px-2">
            From Nothing to Impact — Energy, Unity, Leadership
          </p>

          {/* QR Code */}
          <div className="mb-5 sm:mb-6 md:mb-8">
            <div className="p-3 sm:p-4 glass-card rounded-xl sm:rounded-2xl border border-border/30">
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-foreground/90 rounded-md sm:rounded-lg flex items-center justify-center overflow-hidden">
                <img
                  src={instaQr}
                  alt="Instagram QR"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-2 sm:mt-3">
                Follow us on Instagram!
              </p>
            </div>
          </div>

          {/* Copyright */}
          <p className="text-[10px] sm:text-xs text-muted-foreground">
            © 2026 Something Out of Nothing. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
