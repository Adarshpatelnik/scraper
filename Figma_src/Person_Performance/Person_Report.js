 



import React, { useContext } from 'react'; 
import { DataContext } from './Person_Filter'; // Import DataContext
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import PersonPiecharts from './Person_Piechart'; // Import your chart component

const ClaimReport = () => {
  const { chartData } = useContext(DataContext); // Access chartData from context

  // Define column definitions for AG Grid
  const columnsDefinition = [
    { headerName: "Person ID", field: "Person ID", filter: true, sortable: true },
    { headerName: "Action Type", field: "Action Type", filter: true, sortable: true },
    { headerName: "Task Date", field: "Task Date", sortable: true },
    { headerName: "Person Role", field: "Person Role", sortable: true },
    { headerName: "Transaction Type", field: "Transaction Type", sortable: true },
    { headerName: "User Level Code", field: "User Level Code", sortable: true },
    { headerName: "Policy/Quote No", field: "Policy/Quote No", sortable: true },
    { headerName: "Created Date", field: "Created Date", sortable: true },
    { headerName: "Updated Date", field: "Updated Date", sortable: true }
  ];

  return (
    <div>
      <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
        <AgGridReact
          rowData={chartData} // Use chartData from context
          columnDefs={columnsDefinition}
        />
      </div>
      <div style={{ marginTop: '20px' }}>
        <PersonPiecharts data={chartData} /> {/* Render your chart component */}
      </div>
    </div>
  );
};

export default ClaimReport;
