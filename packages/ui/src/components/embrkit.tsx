import React, { createContext, useContext, ReactNode, useState, FC } from 'react';

// Import EmbrKit styles and utilities
import '../lib/index';

// EmbrKit Theme Types
export interface EmbrKitTheme {
  primaryColor?: string;
  secondaryColor?: string;
  backgroundColor?: string;
  surfaceColor?: string;
  textColor?: string;
  textSecondaryColor?: string;
  fontFamily?: string;
  headingFontFamily?: string;
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
  // Also set client-brand color overrides used by component CSS
  if (theme.primaryColor) root.style.setProperty('--embr-primary-color', theme.primaryColor);
  if (theme.secondaryColor) root.style.setProperty('--embr-secondary', theme.secondaryColor);
  if (theme.secondaryColor) root.style.setProperty('--embr-secondary-color', theme.secondaryColor);
  if (theme.backgroundColor) root.style.setProperty('--embr-background', theme.backgroundColor);
  if (theme.surfaceColor) root.style.setProperty('--embr-surface', theme.surfaceColor);
  if (theme.textColor) root.style.setProperty('--embr-text', theme.textColor);
  if (theme.textColor) root.style.setProperty('--embr-text-color', theme.textColor);
  if (theme.textSecondaryColor) root.style.setProperty('--embr-text-secondary', theme.textSecondaryColor);
  if (theme.fontFamily) root.style.setProperty('--embr-font-family', theme.fontFamily);
  if (theme.headingFontFamily) root.style.setProperty('--embr-heading-font', theme.headingFontFamily);
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

export function EmbrKitProvider({ 
  children, 
  initialTheme = {} 
}: EmbrKitProviderProps) {
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
}

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
  style?: React.CSSProperties;
  type?: 'button' | 'submit' | 'reset';
  'aria-label'?: string;
  id?: string;
  tabIndex?: number;
  onFocus?: () => void;
  onBlur?: () => void;
  [key: string]: any; // Allow any additional props
}

export function EmbrKitButton({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false,
  className = '',
  style,
  type = 'button',
  ...rest
}: EmbrKitButtonProps) {
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
      style={style}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
}

// ==============================================
// CARD COMPONENT
// ==============================================

interface EmbrKitCardProps {
  variant?: 'default' | 'elevated' | 'flat';
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  onClick?: () => void;
  'aria-label'?: string;
  role?: string;
  [key: string]: any; // Allow any additional props
}

export function EmbrKitCard({
  variant = 'default',
  children,
  className = '',
  style,
  onClick,
  ...rest
}: EmbrKitCardProps) {
  const baseClasses = 'embr-card';
  const variantClass = variant !== 'default' ? `embr-card-${variant}` : '';
  
  const classes = [baseClasses, variantClass, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div 
      className={classes}
      style={style}
      onClick={onClick}
      {...rest}
    >
      {children}
    </div>
  );
}

interface EmbrKitCardHeaderProps {
  title?: string;
  subtitle?: string;
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: any;
}

export const EmbrKitCardHeader: React.FC<EmbrKitCardHeaderProps> = ({
  title,
  subtitle,
  children,
  className = '',
  style,
  ...rest
}) => (
  <div className={`embr-card-header ${className}`} style={style} {...rest}>
    {title && <h3 className="embr-card-title">{title}</h3>}
    {subtitle && <p className="embr-card-subtitle">{subtitle}</p>}
    {children}
  </div>
);

interface EmbrKitCardContentProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: any;
}

export const EmbrKitCardContent: React.FC<EmbrKitCardContentProps> = ({
  children,
  className = '',
  style,
  ...rest
}) => (
  <div className={`embr-card-content ${className}`} style={style} {...rest}>{children}</div>
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
  style?: React.CSSProperties;
  id?: string;
  onClick?: () => void;
  [key: string]: any;
}

export function EmbrKitBadge({
  variant = 'primary',
  outline = false,
  children,
  className = '',
  style,
  onClick,
  ...rest
}: EmbrKitBadgeProps) {
  const baseClasses = 'embr-badge';
  const variantClass = `embr-badge-${variant}`;
  const outlineClass = outline ? 'embr-badge-outline' : '';
  
  const classes = [baseClasses, variantClass, outlineClass, className]
    .filter(Boolean)
    .join(' ');

  return (
    <span 
      className={classes}
      style={style}
      onClick={onClick}
      {...rest}
    >
      {children}
    </span>
  );
}

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
  style?: React.CSSProperties;
  id?: string;
  [key: string]: any;
}

export function EmbrKitContainer({
  size = 'md',
  children,
  className = '',
  style,
  ...rest
}: EmbrKitContainerProps) {
  const baseClasses = 'embr-container';
  const sizeClass = size !== 'md' ? `embr-container-${size}` : '';
  
  const classes = [baseClasses, sizeClass, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div 
      className={classes}
      style={style}
      {...rest}
    >
      {children}
    </div>
  );
}

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
  style?: React.CSSProperties;
  id?: string;
  [key: string]: any;
}

export function EmbrKitGrid({
  cols = 1,
  gap = 4,
  children,
  className = '',
  style,
  ...rest
}: EmbrKitGridProps) {
  const baseClasses = 'embr-grid';
  const colsClass = `embr-grid-cols-${cols}`;
  const gapClass = `embr-stack-gap-${gap}`;
  
  const classes = [baseClasses, colsClass, gapClass, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div 
      className={classes}
      style={style}
      {...rest}
    >
      {children}
    </div>
  );
}

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

// ==============================================
// DATA DISPLAY COMPONENTS
// ==============================================

// Table Component
interface EmbrKitTableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  numeric?: boolean;
  primary?: boolean;
  render?: (value: any, row: any) => ReactNode;
}

interface EmbrKitTableProps {
  columns: EmbrKitTableColumn[];
  data: any[];
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  onSort?: (column: string, direction: 'asc' | 'desc') => void;
  className?: string;
}

export const EmbrKitTable: React.FC<EmbrKitTableProps> = ({
  columns,
  data,
  sortBy,
  sortDirection = 'asc',
  onSort,
  className
}) => {
  const handleSort = (columnKey: string) => {
    if (!onSort) return;
    
    const newDirection = sortBy === columnKey && sortDirection === 'asc' ? 'desc' : 'asc';
    onSort(columnKey, newDirection);
  };

  return (
    <div className={`embr-table-container ${className || ''}`}>
      <table className="embr-table">
        <thead className="embr-table-header">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`${column.sortable ? 'sortable' : ''} ${
                  sortBy === column.key ? 'sorted' : ''
                }`}
                onClick={column.sortable ? () => handleSort(column.key) : undefined}
              >
                {column.label}
                {column.sortable && (
                  <span className="embr-table-sort-icon">
                    {sortBy === column.key ? (sortDirection === 'asc' ? '↑' : '↓') : '↕'}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="embr-table-body">
          {data.map((row, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={`${column.primary ? 'primary' : ''} ${
                    column.numeric ? 'numeric' : ''
                  }`}
                >
                  {column.render ? column.render(row[column.key], row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// DataList Component
interface EmbrKitDataListItem {
  label: string;
  value: ReactNode;
  primary?: boolean;
  numeric?: boolean;
}

interface EmbrKitDataListProps {
  items: EmbrKitDataListItem[];
  className?: string;
}

export const EmbrKitDataList: React.FC<EmbrKitDataListProps> = ({
  items,
  className
}) => {
  return (
    <div className={`embr-datalist ${className || ''}`}>
      {items.map((item, index) => (
        <div key={index} className="embr-datalist-item">
          <span className="embr-datalist-label">{item.label}</span>
          <span
            className={`embr-datalist-value ${item.primary ? 'primary' : ''} ${
              item.numeric ? 'numeric' : ''
            }`}
          >
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
};

// StatCard Component
interface EmbrKitStatCardProps {
  title?: string;
  label?: string; // Alternative to title for simpler use
  value: string | number;
  change?: {
    value: string | number;
    type: 'positive' | 'negative' | 'neutral';
  };
  icon?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  [key: string]: any;
}

export function EmbrKitStatCard({
  title,
  label,
  value,
  change,
  icon,
  className = '',
  style,
  color,
  size = 'md',
  ...rest
}: EmbrKitStatCardProps) {
  const displayTitle = title || label;
  const sizeClass = size !== 'md' ? `embr-stat-card-${size}` : '';
  const classes = ['embr-stat-card', sizeClass, className].filter(Boolean).join(' ');

  return (
    <div className={classes} style={style} {...rest}>
      <div className="embr-stat-card-header">
        {displayTitle && <h3 className="embr-stat-card-title">{displayTitle}</h3>}
        {icon && <div className="embr-stat-card-icon">{icon}</div>}
      </div>
      <div 
        className="embr-stat-card-value" 
        style={{ color: color || undefined }}
      >
        {value}
      </div>
      {change && (
        <div className={`embr-stat-card-change ${change.type}`}>
          <span className="embr-stat-card-change-icon">
            {change.type === 'positive' ? '↗' : change.type === 'negative' ? '↘' : '→'}
          </span>
          {change.value}
        </div>
      )}
    </div>
  );
};

// DataCard Component
interface EmbrKitDataCardMetric {
  label: string;
  value: ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'error';
}

interface EmbrKitDataCardProps {
  title: string;
  subtitle?: string;
  metrics: EmbrKitDataCardMetric[];
  className?: string;
}

export const EmbrKitDataCard: React.FC<EmbrKitDataCardProps> = ({
  title,
  subtitle,
  metrics,
  className
}) => {
  return (
    <div className={`embr-data-card ${className || ''}`}>
      <div className="embr-data-card-header">
        <h3 className="embr-data-card-title">{title}</h3>
        {subtitle && <p className="embr-data-card-subtitle">{subtitle}</p>}
      </div>
      <div className="embr-data-card-content">
        {metrics.map((metric, index) => (
          <div key={index} className="embr-data-card-metric">
            <span className="embr-data-card-metric-label">{metric.label}</span>
            <span
              className={`embr-data-card-metric-value ${
                metric.variant ? metric.variant : ''
              }`}
            >
              {metric.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==============================================
// LOCATION & EVENT COMPONENTS - Embr Micro-Apps
// ==============================================

// Map Component
interface EmbrKitMapMarker {
  id: string;
  x: number; // Position as percentage (0-100)
  y: number; // Position as percentage (0-100)
  label: string;
  type?: string;
  active?: boolean;
  onClick?: () => void;
}

interface EmbrKitMapProps {
  title?: string;
  markers: EmbrKitMapMarker[];
  searchable?: boolean;
  onSearch?: (query: string) => void;
  backgroundImage?: string;
  className?: string;
}

export const EmbrKitMap: React.FC<EmbrKitMapProps> = ({
  title = "Venue Map",
  markers,
  searchable = true,
  onSearch,
  backgroundImage,
  className
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch?.(query);
  };

  return (
    <div className={`embr-map-container ${className || ''}`}>
      <div className="embr-map-header">
        <h3 className="embr-map-title">{title}</h3>
        <div className="embr-map-controls">
          {searchable && (
            <div className="embr-map-search">
              <input
                type="text"
                placeholder="Search locations..."
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          )}
        </div>
      </div>
      <div className="embr-map-viewport">
        <div 
          className="embr-map-content"
          style={{ 
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {markers.map((marker) => (
            <div
              key={marker.id}
              className={`embr-map-marker ${marker.active ? 'active' : ''}`}
              style={{
                left: `${marker.x}%`,
                top: `${marker.y}%`
              }}
              onClick={marker.onClick}
              title={marker.label}
            >
              <span>{marker.label.charAt(0)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Location Card Component
interface EmbrKitLocationCardProps {
  title: string;
  type?: string;
  description?: string;
  distance?: string;
  actions?: ReactNode;
  onClick?: () => void;
  className?: string;
}

export const EmbrKitLocationCard: React.FC<EmbrKitLocationCardProps> = ({
  title,
  type,
  description,
  distance,
  actions,
  onClick,
  className
}) => {
  return (
    <div className={`embr-location-card ${className || ''}`} onClick={onClick}>
      <div className="embr-location-card-header">
        <h4 className="embr-location-card-title">{title}</h4>
        {distance && <span className="embr-location-card-distance">{distance}</span>}
      </div>
      {type && <span className="embr-location-card-type">{type}</span>}
      {description && <p className="embr-location-card-description">{description}</p>}
      {actions && <div className="embr-location-card-actions">{actions}</div>}
    </div>
  );
};

// Location Finder Component
interface EmbrKitLocationFinderFilter {
  id: string;
  label: string;
  active?: boolean;
}

interface EmbrKitLocationFinderProps {
  title?: string;
  filters: EmbrKitLocationFinderFilter[];
  onFilterChange?: (filterId: string) => void;
  onSearch?: (query: string) => void;
  children: ReactNode;
  className?: string;
}

export const EmbrKitLocationFinder: React.FC<EmbrKitLocationFinderProps> = ({
  title = "Find Locations",
  filters,
  onFilterChange,
  onSearch,
  children,
  className
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch?.(query);
  };

  return (
    <div className={`embr-location-finder ${className || ''}`}>
      <div className="embr-location-finder-header">
        <h3>{title}</h3>
      </div>
      
      <div className="embr-location-finder-search">
        <input
          type="text"
          placeholder="Search for vendors, facilities..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <div className="embr-location-finder-filters">
        {filters.map((filter) => (
          <button
            key={filter.id}
            className={`embr-location-filter ${filter.active ? 'active' : ''}`}
            onClick={() => onFilterChange?.(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="embr-location-results">
        {children}
      </div>
    </div>
  );
};

// Schedule Component
interface EmbrKitScheduleProps {
  title?: string;
  date?: string;
  children: ReactNode;
  className?: string;
}

export const EmbrKitSchedule: React.FC<EmbrKitScheduleProps> = ({
  title = "Event Schedule",
  date,
  children,
  className
}) => {
  return (
    <div className={`embr-schedule ${className || ''}`}>
      <div className="embr-schedule-header">
        <h3 className="embr-schedule-title">{title}</h3>
        {date && <span className="embr-schedule-date">{date}</span>}
      </div>
      <div className="embr-schedule-content">
        <div className="embr-schedule-timeline">
          {children}
        </div>
      </div>
    </div>
  );
};

// Event Card Component
interface EmbrKitEventCardProps {
  time: string;
  title: string;
  location?: string;
  description?: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export const EmbrKitEventCard: React.FC<EmbrKitEventCardProps> = ({
  time,
  title,
  location,
  description,
  active = false,
  onClick,
  className
}) => {
  return (
    <div 
      className={`embr-event-card ${active ? 'active' : ''} ${className || ''}`}
      onClick={onClick}
    >
      <div className="embr-event-card-time">{time}</div>
      <h4 className="embr-event-card-title">{title}</h4>
      {location && <div className="embr-event-card-location">📍 {location}</div>}
      {description && <p className="embr-event-card-description">{description}</p>}
    </div>
  );
};

// Live Status Component
interface EmbrKitLiveStatusProps {
  status: 'live' | 'warning' | 'error';
  text: string;
  timestamp?: string;
  className?: string;
}

export const EmbrKitLiveStatus: React.FC<EmbrKitLiveStatusProps> = ({
  status,
  text,
  timestamp,
  className
}) => {
  return (
    <div className={`embr-live-status ${status} ${className || ''}`}>
      <div className="embr-live-indicator"></div>
      <span className="embr-live-status-text">{text}</span>
      {timestamp && <span className="embr-live-status-time">{timestamp}</span>}
    </div>
  );
};

// ==============================================
// UNIVERSAL TOOL COMPONENTS - Any Use Case
// ==============================================

// Timer Component
interface EmbrKitTimerProps {
  duration?: number; // in seconds
  label?: string;
  showProgress?: boolean;
  autoStart?: boolean;
  breathing?: boolean;
  onComplete?: () => void;
  onTick?: (remaining: number) => void;
  className?: string;
}

export const EmbrKitTimer: React.FC<EmbrKitTimerProps> = ({
  duration = 60,
  label = "Timer",
  showProgress = true,
  autoStart = false,
  breathing = false,
  onComplete,
  onTick,
  className
}) => {
  const [timeLeft, setTimeLeft] = React.useState(duration);
  const [isActive, setIsActive] = React.useState(autoStart);
  const [progress, setProgress] = React.useState(100);

  React.useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          const newTime = time - 1;
          const newProgress = (newTime / duration) * 100;
          setProgress(newProgress);
          onTick?.(newTime);
          
          if (newTime === 0) {
            setIsActive(false);
            onComplete?.();
          }
          
          return newTime;
        });
      }, 1000);
    } else if (!isActive && timeLeft !== 0) {
      if (interval) clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, duration, onComplete, onTick]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setTimeLeft(duration);
    setProgress(100);
    setIsActive(false);
  };

  return (
    <div className={`embr-timer ${isActive ? 'active' : ''} ${breathing ? 'breathing' : ''} ${className || ''}`}>
      {showProgress && (
        <div className="embr-timer-progress">
          <div 
            className="embr-timer-progress-bar"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
      
      <div className="embr-timer-display">
        {formatTime(timeLeft)}
      </div>
      
      <div className="embr-timer-label">{label}</div>
      
      <div className="embr-timer-controls">
        <button className="embr-btn embr-btn-primary" onClick={handleToggle}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button className="embr-btn embr-btn-secondary" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

// Progress Circle Component
interface EmbrKitProgressCircleProps {
  value: number; // 0-100
  size?: number;
  strokeWidth?: number;
  label?: string;
  className?: string;
}

export const EmbrKitProgressCircle: React.FC<EmbrKitProgressCircleProps> = ({
  value,
  size = 120,
  strokeWidth = 8,
  label,
  className
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className={`embr-progress-circle ${className || ''}`} style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle
          className="embr-progress-circle-bg"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <circle
          className="embr-progress-circle-progress"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      <div className="embr-progress-circle-text">
        {label || `${Math.round(value)}%`}
      </div>
    </div>
  );
};

// Progress Bar Component
interface EmbrKitProgressBarProps {
  value: number; // 0-100
  label?: string;
  showValue?: boolean;
  animated?: boolean;
  className?: string;
}

export const EmbrKitProgressBar: React.FC<EmbrKitProgressBarProps> = ({
  value,
  label = "Progress",
  showValue = true,
  animated = true,
  className
}) => {
  return (
    <div className={`embr-progress-bar ${className || ''}`}>
      <div className="embr-progress-bar-header">
        <span className="embr-progress-bar-label">{label}</span>
        {showValue && <span className="embr-progress-bar-value">{Math.round(value)}%</span>}
      </div>
      <div className="embr-progress-bar-track">
        <div 
          className="embr-progress-bar-fill"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
};

// Media Gallery Component
interface EmbrKitMediaItem {
  id: string;
  src: string;
  type: 'image' | 'video';
  caption?: string;
  thumbnail?: string;
}

interface EmbrKitMediaGalleryProps {
  title?: string;
  items: EmbrKitMediaItem[];
  onItemClick?: (item: EmbrKitMediaItem) => void;
  className?: string;
}

export const EmbrKitMediaGallery: React.FC<EmbrKitMediaGalleryProps> = ({
  title = "Gallery",
  items,
  onItemClick,
  className
}) => {
  return (
    <div className={`embr-media-gallery ${className || ''}`}>
      {title && (
        <div className="embr-media-gallery-header">
          <h3 className="embr-media-gallery-title">{title}</h3>
        </div>
      )}
      <div className="embr-media-gallery-grid">
        {items.map((item) => (
          <div 
            key={item.id}
            className="embr-media-item"
            onClick={() => onItemClick?.(item)}
          >
            {item.type === 'image' ? (
              <img src={item.src} alt={item.caption || 'Gallery item'} />
            ) : (
              <video src={item.src} poster={item.thumbnail} />
            )}
            {item.caption && (
              <div className="embr-media-overlay">
                {item.caption}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Action Panel Component
interface EmbrKitActionItem {
  id: string;
  title: string;
  description?: string;
  icon?: ReactNode;
  href?: string;
  onClick?: () => void;
}

interface EmbrKitActionPanelProps {
  title?: string;
  actions: EmbrKitActionItem[];
  className?: string;
}

export const EmbrKitActionPanel: React.FC<EmbrKitActionPanelProps> = ({
  title,
  actions,
  className
}) => {
  return (
    <div className={`embr-action-panel ${className || ''}`}>
      {title && <h3 style={{ marginBottom: 'var(--embr-space-6)' }}>{title}</h3>}
      <div className="embr-action-grid">
        {actions.map((action) => {
          const content = (
            <>
              {action.icon && <span className="embr-action-icon">{action.icon}</span>}
              <h4 className="embr-action-title">{action.title}</h4>
              {action.description && <p className="embr-action-description">{action.description}</p>}
            </>
          );

          if (action.href) {
            return (
              <a key={action.id} href={action.href} className="embr-action-card">
                {content}
              </a>
            );
          }

          return (
            <div key={action.id} className="embr-action-card" onClick={action.onClick}>
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Quick Contact Component
interface EmbrKitContactMethod {
  id: string;
  type: 'phone' | 'email' | 'website' | 'social';
  label: string;
  value: string;
  icon?: ReactNode;
}

interface EmbrKitQuickContactProps {
  title?: string;
  methods: EmbrKitContactMethod[];
  className?: string;
}

export const EmbrKitQuickContact: React.FC<EmbrKitQuickContactProps> = ({
  title = "Get in Touch",
  methods,
  className
}) => {
  const getHref = (method: EmbrKitContactMethod) => {
    switch (method.type) {
      case 'phone':
        return `tel:${method.value}`;
      case 'email':
        return `mailto:${method.value}`;
      case 'website':
      case 'social':
        return method.value;
      default:
        return method.value;
    }
  };

  const getDefaultIcon = (type: string) => {
    switch (type) {
      case 'phone': return '📞';
      case 'email': return '✉️';
      case 'website': return '🌐';
      case 'social': return '📱';
      default: return '💬';
    }
  };

  return (
    <div className={`embr-quick-contact ${className || ''}`}>
      {title && <h3 style={{ marginBottom: 'var(--embr-space-4)' }}>{title}</h3>}
      <div className="embr-contact-methods">
        {methods.map((method) => (
          <a 
            key={method.id}
            href={getHref(method)}
            className="embr-contact-method"
            target={method.type === 'website' || method.type === 'social' ? '_blank' : undefined}
            rel={method.type === 'website' || method.type === 'social' ? 'noopener noreferrer' : undefined}
          >
            <span className="embr-contact-icon">
              {method.icon || getDefaultIcon(method.type)}
            </span>
            <span className="embr-contact-label">{method.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

// ==============================================
// ADVANCED FORM COMPONENTS - Complete Toolkit
// ==============================================

// Form Field Component (with validation)
interface EmbrKitFormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  help?: string;
  children: ReactNode;
  className?: string;
}

export const EmbrKitFormField: React.FC<EmbrKitFormFieldProps> = ({
  label,
  required = false,
  error,
  help,
  children,
  className
}) => {
  return (
    <div className={`embr-form-field ${className || ''}`}>
      <label className={`embr-form-label ${required ? 'required' : ''}`}>
        {label}
      </label>
      {children}
      {error && (
        <div className="embr-form-error">
          <span className="embr-form-error-icon">⚠</span>
          {error}
        </div>
      )}
      {help && !error && (
        <div className="embr-form-help">{help}</div>
      )}
    </div>
  );
};

// Enhanced Input Component
interface EmbrKitFormInputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: boolean;
  disabled?: boolean;
  className?: string;
}

export const EmbrKitFormInput: React.FC<EmbrKitFormInputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  error = false,
  disabled = false,
  className
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      disabled={disabled}
      className={`embr-form-input ${error ? 'error' : ''} ${className || ''}`}
    />
  );
};

// File Upload Component
interface EmbrKitFileUploadProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in MB
  onFileSelect?: (files: File[]) => void;
  className?: string;
}

export const EmbrKitFileUpload: React.FC<EmbrKitFileUploadProps> = ({
  accept,
  multiple = false,
  maxSize = 10,
  onFileSelect,
  className
}) => {
  const [files, setFiles] = React.useState<File[]>([]);
  const [dragOver, setDragOver] = React.useState(false);

  const handleFileChange = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;
    
    const fileArray = Array.from(selectedFiles);
    setFiles(fileArray);
    onFileSelect?.(fileArray);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileChange(e.dataTransfer.files);
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onFileSelect?.(newFiles);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={className}>
      <div 
        className={`embr-file-upload ${dragOver ? 'dragover' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <span className="embr-file-upload-icon">📁</span>
        <div className="embr-file-upload-text">
          Drop files here or click to browse
        </div>
        <div className="embr-file-upload-hint">
          {accept ? `Accepts: ${accept}` : 'Any file type'} • Max {maxSize}MB
        </div>
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => handleFileChange(e.target.files)}
          className="embr-file-upload-input"
        />
      </div>
      
      {files.length > 0 && (
        <div className="embr-file-list">
          {files.map((file, index) => (
            <div key={index} className="embr-file-item">
              <div className="embr-file-info">
                <span className="embr-file-icon">📄</span>
                <div className="embr-file-details">
                  <div className="embr-file-name">{file.name}</div>
                  <div className="embr-file-size">{formatFileSize(file.size)}</div>
                </div>
              </div>
              <button 
                className="embr-file-remove"
                onClick={() => removeFile(index)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Form Wizard Component
interface EmbrKitWizardStep {
  id: string;
  label: string;
  title: string;
  content: ReactNode;
}

interface EmbrKitFormWizardProps {
  steps: EmbrKitWizardStep[];
  currentStep?: number;
  onStepChange?: (stepIndex: number) => void;
  onComplete?: () => void;
  className?: string;
}

export const EmbrKitFormWizard: React.FC<EmbrKitFormWizardProps> = ({
  steps,
  currentStep = 0,
  onStepChange,
  onComplete,
  className
}) => {
  const [activeStep, setActiveStep] = React.useState(currentStep);

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      const newStep = activeStep + 1;
      setActiveStep(newStep);
      onStepChange?.(newStep);
    } else {
      onComplete?.();
    }
  };

  const handlePrev = () => {
    if (activeStep > 0) {
      const newStep = activeStep - 1;
      setActiveStep(newStep);
      onStepChange?.(newStep);
    }
  };

  const currentStepData = steps[activeStep];

  return (
    <div className={`embr-form-wizard ${className || ''}`}>
      <div className="embr-wizard-header">
        <div className="embr-wizard-progress">
          {steps.map((step, index) => (
            <div 
              key={step.id}
              className={`embr-wizard-step ${
                index === activeStep ? 'active' : ''
              } ${index < activeStep ? 'completed' : ''}`}
            >
              <div className="embr-wizard-step-indicator">
                {index < activeStep ? '✓' : index + 1}
              </div>
              <span className="embr-wizard-step-label">{step.label}</span>
            </div>
          ))}
        </div>
        <h2 className="embr-wizard-title">{currentStepData.title}</h2>
      </div>

      <div className="embr-wizard-content">
        {currentStepData.content}
      </div>

      <div className="embr-wizard-actions">
        <div className="embr-wizard-nav">
          {activeStep > 0 && (
            <button className="embr-btn embr-btn-secondary" onClick={handlePrev}>
              Previous
            </button>
          )}
        </div>
        <div className="embr-wizard-nav">
          <button className="embr-btn embr-btn-primary" onClick={handleNext}>
            {activeStep === steps.length - 1 ? 'Complete' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

// ==============================================
// FEEDBACK & NOTIFICATION COMPONENTS
// ==============================================

// Alert Component
interface EmbrKitAlertProps {
  type?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  description: string;
  closable?: boolean;
  onClose?: () => void;
  className?: string;
}

export const EmbrKitAlert: React.FC<EmbrKitAlertProps> = ({
  type = 'info',
  title,
  description,
  closable = true,
  onClose,
  className
}) => {
  const icons = {
    info: 'ℹ️',
    success: '✅',
    warning: '⚠️',
    error: '❌'
  };

  return (
    <div className={`embr-alert embr-alert-${type} ${className || ''}`}>
      <span className="embr-alert-icon">{icons[type]}</span>
      <div className="embr-alert-content">
        {title && <h4 className="embr-alert-title">{title}</h4>}
        <p className="embr-alert-description">{description}</p>
      </div>
      {closable && (
        <button className="embr-alert-close" onClick={onClose}>
          ✕
        </button>
      )}
    </div>
  );
};

// Loading Component
interface EmbrKitLoadingProps {
  text?: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const EmbrKitLoading: React.FC<EmbrKitLoadingProps> = ({
  text = 'Loading...',
  size = 'medium',
  className
}) => {
  const sizeStyles = {
    small: { width: '20px', height: '20px' },
    medium: { width: '32px', height: '32px' },
    large: { width: '48px', height: '48px' }
  };

  return (
    <div className={`embr-loading ${className || ''}`}>
      <div 
        className="embr-loading-spinner" 
        style={sizeStyles[size]}
      />
      {text && <span className="embr-loading-text">{text}</span>}
    </div>
  );
};

// Skeleton Component
interface EmbrKitSkeletonProps {
  variant?: 'text' | 'avatar' | 'card';
  lines?: number;
  className?: string;
}

export const EmbrKitSkeleton: React.FC<EmbrKitSkeletonProps> = ({
  variant = 'text',
  lines = 3,
  className
}) => {
  if (variant === 'avatar') {
    return <div className={`embr-skeleton embr-skeleton-avatar ${className || ''}`} />;
  }

  if (variant === 'card') {
    return (
      <div className={`embr-skeleton-card ${className || ''}`}>
        <div className="embr-skeleton embr-skeleton-avatar" style={{ marginBottom: 'var(--embr-space-4)' }} />
        <div className="embr-skeleton embr-skeleton-text" />
        <div className="embr-skeleton embr-skeleton-text" />
        <div className="embr-skeleton embr-skeleton-text" />
      </div>
    );
  }

  return (
    <div className={className}>
      {Array.from({ length: lines }).map((_, index) => (
        <div key={index} className="embr-skeleton embr-skeleton-text" />
      ))}
    </div>
  );
};

// Confirmation Dialog Component
interface EmbrKitConfirmDialogProps {
  open: boolean;
  type?: 'info' | 'warning' | 'danger';
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  className?: string;
}

export const EmbrKitConfirmDialog: React.FC<EmbrKitConfirmDialogProps> = ({
  open,
  type = 'info',
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  className
}) => {
  const icons = {
    info: 'ℹ️',
    warning: '⚠️',
    danger: '🗑️'
  };

  if (!open) return null;

  return (
    <div className={`embr-confirm-dialog ${className || ''}`}>
      <div className="embr-confirm-content">
        <span className={`embr-confirm-icon ${type}`}>
          {icons[type]}
        </span>
        <h3 className="embr-confirm-title">{title}</h3>
        <p className="embr-confirm-description">{description}</p>
        <div className="embr-confirm-actions">
          <button className="embr-btn embr-btn-secondary" onClick={onCancel}>
            {cancelText}
          </button>
          <button 
            className={`embr-btn ${type === 'danger' ? 'embr-btn-error' : 'embr-btn-primary'}`}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

// Enhanced Toast Component
interface EmbrKitToastEnhancedProps {
  type?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  message: string;
  duration?: number;
  onClose?: () => void;
  className?: string;
}

export const EmbrKitToastEnhanced: React.FC<EmbrKitToastEnhancedProps> = ({
  type = 'info',
  title,
  message,
  duration = 5000,
  onClose,
  className
}) => {
  const icons = {
    info: 'ℹ️',
    success: '✅',
    warning: '⚠️',
    error: '❌'
  };

  React.useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <div className={`embr-toast-enhanced ${type} ${className || ''}`}>
      <span className={`embr-toast-icon ${type}`}>{icons[type]}</span>
      <div className="embr-toast-content">
        {title && <h4 className="embr-toast-title">{title}</h4>}
        <p className="embr-toast-message">{message}</p>
      </div>
      <button className="embr-toast-close" onClick={onClose}>
        ✕
      </button>
      {duration > 0 && (
        <div className={`embr-toast-progress ${type}`} />
      )}
    </div>
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
  EmbrKitBreadcrumbsProps,
  EmbrKitTableProps,
  EmbrKitTableColumn,
  EmbrKitDataListProps,
  EmbrKitDataListItem,
  EmbrKitStatCardProps,
  EmbrKitDataCardProps,
  EmbrKitDataCardMetric,
  EmbrKitMapProps,
  EmbrKitMapMarker,
  EmbrKitLocationCardProps,
  EmbrKitLocationFinderProps,
  EmbrKitLocationFinderFilter,
  EmbrKitScheduleProps,
  EmbrKitEventCardProps,
  EmbrKitLiveStatusProps,
  EmbrKitTimerProps,
  EmbrKitProgressCircleProps,
  EmbrKitProgressBarProps,
  EmbrKitMediaGalleryProps,
  EmbrKitMediaItem,
  EmbrKitActionPanelProps,
  EmbrKitActionItem,
  EmbrKitQuickContactProps,
  EmbrKitContactMethod,
  EmbrKitFormFieldProps,
  EmbrKitFormInputProps,
  EmbrKitFileUploadProps,
  EmbrKitFormWizardProps,
  EmbrKitWizardStep,
  EmbrKitAlertProps,
  EmbrKitLoadingProps,
  EmbrKitSkeletonProps,
  EmbrKitConfirmDialogProps,
  EmbrKitToastEnhancedProps
}; 