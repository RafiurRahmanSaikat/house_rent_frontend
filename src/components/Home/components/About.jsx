import React from "react";

const About = () => {
  return (
    <>
      <section className="" id="aboutus">
        <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
            <div className="max-w-lg">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                About Us
              </h2>
              <p className="mt-4 text-gray-600 text-lg">
                DreamHome Rentals is dedicated to helping you find the perfect
                rental property. With years of experience in the real estate
                market, we offer a wide range of high-quality rentals to suit
                every lifestyle and budget. Our team of experienced
                professionals is committed to providing exceptional service and
                support throughout your rental journey. We pride ourselves on
                our attention to detail, transparent processes, and commitment
                to customer satisfaction. Whether you're looking for a cozy
                studio or a spacious family home, we're here to make your
                house-hunting experience stress-free and enjoyable.
              </p>
            </div>
            <div className="mt-12 md:mt-0">
              <img
                src="/assets/about.jpg"
                alt="About Us Image"
                className="object-cover rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
