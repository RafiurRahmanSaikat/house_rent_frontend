import React from "react";

export default function Footer() {
  return (
    <>
      {/* footer */}
      <section>
        <footer className="bg-blue-600 text-white py-4 px-3">
          <div className="container mx-auto flex flex-wrap items-center justify-between">
            <div className="w-full md:w-1/2 md:text-center md:mb-4 mb-8">
              <p className="text-xs md:text-sm">
                Copyright 2024 © DreamHome Rentals. All Rights Reserved
              </p>
            </div>
            <div className="w-full md:w-1/2 md:text-center md:mb-0 mb-8">
              <ul className="list-reset flex justify-center flex-wrap text-xs md:text-sm gap-3">
                <li>
                  <a
                    href="#contactUs"
                    className="text-white hover:text-blue-200"
                  >
                    Contact
                  </a>
                </li>
                <li className="mx-4">
                  <a href="/privacy" className="text-white hover:text-blue-200">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="text-white hover:text-blue-200">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </section>
    </>
  );
}
