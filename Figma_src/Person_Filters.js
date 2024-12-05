// import React, { useState, useEffect, createContext } from 'react';
// import PersonChart from './Person_Piecharts';
// import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';

// export const DataContext = createContext();

// const PersonFilter = () => {
//   const [chartData, setChartData] = useState([]);
//   const [personId, setPersonId] = useState('');
//   const [personName, setPersonName] = useState('');
//   const [dateFilter, setDateFilter] = useState('');
//   const [error, setError] = useState(null);
//   const [filteredPerson, setFilteredPerson] = useState(null);
//   const [filteredChartData, setFilteredChartData] = useState([]);
//   const [showResults, setShowResults] = useState(false);

//   const handleSearch = () => {
//     setShowResults(true);
//   };

//   useEffect(() => {
//     if (showResults) {
//       fetch('/person_performance 2.json')
//         .then(response => {
//           if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//           }
//           return response.json();
//         })
//         .then(data => {
//           if (data.status) {
//             try {
//               const combinedData = mergeData(data.data.values.tasks, data.data.values.persons);
//               const filteredData = filterData(combinedData);
//               setChartData(filteredData);
//               if (filteredData.length > 0) {
//                 setFilteredPerson(filteredData[0]);
//                 setFilteredChartData(filteredData);
//               } else {
//                 setFilteredPerson(null);
//                 setFilteredChartData([]);
//               }
//             } catch (e) {
//               console.error('Error filtering data:', e);
//               setError('Error filtering data');
//             }
//           } else {
//             throw new Error('Data fetch unsuccessful');
//           }
//         })
//         .catch(error => {
//           console.error('Error loading JSON data:', error);
//           setError('Error loading JSON data');
//         });
//     }
//   }, [showResults, personId, personName, dateFilter]);

//   const mergeData = (tasks, persons) => {
//     const personMap = new Map(persons.map(person => [person['Person ID'], person]));
//     return tasks.map(task => ({
//       ...task,
//       ...personMap.get(task['Person ID'])
//     }));
//   };

//   const filterData = (data) => {
//     const today = new Date();
//     const oneWeekAgo = new Date(today);
//     oneWeekAgo.setDate(today.getDate() - 7);
//     const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
//     const startOfYear = new Date(today.getFullYear(), 0, 1);

//     return data.filter(row => {
//        // Convert 'Task Date' to Date object
//        const rowDateParts = row['Task Date'].split('-');
//        const rowDate = new Date(`${rowDateParts[2]}-${rowDateParts[1]}-${rowDateParts[0]}`); // Assuming format 'dd-mm-yyyy'
 
//       const personIdMatch = !personId || (row['Person ID'] && row['Person ID'].toLowerCase().includes(personId.toLowerCase().trim()));
//       const personNameMatch = !personName || (row['Person Name'] && row['Person Name'].toLowerCase().includes(personName.toLowerCase().trim()));

//       let dateMatch = true;
//       if (dateFilter === 'oneWeek') {
//         dateMatch = rowDate >= oneWeekAgo && rowDate <= today;
//       } else if (dateFilter === 'MTD') {
//         dateMatch = rowDate >= startOfMonth && rowDate <= today;
//       } else if (dateFilter === 'YTD') {
//         dateMatch = rowDate >= startOfYear && rowDate <= today;
//       }

//       return personIdMatch && personNameMatch  && dateMatch;
//     });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name === 'personId') {
//       setPersonId(value);
//     } else if (name === 'personName') {
//       setPersonName(value);
//     }
//   };

//   const clearFilter = () => {
//     setPersonId('');
//     setPersonName('');
//     setDateFilter('');
//     setFilteredPerson(null);
//     setFilteredChartData([]);
//     setShowResults(false);
//   };

//   const applyDateFilter = (filterType) => {
//     setDateFilter(filterType);
//   };

//   const renderList = () => {
//     if (!filteredPerson) return null;

//     return (
//       <div style={styles.listContainer}>
//         <h3 style={styles.listTitle}>Person Details</h3>
//         <div style={{ display: 'flex', alignItems: 'flex-start' }}>
//           <div style={styles.imageContainer}>
//             <img
//               src={filteredPerson['claim.png'] || 'girl.png'} // Use a default image if the source is missing
//               alt="Person"
//               style={styles.image}
//             />
//           </div>
//           <div style={styles.detailsContainer}>
//   <ul style={styles.list}>
//     <li style={styles.listItem}>
//       <div style={styles.fieldContainer}>
//         <span style={styles.field}>Name:</span>
//         <span style={styles.data}>{filteredPerson['Person Name']}</span>
//       </div>
//     </li>
//     <li style={styles.listItem}>
//       <div style={styles.fieldContainer}>
//         <span style={styles.field}>Role:</span>
//         <span style={styles.data}>{filteredPerson['Person Role']}</span>
//       </div>
//     </li>
//     <li style={styles.listItem}>
//       <div style={styles.fieldContainer}>
//         <span style={styles.field}>Address:</span>
//         <span style={styles.data}>{filteredPerson['Address1']}</span>
//       </div>
//     </li>
//     <li style={styles.listItem}>
//       <div style={styles.fieldContainer}>
//         <span style={styles.field}>State:</span>
//         <span style={styles.data}>{filteredPerson['State']}</span>
//       </div>
//     </li>
//     <li style={styles.listItem}>
//       <div style={styles.fieldContainer}>
//         <span style={styles.field}>Zip:</span>
//         <span style={styles.data}>{filteredPerson['Zip']}</span>
//       </div>
//     </li>
//     <li style={styles.listItem}>
//       <div style={styles.fieldContainer}>
//         <span style={styles.field}>Phone:</span>
//         <span style={styles.data}>{filteredPerson['Phone']}</span>
//       </div>
//     </li>
//     <li style={styles.listItem}>
//       <div style={styles.fieldContainer}>
//         <span style={styles.field}>Email:</span>
//         <span style={styles.data}>{filteredPerson['Email']}</span>
//       </div>
//     </li>
//   </ul>
// </div>



//         </div>
//       </div>
//     );
//   };

//   const columnDefs = [
//     { headerName: "Person ID", field: "Person ID" },
//     { headerName: 'Person Name', field: 'Person Name' },
//     { headerName: "Action Type", field: "Action Type" },
//     { headerName: "Policy/Quote No", field: "Policy/Quote No" },
//     { headerName: "Task Date", field: "Task Date" },
//     { headerName: "Person Status Code", field: "Person Status Code" }
//   ];

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
//             <label style={styles.label}>Person Name:</label>
//             <input
//               type="text"
//               name="personName"
//               value={personName}
//               onChange={handleInputChange}
//               style={styles.input}
//             />
//           </div>
//          <div style={styles.filterItem}>
//             <label style={styles.label}>Date Filter:</label>
//             <div style={styles.buttonGroup}>
//               <button onClick={() => applyDateFilter('oneWeek')} style={styles.filterButton}>
//                 WTD
//               </button>
//               <button onClick={() => applyDateFilter('MTD')} style={styles.filterButton}>
//                 MTD
//               </button>
//               <button onClick={() => applyDateFilter('YTD')} style={styles.filterButton}>
//                 YTD
//               </button>
//             </div>
//           </div>
//           <button onClick={handleSearch} style={styles.searchButton}>
//             Search
//           </button>
//           <button onClick={clearFilter} style={styles.clearButton}>
//             Clear Filters
//           </button>
//         </div>

//         <div style={styles.mainContent}>
//           {error ? (
//             <div style={styles.error}>Error: {error}</div>
//           ) : (
//             showResults && (
//               <div style={styles.resultWrapper}>
//                 <div style={styles.listChartContainer}>
//                   <div style={styles.listContainer}>
//                     {filteredPerson ? renderList() : (
//                       <div style={styles.noData}>No matching person found. Please adjust your filters.</div>
//                     )}
//                   </div>
//                   <div style={styles.chartContainer}>
//                     <PersonChart data={filteredChartData} />
//                   </div>
//                 </div>
//                 <div style={styles.tableContainer}>
//                   <div className="ag-theme-alpine" style={styles.agGridContainer}>
//                     <AgGridReact
//                       rowData={filteredChartData}
//                       columnDefs={columnDefs}
//                       pagination={true}
//                       paginationPageSize={10}
//                       defaultColDef={{ sortable: true, filter: true }}
//                     />
//                   </div>
//                 </div>
//               </div>
//             )
//           )}
//         </div>
//       </div>
//     </DataContext.Provider>
//   );
// };
// const styles = {
//   container: {
//     display: 'flex',
//     flexDirection: 'column',
//     width: '100%',
//     padding: '10px',
//     boxSizing: 'border-box',
//     backgroundColor: '#f4f4f4',
//   },
//   filterContainer: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     gap: '10px',
//     marginBottom: '20px',
//     borderRadius: '5px',
//     border: '2px solid #d5d8dc',
//     boxSizing: 'border-box',
//     backgroundColor: '#ecf0f1',
//     padding: '10px',
//   },
//   filterItem: {
//     display: 'flex',
//     flexDirection: 'column',
//     flex: '1',
//     minWidth: '150px',
//   },
//   label: {
//     display: 'block',
//     fontWeight: 'bold',
//     marginBottom: '5px',
//   },
//   input: {
//     width: '100%',
//     padding: '8px',
//     borderRadius: '5px',
//     border: '1px solid #ccc',
//     boxSizing: 'border-box',
//   },
//   buttonGroup: {
//     display: 'flex',
//     gap: '1px',
//     marginTop: '5px',
//   },
//   filterButton: {
//     padding: '6px 12px',
//     borderRadius: 'px',
//     border: '1px solid #3498db',
//     backgroundColor: '#3498db',
//     color: '#fff',
//     cursor: 'pointer',
//     outline: 'none',
//     fontSize: '14px',
//     transition: 'background-color 0.3s, transform 0.2s',
//   },
//   filterButtonHover: {
//     backgroundColor: '#2980b9',
//     transform: 'scale(1.05)',
//   },
//   searchButton: {
//     padding: '4px 11px',
//     borderRadius: '5px',
//     border: 'none',
//     backgroundColor: '#2ecc71',
//     color: '#fff',
//     marginTop: '13px',
//     cursor: 'pointer',
//     outline: 'none',
//     fontSize: '16px',
//     transition: 'background-color 0.3s, transform 0.2s',
//     height: '35px',
//   },
//   searchButtonHover: {
//     backgroundColor: '#27ae60',
//     transform: 'scale(1.05)',
//   },
//   clearButton: {
//     padding: '6px 9px',
//     borderRadius: '5px',
//     border: 'none',
//     marginTop: '13px',
//     backgroundColor: '#e74c3c',
//     color: '#fff',
//     cursor: 'pointer',
//     outline: 'none',
//     fontSize: '16px',
//     transition: 'background-color 0.3s, transform 0.2s',
//     height: '35px',
//   },
//   clearButtonHover: {
//     backgroundColor: '#c0392b',
//     transform: 'scale(1.05)',
//   },
//   mainContent: {
//     display: 'flex',
//     flexDirection: 'column',
//     marginTop: '20px',
//   },
//   resultWrapper: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '20px',
//   },
//   listChartContainer: {
//     display: 'flex',
//     flexDirection: 'row',
//     gap: '20px',
//   },
//   listContainer: {
//     flex: 1,
//     padding: '10px',
//     backgroundColor: '#fff',
//     borderRadius: '5px',
//   },
//   listTitle: {
//     fontSize: '22px',
//     fontWeight: 'bold',
//     marginTop: '-2px',
//     marginBottom: '20px',
//     textAlign: 'center',
//     backgroundColor: '#1c2833',
//     color: '#fff',
//     borderRadius: '5px',
//     padding: '3px',
//     boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
//   },
//   list: {
//     listStyleType: 'none',
//     padding: 0,
//     margin: 0,
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '15px', // Controlled spacing between items
//   },
//   listItem: {
//     display: 'flex',
//     alignItems: 'left',
//     padding: '1px 1px',
//     backgroundColor: '#f9f9f9',
//     borderRadius: '8px',
//     boxShadow: '0 1px 5px rgba(0,0,0,0.1)',
//     // No additional spacing here as it's handled in fieldContainer
//   },
//   fieldContainer: {
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between', // Ensure spacing between field and data
//     width: '80%', // Full width of the list item
//   },
//   field: {
//     fontWeight: 'bold',
//     flex: '1', // Allow the field to take up available space
//     textAlign: 'left', // Align text to the left
//   },
//   data: {
//     flex: '1', // Allow the data to take up remaining space
//     textAlign: 'left', // Align text to the right if needed
//   },
//   imageContainer: {
//     width: '80px',
//     height: '80px',
//     marginRight: '20px',
//     borderRadius: '50%',
//     overflow: 'hidden',
//     border: '2px solid #ddd',
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//     objectFit: 'cover',
//   },
//   separatorLine: {
//     width: '2px',
//     height: '100%',
//     backgroundColor: '#ddd',
//     margin: '0 15px',
//   },
//   detailsContainer: {
//     display: 'flex',
//     flexDirection: 'column',
//     flex: 1,
//   },
//   detailText: {
//     fontSize: '16px',
//     color: '#333',
//     marginBottom: '5px',
//   },
//   noData: {
//     fontSize: '16px',
//     color: '#e74c3c',
//     fontWeight: 'bold',
//   },
//   chartContainer: {
//     flex: 1,
//     padding: '15px',
//     backgroundColor: '#fff',
//     borderRadius: '5px',
//     boxShadow: '0 0 10px rgba(0,0,0,0.1)',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '40%',
//   },
//   tableContainer: {
//     flex: 1,
//   },
//   agGridContainer: {
//     height: '400px',
//     width: '100%',
//   },
//   error: {
//     color: 'red',
//     fontWeight: 'bold',
//   },
// };


// export default PersonFilter;



//  import React, { useState, useEffect, createContext } from 'react';
// import PersonChart from './Person_Piecharts';
// import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';

// export const DataContext = createContext();

// const PersonFilter = () => {
//   const [chartData, setChartData] = useState([]);
//   const [personId, setPersonId] = useState('');
//   const [personName, setPersonName] = useState('');
//   const [dateFilter, setDateFilter] = useState('');
//   const [customStartDate, setCustomStartDate] = useState('');
//   const [customEndDate, setCustomEndDate] = useState('');
//   const [error, setError] = useState(null);
//   const [filteredPerson, setFilteredPerson] = useState(null);
//   const [filteredChartData, setFilteredChartData] = useState([]);
//   const [showResults, setShowResults] = useState(false);

//   const handleSearch = () => {
//     setShowResults(true);
//   };

//   useEffect(() => {
//     if (showResults) {
//       fetch('/person_performance 2.json')
//         .then(response => {
//           if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//           }
//           return response.json();
//         })
//         .then(data => {
//           if (data.status) {
//             try {
//               const combinedData = mergeData(data.data.values.tasks, data.data.values.persons);
//               const filteredData = filterData(combinedData);
//               setChartData(filteredData);
//               if (filteredData.length > 0) {
//                 setFilteredPerson(filteredData[0]);
//                 setFilteredChartData(filteredData);
//               } else {
//                 setFilteredPerson(null);
//                 setFilteredChartData([]);
//               }
//             } catch (e) {
//               console.error('Error filtering data:', e);
//               setError('Error filtering data');
//             }
//           } else {
//             throw new Error('Data fetch unsuccessful');
//           }
//         })
//         .catch(error => {
//           console.error('Error loading JSON data:', error);
//           setError('Error loading JSON data');
//         });
//     }
//   }, [showResults, personId, personName, dateFilter, customStartDate, customEndDate]);

//   const mergeData = (tasks, persons) => {
//     const personMap = new Map(persons.map(person => [person['Person ID'], person]));
//     return tasks.map(task => ({
//       ...task,
//       ...personMap.get(task['Person ID'])
//     }));
//   };

//   const filterData = (data) => {
//     const today = new Date();
//     const oneWeekAgo = new Date(today);
//     oneWeekAgo.setDate(today.getDate() - 7);
//     const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
//     const startOfYear = new Date(today.getFullYear(), 0, 1);

//     return data.filter(row => {
//       // Convert 'Task Date' to Date object
//       const rowDateParts = row['Task Date'].split('-');
//       const rowDate = new Date(`${rowDateParts[2]}-${rowDateParts[1]}-${rowDateParts[0]}`); // Assuming format 'dd-mm-yyyy'

//       const personIdMatch = !personId || (row['Person ID'] && row['Person ID'].toLowerCase().includes(personId.toLowerCase().trim()));
//       const personNameMatch = !personName || (row['Person Name'] && row['Person Name'].toLowerCase().includes(personName.toLowerCase().trim()));

//       let dateMatch = true;
//       if (dateFilter === 'oneWeek') {
//         dateMatch = rowDate >= oneWeekAgo && rowDate <= today;
//       } else if (dateFilter === 'MTD') {
//         dateMatch = rowDate >= startOfMonth && rowDate <= today;
//       } else if (dateFilter === 'YTD') {
//         dateMatch = rowDate >= startOfYear && rowDate <= today;
//       } else if (dateFilter === 'custom') {
//         const startDate = new Date(customStartDate);
//         const endDate = new Date(customEndDate);
//         dateMatch = rowDate >= startDate && rowDate <= endDate;
//       }

//       return personIdMatch && personNameMatch && dateMatch;
//     });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name === 'personId') {
//       setPersonId(value);
//     } else if (name === 'personName') {
//       setPersonName(value);
//     }
//   };

//   const clearFilter = () => {
//     setPersonId('');
//     setPersonName('');
//     setDateFilter('');
//     setCustomStartDate('');
//     setCustomEndDate('');
//     setFilteredPerson(null);
//     setFilteredChartData([]);
//     setShowResults(false);
//   };

//   const applyDateFilter = (filterType) => {
//     setDateFilter(filterType);
//   };

//   const renderList = () => {
//     if (!filteredPerson) return null;

//     return (
//       <div style={styles.listContainer}>
//         <h3 style={styles.listTitle}>Person Details</h3>
//         <div style={{ display: 'flex', alignItems: 'flex-start' }}>
//           <div style={styles.imageContainer}>
//             <img
//               src={filteredPerson['claim.png'] || 'girl.png'} // Use a default image if the source is missing
//               alt="Person"
//               style={styles.image}
//             />
//           </div>
//           <div style={styles.detailsContainer}>
//             <ul style={styles.list}>
//               <li style={styles.listItem}>
//                 <div style={styles.fieldContainer}>
//                   <span style={styles.field}>Name:</span>
//                   <span style={styles.data}>{filteredPerson['Person Name']}</span>
//                 </div>
//               </li>
//               <li style={styles.listItem}>
//                 <div style={styles.fieldContainer}>
//                   <span style={styles.field}>Role:</span>
//                   <span style={styles.data}>{filteredPerson['Person Role']}</span>
//                 </div>
//               </li>
//               <li style={styles.listItem}>
//                 <div style={styles.fieldContainer}>
//                   <span style={styles.field}>Completed Tasks:</span>
//                   <span style={styles.data}>{filteredPerson['Completed Tasks']}</span>
//                 </div>
//               </li>
//               <li style={styles.listItem}>
//                 <div style={styles.fieldContainer}>
//                   <span style={styles.field}>Pending Tasks:</span>
//                   <span style={styles.data}>{filteredPerson['Pending Tasks']}</span>
//                 </div>
//               </li>
//               <li style={styles.listItem}>
//                 <div style={styles.fieldContainer}>
//                   <span style={styles.field}>Total Tasks:</span>
//                   <span style={styles.data}>{filteredPerson['Total Tasks']}</span>
//                 </div>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div>
//       <div style={styles.filtersContainer}>
//         <div style={styles.filterItem}>
//           <label style={styles.label}>Person ID:</label>
//           <input
//             type="text"
//             name="personId"
//             value={personId}
//             onChange={handleInputChange}
//             style={styles.input}
//           />
//         </div>
//         <div style={styles.filterItem}>
//           <label style={styles.label}>Person Name:</label>
//           <input
//             type="text"
//             name="personName"
//             value={personName}
//             onChange={handleInputChange}
//             style={styles.input}
//           />
//         </div>
//         <div style={styles.filterItem}>
//           <label style={styles.label}>Date Range:</label>
//           <select
//             value={dateFilter}
//             onChange={(e) => applyDateFilter(e.target.value)}
//             style={styles.select}
//           >
//             <option value="">Select Date Filter</option>
//             <option value="oneWeek">Last 7 Days</option>
//             <option value="MTD">Month to Date</option>
//             <option value="YTD">Year to Date</option>
//             <option value="custom">Custom Range</option>
//           </select>
//         </div>
//         {dateFilter === 'custom' && (
//           <div style={styles.filterItem}>
//             <label style={styles.label}>Custom Date Range:</label>
//             <div style={{ display: 'flex', gap: '10px' }}>
//               <input
//                 type="date"
//                 name="customStartDate"
//                 value={customStartDate}
//                 onChange={(e) => setCustomStartDate(e.target.value)}
//                 style={styles.input}
//               />
//               <input
//                 type="date"
//                 name="customEndDate"
//                 value={customEndDate}
//                 onChange={(e) => setCustomEndDate(e.target.value)}
//                 style={styles.input}
//               />
//             </div>
//           </div>
//         )}
//         <div style={styles.filterItem}>
//           <button onClick={handleSearch} style={styles.filterButton}>
//             Apply Filters
//           </button>
//           <button onClick={clearFilter} style={styles.filterButton}>
//             Clear Filters
//           </button>
//         </div>
//       </div>
//       {error && <div style={styles.error}>{error}</div>}
//       {showResults && (
//         <div>
//           {renderList()}
//           <PersonChart chartData={filteredChartData} />
//           <div
//             style={{
//               height: '500px',
//               width: '100%',
//               marginTop: '20px',
//               boxShadow: '0px 0px 10px rgba(0,0,0,0.1)'
//             }}
//             className="ag-theme-alpine"
//           >
//             <AgGridReact
//               rowData={filteredChartData}
//               columnDefs={[
//                 { headerName: 'Person ID', field: 'Person ID' },
//                 { headerName: 'Person Name', field: 'Person Name' },
//                 { headerName: 'Task Date', field: 'Task Date' },
//                 { headerName: 'Completed Tasks', field: 'Completed Tasks' },
//                 { headerName: 'Pending Tasks', field: 'Pending Tasks' },
//                 { headerName: 'Total Tasks', field: 'Total Tasks' }
//               ]}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const styles = {
//   filtersContainer: {
//     padding: '20px',
//     border: '1px solid #ccc',
//     borderRadius: '5px',
//     marginBottom: '20px',
//     backgroundColor: '#f9f9f9'
//   },
//   filterItem: {
//     marginBottom: '15px'
//   },
//   label: {
//     display: 'block',
//     marginBottom: '5px',
//     fontWeight: 'bold'
//   },
//   input: {
//     width: '100%',
//     padding: '8px',
//     boxSizing: 'border-box'
//   },
//   select: {
//     width: '100%',
//     padding: '8px',
//     boxSizing: 'border-box'
//   },
//   filterButton: {
//     marginRight: '10px',
//     padding: '10px 15px',
//     backgroundColor: '#007bff',
//     color: '#fff',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer'
//   },
//   error: {
//     color: 'red',
//     marginBottom: '15px'
//   },
//   listContainer: {
//     padding: '20px',
//     border: '1px solid #ccc',
//     borderRadius: '5px',
//     backgroundColor: '#fff'
//   },
//   listTitle: {
//     fontSize: '20px',
//     marginBottom: '15px'
//   },
//   imageContainer: {
//     marginRight: '20px'
//   },
//   image: {
//     width: '100px',
//     height: '100px',
//     borderRadius: '50%',
//     objectFit: 'cover'
//   },
//   detailsContainer: {
//     flex: 1
//   },
//   list: {
//     listStyle: 'none',
//     padding: 0,
//     margin: 0
//   },
//   listItem: {
//     marginBottom: '10px'
//   },
//   fieldContainer: {
//     display: 'flex',
//     justifyContent: 'space-between'
//   },
//   field: {
//     fontWeight: 'bold'
//   },
//   data: {
//     fontWeight: 'normal'
//   }
// };

// export default PersonFilter;



import React, { useState, useEffect, createContext } from 'react';
import PersonChart from './Person_Piecharts';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

export const DataContext = createContext();

const PersonFilter = () => {
  const [chartData, setChartData] = useState([]);
  const [personId, setPersonId] = useState('');
  const [personName, setPersonName] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [error, setError] = useState(null);
  const [filteredPerson, setFilteredPerson] = useState(null);
  const [filteredChartData, setFilteredChartData] = useState([]);
  const [showResults, setShowResults] = useState(false);

  // Custom Date Range State
  const [showCustomDateRange, setShowCustomDateRange] = useState(false);
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');

  const handleSearch = () => {
    setShowResults(true);
  };

  useEffect(() => {
    if (showResults) {
      fetch('/person_performance 2.json')
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          if (data.status) {
            try {
              const combinedData = mergeData(data.data.values.tasks, data.data.values.persons);
              const filteredData = filterData(combinedData);
              setChartData(filteredData);
              if (filteredData.length > 0) {
                setFilteredPerson(filteredData[0]);
                setFilteredChartData(filteredData);
              } else {
                setFilteredPerson(null);
                setFilteredChartData([]);
              }
            } catch (e) {
              console.error('Error filtering data:', e);
              setError('Error filtering data');
            }
          } else {
            throw new Error('Data fetch unsuccessful');
          }
        })
        .catch(error => {
          console.error('Error loading JSON data:', error);
          setError('Error loading JSON data');
        });
    }
  }, [showResults, personId, personName, dateFilter, customStartDate, customEndDate]);

  const mergeData = (tasks, persons) => {
    const personMap = new Map(persons.map(person => [person['Person ID'], person]));
    return tasks.map(task => ({
      ...task,
      ...personMap.get(task['Person ID'])
    }));
  };

  const filterData = (data) => {
    const today = new Date();
    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(today.getDate() - 7);
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startOfYear = new Date(today.getFullYear(), 0, 1);

    return data.filter(row => {
      // Convert 'Task Date' to Date object
      const rowDateParts = row['Task Date'].split('-');
      const rowDate = new Date(`${rowDateParts[2]}-${rowDateParts[1]}-${rowDateParts[0]}`); // Assuming format 'dd-mm-yyyy'
  
      const personIdMatch = !personId || (row['Person ID'] && row['Person ID'].toLowerCase().includes(personId.toLowerCase().trim()));
      const personNameMatch = !personName || (row['Person Name'] && row['Person Name'].toLowerCase().includes(personName.toLowerCase().trim()));

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

      return personIdMatch && personNameMatch && dateMatch;
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'personId') {
      setPersonId(value);
    } else if (name === 'personName') {
      setPersonName(value);
    }
  };

  const clearFilter = () => {
    setPersonId('');
    setPersonName('');
    setDateFilter('');
    setFilteredPerson(null);
    setFilteredChartData([]);
    setShowResults(false);
    setCustomStartDate('');
    setCustomEndDate('');
    setShowCustomDateRange(false);
  };

  const applyDateFilter = (filterType) => {
    setDateFilter(filterType);
    if (filterType !== 'custom') {
      setCustomStartDate('');
      setCustomEndDate('');
      setShowCustomDateRange(false);
    }
  };

  const handleCustomDateRange = () => {
    if (customStartDate && customEndDate) {
      const startDate = new Date(customStartDate);
      const endDate = new Date(customEndDate);
      const filteredData = chartData.filter(row => {
        const rowDateParts = row['Task Date'].split('-');
        const rowDate = new Date(`${rowDateParts[2]}-${rowDateParts[1]}-${rowDateParts[0]}`); // Assuming format 'dd-mm-yyyy'
        return rowDate >= startDate && rowDate <= endDate;
      });
      setFilteredChartData(filteredData);
      setFilteredPerson(filteredData.length > 0 ? filteredData[0] : null);
      setShowCustomDateRange(false);
    }
  };

  const renderList = () => {
    if (!filteredPerson) return null;

    return (
      <div style={styles.listContainer}>
        <h3 style={styles.listTitle}>Person Details</h3>
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <div style={styles.imageContainer}>
            <img
              src={filteredPerson['claim.png'] || 'girl.png'} // Use a default image if the source is missing
              alt="Person"
              style={styles.image}
            />
          </div>
          <div style={styles.detailsContainer}>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <div style={styles.fieldContainer}>
                  <span style={styles.field}>Name:</span>
                  <span style={styles.data}>{filteredPerson['Person Name']}</span>
                </div>
              </li>
              <li style={styles.listItem}>
                <div style={styles.fieldContainer}>
                  <span style={styles.field}>Role:</span>
                  <span style={styles.data}>{filteredPerson['Person Role']}</span>
                </div>
              </li>
              <li style={styles.listItem}>
                <div style={styles.fieldContainer}>
                  <span style={styles.field}>Address:</span>
                  <span style={styles.data}>{filteredPerson['Address1']}</span>
                </div>
              </li>
              <li style={styles.listItem}>
                <div style={styles.fieldContainer}>
                  <span style={styles.field}>State:</span>
                  <span style={styles.data}>{filteredPerson['State']}</span>
                </div>
              </li>
              <li style={styles.listItem}>
                <div style={styles.fieldContainer}>
                  <span style={styles.field}>Zip:</span>
                  <span style={styles.data}>{filteredPerson['Zip']}</span>
                </div>
              </li>
              <li style={styles.listItem}>
                <div style={styles.fieldContainer}>
                  <span style={styles.field}>Phone:</span>
                  <span style={styles.data}>{filteredPerson['Phone']}</span>
                </div>
              </li>
              <li style={styles.listItem}>
                <div style={styles.fieldContainer}>
                  <span style={styles.field}>Email:</span>
                  <span style={styles.data}>{filteredPerson['Email']}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const columnDefs = [
    { headerName: "Person ID", field: "Person ID" },
    { headerName: 'Person Name', field: 'Person Name' },
    { headerName: "Action Type", field: "Action Type" },
    { headerName: "Policy/Quote No", field: "Policy/Quote No" },
    { headerName: "Task Date", field: "Task Date" },
    { headerName: "Person Status Code", field: "Person Status Code" }
  ];

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
            <label style={styles.label}>Person Name:</label>
            <input
              type="text"
              name="personName"
              value={personName}
              onChange={handleInputChange}
              style={styles.input}
            />
          </div>
          <div style={styles.filterItem}>
            <label style={styles.label}>Date Filter:</label>
            <div style={styles.buttonGroup}>
              <button onClick={() => applyDateFilter('oneWeek')} style={styles.filterButton}>
                WTD
              </button>
              <button onClick={() => applyDateFilter('MTD')} style={styles.filterButton}>
                MTD
              </button>
              <button onClick={() => applyDateFilter('YTD')} style={styles.filterButton}>
                YTD
              </button>
              <button onClick={() => setShowCustomDateRange(true)} style={styles.filterButton}>
                Custom
              </button>
            </div>
          </div>
          {showCustomDateRange && (
            <div style={styles.customDateRangeContainer}>
              <label style={styles.label}>Start Date:</label>
              <input
                type="date"
                value={customStartDate}
                onChange={(e) => setCustomStartDate(e.target.value)}
                style={styles.input}
              />
              <label style={styles.label}>End Date:</label>
              <input
                type="date"
                value={customEndDate}
                onChange={(e) => setCustomEndDate(e.target.value)}
                style={styles.input}
              />
              <button onClick={handleCustomDateRange} style={styles.searchButton}>
                Apply
              </button>
              <button onClick={() => setShowCustomDateRange(false)} style={styles.clearButton}>
                Cancel
              </button>
            </div>
          )}
          <button onClick={handleSearch} style={styles.searchButton}>
            Search
          </button>
          <button onClick={clearFilter} style={styles.clearButton}>
            Clear
          </button>
        </div>
        {error && <div style={styles.error}>{error}</div>}
        <div style={styles.gridContainer}>
          <div className="ag-theme-alpine" style={styles.grid}>
            <AgGridReact
              rowData={filteredChartData}
              columnDefs={columnDefs}
              pagination={true}
              paginationPageSize={10}
              domLayout='autoHeight'
            />
          </div>
        </div>
        {showResults && renderList()}
        <PersonChart data={chartData} />
      </div>
    </DataContext.Provider>
  );
};

const styles = {
  container: {
    padding: '20px',
  },
  filterContainer: {
    marginBottom: '20px',
  },
  filterItem: {
    marginBottom: '10px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    width: '200px',
    padding: '8px',
    fontSize: '16px',
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
  },
  filterButton: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  searchButton: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    marginRight: '10px',
  },
  clearButton: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
  },
  customDateRangeContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    marginBottom: '20px',
  },
  gridContainer: {
    marginBottom: '20px',
  },
  grid: {
    height: '400px',
    width: '100%',
  },
  error: {
    color: 'red',
    marginBottom: '20px',
  },
  listContainer: {
    marginTop: '20px',
  },
  listTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  imageContainer: {
    marginRight: '20px',
  },
  image: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  detailsContainer: {
    flex: 1,
  },
  list: {
    listStyleType: 'none',
    padding: '0',
    margin: '0',
  },
  listItem: {
    marginBottom: '10px',
  },
  fieldContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  field: {
    fontWeight: 'bold',
  },
  data: {
    marginLeft: '10px',
  },
};

export default PersonFilter;
