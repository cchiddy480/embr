import React, { createContext, useContext, ReactNode, useState, FC } from 'react';

// Import EmbrKit styles and utilities
import '../lib/index';

// EmbrKit Theme Types
export interface EmbrKitTheme {
  primaryColor?: string;
  fontFamily?: string;
  borderRadius?: 'sharp' | 'minimal' | 'rounded' | 'golden-ratio';
  materialStyle?: 'flat' | 'soft' | 'glass' | 'vibrant' | 'rubber';
  scaling?: number;
  opticalCorrection?: boolean;
}

// Theme utilities
export const applyEmbrKitTheme = (theme: EmbrKitTheme) => {
  // Apply theme variables to CSS custom properties
  const root = document.documentElement;
  if (theme.primaryColor) root.style.setProperty('--embr-primary', theme.primaryColor);
  if (theme.fontFamily) root.style.setProperty('--embr-font-family', theme.fontFamily);
};

// EmbrKit Theme Context
interface EmbrKitContextType {
  theme: EmbrKitTheme;
  updateTheme: (newTheme: Partial<EmbrKitTheme>) => void;
}

const EmbrKitContext = createContext<EmbrKitContextType | undefined>(undefined);

// EmbrKit Theme Provider
interface EmbrKitProviderProps {
  children: ReactNode;
  initialTheme?: EmbrKitTheme;
}

export const EmbrKitProvider: React.FC<EmbrKitProviderProps> = ({ 
  children, 
  initialTheme = {} 
}) => {
  const [theme, setTheme] = React.useState<EmbrKitTheme>(initialTheme);

  const updateTheme = (newTheme: Partial<EmbrKitTheme>) => {
    const updatedTheme = { ...theme, ...newTheme };
    setTheme(updatedTheme);
    applyEmbrKitTheme(updatedTheme);
  };

  // Apply initial theme on mount
  React.useEffect(() => {
    applyEmbrKitTheme(theme);
  }, []);

  return (
    <EmbrKitContext.Provider value={{ theme, updateTheme }}>
      {children}
    </EmbrKitContext.Provider>
  );
};

// Hook to use EmbrKit theme
export const useEmbrKitTheme = () => {
  const context = useContext(EmbrKitContext);
  if (!context) {
    throw new Error('useEmbrKitTheme must be used within an EmbrKitProvider');
  }
  return context;
};

// ==============================================
// BUTTON COMPONENT (existing)
// ==============================================

interface EmbrKitButtonProps {
  variant?: 'primary' | 'secondary' | 'text';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export const EmbrKitButton: React.FC<EmbrKitButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false,
  className = '',
}) => {
  const baseClasses = 'embr-btn';
  const variantClass = `embr-btn-${variant}`;
  const sizeClass = size !== 'md' ? `embr-btn-${size}` : '';
  
  const classes = [baseClasses, variantClass, sizeClass, className]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

// ==============================================
// CARD COMPONENT
// ==============================================

interface EmbrKitCardProps {
  variant?: 'default' | 'elevated' | 'flat';
  children: ReactNode;
  className?: string;
}

export const EmbrKitCard: React.FC<EmbrKitCardProps> = ({
  variant = 'default',
  children,
  className = '',
}) => {
  const baseClasses = 'embr-card';
  const variantClass = variant !== 'default' ? `embr-card-${variant}` : '';
  
  const classes = [baseClasses, variantClass, className]
    .filter(Boolean)
    .join(' ');

  return <div className={classes}>{children}</div>;
};

interface EmbrKitCardHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export const EmbrKitCardHeader: React.FC<EmbrKitCardHeaderProps> = ({
  title,
  subtitle,
  className = '',
}) => (
  <div className={`embr-card-header ${className}`}>
    <h3 className="embr-card-title">{title}</h3>
    {subtitle && <p className="embr-card-subtitle">{subtitle}</p>}
  </div>
);

interface EmbrKitCardContentProps {
  children: ReactNode;
  className?: string;
}

export const EmbrKitCardContent: React.FC<EmbrKitCardContentProps> = ({
  children,
  className = '',
}) => (
  <div className={`embr-card-content ${className}`}>{children}</div>
);

interface EmbrKitCardFooterProps {
  children: ReactNode;
  className?: string;
}

export const EmbrKitCardFooter: React.FC<EmbrKitCardFooterProps> = ({
  children,
  className = '',
}) => (
  <div className={`embr-card-footer ${className}`}>{children}</div>
);

// ==============================================
// INPUT COMPONENT
// ==============================================

interface EmbrKitInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  disabled?: boolean;
  error?: boolean;
  errorText?: string;
  helpText?: string;
  className?: string;
}

export const EmbrKitInput: React.FC<EmbrKitInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  disabled = false,
  error = false,
  errorText,
  helpText,
  className = '',
}) => {
  const inputClasses = ['embr-input', error ? 'embr-input-error' : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="embr-input-group">
      {label && <label className="embr-label">{label}</label>}
      <input
        type={type}
        className={inputClasses}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {errorText && <div className="embr-input-error-text">{errorText}</div>}
      {helpText && !error && <div className="embr-input-help">{helpText}</div>}
    </div>
  );
};

interface EmbrKitTextareaProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  error?: boolean;
  errorText?: string;
  helpText?: string;
  rows?: number;
  className?: string;
}

export const EmbrKitTextarea: React.FC<EmbrKitTextareaProps> = ({
  label,
  placeholder,
  value,
  onChange,
  disabled = false,
  error = false,
  errorText,
  helpText,
  rows = 4,
  className = '',
}) => {
  const textareaClasses = ['embr-input', 'embr-textarea', error ? 'embr-input-error' : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="embr-input-group">
      {label && <label className="embr-label">{label}</label>}
      <textarea
        className={textareaClasses}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        rows={rows}
      />
      {errorText && <div className="embr-input-error-text">{errorText}</div>}
      {helpText && !error && <div className="embr-input-help">{helpText}</div>}
    </div>
  );
};

// ==============================================
// BADGE COMPONENT
// ==============================================

interface EmbrKitBadgeProps {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral';
  outline?: boolean;
  children: ReactNode;
  className?: string;
}

export const EmbrKitBadge: React.FC<EmbrKitBadgeProps> = ({
  variant = 'primary',
  outline = false,
  children,
  className = '',
}) => {
  const baseClasses = 'embr-badge';
  const variantClass = `embr-badge-${variant}`;
  const outlineClass = outline ? 'embr-badge-outline' : '';
  
  const classes = [baseClasses, variantClass, outlineClass, className]
    .filter(Boolean)
    .join(' ');

  return <span className={classes}>{children}</span>;
};

// ==============================================
// MODAL COMPONENT
// ==============================================

interface EmbrKitModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export const EmbrKitModal: React.FC<EmbrKitModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  className = '',
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="embr-modal-overlay" onClick={handleOverlayClick}>
      <div className={`embr-modal ${className}`}>
        {title && (
          <div className="embr-modal-header">
            <h2 className="embr-modal-title">{title}</h2>
          </div>
        )}
        <div className="embr-modal-content">{children}</div>
        {footer && <div className="embr-modal-footer">{footer}</div>}
      </div>
    </div>
  );
};

// ==============================================
// TOAST COMPONENT
// ==============================================

interface EmbrKitToastProps {
  type?: 'success' | 'error' | 'warning' | 'info';
  message: string;
  onClose?: () => void;
  autoClose?: boolean;
  duration?: number;
}

export const EmbrKitToast: React.FC<EmbrKitToastProps> = ({
  type = 'info',
  message,
  onClose,
  autoClose = true,
  duration = 5000,
}) => {
  React.useEffect(() => {
    if (autoClose && onClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose]);

  const classes = `embr-toast embr-toast-${type}`;

  return (
    <div className={classes}>
      <span>{message}</span>
      {onClose && (
        <button onClick={onClose} style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer' }}>
          ×
        </button>
      )}
    </div>
  );
};

// ==============================================
// LAYOUT COMPONENTS
// ==============================================

interface EmbrKitContainerProps {
  size?: 'sm' | 'md' | 'lg' | 'fluid';
  children: ReactNode;
  className?: string;
}

export const EmbrKitContainer: React.FC<EmbrKitContainerProps> = ({
  size = 'md',
  children,
  className = '',
}) => {
  const baseClasses = 'embr-container';
  const sizeClass = size !== 'md' ? `embr-container-${size}` : '';
  
  const classes = [baseClasses, sizeClass, className]
    .filter(Boolean)
    .join(' ');

  return <div className={classes}>{children}</div>;
};

interface EmbrKitStackProps {
  direction?: 'vertical' | 'horizontal';
  align?: 'start' | 'center' | 'end' | 'between';
  gap?: 1 | 2 | 3 | 4 | 6 | 8;
  children: ReactNode;
  className?: string;
}

export const EmbrKitStack: React.FC<EmbrKitStackProps> = ({
  direction = 'vertical',
  align,
  gap = 4,
  children,
  className = '',
}) => {
  const baseClasses = 'embr-stack';
  const directionClass = direction === 'horizontal' ? 'embr-stack-horizontal' : '';
  const alignClass = align ? `embr-stack-${align}` : '';
  const gapClass = `embr-stack-gap-${gap}`;
  
  const classes = [baseClasses, directionClass, alignClass, gapClass, className]
    .filter(Boolean)
    .join(' ');

  return <div className={classes}>{children}</div>;
};

interface EmbrKitGridProps {
  cols?: 1 | 2 | 3 | 4;
  gap?: 1 | 2 | 3 | 4 | 6 | 8;
  children: ReactNode;
  className?: string;
}

export const EmbrKitGrid: React.FC<EmbrKitGridProps> = ({
  cols = 1,
  gap = 4,
  children,
  className = '',
}) => {
  const baseClasses = 'embr-grid';
  const colsClass = `embr-grid-cols-${cols}`;
  const gapClass = `embr-stack-gap-${gap}`;
  
  const classes = [baseClasses, colsClass, gapClass, className]
    .filter(Boolean)
    .join(' ');

  return <div className={classes}>{children}</div>;
};

// ==============================================
// NAVIGATION COMPONENTS
// ==============================================

// Navbar Component
interface EmbrKitNavbarProps {
  brand?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export const EmbrKitNavbar: React.FC<EmbrKitNavbarProps> = ({ 
  brand, 
  children, 
  className 
}) => {
  return (
    <nav className={`embr-navbar ${className || ''}`}>
      {brand && <div className="embr-navbar-brand">{brand}</div>}
      <div className="embr-navbar-nav">{children}</div>
      <div className="embr-navbar-actions">
        {/* Actions slot for buttons, user menu, etc. */}
      </div>
    </nav>
  );
};

// Navbar Link Component
interface EmbrKitNavbarLinkProps {
  href?: string;
  active?: boolean;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export const EmbrKitNavbarLink: React.FC<EmbrKitNavbarLinkProps> = ({ 
  href, 
  active, 
  children, 
  onClick, 
  className 
}) => {
  const classes = `embr-navbar-link ${active ? 'active' : ''} ${className || ''}`;
  
  if (href) {
    return <a href={href} className={classes}>{children}</a>;
  }
  
  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
};

// Tabs Component
interface EmbrKitTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  children: ReactNode;
  className?: string;
}

export const EmbrKitTabs: React.FC<EmbrKitTabsProps> = ({ 
  activeTab, 
  onTabChange, 
  children, 
  className 
}) => {
  return (
    <div className={`embr-tabs ${className || ''}`}>
      <div className="embr-tabs-list">
        {React.Children.map(children, (child) => {
          if (React.isValidElement<EmbrKitTabProps>(child) && child.type === EmbrKitTab) {
            return React.cloneElement(child, {
              ...child.props,
              active: child.props.id === activeTab,
              onSelect: () => onTabChange(child.props.id)
            });
          }
          return child;
        })}
      </div>
      {React.Children.map(children, (child) => {
        if (React.isValidElement<EmbrKitTabPanelProps>(child) && child.type === EmbrKitTabPanel) {
          return child.props.id === activeTab ? child : null;
        }
        return null;
      })}
    </div>
  );
};

// Tab Component
interface EmbrKitTabProps {
  id: string;
  children: ReactNode;
  active?: boolean;
  onSelect?: () => void;
  disabled?: boolean;
}

export const EmbrKitTab: React.FC<EmbrKitTabProps> = ({ 
  children, 
  active, 
  onSelect, 
  disabled 
}) => {
  return (
    <button
      className={`embr-tab ${active ? 'active' : ''}`}
      onClick={onSelect}
      disabled={disabled}
      type="button"
    >
      {children}
    </button>
  );
};

// Tab Panel Component
interface EmbrKitTabPanelProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export const EmbrKitTabPanel: React.FC<EmbrKitTabPanelProps> = ({ 
  children, 
  className 
}) => {
  return (
    <div className={`embr-tab-content ${className || ''}`}>
      {children}
    </div>
  );
};

// Breadcrumbs Component
interface EmbrKitBreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface EmbrKitBreadcrumbsProps {
  items: EmbrKitBreadcrumbItem[];
  separator?: string;
  className?: string;
}

export const EmbrKitBreadcrumbs: React.FC<EmbrKitBreadcrumbsProps> = ({ 
  items, 
  separator = '/', 
  className 
}) => {
  return (
    <nav className={`embr-breadcrumbs ${className || ''}`} aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        return (
          <div key={index} className="embr-breadcrumb-item">
            {isLast ? (
              <span className="embr-breadcrumb-current" aria-current="page">
                {item.label}
              </span>
            ) : (
              <>
                {item.href ? (
                  <a href={item.href} className="embr-breadcrumb-link">
                    {item.label}
                  </a>
                ) : (
                  <button className="embr-breadcrumb-link" onClick={item.onClick}>
                    {item.label}
                  </button>
                )}
                <span className="embr-breadcrumb-separator" aria-hidden="true">
                  {separator}
                </span>
              </>
            )}
          </div>
        );
      })}
    </nav>
  );
};

// Export types and utilities
export type { 
  EmbrKitContextType, 
  EmbrKitButtonProps,
  EmbrKitCardProps,
  EmbrKitInputProps,
  EmbrKitBadgeProps,
  EmbrKitModalProps,
  EmbrKitToastProps,
  EmbrKitContainerProps,
  EmbrKitStackProps,
  EmbrKitGridProps,
  EmbrKitNavbarProps,
  EmbrKitNavbarLinkProps,
  EmbrKitTabsProps,
  EmbrKitTabProps,
  EmbrKitTabPanelProps,
  EmbrKitBreadcrumbsProps
}; 