import { Helmet } from 'react-helmet';
import HeroSection from '../components/home/HeroSection';
import FeaturedCars from '../components/home/FeaturedCars';
import Categories from '../components/home/Categories';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Humble Autos | Luxury & Performance Cars</title>
        <meta name="description" content="Discover premium luxury and performance vehicles at Humble Autos. Browse our exclusive collection of cars from top brands." />
      </Helmet>
      
      <HeroSection />
      <FeaturedCars />
      <Categories />
    </>
  );
};

export default Home;