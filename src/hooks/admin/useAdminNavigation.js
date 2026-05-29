import { useState } from 'react';

export const useAdminNavigation = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [expandedMenus, setExpandedMenus] = useState({ 
    dashboard: true, 
    customers: false, 
    vendors: false, 
    bookings: false, 
    payments: false, 
    complaints: false, 
    analytics: false, 
    roles: false, 
    notifications: false, 
    settings: false 
  });
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleMenu = (id) => {
    setExpandedMenus(prev => {
      const isCurrentlyExpanded = prev[id];
      const next = {};
      Object.keys(prev).forEach(k => { next[k] = false; });
      next[id] = !isCurrentlyExpanded;
      return next;
    });
    setActiveMenu(id);
    setActiveSubmenu(null);
  };

  const handleSubmenu = (menuId, sub) => {
    setActiveMenu(menuId);
    setActiveSubmenu(sub);
  };

  const handleSelectCategory = (label) => {
    setActiveMenu('vendors');
    setActiveSubmenu(label);
    setExpandedMenus(prev => ({ ...prev, vendors: true }));
  };

  const handleNavigate = (menuId, sub) => {
    setActiveMenu(menuId);
    setActiveSubmenu(sub);
    setExpandedMenus(prev => {
      const next = {};
      Object.keys(prev).forEach(k => { next[k] = false; });
      next[menuId] = true;
      return next;
    });
  };

  return {
    activeMenu,
    activeSubmenu,
    expandedMenus,
    sidebarOpen,
    setSidebarOpen,
    toggleMenu,
    handleSubmenu,
    handleSelectCategory,
    handleNavigate,
  };
};