
import React, { useState, useEffect } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AgGridReact } from 'ag-grid-react';
import Papa from 'papaparse';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';
import 'bootstrap-icons/font/bootstrap-icons.css';
import styled from 'styled-components';

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

const DataReport = () => {
  const [rowData, setRowData] = useState([]);
  const [gridApi, setGridApi] = useState(null);

  useEffect(() => {
    fetch('/data.json')
      .then(response => response.json())
      .then(data => {
        setRowData(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const columnDefs = [
    { headerCheckboxSelection: true, checkboxSelection: true, width: 50 },
    { headerName: 'Claim No', field: 'Claim No', filter: true, floatingFilter: true },
    { headerName: 'Policy ID', field: 'Policy ID', filter: true, floatingFilter: true },
    { headerName: 'Date Of Loss', field: 'Date Of Loss', filter: 'agDateColumnFilter', floatingFilter: true },
    { headerName: 'Insured Name', field: 'Insured Name', filter: true, floatingFilter: true },
    { headerName: 'Agency Name', field: 'Agency Name', filter: true, floatingFilter: true },
    { headerName: 'Reported By Relation Code', field: 'Reported By Relation Code', filter: true, floatingFilter: true },
    { headerName: 'Loss Type Code', field: 'Loss Type Code', filter: true, floatingFilter: true },
    { headerName: 'Date Allocated', field: 'Date Allocated', filter: 'agDateColumnFilter', floatingFilter: true },
    { headerName: 'Date First Visited', field: 'Date First Visited', filter: 'agDateColumnFilter', floatingFilter: true },
    { headerName: 'Approval Status Code', field: 'Approval Status Code', filter: true, floatingFilter: true },
    { headerName: 'Comment', field: 'Comment', filter: true, floatingFilter: true },
    { headerName: 'Claim Status Code', field: 'Claim Status Code', filter: true, floatingFilter: true },
    { headerName: 'Claim Substatus Code', field: 'Claim Substatus Code', filter: true, floatingFilter: true },
    { headerName: 'Date Close', field: 'Date Close', filter: 'agDateColumnFilter', floatingFilter: true },
    { headerName: 'Attorney Involved YN', field: 'Attorney Involved YN', filter: true, floatingFilter: true },
    { headerName: 'PA Involved YN', field: 'PA Involved YN', filter: true, floatingFilter: true },
    { headerName: 'DFS Complain YN', field: 'DFS Complain YN', filter: true, floatingFilter: true },
    { headerName: 'Catastrophe YN', field: 'Catastrophe YN', filter: true, floatingFilter: true },
    { headerName: 'Event Name', field: 'Event Name', filter: true, floatingFilter: true },
    { headerName: 'Primary Attory Assign Date', field: 'Primary Attory Assign Date', filter: 'agDateColumnFilter', floatingFilter: true },
    { headerName: 'Co Attory Assign Date', field: 'Co Attory Assign Date', filter: 'agDateColumnFilter', floatingFilter: true },
    { headerName: 'County Code', field: 'County Code', filter: true, floatingFilter: true },
    { headerName: 'Remarks', field: 'Remarks', filter: true, floatingFilter: true },
    { headerName: 'BLDGReserve', field: 'BLDGReserve', valueFormatter: params => `$${params.value.toFixed(2)}`, filter: true, floatingFilter: true },
    { headerName: 'CONTReserve', field: 'CONTReserve', valueFormatter: params => `$${params.value.toFixed(2)}`, filter: true, floatingFilter: true },
    { headerName: 'ICCReserve', field: 'ICCReserve', valueFormatter: params => `$${params.value.toFixed(2)}`, filter: true, floatingFilter: true },
    { headerName: 'TotalBLDGPayment', field: 'TotalBLDGPayment', valueFormatter: params => `$${params.value.toFixed(2)}`, filter: true, floatingFilter: true },
    { headerName: 'TotalCONTPayment', field: 'TotalCONTPayment', valueFormatter: params => `$${params.value.toFixed(2)}`, filter: true, floatingFilter: true },
    { headerName: 'TotalICCReserve', field: 'TotalICCReserve', valueFormatter: params => `$${params.value.toFixed(2)}`, filter: true, floatingFilter: true },
  ];

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const downloadCSV = () => {
    const csv = Papa.unparse(rowData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'data_report.csv';
    link.click();
  };

  const printData = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Print Data</title>');
    printWindow.document.write('</head><body>');
    printWindow.document.write('<h1>Data Report</h1>');
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
      // Restore the original width
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

      pdf.save('data_report.pdf');
    });
  };

  return (
    <Container>
      <ButtonContainer>
        <Button onClick={downloadCSV}>
          <i className="bi bi-file-earmark-spreadsheet"></i>  CSV
        </Button>
        <Button onClick={handlePdfExport}>
          <i className="bi bi-file-earmark-pdf"></i>  PDF
        </Button>
        <Button onClick={printData}>
          <i className="bi bi-printer"></i> Print
        </Button>
      </ButtonContainer>
      <GridContainer className="ag-theme-alpine">
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowData}
          onGridReady={onGridReady}
          pagination={true}
          paginationPageSize={10}
        />
      </GridContainer>
    </Container>
  );
};

export default DataReport;

