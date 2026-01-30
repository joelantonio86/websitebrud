// =========================================================
// NAVIGATION TYPES
// =========================================================

export interface NavigationProps {
  scrolled?: boolean;
}

export interface MenuItemProps {
  label: string;
  path: string;
  hasSubmenu?: boolean;
  submenuItems?: SubmenuItem[];
  onClick?: () => void;
}

export interface SubmenuItem {
  label: string;
  path: string;
  hasSubSubmenu?: boolean;
  subSubmenuItems?: SubSubmenuItem[];
}

export interface SubSubmenuItem {
  label: string;
  path: string;
}

export interface MenuState {
  isOpen: boolean;
  activeSubmenu: string | null;
  activeSubSubmenu: string | null;
}
