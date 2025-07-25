import HeroSection from "../components/HeroSection";
import FeaturedSection from "../components/FeaturedSection";
import Banner from "../components/Banner";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";

const HomePage = () => {
  return (
    <main>
      <HeroSection />
      <FeaturedSection />
      <Banner />
      <Testimonials />
      <Newsletter />
    </main>
  );
};

export default HomePage;
