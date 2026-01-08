import React, { useState } from 'react';
import './ResponsiveTable.css';

export const ResponsiveTable = ({
  columns,
  data,
  itemsPerPageOptions = [5, 10, 20, 50],
  defaultItemsPerPage = 10,
  onRowClick,
  emptyMessage = "Aucune donnée disponible"
}) => {
export default ResponsiveTable;
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);

  // Pagination
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  // Format pour mobile
  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    return (
      <div className="responsive-table-mobile">
        {currentData.length === 0 ? (
          <div className="mobile-empty-state">
            <svg className="empty-icon" width="48" height="48" viewBox="0 0 24 24" fill="none">
              <path d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p className="empty-text">{emptyMessage}</p>
          </div>
        ) : (
          <div className="mobile-cards-container">
            {currentData.map((row, index) => (
              <div 
                key={index} 
                className="mobile-table-card"
                onClick={() => onRowClick && onRowClick(row)}
              >
                {columns.map((col, colIndex) => (
                  <div key={colIndex} className="mobile-table-card-row">
                    <span className="mobile-table-card-label">{col.header}:</span>
                    <span className="mobile-table-card-value">
                      {col.render ? col.render(row[col.accessor], row) : row[col.accessor]}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Version desktop
  return (
    <div className="responsive-table-desktop">
      <div className="table-container">
        <table className="desktop-table">
          <thead>
            <tr>
              {columns.map((col, index) => (
                <th key={index}>{col.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, rowIndex) => (
              <tr 
                key={rowIndex} 
                onClick={() => onRowClick && onRowClick(row)}
                className={onRowClick ? 'clickable-row' : ''}
              >
                {columns.map((col, colIndex) => (
                  <td key={colIndex}>
                    {col.render ? col.render(row[col.accessor], row) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        
        {currentData.length === 0 && (
          <div className="desktop-empty-state">
            <svg className="empty-icon" width="48" height="48" viewBox="0 0 24 24" fill="none">
              <path d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p className="empty-text">{emptyMessage}</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {data.length > 0 && (
        <div className="table-pagination">
          <div className="pagination-info">
            <span>
              {startIndex + 1} - {Math.min(endIndex, data.length)} sur {data.length} résultats
            </span>
          </div>
          
          <div className="pagination-controls">
            <select 
              className="items-per-page-select"
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              {itemsPerPageOptions.map(option => (
                <option key={option} value={option}>
                  {option} par page
                </option>
              ))}
            </select>

            <div className="page-buttons">
              <button
                className="page-button prev-button"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <div className="page-numbers">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      className={`page-number ${currentPage === pageNum ? 'active' : ''}`}
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                className="page-button next-button"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};