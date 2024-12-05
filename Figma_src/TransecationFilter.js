


import React, { useState, useEffect, createContext } from 'react';
import TransactionChart from './TransactionChart';
import TransactionPiechart from './TransactionPiechart';

export const DataContext = createContext();

const formatNumber = (number) => {
  return new Intl.NumberFormat().format(number);
};

const TransecationFilter = () => {
  const [chartData, setChartData] = useState([]);
  const [totalBeforeFilter, setTotalBeforeFilter] = useState({ totalCount: 0, totalWrittenPremium: 0 });
  const [totalAfterFilter, setTotalAfterFilter] = useState({ totalCount: 0, totalWrittenPremium: 0 });
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [policyNumber, setPolicyNumber] = useState('');
  const [agencyId, setAgencyId] = useState('');
  const [wyoId, setWyoId] = useState('');

  useEffect(() => {
    fetch('/Policy_Transaction_Report.json')
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          const dataBeforeFilter = data.data.values;
          const totalBefore = calculateTotals(dataBeforeFilter);
          setTotalBeforeFilter(totalBefore);

          const filteredData = filterData(dataBeforeFilter);
          const totalAfter = calculateTotals(filteredData);
          setTotalAfterFilter(totalAfter);
          setChartData(filteredData);
        } else {
          console.error('Error: Data fetch unsuccessful');
        }
      })
      .catch((error) => console.error('Error loading JSON data:', error));
  }, [startDate, endDate, policyNumber, agencyId, wyoId]);

  const filterData = (data) => {
    return data.filter((row) => {
      const date = new Date(row['Policy Effective Date']);
      const policyMatch = !policyNumber || row['Policy Number'].includes(policyNumber);
      const agencyMatch = !agencyId || row['Agency ID'].includes(agencyId);
      const wyoMatch = !wyoId || row['WYO ID'].includes(wyoId);
      const dateMatch =
        (!startDate || date >= new Date(startDate)) &&
        (!endDate || date <= new Date(endDate));

      return policyMatch && agencyMatch && wyoMatch && dateMatch;
    });
  };

  const calculateTotals = (data) => {
    const totalCount = data.length;
    const totalWrittenPremium = data.reduce((sum, row) => sum + (parseFloat(row['Trans Written Premium']) || 0), 0);
    return { totalCount, totalWrittenPremium };
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
            <div style={styles.totalCard}>
              <h3 style={styles.cardTitle}>Total Policies</h3>
              <p style={styles.cardContent}>{formatNumber(totalAfterFilter.totalCount)}</p>
            </div>
            <div style={styles.totalCard}>
              <h3 style={styles.cardTitle}>Total Written Premium</h3>
              <p style={styles.cardContent}>${formatNumber(totalAfterFilter.totalWrittenPremium)}</p>
            </div>
          </div>
          <div style={styles.chartContainer}>
            <div style={styles.chartLarge}>
              <TransactionChart data={chartData} />
            </div>
            <div style={styles.chartSmall}>
              <TransactionPiechart data={chartData} />
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
    width: '15%', 
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
  totalCardContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: '10px',
    marginBottom: '10px',
  },
  totalCard: {
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
    color: '#ecf0f1',
    letterSpacing: '1.2px',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)', 
    position: 'relative',
    paddingBottom: '5px',
    borderBottom: '1px solid #ecf0f1',
  },
  cardContent: {
    fontSize: '24px', 
    fontWeight: 'bold',
    color: '#283747',
  },
  mainContent: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  cardsContainer: {
    display: 'flex',
    justifyContent: 'center', 
    gap: '20px', 
    marginBottom: '20px', 
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

export default TransecationFilter;


