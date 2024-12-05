import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const PolicyTable = () => {
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([]);

  useEffect(() => {
    fetch('/policy_expiration 2.json')
      .then(response => response.json())
      .then(data => {
        if (data.status) {
          setRowData(data.data.values);
          const columns = data.data.columns_definition.map(col => ({
            headerName: col.headerName,
            field: col.field,
            filter: col.filter,
            sortable: col.sortable,
            hide: col.hide
          }));
          setColumnDefs(columns);
        } else {
          console.error('Error: Data fetch unsuccessful');
        }
      })
      .catch(error => console.error('Error loading JSON data:', error));
  }, []);

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={10}
      />
    </div>
  );
};

export default PolicyTable;
