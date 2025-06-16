import React from "react";
import bgTesti from "../../assets/images/bg-testi.png";
import TestiCard from "../TestiCard";

const testimonials = [
  {
    name: "Sebastian",
    role: "Graphic design",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    review:
      "The coworking space was perfect for our meeting. Comfortable room and complete facilities made our discussion productive. Recommend!",
    rating: 5,
  },
  {
    name: "Evangeline",
    role: "Model",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    review:
      "Great experience for our meeting! Calm atmosphere and excellent amenities for an efficient discussion. We are very satisfied with the service provided!",
    rating: 5,
  },
  {
    name: "Alexander",
    role: "Software engineer",
    image: "https://randomuser.me/api/portraits/men/68.jpg",
    review:
      "The space supported a highly productive meeting with all the needed facilities, including a projector and quiet environment. Thank you Roompi!",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section
      className="bg-cover bg-center"
      style={{ backgroundImage: `url(${bgTesti})` }}
    >
      <div className="bg-black/75 py-16 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40">
        <div className="max-w-7xl mx-auto text-center text-white mb-16">
          <h2 className="text-3xl md:text-5xl hind-madurai-bold">Testimonials</h2>
        </div>
        <div className="flex flex-col gap-16 xl:gap-8 lg:flex-row lg:justify-center lg:items-stretch">
          {testimonials.map((testimonial, idx) => (
            <TestiCard key={idx} testimonial={testimonial} />
          ))}
        </div>
        {/* Optional dots for pagination */}
        {/* <div className="flex justify-center mt-8 gap-2">
          <span className="w-3 h-3 bg-white rounded-full opacity-70"></span>
          <span className="w-3 h-3 bg-white rounded-full opacity-40"></span>
          <span className="w-3 h-3 bg-white rounded-full opacity-40"></span>
        </div> */}
      </div>
    </section>
  );
};

export default Testimonials;
