import React, { useState, useEffect } from 'react';
import { AgCharts } from 'ag-charts-react'; 

const PieChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then(response => response.json())
      .then(data => {
        if (data.status && Array.isArray(data.data.values)) {
          const transformedData = aggregatePolicyNumbersByYear(data.data.values);
          setChartData(transformedData);
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

  const aggregatePolicyNumbersByYear = (data) => {
    const yearMap = new Map();
    data.forEach(item => {
      const year = extractYear(item['Loss Date']); 
      if (!yearMap.has(year)) {
        yearMap.set(year, 0);
      }
      yearMap.set(year, yearMap.get(year) + 1); 
    });
    return Array.from(yearMap, ([year, count]) => ({ year, count }));
  };

  const options = {
    data: chartData,
    series: [{
      type: 'pie',
      angleKey: 'count',
      labelKey: 'year',
      label: {
        enabled: true,
        fontSize: 14,
      },
      calloutLabelKey: 'year',
      calloutLabel: {
        enabled: true,
        fontSize: 12,
        color: 'black',
      },
      sectorLabelKey: 'count',
      sectorLabel: {
        enabled: true,
        fontSize: 12,
        color: 'white',
        formatter: params => `${params.datum.count}`, 
      },
      tooltip: {
        enabled: true,
        renderer: (params) => `${params.datum.year}: ${params.datum.count}`,
      },
    }],
    legend: {
      position: 'bottom',
      layout: 'horizontal',
    },
    title: {
      text: 'Policy Distribution by Year',
      fontSize: 16,
    }
  };

  return (
    <div style={{ height: '400px', width: '40%', marginLeft: '50%',marginTop:'-63%' }}>
      <AgCharts options={options} /> {/* Use AgCharts component */}
    </div>
  );
};

export default PieChart;
