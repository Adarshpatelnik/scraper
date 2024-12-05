
import React from 'react';
import { AgCharts } from 'ag-charts-react';

const PolicyChartComponent = ({ data }) => {
  // Calculate totals
  const calculateTotals = (data) => {
    if (!Array.isArray(data)) {
      console.error('Invalid data format:', data);
      return { totalCount: 0, totalWrittenPremium: 0 };
    }

    let totalCount = 0;
    let totalWrittenPremium = 0;

    data.forEach((row) => {
      totalCount += 1;
      totalWrittenPremium += parseFloat(row['Trans Written Premium']) || 0;
    });

    return { totalCount, totalWrittenPremium };
  };

  const { totalCount, totalWrittenPremium } = calculateTotals(data);

  const processChartData = (data) => {
    if (!Array.isArray(data)) {
      console.error('Invalid data format:', data);
      return [];
    }

    const result = {};

    data.forEach((row) => {
      const date = new Date(row['Policy Effective Date']);
      const month = date.toLocaleString('default', { month: 'short' });
      const year = date.getFullYear();
      const monthYearKey = `${year} ${month}`;

      if (!result[monthYearKey]) {
        result[monthYearKey] = {
          month,
          year,
          count: 0,
          writtenPremiumSum: 0,
        };
      }
      result[monthYearKey].count += 1;
      result[monthYearKey].writtenPremiumSum += parseFloat(row['Trans Written Premium']) || 0;
    });

    return Object.keys(result)
      .map((key) => ({
        MonthYear: key,
        ...result[key],
      }))
      .sort((a, b) => new Date(`${a.year}-${a.month}-01`) - new Date(`${b.year}-${b.month}-01`));
  };

  const tooltipRenderer = ({ datum, xKey, yKey }) => ({
    content: `${datum[xKey]}: ${datum[yKey]}`,
  });

  const BAR_AND_LINE = [
    {
      type: 'bar',
      xKey: 'MonthYear',
      yKey: 'count',
      yName: 'Expired Policy',
      tooltip: {
        renderer: tooltipRenderer,
      },
    },
    {
      type: 'area',
      xKey: 'MonthYear',
      yKey: 'writtenPremiumSum',
      yName: 'Expired Premium',
      tooltip: {
        renderer: tooltipRenderer,
      },
    },
  ];

  const options = {
    title: {
      text: '', 
    },
    data: processChartData(data),
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
          color: 'black',
        },
      },
      {
        type: 'number',
        position: 'left',
        keys: ['count'],
        title: {
          text: 'Expired Policy',
          color: 'black',
        },
        label: {
          color: 'black',
        },
      },
      {
        type: 'number',
        position: 'right',
        keys: ['writtenPremiumSum'],
        title: {
          text: 'Expired Premium',
          color: 'black',
        },
        label: {
          formatter: (params) => `$${params.value / 1000}K`,
          color: 'black',
        },
      },
    ],
    legend: {
      position: 'bottom',
      item: {
        label: {
          color: 'black',
        },
      },
    },
    background: {
      // fill: '#1c2833',
    },
  };

  const styles = {
    chartContainer: {
      height: '100%',
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

export default PolicyChartComponent;
