import React, { useState, useEffect, createContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Datachart from './Datachart';
import DataPaichart from './Datapaichart';

// Create a context to share the filtered data
export const DataContext = createContext();

// Card Component
const Card = ({ title, content, style }) => (
  <div style={{ ...styles.card, ...style }}>
    <h3 style={styles.cardTitle}>{title}</h3>
    <div style={styles.cardContent}>{content}</div>
  </div>
);

const DataFilter = () => {
  const [chartData, setChartData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [policyNumber, setPolicyNumber] = useState('');
  const [agencyId, setAgencyId] = useState('');
  const [wyoId, setWyoId] = useState('');
  const [setTotalPolicies] = useState(0);
  const [ setTotalWrittenPremium] = useState(0);

  const [ setRowData] = useState([]);
  const [totals, setTotals] = useState({
    BLDGReserve: 0,
    CONTReserve: 0,
    ICCReserve: 0,
    TotalBLDGPayment: 0,
    TotalCONTPayment: 0,
    TotalICCReserve: 0,
  });

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          const filteredData = filterData(data.data.values);
          setChartData(filteredData);
          calculateSummary(filteredData);

          setRowData(data.data.values); // Update rowData state with the data
          const newTotals = data.data.values.reduce(
            (acc, item) => {
              acc.BLDGReserve += item.BLDGReserve || 0;
              acc.CONTReserve += item.CONTReserve || 0;
              acc.ICCReserve += item.ICCReserve || 0;
              acc.TotalBLDGPayment += item.TotalBLDGPayment || 0;
              acc.TotalCONTPayment += item.TotalCONTPayment || 0;
              acc.TotalICCReserve += item.TotalICCReserve || 0;
              return acc;
            },
            {
              BLDGReserve: 0,
              CONTReserve: 0,
              ICCReserve: 0,
              TotalBLDGPayment: 0,
              TotalCONTPayment: 0,
              TotalICCReserve: 0,
            }
          );

          setTotals(newTotals);
        } else {
          console.error('Error: Data fetch unsuccessful');
        }
      })
      .catch((error) => console.error('Error loading JSON data:', error));
  }, [startDate, endDate, policyNumber, agencyId, wyoId]);

  const filterData = (data) => {
    return data.filter((row) => {
      const date = new Date(row['Expiration Date']);
      const policyMatch = !policyNumber || row['Policy Number'].includes(policyNumber);
      const agencyMatch = !agencyId || row['Agency ID'].includes(agencyId);
      const wyoMatch = !wyoId || row['WYO ID'].includes(wyoId);
      const dateMatch =
        (!startDate || date >= new Date(startDate)) &&
        (!endDate || date <= new Date(endDate));

      return policyMatch && agencyMatch && wyoMatch && dateMatch;
    });
  };

  const calculateSummary = (data) => {
    const totalPolicies = data.length;
    const totalWrittenPremium = data.reduce((sum, row) => sum + parseFloat(row['Written Premium'] || 0), 0);

    setTotalPolicies(totalPolicies);
    setTotalWrittenPremium(totalWrittenPremium.toFixed(2));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'startDate') {
      setStartDate(value);
    } else if (name === 'endDate') {
      setEndDate(value);
    } else if (name === 'policyNumber') {
      setPolicyNumber(value);
    } else if (name === 'agencyId') {
      setAgencyId(value);
    } else if (name === 'wyoId') {
      setWyoId(value);
    }
  };

  const clearFilter = () => {
    setStartDate('');
    setEndDate('');
    setPolicyNumber('');
    setAgencyId('');
    setWyoId('');
  };

  // Function to format numbers in USA format
  const formatNumber = (number) => {
    return new Intl.NumberFormat('en-US').format(number);
  };

  return (
    <DataContext.Provider value={{ chartData }}>
      <div style={styles.container}>
        <div style={styles.filterContainer}>
          <div style={styles.filterItem}>
            <label style={styles.label}>Policy Number:</label>
            <input
              type="text"
              name="policyNumber"
              value={policyNumber}
              onChange={handleInputChange}
              style={styles.input}
            />
          </div>
          <div style={styles.filterItem}>
            <label style={styles.label}>Agency ID:</label>
            <input
              type="text"
              name="agencyId"
              value={agencyId}
              onChange={handleInputChange}
              style={styles.input}
            />
          </div>
          <div style={styles.filterItem}>
            <label style={styles.label}>WYO ID:</label>
            <input
              type="text"
              name="wyoId"
              value={wyoId}
              onChange={handleInputChange}
              style={styles.input}
            />
          </div>
          <div style={styles.filterItem}>
            <label style={styles.label}>Start Date:</label>
            <input
              type="date"
              name="startDate"
              value={startDate}
              onChange={handleInputChange}
              style={styles.input}
            />
          </div>
          <div style={styles.filterItem}>
            <label style={styles.label}>End Date:</label>
            <input
              type="date"
              name="endDate"
              value={endDate}
              onChange={handleInputChange}
              style={styles.input}
            />
          </div>
          <button onClick={clearFilter} style={styles.clearButton}>
            Clear Filter
          </button>
        </div>
        <div style={styles.mainContent}>
          <div style={styles.cardsContainer}>
          
            <Card
              title="Total BLDG Reserve"
              content={`$${totals.BLDGReserve.toFixed(2)}`}
              style={styles.cardStyle}
            />
            <Card
              title="Total Content Reserve"
              content={`$${totals.CONTReserve.toFixed(2)}`}
              style={styles.cardStyle}
            />
            <Card
              title="Total ICC Reserve"
              content={`$${totals.ICCReserve.toFixed(2)}`}
              style={styles.cardStyle}
            />
            <Card
              title="Total Building Payment"
              content={`$${totals.TotalBLDGPayment.toFixed(2)}`}
              style={styles.cardStyle}
            />
          </div>

          <div style={styles.chartContainer}>
            <div style={styles.chartLarge}>
              <Datachart data={chartData} />
            </div>
            <div style={styles.chartSmall}>
              <DataPaichart data={chartData} />
            </div>
          </div>
        </div>
      </div>
    </DataContext.Provider>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    padding: '5px',
    boxSizing: 'border-box',
  },
  filterContainer: {
    width: '13%', 
    padding: '10px', 
    marginRight: '10px',
    borderRadius: '10px',
    border: '2px solid white',
    boxSizing: 'border-box',
    height: 'auto', 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  filterItem: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '10px',
    width: '100%', 
  },
  label: {
    color: 'black',
    fontSize: '14px',
    marginBottom: '5px',
  },
  input: {
    width: '90%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    color: 'black',
  },
  clearButton: {
    marginTop: '10px', 
    padding: '10px 15px',
    backgroundColor: '#e74c3c',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    alignSelf: 'flex-start',
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  
  card: {
    flex: 1,
    maxWidth: '30%', 
    backgroundColor: '#5d6d7e ', 
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb', 
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    color: '#ffffff', 
  },
  cardTitle: {
    margin: '0 0 5px 0', 
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#e5e7eb', 
    letterSpacing: '1.2px',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)', 
    position: 'relative',
    paddingBottom: '5px',
    borderBottom: '1px solid #e5e7eb', 
  },
  cardContent: {
    fontSize: '24px', 
    fontWeight: 'bold',
    color: '#283747 ', 
  },
  cardsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px', 
  },
  cardStyle: {
  },
  chartContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: '10px',
  },
  chartLarge: {
    flex: 2,
    padding: '10px',
    borderRadius: '10px',
    backgroundColor: '#34495e',
    color: 'white',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  chartSmall: {
    flex: 1,
    padding: '10px',
    borderRadius: '10px',
    backgroundColor: '#34495e',
    color: 'white',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
};

export default DataFilter;
