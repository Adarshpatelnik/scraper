import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import styled from 'styled-components';
import Papa from 'papaparse';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';
 
// Ensure Bootstrap Icons are imported
import 'bootstrap-icons/font/bootstrap-icons.css';
 
// Styled Components
const Container = styled.div`
  margin-top: 1vh;
  width: 100%;
  padding: 0;
`;
 
const GridContainer = styled.div`
  height: 600px;
  width: 100%;
`;
 
const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #f0f0f0;
  font-weight: bold;
`;
 
const ButtonContainer = styled.div`
  display: flex;
  gap: 10px; /* Adds space between buttons */
  margin-bottom: 10px;
`;
 
const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  background-color: #2e4053; /* Primary color */
  color: white;
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
 
  &:hover {
    background-color: #2e4053; /* Darker shade */
  }
 
  i {
    margin-right: 8px;
  }
`;
 
const PolicyReport = () => {
  const [rowData, setRowData] = useState([]);
  const [gridApi, setGridApi] = useState(null);
   
  const priceRenderer = (params) => {
    return `$${params.value.toFixed(2)}`;
  };
  
    const columnDefs = [
      { headerCheckboxSelection: true, checkboxSelection: true, width: 50 },
      { headerName: 'Producer ID', field: 'Producer ID', filter: true, floatingFilter: true },
      { headerName: 'Agent Flood Code', field: 'Agent Flood Code', filter: true, floatingFilter: true },
      { headerName: 'Agency ID', field: 'Agency ID', filter: true, floatingFilter: true },
      { headerName: 'Settlement Code', field: 'Settlement Code', filter: true, floatingFilter: true },
      { headerName: 'WYO ID', field: 'WYO ID', filter: true, floatingFilter: true },
      { headerName: 'Siaa Indicator', field: 'Siaa Indicator', filter: true, floatingFilter: true },
      { headerName: 'Agent UPN', field: 'Agent UPN', filter: true, floatingFilter: true },
      { headerName: 'Agency UPN', field: 'Agency UPN', filter: true, floatingFilter: true },
      { headerName: 'Agent NPN', field: 'Agent NPN', filter: true, floatingFilter: true },
      { headerName: 'Agency NPN', field: 'Agency NPN', filter: true, floatingFilter: true },
      { headerName: 'Policy Number', field: 'Policy Number', filter: true, floatingFilter: true },
      { headerName: 'Policy Form', field: 'Policy Form', filter: true, floatingFilter: true },
      { headerName: 'Policy Type', field: 'Policy Type', filter: true, floatingFilter: true },
      { headerName: 'Policy Effective Date', field: 'Policy Effective Date', filter: 'agDateColumnFilter', floatingFilter: true },
      { headerName: 'Policy Expiration Date', field: 'Policy Expiration Date', filter: 'agDateColumnFilter', floatingFilter: true },
      { headerName: 'Transaction Date', field: 'Transaction Date', filter: 'agDateColumnFilter', floatingFilter: true },
      { headerName: 'Trans Written Premium', field: 'Trans Written Premium', filter: true, floatingFilter: true },
      { headerName: 'Federal Policy Fee', field: 'Federal Policy Fee', cellRenderer: priceRenderer, filter: true, floatingFilter: true },
      { headerName: 'HFIAA Surcharge', field: 'HFIAA Surcharge', cellRenderer: priceRenderer, filter: true, floatingFilter: true },
      { headerName: 'Reserve Assessment Fund', field: 'Reserve Assessment Fund', cellRenderer: priceRenderer, filter: true, floatingFilter: true },
      { headerName: 'Transaction Type', field: 'Transaction Type', filter: true, floatingFilter: true },
      { headerName: 'Cancel Reason', field: 'Cancel Reason', filter: true, floatingFilter: true },
      { headerName: 'Cancel Description', field: 'Cancel Description', filter: true, floatingFilter: true },
      { headerName: 'Endorsement Effective Date', field: 'Endorsement Effective Date', filter: 'agDateColumnFilter', floatingFilter: true },
      { headerName: 'Property Address1', field: 'Property Address1', filter: true, floatingFilter: true },
      { headerName: 'Property Address2', field: 'Property Address2', filter: true, floatingFilter: true },
      { headerName: 'Property City', field: 'Property City', filter: true, floatingFilter: true },
      { headerName: 'Property State', field: 'Property State', filter: true, floatingFilter: true },
      { headerName: 'Property Zip', field: 'Property Zip', filter: true, floatingFilter: true },
      { headerName: 'Property County', field: 'Property County', filter: true, floatingFilter: true },
      { headerName: 'Flood Zone', field: 'Flood Zone', filter: true, floatingFilter: true },
      { headerName: 'First Insured Name', field: 'First Insured Name', filter: true, floatingFilter: true },
      { headerName: 'Second Insured Name', field: 'Second Insured Name', filter: true, floatingFilter: true },
      { headerName: 'Property Type', field: 'Property Type', filter: true, floatingFilter: true },
      { headerName: 'Occupancy Type', field: 'Occupancy Type', filter: true, floatingFilter: true },
      { headerName: 'Condo Type', field: 'Condo Type', filter: true, floatingFilter: true },
      { headerName: '# of Units', field: '# of Units', filter: true, floatingFilter: true },
      { headerName: 'Producer Name', field: 'Producer Name', filter: true, floatingFilter: true },
      { headerName: 'Producer State', field: 'Producer State', filter: true, floatingFilter: true },
      { headerName: 'Agency Name', field: 'Agency Name', filter: true, floatingFilter: true },
      { headerName: 'Agency State', field: 'Agency State', filter: true, floatingFilter: true },
      { headerName: 'Agency Zip', field: 'Agency Zip', filter: true, floatingFilter: true },
      { headerName: 'Payor', field: 'Payor', filter: true, floatingFilter: true },
      { headerName: 'Payment Method', field: 'Payment Method', filter: true, floatingFilter: true },
      { headerName: 'Elevation Certificate', field: 'Elevation Certificate', filter: true, floatingFilter: true },
      { headerName: 'Agent Sign Date', field: 'Agent Sign Date', filter: 'agDateColumnFilter', floatingFilter: true },
      { headerName: 'New Renew Rollover', field: 'New Renew Rollover', filter: true, floatingFilter: true },
      { headerName: 'Rollover', field: 'Rollover', filter: true, floatingFilter: true },
      { headerName: 'Condo Yes', field: 'Condo Yes', filter: true, floatingFilter: true },
      { headerName: 'Primary Res Ind', field: 'Primary Res Ind', filter: true, floatingFilter: true }
  ];
  
  useEffect(() => {
    fetch('/Policy_Transaction_Report.json')
      .then(response => response.json())
      .then(data => {
        if (data.status) {
          setRowData(data.data.values);
     
        } else {
          console.error('Error: Data fetch unsuccessful');
        }
      })
      .catch(error => console.error('Error loading JSON data:', error));
  }, []);
 
 
 
  const onGridReady = (params) => {
    setGridApi(params.api);
  };
 
  const downloadCSV = () => {
    const csv = Papa.unparse(rowData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'claim_report.csv';
    link.click();
  };
 
  const printData = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Print Data</title>');
    printWindow.document.write('</head><body >');
    printWindow.document.write('<h1>Claim Report</h1>');
    printWindow.document.write('<table border="1" style="width:100%; border-collapse: collapse;">');
    printWindow.document.write('<thead><tr>');
    columnDefs.forEach(col => {
      printWindow.document.write(`<th>${col.headerName}</th>`);
    });
    printWindow.document.write('</tr></thead><tbody>');
    rowData.forEach(row => {
      printWindow.document.write('<tr>');
      columnDefs.forEach(col => {
        printWindow.document.write(`<td>${row[col.field] || ''}</td>`);
      });
      printWindow.document.write('</tr>');
    });
    printWindow.document.write('</tbody></table>');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };
 
  const handlePdfExport = () => {
    const gridElement = document.querySelector('.ag-theme-alpine');
 
    const originalWidth = gridElement.style.width;
    gridElement.style.width = `${gridElement.scrollWidth}px`;
 
    html2canvas(gridElement, {
      scrollX: 0,
      scrollY: -window.scrollY,
      width: gridElement.scrollWidth,
      height: gridElement.scrollHeight,
      useCORS: true,
      scale: 2 
    }).then(canvas => {
      gridElement.style.width = originalWidth;
 
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;
 
      let position = 0;
 
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
 
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
 
      pdf.save('claim_report.pdf');
    });
  };
 
  return (
    <Container>
      <ButtonContainer>
        <Button onClick={downloadCSV}>
          <i className="bi bi-file-earmark-csv"></i>
          <i className="bi bi-download"></i>  CSV
        </Button>
        <Button onClick={handlePdfExport}>
          <i className="bi bi-file-earmark-pdf"></i> PDF
        </Button>
        <Button onClick={printData}>
          <i className="bi bi-printer"></i> Print
        </Button>
      </ButtonContainer>
      <GridContainer className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          rowSelection="multiple"
          onGridReady={onGridReady}
        />
      </GridContainer>
     
    </Container>
  );
};
 
export default PolicyReport;