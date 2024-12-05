import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react'; // Ensure this package is installed
import axios from 'axios'; // Ensure this package is installed
 
import 'ag-grid-community/styles/ag-grid.css'; // Ensure this file exists
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Ensure this file exists
 
const Staff = () => {
  const [rowData, setRowData] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
 
  const priceRenderer = (params) => {
    return `$${params.value.toFixed(2)}`;
  };
 
  const columnDefs = [
    { headerName: 'Staff ID', field: 'STAFF_ID' },
    { headerName: 'User ID', field: 'STAFF_USER_ID' },
    { headerName: 'Name', field: 'STAFF_NAME' },
    { headerName: 'Contact Number', field: 'CONTACT_NUMBER' },
    { headerName: 'Role', field: 'STAFF_ROLE', rowGroup: true },
    { headerName: 'Date of Joining', field: 'DATE_OF_JOINING', filter: 'agDateColumnFilter' },
    { headerName: 'Monthly Salary', field: 'MONTHLY_SALARY', cellRenderer: priceRenderer },
    { headerName: 'Father/Husband Name', field: 'FATHER_HUSBAND_NAME' },
    { headerName: 'Gender', field: 'GENDER' },
    { headerName: 'Experience', field: 'EXPERIENCE' },
    { headerName: 'Aadhar ID', field: 'ADHAR_ID' },
    { headerName: 'Religion', field: 'RELIGION' },
    { headerName: 'Email', field: 'EMAIL' },
    { headerName: 'Education', field: 'EDUCATION' },
    { headerName: 'Blood Group', field: 'BLOOD_GROUP' },
    { headerName: 'Date of Birth', field: 'DATE_OF_BIRTH', filter: 'agDateColumnFilter' },
    { headerName: 'Address', field: 'ADDRESS' },
    { headerName: 'City', field: 'CITY' },
    { headerName: 'State', field: 'STATE' },
    { headerName: 'Postal Code', field: 'POSTAL_CODE' },
    { headerName: 'Exit Date', field: 'EXIT_DATE', filter: 'agDateColumnFilter' },
    { headerName: 'Is Active', field: 'IS_ACTIVE' },
    { headerName: 'Administrator Username', field: 'ADMINISTRATOR_USERNAME' }
  ];
 
  useEffect(() => {
    axios.get('http://13.127.57.224:2081/api/Staff_Profile')
      .then(response => {
        setRowData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);
 
  const onGridReady = (params) => {
    setGridApi(params.api);
    const savedState = JSON.parse(localStorage.getItem('gridState'));
    if (savedState) {
      params.api.setFilterModel(savedState.filterModel);
      params.api.setSortModel(savedState.sortModel);
    }
  };
 
  const onSortChanged = (event) => {
    localStorage.setItem('gridState', JSON.stringify({
      sortModel: event.api.getSortModel(),
      filterModel: event.api.getFilterModel()
    }));
  };
 
  const onFilterChanged = (event) => {
    localStorage.setItem('gridState', JSON.stringify({
      sortModel: event.api.getSortModel(),
      filterModel: event.api.getFilterModel()
    }));
  };
 
  const handleExport = () => {
    gridApi.exportDataAsExcel();
  };
 
  const handleDelete = () => {
    // Implement deletion logic
    console.log('Selected rows:', selectedRows);
  };
 
  return (
    <div>
      <button onClick={handleExport}>Export to Excel</button>
      <button onClick={handleDelete}>Delete Selected</button>
      <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          domLayout='autoHeight'
          pagination={true}
          paginationPageSize={10}
          filter={true}
          rowSelection="multiple"
          onSelectionChanged={(event) => {
            const selectedNodes = event.api.getSelectedNodes();
            const selectedData = selectedNodes.map(node => node.data);
            setSelectedRows(selectedData);
          }}
          onSortChanged={onSortChanged}
          onFilterChanged={onFilterChanged}
          onGridReady={onGridReady}
        />
      </div>
    </div>
  );
};
 
export default Staff;