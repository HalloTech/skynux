import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-violet-900 text-white py-10 font-sans px-4 md:px-8">
      <div className="container mx-auto py-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="flex items-center mb-6 md:mb-0">
            <a href="/">
              <img
                alt="Company Logo"
                className="mr-4 w-[9rem] h-14"
                src="/images/logo/skynux-logo.png"
              />
            </a>
            <div>
              <h1 className="text-xl font-bold uppercase">
                Future of freelancing
              </h1>
            </div>
          </div>
          <div>
            <a className="text-white flex items-center" href="#">
              <i className="fas fa-user text-xl mr-2"></i> Login/Sign Up
            </a>
          </div>
        </div>

        <hr className="my-4 border-t border-white" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
          <div>
            <h2 className="font-bold mb-2">Quick Links</h2>
            <ul>
              <li><a className="text-white block py-1" href="#">About Us</a></li>
              <li><a className="text-white block py-1" href="#">How It Works</a></li>
              <li><a className="text-white block py-1" href="/browse-jobs">Browse Talent</a></li>
              <li><a className="text-white block py-1" href="/post-jobs">Post a Job</a></li>
              <li><a className="text-white block py-1" href="#">FAQs</a></li>
              <li><a className="text-white block py-1" href="#">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold mb-2">For Clients</h2>
            <ul>
              <li><a className="text-white block py-1" href="#">Find Freelancers</a></li>
              <li><a className="text-white block py-1" href="#">Build a Team</a></li>
              <li><a className="text-white block py-1" href="#">Secure Payments</a></li>
              <li><a className="text-white block py-1" href="#">Project Management</a></li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold mb-2">For Freelancers</h2>
            <ul>
              <li><a className="text-white block py-1" href="#">Create a Profile</a></li>
              <li><a className="text-white block py-1" href="#">Find Projects</a></li>
              <li><a className="text-white block py-1" href="#">Collaborate & Network</a></li>
              <li><a className="text-white block py-1" href="#">Get Paid Easily</a></li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold mb-2">Legal</h2>
            <ul>
              <li><a className="text-white block py-1" href="#">Terms & Conditions</a></li>
              <li><a className="text-white block py-1" href="#">Privacy Policy</a></li>
              <li><a className="text-white block py-1" href="#">Refund Policy</a></li>
            </ul>
          </div>
        </div>

        <hr className="my-4 border-t border-white" />

        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-sm mb-4 md:mb-0">© 2025 Skynux. All rights reserved.</p>
          <div className="flex items-center">
            <span className="mr-2">Follow Us</span>

            <a className="mr-2" href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <img
                alt="LinkedIn Icon"
                className="w-8 h-8"
                src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
              />
            </a>

            <a className="mr-2" href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <img
                alt="Instagram Icon"
                className="w-8 h-8"
                src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
              />
            </a>

            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <img
                alt="GitHub Icon"
                className="w-8 h-8"
                src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
