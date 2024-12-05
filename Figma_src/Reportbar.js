import React, { useState, useEffect } from 'react';
import { AgCharts } from 'ag-charts-react';
import 'bootstrap-icons/font/bootstrap-icons.css';

const PolicyChart = () => {
  const [chartData, setChartData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [policyNumber, setPolicyNumber] = useState('');
  const [agencyId, setAgencyId] = useState('');
  const [totalPolicies, setTotalPolicies] = useState(0);
  const [totalPremiums, setTotalPremiums] = useState(0);

  useEffect(() => {
    fetch('/policy_expiration.json')
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          const filteredData = filterData(data.data.values);
          const processedData = processChartData(filteredData);
          setChartData(processedData);
          calculateTotals(filteredData);
        } else {
          console.error('Error: Data fetch unsuccessful');
        }
      })
      .catch((error) => console.error('Error loading JSON data:', error));
  }, [startDate, endDate, policyNumber, agencyId]);

  const filterData = (data) => {
    return data.filter((row) => {
      const date = new Date(row['Expiration Date']);
      const policyMatch = !policyNumber || row['Policy Number'].includes(policyNumber);
      const agencyMatch = !agencyId || row['Agency ID'].includes(agencyId);
      const dateMatch =
        (!startDate || date >= new Date(startDate)) &&
        (!endDate || date <= new Date(endDate));

      return policyMatch && agencyMatch && dateMatch;
    });
  };

  const processChartData = (data) => {
    const result = {};

    data.forEach((row) => {
      const date = new Date(row['Expiration Date']);
      const month = date.toLocaleString('default', { month: 'short' });
      const year = date.getFullYear();
      const monthYear = `${month} ${year}`;

      if (!result[monthYear]) {
        result[monthYear] = {
          count: 0,
          writtenPremiumSum: 0,
        };
      }
      result[monthYear].count += 1;
      result[monthYear].writtenPremiumSum += parseFloat(row['Written Premium']) || 0;
    });

    return Object.keys(result).map((monthYear) => ({
      MonthYear: monthYear,
      Count: result[monthYear].count,
      WrittenPremiumSum: result[monthYear].writtenPremiumSum,
    }));
  };

  const calculateTotals = (data) => {
    let totalCount = 0;
    let totalSum = 0;

    data.forEach((row) => {
      totalCount += 1;
      totalSum += parseFloat(row['Written Premium']) || 0;
    });

    setTotalPolicies(totalCount);
    setTotalPremiums(totalSum);
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
    }
  };

  const clearFilter = () => {
    setStartDate('');
    setEndDate('');
    setPolicyNumber('');
    setAgencyId('');
  };

  const tooltipRenderer = ({ datum, xKey, yKey }) => ({
    content: `${datum[xKey]}: ${datum[yKey]}`,
  });

  const BAR_AND_LINE = [
    {
      type: 'bar',
      xKey: 'MonthYear',
      yKey: 'Count',
      yName: 'Expired Policy',
      tooltip: {
        renderer: tooltipRenderer,
      },
    },
    {
      type: 'line',
      xKey: 'MonthYear',
      yKey: 'WrittenPremiumSum',
      yName: 'Expired Premium',
      tooltip: {
        renderer: tooltipRenderer,
      },
    },
  ];

  const options = {
    title: {
      text: 'Expired Policy and Expired Premium over time',
      color: '#ffffff',
    },
    background: {
      fill: '#2e4053', 
    },
    data: chartData,
    series: BAR_AND_LINE,
    axes: [
      {
        type: 'category',
        position: 'bottom',
        title: {
          text: 'Month Year',
          color: '#ffffff', 
        },
        label: {
          color: '#ffffff', 
        },
      },
      {
        type: 'number',
        position: 'left',
        keys: ['Count'],
        title: {
          text: 'Expired Policy',
          color: '#ffffff', 
        },
        label: {
          color: '#ffffff', 
        },
      },
      {
        type: 'number',
        position: 'right',
        keys: ['WrittenPremiumSum'],
        title: {
          text: 'Expired Premium',
          color: '#ffffff', 
        },
        label: {
          color: '#ffffff', 
        },
      },
    ],
  };
  
  return (
    <div style={{ marginLeft: '14vh', padding: '7vh', marginTop: '5vh' }}>
      <div style={styles.filterContainer}>
        <label style={styles.label}>
          Start Date:
          <input
            type="date"
            name="startDate"
            value={startDate}
            onChange={handleInputChange}
            style={styles.input}
          />
        </label>
        <label style={styles.label}>
          End Date:
          <input
            type="date"
            name="endDate"
            value={endDate}
            onChange={handleInputChange}
            style={styles.input}
          />
        </label>
        <label style={styles.label}>
          Policy Number:
          <input
            type="text"
            name="policyNumber"
            value={policyNumber}
            onChange={handleInputChange}
            style={styles.input}
          />
        </label>
        <label style={styles.label}>
          Agency ID:
          <input
            type="text"
            name="agencyId"
            value={agencyId}
            onChange={handleInputChange}
            style={styles.input}
          />
        </label>
        <button onClick={clearFilter} style={styles.clearButton}>
          Clear Filter
        </button>
      </div>
      <div style={styles.cardContainer}>
        <div style={styles.card}>
          <h4 style={styles.cardTitle}>Expired Policy</h4>
          <p style={styles.cardValue}>{totalPolicies}</p>
        </div>
        <div style={styles.card}>
          <h4 style={styles.cardTitle}>Expired Premium</h4>
          <p style={styles.cardValue}>${totalPremiums.toFixed(2)}</p>
        </div>
      </div>
      <div style={styles.chartContainer}>
        <AgCharts options={options} />
      </div>
    </div>
  );
};

const styles = {
  filterContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    backgroundColor: '#e9ecef',
    padding: '10px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  label: {
    color: '#343a40',
    fontWeight: 'bold',
    marginRight: '20px',
    marginLeft: '20px',
    marginBottom: '10px',
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    marginTop: '5px',
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ced4da',
  },
  clearButton: {
    backgroundColor: '#343a40',
    border: 'none',
    color: 'white',
    padding: '8px 12px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'column', 
    alignItems: 'flex-start',
    gap: '20px', 
    marginBottom: '15px',
    marginTop: '20px',
  },
  card: {
    backgroundColor: '#aed6f1',
    padding: '1px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    width: '10%',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  cardTitle: {
    color: '#343a40',
    fontSize: '10px',
    fontWeight: 'bold',
    marginBottom: '10px',
    transition: 'color 0.3s ease',
  },
  cardValue: {
    fontSize: '10px',
    fontWeight: 'bold',
    color: '#007bff',
  },
  chartContainer: {
    height: '30%',
    width: '40%',
    marginLeft: '20vh',
    backgroundColor: '#fff',
    padding: '1px',
    marginTop: '-10%',
    marginBottom: '10%',
    borderRadius:'10px',
        border: '4px solid white', 

  },
};

export default PolicyChart;
