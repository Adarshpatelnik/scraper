import React, { useState, useEffect } from 'react';
import { AgCharts } from 'ag-charts-react'; // Correct import

const BarChart = () => {
  const [options, setOptions] = useState({
    title: {
      text: 'Number of Policies by Year and Quarter',
    },
    subtitle: {
      text: 'Counts by Period',
    },
    data: [], // Initially empty, will be updated in useEffect
    series: [
      {
        type: 'bar',
        xKey: 'period',
        yKey: 'countYear',
        yName: 'Yearly Count',
        fill: '#4CAF50',
      },
      {
        type: 'bar',
        xKey: 'period',
        yKey: 'countQuarterQ1',
        yName: 'Quarterly Count Q1',
        fill: '#FFC107', // Color for Q1
      },
      {
        type: 'bar',
        xKey: 'period',
        yKey: 'countQuarterQ2',
        yName: 'Quarterly Count Q2',
        fill: '#FF5722', // Color for Q2
      },
      {
        type: 'bar',
        xKey: 'period',
        yKey: 'countQuarterQ3',
        yName: 'Quarterly Count Q3',
        fill: '#9C27B0', // Color for Q3
      },
      {
        type: 'bar',
        xKey: 'period',
        yKey: 'countQuarterQ4',
        yName: 'Quarterly Count Q4',
        fill: '#3F51B5', // Color for Q4
      },
    ],
    axes: [
      {
        type: 'category',
        position: 'bottom',
        label: {
          fontSize: 12,
        },
      },
      {
        type: 'number',
        position: 'left',
        label: {
          fontSize: 12,
        },
      },
    ],
    legend: {
      position: 'bottom',
    },
  });

  useEffect(() => {
    fetch('/data.json')
      .then(response => response.json())
      .then(data => {
        if (data.status && Array.isArray(data.data.values)) {
          const yearData = aggregateDataByYear(data.data.values);
          const quarterData = aggregateDataByQuarter(data.data.values);
          const combinedData = yearData.map(yearItem => {
            const quarterItem = quarterData.find(item => item.period.startsWith(yearItem.period));
            return {
              ...yearItem,
              countQuarterQ1: quarterItem?.countQuarterQ1 || 0,
              countQuarterQ2: quarterItem?.countQuarterQ2 || 0,
              countQuarterQ3: quarterItem?.countQuarterQ3 || 0,
              countQuarterQ4: quarterItem?.countQuarterQ4 || 0,
            };
          });
          setOptions(prevOptions => ({
            ...prevOptions,
            data: combinedData,
          }));
        } else {
          console.error('Error: Data fetch unsuccessful or data format is incorrect');
        }
      })
      .catch(error => console.error('Error loading JSON data:', error));
  }, []);

  const extractYear = (dateString) => {
    const date = new Date(dateString);
    return date.getFullYear();
  };

  const extractQuarter = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1; // Months are zero-based
    return Math.ceil(month / 3); // 1-4
  };

  const aggregateDataByYear = (data) => {
    const yearMap = new Map();
    data.forEach(item => {
      const year = extractYear(item['Loss Date']);
      if (!yearMap.has(year)) {
        yearMap.set(year, { period: year, countYear: 0 });
      }
      yearMap.get(year).countYear += 1;
    });
    return Array.from(yearMap.values()).sort((a, b) => b.period - a.period);
  };

  const aggregateDataByQuarter = (data) => {
    const quarterMap = new Map();
    data.forEach(item => {
      const year = extractYear(item['Loss Date']);
      const quarter = extractQuarter(item['Loss Date']);
      const period = `${year}-Q${quarter}`;
      if (!quarterMap.has(period)) {
        quarterMap.set(period, { period, countQuarterQ1: 0, countQuarterQ2: 0, countQuarterQ3: 0, countQuarterQ4: 0 });
      }
      if (quarter === 1) quarterMap.get(period).countQuarterQ1 += 1;
      if (quarter === 2) quarterMap.get(period).countQuarterQ2 += 1;
      if (quarter === 3) quarterMap.get(period).countQuarterQ3 += 1;
      if (quarter === 4) quarterMap.get(period).countQuarterQ4 += 1;
    });
    return Array.from(quarterMap.values()).sort();
  };

  return (
    <div style={{ height: 800, width: '40%', marginLeft: '10%',marginTop:'5%' }}>
      <AgCharts options={options} />
    </div>
  );
};

export default BarChart;
