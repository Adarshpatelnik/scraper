import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AgCharts } from 'ag-charts-react';

const Datachart = () => {
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

  const areaChartOptions = {
    background: {
      fill: 'transparent',
    },
    data: chartData,
    series: [
      {
        type: 'area',
        xKey: 'MonthYear',
        yKey: 'ClaimCount',
        yName: 'Claim Count',
        fill: '#82ca9d',
        stroke: '#82ca9d',
        strokeWidth: 2,
        marker: {
          enabled: true,
          size: 6,
        },
      },
      {
        type: 'area',
        xKey: 'MonthYear',
        yKey: 'PolicyIDCount',
        yName: 'Policy ID Count',
        fill: '#8884d8',
        stroke: '#8884d8',
        strokeWidth: 2,
        marker: {
          enabled: true,
          size: 6,
        },
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
          text: 'Count',
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
    padding: {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20,
    },
  };

  const styles = {
    chartContainer: {
      height: '105%',
      width: '210%', 
      backgroundColor: 'white', 

      border: '2px solid #FFFFFF',
      borderRadius: '15px',
      overflow: 'hidden',
      boxSizing: 'border-box',
    },
    headingContainer: {
      textAlign: 'center',
      backgroundColor: '#1c2833',
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
    <div className="container">
      <div className="row mb-4">
        <div className="col-md-6">
          <div style={styles.chartContainer} className="mb-3">
            <div style={styles.headingContainer}>
              <div style={styles.heading}>Claim and Policy ID Count</div>
              <div style={styles.headingLine}></div>
            </div>
            <AgCharts options={areaChartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Datachart;
