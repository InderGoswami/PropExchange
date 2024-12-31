import React from 'react';

const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16 text-gray-700">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-900">About PropExchange</h1>
      <div className="flex flex-col md:flex-row gap-8 items-center">
        {/* Image Section */}
        <div className="flex-1">
          <img
            src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDR8fHJlYWwlMjBlc3RhdGV8ZW58MHx8fHwxNjc4MjM3NTgy&ixlib=rb-4.0.3&q=80&w=1080"
            alt="Modern Real Estate"
            className="rounded-lg shadow-lg w-full"
          />
        </div>

        {/* Content Section */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-4">Your Trusted Real Estate Partner</h2>
          <p className="text-lg mb-6">
            At PropExchange, we simplify the process of buying, selling, and renting properties. 
            Whether you’re searching for your dream home or looking to invest, we’re here to guide 
            you every step of the way.
          </p>
          <p className="text-lg">
            With a wide range of verified listings, top-notch tools, and exceptional customer service, 
            we aim to make real estate accessible to everyone. Your journey starts with us!
          </p>
        </div>
      </div>

      {/* Our Vision Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-semibold text-center mb-8 text-blue-800">Our Vision</h2>
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1">
            <p className="text-lg mb-6">
              We envision a future where finding a property is not just easy but also enjoyable. 
              PropExchange is dedicated to connecting people with their ideal spaces, fostering 
              trust and transparency in every transaction.
            </p>
            <p className="text-lg">
              Our platform leverages cutting-edge technology to ensure accurate listings and 
              a seamless user experience. Join us in reshaping the future of real estate.
            </p>
          </div>
          <div className="flex-1">
            <img
              src="https://images.unsplash.com/photo-1502005097973-6a7082348e28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGVzdGF0ZXxlbnwwfHx8fDE2NzgyMzc1ODI&ixlib=rb-4.0.3&q=80&w=1080"
              alt="Our Vision"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
