import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import instaQr from "@/assets/insta qr.jpeg";

export const Footer = () => {
  return (
    <footer className="py-12 relative border-t border-border/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          {/* Lightning icon */}
          <motion.div
            animate={{
              opacity: [0.6, 1, 0.6],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-6"
          >
            <Zap className="w-8 h-8 text-golden fill-golden/20" />
          </motion.div>

          {/* Team tagline */}
          <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2">
            Something Out of Nothing
          </h3>
          <p className="text-muted-foreground text-sm md:text-base mb-8 max-w-md">
            From Nothing to Impact — Energy, Unity, Leadership
          </p>

          {/* QR Code */}
          <div className="mb-8">
            <div className="p-4 glass-card rounded-2xl border border-border/30">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-foreground/90 rounded-lg flex items-center justify-center overflow-hidden">
                <img
                  src={instaQr}
                  alt="Instagram QR"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Follow us on Instagram!
              </p>
            </div>
          </div>

          {/* Copyright */}
          <p className="text-xs text-muted-foreground">
            © 2026 Something Out of Nothing. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
