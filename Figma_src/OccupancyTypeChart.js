import React, { useState, useEffect } from 'react';
import { AgCharts } from 'ag-charts-react';

const OccupancyTypeChart = () => {
  const [options, setOptions] = useState({
    data: [],
    title: {
      text: 'Occupancy Type Distribution',
      color: 'white',
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
            color: 'white', 
          },
          {
            text: '0',
            spacing: 4,
            fontSize: 48,
            color: 'white', 
          },
        ],
        innerCircle: {
          fill: '#2e4053', 
        },
        calloutLabel: {
          enabled: true,
          color: 'white', 
          fontSize: 12,
          fontWeight: 'normal',
        },
        sectorLabel: {
          enabled: true,
          color: 'white',
          fontSize: 14,
          fontWeight: 'normal',
        },
        strokes: ['#ffffff'],
        fills: ['#4CAF50', '#FF9800', '#f44336', '#2196F3', '#FFEB3B'], 
      },
    ],
    legend: {
      position: 'right',
      layout: 'vertical',
      color: 'white', 
      item: {
        marker: {
          fill: 'white', 
          stroke: 'white',
        },
        label: {
          color: 'white', 
        },
      },
    },
    background: {
      fill: '#2e4053', 
    },
    tooltip: {
      renderer: (params) => {
        return {
          content: `<b style="color: white;">${params.label}</b>: <span style="color: white;">${params.datum[params.angleKey]}</span>`,
        };
      },
    },
  });

  useEffect(() => {
    fetch('/policy_expiration.json')
      .then((response) => response.json())
      .then((data) => {
        if (data.status && Array.isArray(data.data.values)) {
          const policyNumbers = data.data.values.map((item) => item['Policy Number']);
          const totalCount = policyNumbers.length; 

          const occupancyCounts = data.data.values.reduce((acc, item) => {
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

          setOptions((prevOptions) => ({
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
                    color: 'white', 
                  },
                  {
                    text: `${totalCount}`,
                    spacing: 4,
                    fontSize: 48,
                    color: 'white',
                  },
                ],
              },
            ],
          }));
        } else {
          console.error('Error: Data fetch unsuccessful or data format is incorrect');
        }
      })
      .catch((error) => console.error('Error loading JSON data:', error));
  }, []);

  return (
    <div
      style={{
        height: '300px',
        width: '36%',
        marginLeft: '63%',
        marginTop: '-32%',
        borderRadius:'10px',
        backgroundColor: '#2e4053', 
        border: '4px solid white', 
      }}
    >
      <AgCharts options={options} />
    </div>
  );
};

export default OccupancyTypeChart;
