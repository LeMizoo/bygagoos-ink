import React from 'react';
import './Table.css';

const Table = ({ 
  headers = [],
  data = [],
  className = '',
  striped = false,
  hoverable = false,
  bordered = false
}) => {
  const tableClasses = [
    'table',
    striped ? 'table-striped' : '',
    hoverable ? 'table-hover' : '',
    bordered ? 'table-bordered' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="table-responsive">
      <table className={tableClasses}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
