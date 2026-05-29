import { useState } from 'react';

export const useOfficeNavigation = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [expandedMenus, setExpandedMenus] = useState({
    dashboard: true,
    customers: false,
    complaints: false,
  });
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleMenu = (id) => {
    setExpandedMenus(prev => {
      const next = {};
      Object.keys(prev).forEach(k => { next[k] = false; });
      next[id] = !prev[id];
      return next;
    });
    setActiveMenu(id);
    setActiveSubmenu(null);
  };

  const handleSubmenu = (menuId, sub) => {
    setActiveMenu(menuId);
    setActiveSubmenu(sub);
  };

  // No vendor category navigation needed for office panel
  const handleSelectCategory = () => {};

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