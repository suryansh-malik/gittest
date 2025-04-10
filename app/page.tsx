import Image from "next/image";
import prisma from '@/lib/prisma'
import { getToken } from "next-auth/jwt";

import { getUserByEmail } from "../lib/database/userController";
export default async function Home() {
  // const users = await prisma.user.findMany();
  // const emailuser = await getUserByEmail({email:'suryanshmalik999@gmail.com'})
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      
      <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">AuthStripe</h1>
          <nav className="hidden md:flex space-x-4">
            <a href="#features" className="hover:text-blue-200">Features</a>
            <a href="#tech" className="hover:text-blue-200">Tech Stack</a>
            <a href="#get-started" className="hover:text-blue-200">Get Started</a>
          </nav>
          {/* Mobile Menu Button */}
          <button className="md:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center flex-1">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Secure Authentication with Payment Integration
        </h2>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          A modern authentication system built with Next.js, NextAuth, and Stripe for seamless user management and payments.
        </p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
          Explore Demo
        </button>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Key Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-blue-600 mb-4">🔒</div>
              <h4 className="text-xl font-semibold mb-2">Secure Authentication</h4>
              <p className="text-gray-600">Multiple auth providers with NextAuth</p>
            </div>
            <div className="text-center p-6">
              <div className="text-blue-600 mb-4">💳</div>
              <h4 className="text-xl font-semibold mb-2">Stripe Payments</h4>
              <p className="text-gray-600">Easy subscription management</p>
            </div>
            <div className="text-center p-6">
              <div className="text-blue-600 mb-4">📱</div>
              <h4 className="text-xl font-semibold mb-2">Responsive Design</h4>
              <p className="text-gray-600">Works on all devices</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="tech" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Technology Stack</h3>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md w-64">
              <h4 className="text-xl font-semibold mb-2">Next.js</h4>
              <p className="text-gray-600">React framework with SSR</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md w-64">
              <h4 className="text-xl font-semibold mb-2">NextAuth</h4>
              <p className="text-gray-600">Authentication solution</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md w-64">
              <h4 className="text-xl font-semibold mb-2">Stripe</h4>
              <p className="text-gray-600">Payment processing</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md w-64">
              <h4 className="text-xl font-semibold mb-2">Tailwind CSS</h4>
              <p className="text-gray-600">Utility-first CSS</p>
            </div>
          </div>
        </div>
      </section>

      {/* Get Started Section */}
      <section id="get-started" className="py-16 text-center">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold mb-6">Get Started Today</h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Clone the repository and start building your secure authenticated application with payment integration.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            View on GitHub
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 AuthStripe. All rights reserved.</p>
        </div>
      </footer>
    </div>
    </div>
  );
}
