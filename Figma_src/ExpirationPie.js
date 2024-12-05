

import React, { useState, useEffect } from 'react';
import { AgCharts } from 'ag-charts-react';

const ExpirationPie = ({ data }) => {
  const [options, setOptions] = useState({
    data: [],
    title: {
      text: '', 
    },
    series: [
      {
        type: 'donut',
        angleKey: 'value',
        calloutLabelKey: 'label',
        innerRadiusRatio: 0.5,
        innerLabels: [
          {
            text: 'Total Policies',
            fontWeight: 'bold',
            fontSize: 16,
            color: '#FFFFFF', 
          },
          {
            text: '0',
            spacing: 4,
            fontSize: 48,
            color: '#FFFFFF', 
          },
        ],
        innerCircle: {
          fill: '', 
        },
      },
    ],
    legend: {
      text: 'Occupancy Code',
      position: 'right',
      layout: 'vertical',
      item: {
        label: {
          color: 'black', 
        },
      },
    },
    background: {
      // fill: '#1c2833', 
    },
  });

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const policyNumbers = data.map(item => item['Policy Number']);
      const totalCount = policyNumbers.length;

      const occupancyCounts = data.reduce((acc, item) => {
        const occupancyType = item['Occupancy Type'];
        if (!acc[occupancyType]) {
          acc[occupancyType] = 0;
        }
        acc[occupancyType]++;
        return acc;
      }, {});

      const formattedData = Object.entries(occupancyCounts).map(([key, value]) => ({
        label: key,
        value: value,
      }));

      setOptions(prevOptions => ({
        ...prevOptions,
        data: formattedData,
        series: [
          {
            ...prevOptions.series[0],
            innerLabels: [
              {
                text: 'Total Policies',
                fontWeight: 'bold',
                fontSize: 16,
                color: '#FFFFFF', 
              },
              {
                text: `${totalCount}`,
                spacing: 4,
                fontSize: 48,
                color: '#FFFFFF', 
              },
            ],
          },
        ],
      }));
    } else {
      console.error('Error: Invalid data format');
    }
  }, [data]);

  const styles = {
    chartContainer: {
      height: '40%',
      width: '100%',
      margin: '0 auto',
      backgroundColor: '#1c2833', 
      borderRadius: '15px',
      border: '2px solid #ffffff', 
      padding: '0px',
      boxSizing: 'border-box',
    },
    headingContainer: {
      textAlign: 'center',
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
        <div style={styles.heading}>Occupancy Code </div>
        <div style={styles.headingLine}></div>
      </div>
      <AgCharts options={options} />
    </div>
  );
};

export default ExpirationPie;
