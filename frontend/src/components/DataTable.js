import React, { useState } from 'react';

export default function DataTable({ data, columns }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  // 1. Search Logic
  const filteredData = data.filter((item) =>
    Object.values(item).some((val) => 
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // 2. Sorting Logic
  const sortedData = [...filteredData].sort((a, b) => {
    if (sortConfig.key !== null) {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="data-table-container">
      <input
        type="text"
        placeholder="🔍 Search all columns..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '15px', padding: '8px', width: '300px' }}
      />
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ background: '#f4f4f4', cursor: 'pointer' }}>
          <tr>
            {columns.map((col) => (
              <th key={col.key} onClick={() => requestSort(col.key)}>
                {col.label} {sortConfig.key === col.key ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.length > 0 ? (
            sortedData.map((row, index) => (
              <tr key={index}>
                {columns.map((col) => (
                  <td key={col.key}>{row[col.key]}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: 'center' }}>No matching records found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}