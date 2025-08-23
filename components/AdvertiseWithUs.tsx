import React from "react";

const slotPackages = [
  {
    time: "11:00 AM",
    packages: [
      { posts: 1, price: "PKR 400 " },
      { posts: 3, price: "PKR 1,125", sub: "PKR 375 each" },
      { posts: 5, price: "PKR 1,750", sub: "PKR 350 each" },
      { posts: 10, price: "PKR 3,250", sub: "PKR 325 each" }
    ]
  },
  {
    time: "03:00 PM",
    packages: [
      { posts: 1, price: "PKR 500 " },
      { posts: 3, price: "PKR 1,425", sub: "PKR 475 each" },
      { posts: 5, price: "PKR 2,250", sub: "PKR 450 each" },
      { posts: 10, price: "PKR 4,250", sub: "PKR 425 each" }
    ]
  },
  {
    time: "10:00 PM",
    packages: [
      { posts: 1, price: "PKR 750 " },
      { posts: 3, price: "PKR 2,175", sub: "PKR 725 each" },
      { posts: 5, price: "PKR 3,500", sub: "PKR 700 each" },
      { posts: 10, price: "PKR 6,750", sub: "PKR 675 each" }
    ]
  }
];

const AdvertiseWithUs = () => (
  <section className="max-w-5xl mx-auto bg-white rounded-lg shadow p-4 sm:p-8 my-10">
    {/* Title */}
    <div className="flex justify-center mb-6">
      <h3 className="text-2xl sm:text-3xl font-bold text-blue-500">
        Advertise with Us
      </h3>
    </div>

    {/* Description */}
    <div className="text-gray-800 text-base sm:text-lg mb-4 space-y-2 text-center">
      <p>
        Promote your business in front of thousands of people through our social media platforms with great engagement!
      </p>
      <p>
        Promote your business tremendously and get the attention of new clients easily on our Whatsapp Channels and Facebook page <span className="font-bold">for a very affordable rates.</span> (No sponsored ad allowed on LinkedIn).
        <br />
        We have different packages and different slot times. Please Whatsapp message us at{" "}
        <a href="https://wa.me/923223379647" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">
          +92 322 337 9647
        </a>
        .
      </p>
      <p>
        Please check our{" "}
        <a href="/terms-and-conditions" className="text-blue-600 underline hover:text-blue-800">
          terms and conditions
        </a>{" "}
        of Sponsored Ads.
      </p>
    </div>

    {/* Packages Grid */}
    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      {slotPackages.map((slot, idx) => (
        <div key={idx} className="rounded-2xl border border-gray-300 shadow text-center py-6 px-2 bg-white">
          <div className="text-xl font-semibold mb-4 text-blue-700">{slot.time}</div>
          <div className="space-y-3">
            {slot.packages.map((pkg, i) => (
              <div key={i}>
                <div className="flex flex-col sm:flex-row items-center justify-between bg-blue-50 rounded-lg px-3 py-2">
                  <div className="text-sm sm:text-base font-medium w-full sm:w-auto text-gray-700">
                    {pkg.posts} post{pkg.posts > 1 ? "s" : ""}
                  </div>
                  <div className="mt-1 sm:mt-0 sm:ml-2 text-white bg-blue-700 px-4 py-1 rounded font-semibold text-base sm:text-lg w-full sm:w-auto text-center">
                    {pkg.price}
                  </div>
                </div>
                {pkg.sub && (
                  <div className="w-full text-xs text-gray-600 text-center sm:text-right mt-1 sm:mt-0">
                    {pkg.sub}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default AdvertiseWithUs;
