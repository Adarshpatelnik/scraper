 





// import React, { useState, useEffect, createContext } from 'react';
// import PersonPiechart from './Person_Piechart';
// import PersonReport from './Person_Report';

// // Create a context to share the filtered data
// export const DataContext = createContext();

// const PersonFilter = () => {
//   const [chartData, setChartData] = useState([]);
//   const [personId, setPersonId] = useState('');
//   const [dateFilter, setDateFilter] = useState('');
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetch('/person_performance 2.json')
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then(data => {
//         if (data.status) {
//           const filteredByPersonId = filterByPersonId(data.data.values.tasks);
//           const finalFilteredData = filterByDate(filteredByPersonId);
//           setChartData(finalFilteredData);
//         } else {
//           throw new Error('Data fetch unsuccessful');
//         }
//       })
//       .catch(error => {
//         console.error('Error loading JSON data:', error);
//         setError(error.message);
//       });
//   }, [personId, dateFilter]);

//   const filterByPersonId = (data) => {
//     return data.filter(row => row['Person ID'].includes(personId));
//   };

//   const filterByDate = (data) => {
//     const today = new Date();
//     const oneWeekAgo = new Date(today);
//     oneWeekAgo.setDate(today.getDate() - 7);
//     const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
//     const startOfYear = new Date(today.getFullYear(), 0, 1);

//     return data.filter(row => {
//       // Convert 'Task Date' to Date object
//       const rowDateParts = row['Task Date'].split('-');
//       const rowDate = new Date(`${rowDateParts[2]}-${rowDateParts[1]}-${rowDateParts[0]}`); // Assuming format 'dd-mm-yyyy'

//       let dateMatch = true;
//       if (dateFilter === 'oneWeek') {
//         dateMatch = rowDate >= oneWeekAgo && rowDate <= today;
//       } else if (dateFilter === 'MTD') {
//         dateMatch = rowDate >= startOfMonth && rowDate <= today;
//       } else if (dateFilter === 'YTD') {
//         dateMatch = rowDate >= startOfYear && rowDate <= today;
//       }

//       return dateMatch;
//     });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name === 'personId') {
//       setPersonId(value);
//     }
//   };

//   const clearFilter = () => {
//     setPersonId('');
//     setDateFilter('');
//   };

//   const applyDateFilter = (filterType) => {
//     setDateFilter(filterType);
//   };

//   return (
//     <DataContext.Provider value={{ chartData }}>
//       <div style={styles.container}>
//         <div style={styles.filterContainer}>
//           <div style={styles.filterItem}>
//             <label style={styles.label}>Person ID:</label>
//             <input
//               type="text"
//               name="personId"
//               value={personId}
//               onChange={handleInputChange}
//               style={styles.input}
//             />
//           </div>
//           <div style={styles.filterItem}>
//             <button onClick={() => applyDateFilter('oneWeek')} style={styles.filterButton}>
//               Last Week
//             </button>
//             <button onClick={() => applyDateFilter('MTD')} style={styles.filterButton}>
//               Month-to-Date (MTD)
//             </button>
//             <button onClick={() => applyDateFilter('YTD')} style={styles.filterButton}>
//               Year-to-Date (YTD)
//             </button>
//           </div>
//           <button onClick={clearFilter} style={styles.clearButton}>
//             Clear Filter
//           </button>
//         </div>
//         {error ? (
//           <div style={styles.error}>Error: {error}</div>
//         ) : (
//           <div style={styles.mainContent}>
//             <div style={styles.chartContainer}>
//               <div style={styles.chartLarge}>
//                 <PersonReport />
//               </div>
//               <div style={styles.chartSmall}>
//                 <PersonPiechart />
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </DataContext.Provider>
//   );
// };

// const styles = {
//   container: {
//     display: 'flex',
//     flexDirection: 'row',
//     width: '100%',
//     padding: '5px',
//     boxSizing: 'border-box',
//   },
//   filterContainer: {
//     width: '13%',
//     padding: '10px',
//     marginRight: '10px',
//     borderRadius: '10px',
//     border: '2px solid white',
//     boxSizing: 'border-box',
//     height: 'auto',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'flex-start',
//   },
//   filterItem: {
//     display: 'flex',
//     flexDirection: 'column',
//     marginBottom: '10px',
//     width: '100%',
//   },
//   label: {
//     color: 'black',
//     fontSize: '14px',
//     marginBottom: '5px',
//   },
//   input: {
//     width: '90%',
//     padding: '8px',
//     border: '1px solid #ccc',
//     borderRadius: '5px',
//     color: 'black',
//   },
//   clearButton: {
//     marginTop: '10px',
//     padding: '10px 15px',
//     backgroundColor: '#e74c3c',
//     color: '#FFFFFF',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
//     alignSelf: 'flex-start',
//   },
//   filterButton: {
//     margin: '5px 0',
//     padding: '8px 12px',
//     backgroundColor: '#3498db',
//     color: '#FFFFFF',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
//     alignSelf: 'flex-start',
//   },
//   mainContent: {
//     flex: 1,
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '16px',
//   },
//   chartContainer: {
//     display: 'flex',
//     flexDirection: 'row',
//     gap: '10px',
//   },
//   chartLarge: {
//     flex: 2,
//     padding: '10px',
//     borderRadius: '10px',
//     backgroundColor: '#34495e',
//     color: 'white',
//     textAlign: 'center',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//   },
//   chartSmall: {
//     flex: 1,
//     padding: '10px',
//     borderRadius: '10px',
//     backgroundColor: '#34495e',
//     color: 'white',
//     textAlign: 'center',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//   },
//   error: {
//     color: 'red',
//     fontSize: '16px',
//     fontWeight: 'bold',
//   },
// };

// export default PersonFilter;



import React, { useState, useEffect, createContext } from 'react';
import PersonPiechart from './Person_Piechart';
import PersonReport from './Person_Report';

// Create a context to share the filtered data
export const DataContext = createContext();

const PersonFilter = () => {
  const [chartData, setChartData] = useState([]);
  const [personId, setPersonId] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/person_performance 2.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data.status) {
          const filteredByPersonId = filterByPersonId(data.data.values.tasks);
          const finalFilteredData = filterByDate(filteredByPersonId);
          setChartData(finalFilteredData);
        } else {
          throw new Error('Data fetch unsuccessful');
        }
      })
      .catch(error => {
        console.error('Error loading JSON data:', error);
        setError(error.message);
      });
  }, [personId, dateFilter, customStartDate, customEndDate]);

  const filterByPersonId = (data) => {
    return data.filter(row => row['Person ID'].includes(personId));
  };

  const filterByDate = (data) => {
    const today = new Date();
    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(today.getDate() - 7);
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startOfYear = new Date(today.getFullYear(), 0, 1);

    return data.filter(row => {
      // Convert 'Task Date' to Date object
      const rowDateParts = row['Task Date'].split('-');
      const rowDate = new Date(`${rowDateParts[2]}-${rowDateParts[1]}-${rowDateParts[0]}`); // Assuming format 'dd-mm-yyyy'

      let dateMatch = true;
      if (dateFilter === 'oneWeek') {
        dateMatch = rowDate >= oneWeekAgo && rowDate <= today;
      } else if (dateFilter === 'MTD') {
        dateMatch = rowDate >= startOfMonth && rowDate <= today;
      } else if (dateFilter === 'YTD') {
        dateMatch = rowDate >= startOfYear && rowDate <= today;
      } else if (dateFilter === 'custom') {
        const startDate = new Date(customStartDate);
        const endDate = new Date(customEndDate);
        dateMatch = rowDate >= startDate && rowDate <= endDate;
      }

      return dateMatch;
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'personId') {
      setPersonId(value);
    } else if (name === 'customStartDate') {
      setCustomStartDate(value);
    } else if (name === 'customEndDate') {
      setCustomEndDate(value);
    }
  };

  const clearFilter = () => {
    setPersonId('');
    setDateFilter('');
    setCustomStartDate('');
    setCustomEndDate('');
  };

  const applyDateFilter = (filterType) => {
    setDateFilter(filterType);
  };

  return (
    <DataContext.Provider value={{ chartData }}>
      <div style={styles.container}>
        <div style={styles.filterContainer}>
          <div style={styles.filterItem}>
            <label style={styles.label}>Person ID:</label>
            <input
              type="text"
              name="personId"
              value={personId}
              onChange={handleInputChange}
              style={styles.input}
            />
          </div>
          <div style={styles.filterItem}>
            <button onClick={() => applyDateFilter('oneWeek')} style={styles.filterButton}>
              Last Week
            </button>
            <button onClick={() => applyDateFilter('MTD')} style={styles.filterButton}>
              Month-to-Date (MTD)
            </button>
            <button onClick={() => applyDateFilter('YTD')} style={styles.filterButton}>
              Year-to-Date (YTD)
            </button>
            <button onClick={() => applyDateFilter('custom')} style={styles.filterButton}>
              Custom Date
            </button>
            {dateFilter === 'custom' && (
              <div style={styles.customDateFilter}>
                <label style={styles.label}>Start Date:</label>
                <input
                  type="date"
                  name="customStartDate"
                  value={customStartDate}
                  onChange={handleInputChange}
                  style={styles.input}
                />
                <label style={styles.label}>End Date:</label>
                <input
                  type="date"
                  name="customEndDate"
                  value={customEndDate}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>
            )}
          </div>
          <button onClick={clearFilter} style={styles.clearButton}>
            Clear Filter
          </button>
        </div>
        {error ? (
          <div style={styles.error}>Error: {error}</div>
        ) : (
          <div style={styles.mainContent}>
            <div style={styles.chartContainer}>
              <div style={styles.chartLarge}>
                <PersonReport />
              </div>
              <div style={styles.chartSmall}>
                <PersonPiechart />
              </div>
            </div>
          </div>
        )}
      </div>
    </DataContext.Provider>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    padding: '5px',
    boxSizing: 'border-box',
  },
  filterContainer: {
    width: '13%',
    padding: '10px',
    marginRight: '10px',
    borderRadius: '10px',
    border: '2px solid white',
    boxSizing: 'border-box',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  filterItem: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '10px',
    width: '100%',
  },
  label: {
    color: 'black',
    fontSize: '14px',
    marginBottom: '5px',
  },
  input: {
    width: '90%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    color: 'black',
  },
  clearButton: {
    marginTop: '10px',
    padding: '10px 15px',
    backgroundColor: '#e74c3c',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    alignSelf: 'flex-start',
  },
  filterButton: {
    margin: '5px 0',
    padding: '8px 12px',
    backgroundColor: '#3498db',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    alignSelf: 'flex-start',
  },
  customDateFilter: {
    display: 'flex',
    flexDirection: 'column',
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  chartContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: '10px',
  },
  chartLarge: {
    flex: 2,
    padding: '10px',
    borderRadius: '10px',
    backgroundColor: '#34495e',
    color: 'white',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  chartSmall: {
    flex: 1,
    padding: '10px',
    borderRadius: '10px',
    backgroundColor: '#34495e',
    color: 'white',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  error: {
    color: 'red',
    fontSize: '16px',
    fontWeight: 'bold',
  },
};

export default PersonFilter;
