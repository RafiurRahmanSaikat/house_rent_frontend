import React from "react";

const Services = () => {
  return (
    <>
      {/* why choose us  */}
      <section className="text-gray-700 body-font mt-10">
        <div className="flex justify-center text-3xl font-bold text-gray-800 text-center">
          Why Choose Us?
        </div>
        <div className="container px-5 py-12 mx-auto">
          <div className="flex flex-wrap text-center justify-center">
            {[
              { title: "Wide Selection", icon: "🏘️" },
              { title: "Competitive Rates", icon: "💰" },
              { title: "Expert Support", icon: "🤝" },
              { title: "Easy Process", icon: "✅" },
            ].map((item, index) => (
              <div key={index} className="p-4 md:w-1/4 sm:w-1/2">
                <div className="px-4 py-6 transform transition duration-500 hover:scale-110">
                  <div className="text-6xl mb-3">{item.icon}</div>
                  <h2 className="title-font font-medium text-2xl text-gray-900">
                    {item.title}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Contact us section */}
      <section className="py-10" id="services">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Our Services 💸
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 text-center">
                <div className="w-full h-64 object-center text-center text-9xl">
                  🤑
                </div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">
                  Rental Listings
                </h3>
                <p className="text-gray-700 text-base">
                  Browse our extensive list of available rental properties to
                  find the perfect home for you and your family.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 text-center">
                <div className="w-full h-64 object-center text-center text-9xl">
                  💲
                </div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">
                  Property Management
                </h3>
                <p className="text-gray-700 text-base">
                  We offer comprehensive property management services to ensure
                  your rental property is well-maintained and efficiently
                  managed.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 text-center">
                <div className="w-full h-64 object-center text-center text-9xl">
                  🔐
                </div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">
                  Tenant Services
                </h3>
                <p className="text-gray-700 text-base">
                  We provide support and services to tenants, ensuring a smooth
                  and hassle-free rental experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
