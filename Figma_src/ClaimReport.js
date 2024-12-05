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
  margin-left: 21vh;
  margin-top: -11vh;
  width: 90%;
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
  background-color: #007bff; /* Primary color */
  color: white;
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #0056b3; /* Darker shade */
  }

  i {
    margin-right: 8px;
  }
`;

const ClaimReport = () => {
  const [rowData, setRowData] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const [totalData, setTotalData] = useState({
    totalPolicyNumber: 0,
    totalClaimNumber: 0,
    totalPaymentAmount: 0
  });

  const priceRenderer = (params) => {
    return `$${params.value.toFixed(2)}`;
  };

  const columnDefs = [
    { headerCheckboxSelection: true, checkboxSelection: true, width: 50 },
    { headerName: 'Policy Number', field: 'Policy Number', filter: true, floatingFilter: true },
    { headerName: 'Claim Number', field: 'Claim Number', filter: true, floatingFilter: true },
    { headerName: 'Claim Payment Category', field: 'Claim Payment Category', filter: true, floatingFilter: true },
    { headerName: 'Loss Date', field: 'Loss Date', filter: 'agDateColumnFilter', floatingFilter: true },
    { headerName: 'Notice Of Loss Date', field: 'NoticeOfLossDate', filter: 'agDateColumnFilter', floatingFilter: true },
    { headerName: 'Payment Type', field: 'Payment Type', filter: true, floatingFilter: true },
    { headerName: 'Payment Amount', field: 'Payment Amount', cellRenderer: priceRenderer, filter: true, floatingFilter: true },
    { headerName: 'Payment Date', field: 'Payment Date', filter: 'agDateColumnFilter', floatingFilter: true },
    { headerName: 'Status', field: 'Status', filter: true, floatingFilter: true },
    { headerName: 'Payee1', field: 'Payee1', filter: true, floatingFilter: true },
    { headerName: 'Payee2', field: 'Payee2', filter: true, floatingFilter: true },
    { headerName: 'Address1', field: 'Address1', filter: true, floatingFilter: true },
    { headerName: 'Address2', field: 'Address2', filter: true, floatingFilter: true },
    { headerName: 'City', field: 'City', filter: true, floatingFilter: true },
    { headerName: 'State', field: 'State', filter: true, floatingFilter: true },
    { headerName: 'Postal Code', field: 'Postal Code', filter: true, floatingFilter: true },
    { headerName: 'Created Date', field: 'Created Date', filter: 'agDateColumnFilter', floatingFilter: true },
    { headerName: 'Created By', field: 'Created By', filter: true, floatingFilter: true },
    { headerName: 'Updated Date', field: 'Updated Date', filter: 'agDateColumnFilter', floatingFilter: true },
    { headerName: 'Updated By', field: 'Updated By', filter: true, floatingFilter: true }
  ];

  useEffect(() => {
    fetch('/data.json')
      .then(response => response.json())
      .then(data => {
        if (data.status) {
          setRowData(data.data.values);
          calculateTotals(data.data.values);
        } else {
          console.error('Error: Data fetch unsuccessful');
        }
      })
      .catch(error => console.error('Error loading JSON data:', error));
  }, []);

  const calculateTotals = (data) => {
    const totalPolicyNumber = data.length;
    const totalClaimNumber = data.length;
    const totalPaymentAmount = data.reduce((sum, row) => sum + row['Payment Amount'], 0);

    setTotalData({
      totalPolicyNumber,
      totalClaimNumber,
      totalPaymentAmount
    });
  };

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
      <TotalRow>
        <div>Total Policy Number: {totalData.totalPolicyNumber}</div>
        <div>Total Claim Number: {totalData.totalClaimNumber}</div>
        <div>Total Payment Amount: ${totalData.totalPaymentAmount.toFixed(2)}</div>
      </TotalRow>
    </Container>
  );
};

export default ClaimReport;
