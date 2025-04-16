import React from 'react';

const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md flex flex-col items-center">
        {/* Logo or Heading */}
        <div className="mb-6 flex flex-col items-center">
          <svg width="48" height="48" fill="none" className="mb-2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#22d3ee"/><path d="M8 12l2 2l4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <h2 className="text-2xl font-bold text-white">Sign in to Sage Guard</h2>
          <p className="text-gray-400 text-sm mt-1">Welcome back! Please login to your account.</p>
        </div>
        <form className="w-full flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="block text-gray-300 mb-1">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@email.com"
              className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
              autoComplete="email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-300 mb-1">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-2 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
