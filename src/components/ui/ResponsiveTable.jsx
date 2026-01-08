import React from 'react';
import './ResponsiveTable.css';

const ResponsiveTable = ({ 
  columns = [],
  data = [],
  className = '',
  onRowClick,
  emptyMessage = 'Aucune donnée disponible'
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="responsive-table-empty">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={`responsive-table-container ${className}`}>
      <div className="responsive-table-scroll">
        <table className="responsive-table">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index} style={{ width: column.width }}>
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr 
                key={rowIndex} 
                onClick={() => onRowClick && onRowClick(row)}
                className={onRowClick ? 'clickable-row' : ''}
              >
                {columns.map((column, colIndex) => (
                  <td key={colIndex}>
                    {column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResponsiveTable;
