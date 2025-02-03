import React from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

function Footer() {
  const links = {
    about: [
      { name: 'Our Story', href: '#' },
      { name: 'Mission & Vision', href: '#' },
      { name: 'Leadership', href: '#' },
      { name: 'Careers', href: '#' }
    ],
    academics: [
      { name: 'Programs', href: '#' },
      { name: 'Admissions', href: '#' },
      { name: 'Calendar', href: '#' },
      { name: 'Resources', href: '#' }
    ],
    community: [
      { name: 'Parents Portal', href: '#' },
      { name: 'Student Life', href: '#' },
      { name: 'Alumni', href: '#' },
      { name: 'Events', href: '#' }
    ],
    contact: [
      { name: 'Support', href: '#' },
      { name: 'FAQs', href: '#' },
      { name: 'Contact Us', href: '#' },
      { name: 'Feedback', href: '#' }
    ]
  };

  return (
    <footer className="bg-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center mb-6">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">EduExcel</span>
            </Link>
            <p className="text-gray-600 mb-6">
              Empowering minds, shaping futures, and creating tomorrow's leaders through innovative education.
            </p>
            <div className="flex space-x-4">
              <SocialLink icon={<Facebook className="w-5 h-5" />} href="#" />
              <SocialLink icon={<Twitter className="w-5 h-5" />} href="#" />
              <SocialLink icon={<Instagram className="w-5 h-5" />} href="#" />
              <SocialLink icon={<Youtube className="w-5 h-5" />} href="#" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">About</h3>
            <ul className="space-y-3">
              {links.about.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-gray-600 hover:text-blue-600 transition">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Academics</h3>
            <ul className="space-y-3">
              {links.academics.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-gray-600 hover:text-blue-600 transition">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a href="tel:+1234567890" className="text-gray-600 hover:text-blue-600 transition flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  (123) 456-7890
                </a>
              </li>
              <li>
                <a href="mailto:info@eduexcel.com" className="text-gray-600 hover:text-blue-600 transition flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  info@eduexcel.com
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  123 Education St, City
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © 2024 EduExcel. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="#" className="text-gray-600 hover:text-blue-600 text-sm transition">
                Privacy Policy
              </Link>
              <Link to="#" className="text-gray-600 hover:text-blue-600 text-sm transition">
                Terms of Service
              </Link>
              <Link to="#" className="text-gray-600 hover:text-blue-600 text-sm transition">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <a
      href={href}
      className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition"
    >
      {icon}
    </a>
  );
}

export default Footer;