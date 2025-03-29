import React from 'react';
import BrandCarousel from './brandCarousel';
import CategoriesGrid from './browseCategories';
import FreelanceLearn from './freelanceLeader';
import HeroSection from './heroSection';
import HireTalent from './hireTalent';
import LatestPosts from './latestPosts';
import RecentJobSidebar from './recentJobSlider';
import WorkGameSection from './workGameSection';

const HomeLayout: React.FC = () => {
  return (
    <>
      <HeroSection />
      <LatestPosts />
      <RecentJobSidebar />
      <FreelanceLearn />
      <CategoriesGrid />
      <HireTalent />
      <BrandCarousel />
      <WorkGameSection />
    </>
  );
};

export default HomeLayout;
