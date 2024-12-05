// // // // // // import React, { useState, useEffect } from 'react';
// // // // // // import { AgCharts as AgCharts } from 'ag-charts-react';

// // // // // // const Person_Piechart = ({ data }) => {
// // // // // //   const [options, setOptions] = useState({
// // // // // //     data: [],
// // // // // //     title: {
// // // // // //       text: '', 
// // // // // //     },
// // // // // //     series: [
// // // // // //       {
// // // // // //         type: 'donut',
// // // // // //         angleKey: 'value', 
// // // // // //         calloutLabelKey: 'label',
// // // // // //         innerRadiusRatio: 0.5,
// // // // // //         innerLabels: [
// // // // // //           {
// // // // // //             text: 'Total Policies',
// // // // // //             fontWeight: 'bold',
// // // // // //             fontSize: 16,
// // // // // //             color: '#FFFFFF', 
// // // // // //           },
// // // // // //           {
// // // // // //             text: '0',
// // // // // //             spacing: 4,
// // // // // //             fontSize: 48,
// // // // // //             color: '#FFFFFF', 
// // // // // //           },
// // // // // //         ],
// // // // // //         innerCircle: {
// // // // // //           fill: '', 
// // // // // //         },
// // // // // //       },
// // // // // //     ],
// // // // // //     legend: {
// // // // // //       text: 'Occupancy Code',
// // // // // //       position: 'right',
// // // // // //       layout: 'vertical',
// // // // // //       item: {
// // // // // //         label: {
// // // // // //           color: 'black', 
// // // // // //         },
// // // // // //       },
// // // // // //     },
// // // // // //     background: {
// // // // // //       // fill: '#1c2833', 
// // // // // //     },
// // // // // //   });

// // // // // //   useEffect(() => {
// // // // // //     if (data && Array.isArray(data)) {
// // // // // //       const totalCount = data.length;

// // // // // //       const occupancyCounts = data.reduce((acc, item) => {
// // // // // //         const occupancyType = item['Transaction Type'];
// // // // // //         if (!acc[occupancyType]) {
// // // // // //           acc[occupancyType] = 0;
// // // // // //         }
// // // // // //         acc[occupancyType]++;
// // // // // //         return acc;
// // // // // //       }, {});

// // // // // //       const formattedData = Object.entries(occupancyCounts).map(([key, value]) => ({
// // // // // //         label: key,
// // // // // //         value: value,
// // // // // //       }));

// // // // // //       setOptions(prevOptions => ({
// // // // // //         ...prevOptions,
// // // // // //         data: formattedData,
// // // // // //         series: [
// // // // // //           {
// // // // // //             ...prevOptions.series[0],
// // // // // //             innerLabels: [
// // // // // //               {
// // // // // //                 text: 'Total Policies',
// // // // // //                 fontWeight: 'bold',
// // // // // //                 fontSize: 16,
// // // // // //                 color: '#FFFFFF', 
// // // // // //               },
// // // // // //               {
// // // // // //                 text: `${totalCount}`,
// // // // // //                 spacing: 4,
// // // // // //                 fontSize: 48,
// // // // // //                 color: '#FFFFFF', 
// // // // // //               },
// // // // // //             ],
// // // // // //           },
// // // // // //         ],
// // // // // //       }));
// // // // // //     } else {
// // // // // //       console.error('Error: Invalid data format');
// // // // // //     }
// // // // // //   }, [data]);

// // // // // //   const styles = {
// // // // // //     chartContainer: {
// // // // // //       height: '40%',
// // // // // //       width: '100%',
// // // // // //       margin: '0 auto',
// // // // // //       backgroundColor: '#1c2833', 
// // // // // //       borderRadius: '15px',
// // // // // //       border: '2px solid #ffffff', 
// // // // // //       padding: '0px',
// // // // // //       boxSizing: 'border-box',
// // // // // //     },
// // // // // //     headingContainer: {
// // // // // //       textAlign: 'center',
// // // // // //     },
// // // // // //     heading: {
// // // // // //       fontSize: '22px', 
// // // // // //       fontWeight: 'bold',
// // // // // //       color: '#FFFFFF',
// // // // // //       margin: '0',
// // // // // //       textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
// // // // // //     },
// // // // // //     headingLine: {
// // // // // //       borderBottom: '2px solid #FFFFFF',
// // // // // //       width: '100%',
// // // // // //       margin: '1px auto', 
// // // // // //     },
// // // // // //   };

// // // // // //   return (
// // // // // //     <div style={styles.chartContainer}>
// // // // // //       <div style={styles.headingContainer}>
// // // // // //         <div style={styles.heading}>Transaction Type</div>
// // // // // //         <div style={styles.headingLine}></div>
// // // // // //       </div>
// // // // // //       <AgCharts options={options} />
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default Person_Piechart;




// // // // // // // import React, { useContext } from 'react';
// // // // // // // import { DataContext } from './Person_Filter';
// // // // // // // import { AgGridReact } from 'ag-grid-react';
// // // // // // // import 'ag-grid-community/styles/ag-grid.css';
// // // // // // // import 'ag-grid-community/styles/ag-theme-alpine.css';

// // // // // // // const TopTenReport = () => {
// // // // // // //   const { chartData } = useContext(DataContext);

// // // // // // //   // Group by Person ID and count occurrences
// // // // // // //   const counts = chartData.reduce((acc, item) => {
// // // // // // //     acc[item['Person ID']] = (acc[item['Person ID']] || 0) + 1;
// // // // // // //     return acc;
// // // // // // //   }, {});

// // // // // // //   // Convert to array and sort by count
// // // // // // //   const sortedCounts = Object.entries(counts)
// // // // // // //     .sort((a, b) => b[1] - a[1])
// // // // // // //     .slice(0, 10); // Get top 10

// // // // // // //   // Get top 10 Person Name and Transaction Type
// // // // // // //   const topTen = sortedCounts.map(([personId, count]) => {
// // // // // // //     const personData = chartData.find(item => item['Person ID'] === personId);
// // // // // // //     return {
// // // // // // //       personId,
// // // // // // //       personName: personData ? personData['Person Name'] : 'Unknown',
// // // // // // //       transactionType: personData ? personData['Transaction Type'] : 'Unknown',
// // // // // // //       count
// // // // // // //     };
// // // // // // //   });

// // // // // // //   // Define column definitions for AG Grid
// // // // // // //   const columnDefs = [
// // // // // // //     { headerName: 'Person ID', field: 'personId', sortable: true, filter: true },
// // // // // // //     { headerName: 'Person Name', field: 'personName', sortable: true, filter: true },
// // // // // // //     { headerName: 'Transaction Type', field: 'transactionType', sortable: true, filter: true },
// // // // // // //     { headerName: 'Count', field: 'count', sortable: true, filter: true }
// // // // // // //   ];

// // // // // // //   return (
// // // // // // //     <div style={styles.container}>
// // // // // // //       <h2>Top 10 Person Records</h2>
// // // // // // //       <div className="ag-theme-alpine" style={styles.grid}>
// // // // // // //         <AgGridReact
// // // // // // //           rowData={topTen}
// // // // // // //           columnDefs={columnDefs}
// // // // // // //           pagination={true}
// // // // // // //           paginationPageSize={10}
// // // // // // //           domLayout='autoHeight'
// // // // // // //         />
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // const styles = {
// // // // // // //   container: {
// // // // // // //     padding: '20px',
// // // // // // //   },
// // // // // // //   grid: {
// // // // // // //     height: '100%',
// // // // // // //     width: '100%',
// // // // // // //     marginTop: '20px',
// // // // // // //   },
// // // // // // // };

// // // // // // // export default TopTenReport;


 
 




// // // import React, { useState, useEffect } from 'react';
// // // import { AgCharts } from 'ag-charts-react';

// // // const Person_Piechart = ({ data }) => {
// // //   const [options, setOptions] = useState({
// // //     data: [],
// // //     title: {
// // //       text: 'Transaction Type Trend',
// // //     },
// // //     series: [
// // //       {
// // //         type: 'line',
// // //         xKey: 'label',  // X-axis data (e.g., transaction type)
// // //         yKey: 'value',  // Y-axis data (e.g., count)
// // //         strokeWidth: 2,
// // //         marker: {
// // //           enabled: true,
// // //           size: 5,
// // //           fill: '#FFFFFF',
// // //         },
// // //       },
// // //     ],
// // //     legend: {
      
// // //       layout: 'vertical',
// // //     },
// // //     axes: [
// // //       {
// // //         type: 'category',
// // //         position: 'bottom',
// // //         title: { text: 'Transaction Type' },
// // //       },
// // //       {
// // //         type: 'number',
// // //         position: 'left',
// // //         title: { text: 'Count' },
// // //       },
// // //     ],
// // //     background: {
// // //       fill: '#1c2833', 
// // //     },
// // //   });

// // //   useEffect(() => {
// // //     if (data && Array.isArray(data)) {
// // //       const personCounts = data.reduce((acc, item) => {
// // //         const TransactionType = item['Transaction Type'];
// // //         if (!acc[TransactionType]) {
// // //           acc[TransactionType] = 0;
// // //         }
// // //         acc[TransactionType]++;
// // //         return acc;
// // //       }, {});

// // //       const formattedData = Object.entries(personCounts).map(([key, value]) => ({
// // //         label: key,
// // //         value: value,
// // //       }));

// // //       setOptions(prevOptions => ({
// // //         ...prevOptions,
// // //         data: formattedData,
// // //       }));
// // //     } else {
// // //       console.error('Error: Invalid data format');
// // //     }
// // //   }, [data]);

// // //   const styles = {
// // //     chartContainer: {
// // //       height: '40%',
// // //       width: '100%',
// // //       margin: '0 auto',
// // //       backgroundColor: '#1c2833',
// // //       borderRadius: '15px',
// // //       border: '2px solid #ffffff',
// // //       padding: '0px',
// // //       boxSizing: 'border-box',
// // //     },
// // //     headingContainer: {
// // //       textAlign: 'center',
// // //     },
// // //     heading: {
// // //       fontSize: '22px',
// // //       fontWeight: 'bold',
// // //       color: '#FFFFFF',
// // //       margin: '0',
// // //       textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
// // //     },
// // //     headingLine: {
// // //       borderBottom: '2px solid #FFFFFF',
// // //       width: '100%',
// // //       margin: '1px auto',
// // //     },
// // //   };

// // //   return (
// // //     <div style={styles.chartContainer}>
// // //       <div style={styles.headingContainer}>
// // //         <div style={styles.heading}>Transaction Type</div>
// // //         <div style={styles.headingLine}></div>
// // //       </div>
// // //       <AgCharts options={options} />
// // //     </div>
// // //   );
// // // };

// // //  export default Person_Piechart;


// // import React, { useState, useEffect } from 'react';
// // import { AgCharts } from 'ag-charts-react';

// // const Person_Piechart = ({ data }) => {
// //   const [options, setOptions] = useState({
// //     data: [],
// //     title: {
// //       text: 'Transaction Type Trend',
// //     },
// //     series: [
// //       {
// //         type: 'line',
// //         xKey: 'date',  // X-axis data (e.g., date)
// //         yKey: 'count',  // Y-axis data (e.g., count)
// //         strokeWidth: 2,
// //         marker: {
// //           enabled: true,
// //           size: 5,
// //           fill: '#FFFFFF',
// //         },
// //       },
// //     ],
// //     legend: {
// //       layout: 'vertical',
// //     },
// //     axes: [
// //       {
// //         type: 'category',
// //         position: 'bottom',
// //         title: { text: 'Created Date' },
// //       },
// //       {
// //         type: 'number',
// //         position: 'left',
// //         title: { text: 'Count' },
// //       },
// //     ],
// //     background: {
// //       fill: '#1c2833', 
// //     },
// //   });

// //   useEffect(() => {
// //     if (data && Array.isArray(data)) {
// //       // Step 1: Aggregate counts by Transaction Type and Created Date
// //       const transactionCounts = data.reduce((acc, item) => {
// //         const date = new Date(item["Created Date"]).toISOString().split('T')[0]; // Extract date only
// //         const key = `${date}-${item["Transaction Type"]}`;
        
// //         if (!acc[key]) {
// //           acc[key] = { date, transactionType: item["Transaction Type"], count: 0 };
// //         }
// //         acc[key].count += 1;
        
// //         return acc;
// //       }, {});

// //       // Step 2: Convert aggregated counts to array
// //       const formattedData = Object.values(transactionCounts);

// //       // Step 3: Update chart options
// //       setOptions(prevOptions => ({
// //         ...prevOptions,
// //         data: formattedData,
// //         series: [
// //           {
// //             type: 'line',
// //             xKey: 'date',
// //             yKey: 'count',
// //             strokeWidth: 2,
// //             marker: {
// //               enabled: true,
// //               size: 5,
// //               fill: '#FFFFFF',
// //             },
// //           },
// //         ],
// //         axes: [
// //           {
// //             type: 'category',
// //             position: 'bottom',
// //             title: { text: 'Created Date' },
// //           },
// //           {
// //             type: 'number',
// //             position: 'left',
// //             title: { text: 'Count' },
// //           },
// //         ],
// //       }));
// //     } else {
// //       console.error('Error: Invalid data format');
// //     }
// //   }, [data]);

// //   const styles = {
// //     chartContainer: {
// //       height: '40%',
// //       width: '100%',
// //       margin: '0 auto',
// //       backgroundColor: '#1c2833',
// //       borderRadius: '15px',
// //       border: '2px solid #ffffff',
// //       padding: '0px',
// //       boxSizing: 'border-box',
// //     },
// //     headingContainer: {
// //       textAlign: 'center',
// //     },
// //     heading: {
// //       fontSize: '22px',
// //       fontWeight: 'bold',
// //       color: '#FFFFFF',
// //       margin: '0',
// //       textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
// //     },
// //     headingLine: {
// //       borderBottom: '2px solid #FFFFFF',
// //       width: '100%',
// //       margin: '1px auto',
// //     },
// //   };

// //   return (
// //     <div style={styles.chartContainer}>
// //       <div style={styles.headingContainer}>
// //         <div style={styles.heading}>Transaction Type Trend</div>
// //         <div style={styles.headingLine}></div>
// //       </div>
// //       <AgCharts options={options} />
// //     </div>
// //   );
// // };

// // export default Person_Piechart;



// import React, { useState, useEffect } from 'react';
// import { AgCharts } from 'ag-charts-react';

// const Person_Piechart = ({ data }) => {
//   const [options, setOptions] = useState({
//     data: [],
//     title: {
//       text: 'Transaction Type Trend',
//     },
//     series: [],  // Will be populated dynamically
//     legend: {
//       layout: 'vertical',
//     },
//     axes: [
//       {
//         type: 'category',
//         position: 'bottom',
//         title: { text: 'Created Date' },
//       },
//       {
//         type: 'number',
//         position: 'left',
//         title: { text: 'Count' },
//       },
//     ],
//     background: {
//       fill: '#1c2833', 
//     },
//   });

//   useEffect(() => {
//     if (data && Array.isArray(data)) {
//       // Step 1: Aggregate counts by Transaction Type and Created Date
//       const transactionCounts = data.reduce((acc, item) => {
//         const date = new Date(item["Created Date"]).toISOString().split('T')[0]; // Extract date only
//         const type = item["Transaction Type"];
        
//         if (!acc[type]) {
//           acc[type] = {};
//         }
        
//         if (!acc[type][date]) {
//           acc[type][date] = 0;
//         }
//         acc[type][date] += 1;
        
//         return acc;
//       }, {});

//       // Step 2: Convert aggregated counts to array format for each Transaction Type
//       const series = Object.keys(transactionCounts).map(type => {
//         const dataForType = Object.keys(transactionCounts[type]).map(date => ({
//           date,
//           count: transactionCounts[type][date],
//         }));
        
//         return {
//           type: 'line',
//           xKey: 'date',
//           yKey: 'count',
//           title: type,
//           strokeWidth: 2,
//           marker: {
//             enabled: true,
//             size: 5,
//             fill: '#FFFFFF',
//           },
//           data: dataForType,
//         };
//       });

//       // Step 3: Update chart options with multiple series
//       setOptions(prevOptions => ({
//         ...prevOptions,
//         series: series,
//       }));
//     } else {
//       console.error('Error: Invalid data format');
//     }
//   }, [data]);

//   const styles = {
//     chartContainer: {
//       height: '40%',
//       width: '100%',
//       margin: '0 auto',
//       backgroundColor: '#1c2833',
//       borderRadius: '15px',
//       border: '2px solid #ffffff',
//       padding: '0px',
//       boxSizing: 'border-box',
//     },
//     headingContainer: {
//       textAlign: 'center',
//     },
//     heading: {
//       fontSize: '22px',
//       fontWeight: 'bold',
//       color: '#FFFFFF',
//       margin: '0',
//       textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
//     },
//     headingLine: {
//       borderBottom: '2px solid #FFFFFF',
//       width: '100%',
//       margin: '1px auto',
//     },
//   };

//   return (
//     <div style={styles.chartContainer}>
//       <div style={styles.headingContainer}>
//         <div style={styles.heading}>Transaction Type Trend</div>
//         <div style={styles.headingLine}></div>
//       </div>
//       <AgCharts options={options} />
//     </div>
//   );
// };

// export default Person_Piechart;










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