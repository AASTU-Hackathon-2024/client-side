import React from 'react';

export function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">GEBEYA</h3>
            <p className="text-gray-600">
              We hope clothes that help you
              stand out and express yourself.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-4">COMPANY</h4>
            <ul className="space-y-2 text-gray-600">
              <li>About</li>
              <li>Features</li>
              <li>Works</li>
              <li>Career</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">HELP</h4>
            <ul className="space-y-2 text-gray-600">
              <li>Customer Support</li>
              <li>Delivery Details</li>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">RESOURCES</h4>
            <ul className="space-y-2 text-gray-600">
              <li>Free eBooks</li>
              <li>Development Tutorial</li>
              <li>How to - Blog</li>
              <li>YouTube Playlist</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t">
          <div className="flex justify-between items-center">
            <p className="text-gray-600">© 2024 GEBEYA. All rights reserved</p>
            <div className="flex gap-4">
              <img src="/visa.svg" alt="Visa" className="h-8" />
              <img src="/mastercard.svg" alt="Mastercard" className="h-8" />
              <img src="/paypal.svg" alt="PayPal" className="h-8" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}