const TestiCard = ({ testimonial }) => (
    <div className="bg-white rounded-2xl shadow-md p-8 text-gray-800 relative max-w-sm">
        <div className="absolute -top-12 left-1/4 transform -translate-x-1/2">
        <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-20 h-20 rounded-full shadow-md object-cover"
        />
        </div>
        <div className="mt-2 text-center">
            <div className="flex flex-rows-1 items-center justify-between">
                <div>
                    <h3 className="hind-madurai-bold text-base text-left">{testimonial.name}</h3>
                    <p className="text-xs hind-madurai-regular text-black text-left">{testimonial.role}</p>
                </div>
                <div className="flex justify-center my-2">
                    {Array(testimonial.rating)
                    .fill()
                    .map((_, i) => (
                        <span key={i} className="text-yellow-400 text-xl">★</span>
                    ))}
                </div>
            </div>
            
            <p className="text-base hind-madurai-regular mt-6 text-left">{testimonial.review}</p>
        </div>
    </div>
);

export default TestiCard;