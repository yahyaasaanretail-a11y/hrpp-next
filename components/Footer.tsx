'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Linkedin, Phone, ChevronRight } from 'lucide-react';

export default function Footer() {
  const services = [
    { name: 'Classified Jobs', href: '/classified-jobs' },
    { name: 'Advertise with Us', href: '/advertise-with-us' },
    { name: 'Special Presence Job Ads', href: '/special-presence-job-ads' },
    { name: 'Open Platforms', href: '/open-platforms' },
  ];

  const importantLinks = [
    { name: 'Terms & Conditions', href: '/terms-and-conditions' },
    { name: 'Feedback Form', href: 'https://docs.google.com/forms/d/18JtWOD_mZB0sIavYudSkZF-ZIlRuEYlOoR7HZwQ7zZ8/edit?usp=drivesdk' },
  ];

  const informationLinks = [
    { name: 'Contact Us', href: '/contact-us' },
    { name: 'About Us', href: '/about-us' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo Section */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-lg overflow-hidden flex items-center justify-center">
              <Image
                src="/images/hrrp_logo.png"
                alt="HRRP Logo"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <h3 className="text-xl font-bold text-white">HR Posting Partner</h3>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            We are HR based marketing business providing Job Ads service along with marketing for other companies or businesses.
          </p>

          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/profile.php?id=100087877179793"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-gray-700 hover:bg-blue-600 rounded-lg flex items-center justify-center border border-gray-600 hover:border-blue-500 transition-all"
            >
              <Facebook size={18} />
            </a>
            <a
              href="https://www.linkedin.com/company/hr-posting-partner/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-gray-700 hover:bg-blue-500 rounded-lg flex items-center justify-center border border-gray-600 hover:border-blue-500 transition-all"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://whatsapp.com/channel/0029VaRWeF7DDmFRZuX0Ww0K"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-gray-700 hover:bg-green-500 rounded-lg flex items-center justify-center border border-gray-600 hover:border-green-500 transition-all"
            >
              <Phone size={18} />
            </a>
          </div>
        </div>

        {/* Services */}
        <div className="space-y-6">
          <h4 className="text-lg font-semibold relative">
            Our Services
            <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-purple-500 rounded-full"></div>
          </h4>
          <ul className="space-y-3">
            {services.map((item, i) => (
              <li key={i}>
                <Link href={item.href} className="group flex items-center text-gray-300 hover:text-white text-sm transition">
                  <ChevronRight size={14} className="mr-2 text-gray-500 group-hover:text-purple-400 transition" />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Important */}
        <div className="space-y-6">
          <h4 className="text-lg font-semibold relative">
            Important
            <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-purple-500 rounded-full"></div>
          </h4>
          <ul className="space-y-3">
            {importantLinks.map((item, i) => (
              <li key={i}>
                <a
                  href={item.href}
                  target={item.name === 'Feedback Form' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-center text-gray-300 hover:text-white text-sm transition"
                >
                  <ChevronRight size={14} className="mr-2 text-gray-500 group-hover:text-purple-400 transition" />
                  <span>{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Info */}
        <div className="space-y-6">
          <h4 className="text-lg font-semibold relative">
            Information
            <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-purple-500 rounded-full"></div>
          </h4>
          <ul className="space-y-3">
            {informationLinks.map((item, i) => (
              <li key={i}>
                <Link href={item.href} className="group flex items-center text-gray-300 hover:text-white text-sm transition">
                  <ChevronRight size={14} className="mr-2 text-gray-500 group-hover:text-purple-400 transition" />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-gray-800 border-t border-gray-700 text-center py-4 text-sm text-gray-400">
        © 2025 HR Posting Partner. All rights reserved.
      </div>
    </footer>
  );
}
