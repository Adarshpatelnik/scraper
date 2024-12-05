import React, { useContext } from 'react';
import { DataContext } from './PersonFilter';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const TopTenReport = () => {
  const { chartData } = useContext(DataContext);

  // Group by Person ID and count occurrences
  const counts = chartData.reduce((acc, item) => {
    acc[item['Person ID']] = (acc[item['Person ID']] || 0) + 1;
    return acc;
  }, {});

  // Convert to array and sort by count
  const sortedCounts = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10); // Get top 10

  // Get top 10 Person Name and Transaction Type
  const topTen = sortedCounts.map(([personId, count]) => {
    const personData = chartData.find(item => item['Person ID'] === personId);
    return {
      personId,
      personName: personData ? personData['Person Name'] : 'Unknown',
      transactionType: personData ? personData['Transaction Type'] : 'Unknown',
      count
    };
  });

  // Define column definitions for AG Grid
  const columnDefs = [
    { headerName: 'Person ID', field: 'personId', sortable: true, filter: true },
    { headerName: 'Person Name', field: 'personName', sortable: true, filter: true },
    { headerName: 'Transaction Type', field: 'transactionType', sortable: true, filter: true },
    { headerName: 'Count', field: 'count', sortable: true, filter: true }
  ];

  return (
    <div style={styles.container}>
      <h2>Top 10 Person Records</h2>
      <div className="ag-theme-alpine" style={styles.grid}>
        <AgGridReact
          rowData={topTen}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
          domLayout='autoHeight'
        />
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
  },
  grid: {
    height: '100%',
    width: '100%',
    marginTop: '20px',
  },
};

export default TopTenReport;
