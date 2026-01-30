import React from 'react';
import { Link } from 'react-router-dom';
import './PageHeader.css';

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumb: BreadcrumbItem[];
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, breadcrumb }) => {
  return (
    <header className="page-hero">
      <div className="page-hero-inner">
        <h1 className="page-hero-title">{title}</h1>
        {subtitle && <p className="page-hero-subtitle">{subtitle}</p>}
        <nav className="page-hero-breadcrumb" aria-label="Navegação">
          {breadcrumb.map((item, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span className="page-hero-breadcrumb-sep">/</span>}
              {item.to ? (
                <Link to={item.to}>{item.label}</Link>
              ) : (
                <span className="page-hero-breadcrumb-current">{item.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>
    </header>
  );
};
