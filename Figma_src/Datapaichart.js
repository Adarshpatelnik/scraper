import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AgCharts } from 'ag-charts-react';

const DataPaichart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => {
        const processedData = processChartData(data);
        setChartData(processedData);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const processChartData = (data) => {
    const result = {};

    data.forEach((row) => {
      const date = new Date(row['Date Of Loss']);
      const month = date.toLocaleString('default', { month: 'short' });
      const year = date.getFullYear();
      const monthYear = `${month} ${year}`;

      if (!result[monthYear]) {
        result[monthYear] = {
          ClaimCount: 0,
          PolicyIDCount: 0,
        };
      }
      result[monthYear].ClaimCount += 1;
      result[monthYear].PolicyIDCount += row['Policy ID'] ? 1 : 0;
    });

    return Object.keys(result).map((monthYear) => ({
      MonthYear: monthYear,
      ClaimCount: result[monthYear].ClaimCount,
      PolicyIDCount: result[monthYear].PolicyIDCount,
    }));
  };

  const barChartOptions = {
    background: {
      fill: 'transparent',
    },
    data: chartData,
    series: [
      {
        type: 'bar',
        xKey: 'MonthYear',
        yKey: 'ClaimCount',
        yName: 'Claim Count',
        fill: '#8884d8',
        stroke: '#8884d8',
        barWidth: 20,
      },
    ],
    axes: [
      {
        type: 'category',
        position: 'bottom',
        title: {
          text: 'Month Year',
          fontSize: 14,
          color: 'black', 
        },
        line: {
          color: 'black', 
        },
        label: {
          color: 'black', 
        },
        tick: {
          color: 'black', 
        },
      },
      {
        type: 'number',
        position: 'left',
        title: {
          text: 'Claim Count',
          fontSize: 14,
          color: 'black',
        },
        line: {
          color: 'black', 
        },
        label: {
          color: 'black', 
        },
        tick: {
          color: 'black',
        },
      },
    ],
    legend: {
      item: {
        label: {
          color: 'black',
        },
      },
    },
  };

  const styles = {
    chartContainer: {
      height: '100%',
      width: '100%',

      margin: '0 auto',
      backgroundColor: 'white', 
      borderRadius: '9px', 
      border: '2px solid #ffffff', 
      padding: '0px', 
      boxSizing: 'border-box',
    },
    headingContainer: {
      textAlign: 'center',
      backgroundColor: '#1c2833',
      borderRadius: '9px', 

    },
    heading: {
      fontSize: '22px',
      fontWeight: 'bold',
      color: '#FFFFFF',
      margin: '0',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    },
    headingLine: {
      borderBottom: '2px solid #FFFFFF',
      width: '100%',
      margin: '1px auto', 
    },
  };

  return (
    <div style={styles.chartContainer}>
      <div style={styles.headingContainer}>
        <div style={styles.heading}>Claim Count by Over Time</div>
        <div style={styles.headingLine}></div>
      </div>
      <AgCharts options={barChartOptions} />
    </div>
  );
};

export default DataPaichart;
