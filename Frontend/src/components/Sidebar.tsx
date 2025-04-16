import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Map, 
  BarChart2, 
  Settings, 
  Shield 
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Sidebar = () => {
  const navLinkClass = ({ isActive }: { isActive: boolean }) => 
    `p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 ${
      isActive 
        ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20' 
        : 'text-gray-600 dark:text-gray-300'
    }`;

  return (
    <div className="fixed left-0 top-0 h-full w-20 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col items-center py-8 shadow-sm">
      <div className="mb-8">
        <Shield className="w-8 h-8 text-emerald-600" />
      </div>
      
      <nav className="flex-1 flex flex-col gap-4">
        <NavLink to="/" className={navLinkClass}>
          <LayoutDashboard className="w-6 h-6" />
        </NavLink>
        <NavLink to="/map" className={navLinkClass}>
          <Map className="w-6 h-6" />
        </NavLink>
        <NavLink to="/analytics" className={navLinkClass}>
          <BarChart2 className="w-6 h-6" />
        </NavLink>
      </nav>

      <div className="flex flex-col gap-4">
        <ThemeToggle />
        <button className="p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300">
          <Settings className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;