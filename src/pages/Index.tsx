import { HeroSection } from '@/components/HeroSection';
import { TeamCarousel } from '@/components/TeamCarousel';
import { GallerySection } from '@/components/GallerySection';
import { AchievementsDashboard } from '@/components/AchievementsDashboard';
import { ReflectionsSection } from '@/components/ReflectionsSection';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <HeroSection />
      <TeamCarousel />
      <GallerySection />
      <AchievementsDashboard />
      <ReflectionsSection />
      <Footer />
    </div>
  );
};

export default Index;
