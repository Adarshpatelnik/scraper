import React, { useState, useEffect, useRef } from 'react';
import { AgCharts } from 'ag-charts-community';

const TransactionPiechart = () => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetch('/Policy_Transaction_Report.json')
      .then(response => response.json())
      .then(data => {
        if (data.status) {
          const transactions = data.data.values;

          const counts = transactions.reduce((acc, curr) => {
            const type = curr["Transaction Type"];
            if (type) {
              acc[type] = (acc[type] || 0) + 1;
            }
            return acc;
          }, {});

          const chartData = Object.keys(counts).map(key => ({
            label: key,
            value: counts[key]
          }));

          setChartData(chartData);
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    if (chartData.length === 0) return;

    const options = {
      container: chartRef.current,
      autoSize: true,
      title: {
        text: 'Transaction Type',
        fontSize: 18,
      },
      data: chartData,
      series: [
        {
          type: 'pie',
          angleKey: 'value',
          labelKey: 'label',
          innerRadiusOffset: -50,
          label: {
            enabled: true,
            formatter: (params) => `${params.value} (${params.label})`,
          },
          fills: ['#0088FE', '#FF8042', '#00C49F', '#FFBB28', '#FF6384'],
          strokes: ['#FFFFFF'],
          tooltip: {
            enabled: true,
            renderer: (params) => {
              return {
                content: `${params.datum.label}: ${params.datum.value} policies`
              };
            }
          }
        },
      ],
      legend: {
        position: 'right',
        item: {
          marker: {
            shape: 'square',
            size: 15,
          },
          label: {
            fontSize: 14,
          },
        },
        data: chartData.map(datum => ({
          label: datum.label,
          color: datum.fill,
        })),
      },
    };

    const chart = AgCharts.create(options);

    return () => {
      chart.destroy();
    };
  }, [chartData]);

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
};

export default TransactionPiechart;