import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'jspdf-autotable';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Dashboard = () => {
    const [rowData, setRowData] = useState([]);
    const [gridApi, setGridApi] = useState(null);
    const [totalData, setTotalData] = useState({
        totalPolicyNumber: 0,
        totalClaimNumber: 0,
        totalPaymentAmount: 0,
    });

    const priceRenderer = (params) => {
        return `$${params.value.toFixed(2)}`;
    };

    const columnDefs = [
        { headerName: 'Policy Number', field: 'Policy Number', },
        { headerName: 'NFIP Policy Number', field: 'NFIP Policy Number', },
        { headerName: 'Report Date', field: 'Report Date', },
        { headerName: 'Effective Date', field: 'Effective Date', },
        { headerName: 'Expiration Date', field: 'Expiration Date', },
        { headerName: 'Transaction Date', field: 'Transaction Date', },
        { headerName: 'Days Expired', field: 'Days Expired', },
        { headerName: 'Inception Date', field: 'Inception Date', },
        { headerName: 'Written Premium', field: 'Written Premium', cellRenderer: priceRenderer, },
        { headerName: 'Reserve Assessment Fund', field: 'Reserve Assessment Fund', cellRenderer: priceRenderer, },
        { headerName: 'HFIAA Surcharge', field: 'HFIAA Surcharge', cellRenderer: priceRenderer, },
        { headerName: 'Federal Policy Fee', field: 'Federal Policy Fee', cellRenderer: priceRenderer, },
        { headerName: 'Insured Name1', field: 'Insured Name1', },
        { headerName: 'Insured Address1', field: 'Insured Address1', },
        { headerName: 'Insured Address2', field: 'Insured Address2', },
        { headerName: 'Insured City', field: 'Insured City', },
        { headerName: 'Insured State', field: 'Insured State', },
        { headerName: 'Insured Zip', field: 'Insured Zip', },
        { headerName: 'Property Address1', field: 'Property Address1', },
        { headerName: 'Property Address2', field: 'Property Address2', },
        { headerName: 'Property City', field: 'Property City', },
        { headerName: 'Property State', field: 'Property State', },
        { headerName: 'Property Zip', field: 'Property Zip', },
        { headerName: 'Property County', field: 'Property County', },
        { headerName: 'Agency ID', field: 'Agency ID', },
        { headerName: 'Agency Name', field: 'Agency Name', },
        { headerName: 'Agency Address1', field: 'Agency Address1', },
        { headerName: 'Agency Address2', field: 'Agency Address2', },
        { headerName: 'Agency City', field: 'Agency City', },
        { headerName: 'Agency State', field: 'Agency State', },
        { headerName: 'Agency Zip', field: 'Agency Zip', },
        { headerName: 'Agency County', field: 'Agency County', },
        { headerName: 'Producer ID', field: 'Producer ID', },
        { headerName: 'Producer Name', field: 'Producer Name', },
        { headerName: 'Agent UPN', field: 'Agent UPN', },
        { headerName: 'WYO ID', field: 'WYO ID', },
        { headerName: 'Producer Address1', field: 'Producer Address1', },
        { headerName: 'Producer Address2', field: 'Producer Address2', },
        { headerName: 'Producer City', field: 'Producer City', },
        { headerName: 'Producer State', field: 'Producer State', },
        { headerName: 'Producer Zip', field: 'Producer Zip', },
        { headerName: 'Producer County', field: 'Producer County', },
        { headerName: 'Payor', field: 'Payor', },
        { headerName: 'Payor Name1', field: 'Payor Name1', },
        { headerName: 'Payor Address1', field: 'Payor Address1', },
        { headerName: 'Payor Address2', field: 'Payor Address2', },
        { headerName: 'Payor City', field: 'Payor City', },
        { headerName: 'Payor State', field: 'Payor State', },
        { headerName: 'Payor Zip', field: 'Payor Zip', },
    ];

    useEffect(() => {
        fetch('/policy.json')
            .then((response) => response.json())
            .then((data) => {
                if (data.status) {
                    setRowData(data.data.values);
                    calculateTotals(data.data.values);
                } else {
                    console.error('Error: Data fetch unsuccessful');
                }
            })
            .catch((error) => console.error('Error loading JSON data:', error));
    }, []);

    const calculateTotals = (data) => {
        const totalPolicyNumber = data.length;
        const totalClaimNumber = data.length;
        const totalPaymentAmount = data.reduce((sum, row) => sum + row['Payment Amount'], 0);

        setTotalData({
            totalPolicyNumber,
            totalClaimNumber,
            totalPaymentAmount,
        });
    };

    const onGridReady = (params) => {
        setGridApi(params.api);
    };

    const headerStyle = {
      backgroundColor: '#000000',
      color: '#ecf0f1',
      fontWeight: 'bold',
      fontSize: '12px', 
      padding: '4px', 
  };
  
  
  const rowStyle = {
      fontSize: '12px', 
      color: 'blue', 
      padding: '4px', 
  };
  
  const evenRowStyle = {
      backgroundColor: '#ecf0f1', 
  };
  
  const oddRowStyle = {
      backgroundColor: '#ffffff', 
  };
  
  const hoverRowStyle = {
      backgroundColor: '#bdc3c7', 
  };
  

    return (
        <div style={{ padding: '2vh', backgroundColor: '', borderRadius: '10px' }}>
            <div
                className="ag-theme-alpine"
                style={{
                    height: '70vh',
                    width: '100%',
                    backgroundColor: '#34495e',
                    borderRadius: '10px',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                }}
            >
                <AgGridReact
                    columnDefs={columnDefs}
                    rowData={rowData}
                    pagination
                    paginationPageSize={10}
                    rowSelection="multiple"
                    onGridReady={onGridReady}
                    domLayout="autoHeight"
                    animateRows
                    enableRangeSelection
                    headerHeight={45} 
                    getRowStyle={(params) => {
                        return params.node.rowIndex % 2 === 0 ? evenRowStyle : oddRowStyle;
                    }}
                    onRowHovered={(params) => {
                        if (params.node.rowIndex !== undefined) {
                            params.node.setRowStyle(hoverRowStyle);
                        }
                    }}
                    defaultColDef={{
                        headerStyle: headerStyle, 
                        cellStyle: rowStyle, 
                    }}
                />
            </div>
        </div>
    );
};

export default Dashboard;





















