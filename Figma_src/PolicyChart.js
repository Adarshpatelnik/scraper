import React, { useEffect, useState } from 'react';
import { AgCharts } from 'ag-charts-react';

const PolicyChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetch('/policy_expiration 2.json')
      .then(response => response.json())
      .then(data => {
        if (data.status) {
          const policyCountsByState = data.data.values.reduce((acc, curr) => {
            const state = curr["Property State"];
            if (!acc[state]) {
              acc[state] = 0;
            }
            acc[state]++;
            return acc;
          }, {});

          const formattedChartData = Object.keys(policyCountsByState).map(state => ({
            label: state,
            value: policyCountsByState[state],
          }));

          setChartData(formattedChartData);
        } else {
          console.error('Error: Data fetch unsuccessful');
        }
      })
      .catch(error => console.error('Error loading JSON data:', error));
  }, []);

  const options = {
    data: chartData,
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
            text: chartData.reduce((sum, { value }) => sum + value, 0).toString(),
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
      position: 'right',
      layout: 'vertical',
      item: {
        label: {
          color: 'black',
        },
      },
    },
    background: {},
  };

  return <AgCharts options={options} />;
};

export default PolicyChart;
