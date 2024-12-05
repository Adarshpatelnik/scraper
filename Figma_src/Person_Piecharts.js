import React, { useState, useEffect } from 'react';
import { AgCharts as AgCharts } from 'ag-charts-react';

const Person_Piechart = ({ data }) => {
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
            fontSize: 10,
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
      text: 'Action Type',
      position: '',
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
      const totalCount = data.length;

      const ActionCounts = data.reduce((acc, item) => {
        const ActionType = item['Action Type'];
        if (!acc[ActionType]) {
          acc[ActionType] = 0;
        }
        acc[ActionType]++;
        return acc;
      }, {});

      const formattedData = Object.entries(ActionCounts).map(([key, value]) => ({
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
        <div style={styles.heading}>Transaction Type</div>
        <div style={styles.headingLine}></div>
      </div>
      <AgCharts options={options} />
    </div>
  );
};

export default Person_Piechart;