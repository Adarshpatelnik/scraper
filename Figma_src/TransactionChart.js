

import React, { useState, useEffect } from 'react';
import { AgCharts } from 'ag-charts-react';
import 'bootstrap-icons/font/bootstrap-icons.css';

const TransactionChart = () => {
  const [chartData, setChartData] = useState([]);
  const [totalPolicies, setTotalPolicies] = useState(0);
  const [totalPremiums, setTotalPremiums] = useState(0);

  useEffect(() => {
    fetch('Policy_Transaction_Report.json')
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          const processedData = processChartData(data.data.values);
          setChartData(processedData);
          calculateTotals(data.data.values);
        } else {
          console.error('Error: Data fetch unsuccessful');
        }
      })
      .catch((error) => console.error('Error loading JSON data:', error));
  }, []);

  const processChartData = (data) => {
    const result = {};

    data.forEach((row) => {
      const date = new Date(row['Policy Effective Date']);
      const month = date.toLocaleString('default', { month: 'short' });
      const year = date.getFullYear();
      const monthYear = `${month} ${year}`;

      if (!result[monthYear]) {
        result[monthYear] = {
          count: 0,
          TransWrittenPremium: 0,
        };
      }
      result[monthYear].count += 1;
      result[monthYear].TransWrittenPremium += parseFloat(row['Trans Written Premium']) || 0;
    });

    const processedData = Object.keys(result).map((monthYear) => ({
      MonthYear: monthYear,
      Count: result[monthYear].count,
      TransWrittenPremium: result[monthYear].TransWrittenPremium,
    }));

    processedData.sort((a, b) => {
      const [monthA, yearA] = a.MonthYear.split(' ');
      const [monthB, yearB] = b.MonthYear.split(' ');

      const monthIndexA = new Date(Date.parse(monthA + ' 1, 2012')).getMonth();
      const monthIndexB = new Date(Date.parse(monthB + ' 1, 2012')).getMonth();

      return yearA - yearB || monthIndexA - monthIndexB;
    });

    return processedData;
  };

  const calculateTotals = (data) => {
    let totalCount = 0;
    let totalSum = 0;

    data.forEach((row) => {
      totalCount += 1;
      totalSum += parseFloat(row['Trans Written Premium']) || 0;
    });

    setTotalPolicies(totalCount);
    setTotalPremiums(totalSum);
  };

  const formatToK = (value) => {
    return `$${(value / 1000).toFixed(1)}K`;
  };

  const tooltipRenderer = ({ datum, xKey, yKey }) => ({
    content: `${datum[xKey]}: ${datum[yKey]}`,
  });

  const BAR_AND_LINE = [
    {
      type: 'area',
      xKey: 'MonthYear',
      yKey: 'Count',
      yName: 'Pol Count',
      tooltip: {
        renderer: tooltipRenderer,
      },
    },
    {
      type: 'line',
      xKey: 'MonthYear',
      yKey: 'TransWrittenPremium',
      yName: 'Trans Written Premium',
      tooltip: {
        renderer: tooltipRenderer,
      },
    },
  ];

  const options = {
    title: {
      text: 'Policy Transaction Pol Count or Avg Premium',
    },
    data: chartData,
    series: BAR_AND_LINE,
    axes: [
      {
        type: 'category',
        position: 'bottom',
        label: {
          formatter: ({ value }) => {
            const [year, month] = value.split(' ');
            return `${month}\n${year}`;
          },
          rotation: 0,
        },
      },
      {
        type: 'number',
        position: 'left',
        keys: ['Count'],
        title: {
          text: 'Pol Count',
        },
      },
      {
        type: 'number',
        position: 'right',
        keys: ['TransWrittenPremium'],
        title: {
          text: 'Avg Premium',
        },
        label: {
          formatter: ({ value }) => formatToK(value),
        },
      },
    ],
  };

  const styles = {
    chartContainer: {
      height: '94%', 
      width: '100%',
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
    <div style={styles.chartContainer}>
      <div style={styles.headingContainer}>
        <div style={styles.heading}>Expired Policies and Expired Premium </div>
        <div style={styles.headingLine}></div>
      </div>
      <AgCharts options={options} />
    </div>
  );
};

export default TransactionChart;
