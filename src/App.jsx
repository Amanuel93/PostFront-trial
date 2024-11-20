import React from "react";
import Navbar from "./components/Navbar/Navbar";
import NavbarBanner from "./components/Navbar/NavbarBanner";
import Hero from "./components/Hero/Hero";
import NumberCounter from "./components/NumberCounter/NumberCounter";
import WhyChooseUs from "./components/WhyChooseUs/WhyChooseUs";
import Img1 from "./assets/Banners1.webp";
import Img2 from "./assets/Banner2.jpg";
import Banner from "./components/Banner/Banner";
import SubjectCard from "./components/SubjectCard/SubjectCard";
import Testimonial from "./components/Testimonial/Testimonial";
import ScrollToTop from "./components/Scroll/ScrollToTop";
import Footer from "./components/Footer/Footer";

const BannerData = {
  image: Img1,
  tag: "CUSTOMIZE WITH YOUR SCHEDULE",
  title: "Personalized Professional Training for Post Office Trainees on Your Schedule",
  subtitle:
    "Our scheduling system enables trainees to choose training sessions that fit their availability. Keep track of your trainees' training and assessment schedules, ensuring they never miss an important session. Experience the best online training scheduling system with easy accessibility. This platform is designed to streamline your training process and enhance the learning experience.",
  link: "#",
};

const BannerData2 = {
  image: Img2,
  tag: "TAILOR IT TO YOUR TIMETABLE",
  title: "Experienced and Qualified Trainers Ready to Support Your Learning Journey",
  subtitle:
    "Keep track of our trainees’ training and assessment schedules to ensure you never miss a session. Experience the leading online scheduling system that offers easy accessibility. This platform is designed to improve the training experience for post office trainees.",
  link: "#",
};

const App = () => {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      {/* <NavbarBanner /> */}
      <Hero />
      <NumberCounter />
      <WhyChooseUs />
      <Banner {...BannerData} />
      <Banner {...BannerData2} reverse={true} />
      <SubjectCard />
      <Testimonial />
      <Footer />
      <ScrollToTop /> {/* Add the ScrollToTop component here */}
    </main>
  );
};

export default App;
