// frontend/src/components/ui/Table.jsx
import React from 'react';
import './Table.css';

export const Table = ({ 
  children, 
  className = '',
  striped = false,
  hover = true,
  compact = false,
  responsive = true
}) => {
export default Table;
  return (
    <div className={`table-container ${responsive ? 'table-responsive' : ''}`}>
      <table className={`
        table
        ${striped ? 'table-striped' : ''}
        ${hover ? 'table-hover' : ''}
        ${compact ? 'table-compact' : ''}
        ${className}
      `}>
        {children}
      </table>
    </div>
  );
};

export const TableHeader = ({ children, className = '' }) => {
  return <thead className={`table-header ${className}`}>{children}</thead>;
};

export const TableBody = ({ children, className = '' }) => {
  return <tbody className={`table-body ${className}`}>{children}</tbody>;
};

export const TableRow = ({ 
  children, 
  onClick, 
  className = '',
  active = false,
  disabled = false
}) => {
  return (
    <tr 
      className={`
        table-row
        ${active ? 'table-row-active' : ''}
        ${disabled ? 'table-row-disabled' : ''}
        ${onClick ? 'table-row-clickable' : ''}
        ${className}
      `}
      onClick={disabled ? undefined : onClick}
      style={{ cursor: onClick && !disabled ? 'pointer' : 'default' }}
    >
      {children}
    </tr>
  );
};

export const TableCell = ({ 
  children, 
  className = '',
  align = 'left',
  colSpan,
  rowSpan
}) => {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify'
  };

  return (
    <td 
      className={`table-cell ${alignClasses[align] || 'text-left'} ${className}`}
      colSpan={colSpan}
      rowSpan={rowSpan}
    >
      {children}
    </td>
  );
};

export const TableHeaderCell = ({ 
  children, 
  className = '',
  align = 'left',
  sortable = false,
  sorted,
  onSort,
  colSpan,
  rowSpan
}) => {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  return (
    <th 
      className={`
        table-header-cell
        ${alignClasses[align] || 'text-left'}
        ${sortable ? 'table-header-sortable' : ''}
        ${sorted ? 'table-header-sorted' : ''}
        ${className}
      `}
      onClick={sortable ? onSort : undefined}
      style={{ cursor: sortable ? 'pointer' : 'default' }}
      colSpan={colSpan}
      rowSpan={rowSpan}
    >
      <div className="table-header-content">
        {children}
        {sortable && (
          <span className="table-sort-indicator">
            {sorted === 'asc' ? '↑' : sorted === 'desc' ? '↓' : '↕'}
          </span>
        )}
      </div>
    </th>
  );
};

// Additional table components
export const TableFooter = ({ children, className = '' }) => {
  return <tfoot className={`table-footer ${className}`}>{children}</tfoot>;
};

export const TableCaption = ({ children, className = '' }) => {
  return <caption className={`table-caption ${className}`}>{children}</caption>;
};

// Empty state component
export const TableEmpty = ({ 
  message = 'Aucune donnée disponible',
  icon,
  action,
  colSpan = 1
}) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} align="center" className="table-empty-cell">
        <div className="table-empty-content">
          {icon && <div className="table-empty-icon">{icon}</div>}
          <p className="table-empty-message">{message}</p>
          {action && <div className="table-empty-action">{action}</div>}
        </div>
      </TableCell>
    </TableRow>
  );
};

// Loading state component
export const TableLoading = ({ 
  columns = 5,
  rows = 5,
  colSpan = 1
}) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <TableCell key={colIndex} colSpan={colSpan}>
              <div className="table-loading-shimmer">
                <div className="table-loading-animation"></div>
              </div>
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};