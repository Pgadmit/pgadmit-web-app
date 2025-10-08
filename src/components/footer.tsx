import Link from 'next/link';
import { Mail, Phone } from 'lucide-react';
import { FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className='bg-foreground text-background py-12'>
      <div className='container mx-auto px-4 max-w-6xl'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          <div>
            <h3 className='text-2xl font-black mb-4'>PGadmit</h3>
            <p className='text-background/80 mb-4 leading-relaxed'>
              Your trusted partner for studying abroad. Making international
              education accessible for everyone.
            </p>
            <div className='flex gap-4'>
              <Link
                href='https://www.instagram.com/pgadmit'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaInstagram className='h-5 w-5 text-background/60 hover:text-background cursor-pointer transition-colors' />
              </Link>
              <Link
                href='https://www.youtube.com/@pgadmit'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaYoutube className='h-5 w-5 text-background/60 hover:text-background cursor-pointer transition-colors' />
              </Link>
              <Link
                href='https://www.tiktok.com/@pgadmit'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaTiktok className='h-5 w-5 text-background/60 hover:text-background cursor-pointer transition-colors' />
              </Link>
            </div>
          </div>

          <div>
            <h4 className='font-semibold mb-4'>Services</h4>
            <ul className='space-y-2 text-background/80'>
              <li>
                <Link
                  href='/university-matching'
                  className='hover:text-background transition-colors'
                >
                  University Matching
                </Link>
              </li>
              <li>
                <Link
                  href='/application-support'
                  className='hover:text-background transition-colors'
                >
                  Application Support
                </Link>
              </li>
              <li>
                <Link
                  href='/visa-assistance'
                  className='hover:text-background transition-colors'
                >
                  Visa Assistance
                </Link>
              </li>
              <li>
                <Link
                  href='/scholarship-guidance'
                  className='hover:text-background transition-colors'
                >
                  Scholarship Guidance
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className='font-semibold mb-4'>Resources</h4>
            <ul className='space-y-2 text-background/80'>
              <li>
                <Link
                  href='/blog'
                  className='hover:text-background transition-colors'
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href='/success-stories'
                  className='hover:text-background transition-colors'
                >
                  Success Stories
                </Link>
              </li>
              <li>
                <Link
                  href='/webinars'
                  className='hover:text-background transition-colors'
                >
                  Webinars
                </Link>
              </li>
              <li>
                <Link
                  href='/faq'
                  className='hover:text-background transition-colors'
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className='font-semibold mb-4'>Contact</h4>
            <div className='space-y-2 text-background/80'>
              <div className='flex items-center gap-2'>
                <Mail className='h-4 w-4' />
                <span>support@pgadmit.com</span>
              </div>
              <div className='flex items-center gap-2'>
                <Phone className='h-4 w-4' />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>

        <div className='border-t border-background/20 mt-8 pt-8 text-center text-background/60'>
          <p>
            © {new Date().getFullYear()} PGAdmit. All rights reserved. |
            Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
}
