// import React from 'react';
// import { DataProvider } from './Person_Filter';
// import Person_Piechart from './Person_Piechart';
// import Person_Report from './Person_Report'; 

// const TransactionDashboard = () => {
//   return (
//     <>
//       {/* <SidebarComponent /> */}
//       <div style={styles.dashboardContainer}>
//         {/* <PolicyNavbar /> */}
//         <DataProvider>
//           <Person_Piechart /> 
//           <Person_Report />
//         </DataProvider>
//       </div>
//     </>
//   );
// };

// const styles = {
//   dashboardContainer: {
//     // marginLeft: '6%', 
//     // marginTop: '5rem',
//     backgroundColor: '#d5dbdb',
//     padding: '1rem' 
//   },
// };

// export default TransactionDashboard;








// // TransactionDashboard.js
// import React from 'react';
// import DataProvider  from './Person_Filter';
// import Person_Piechart from './Person_Piechart';
// import Person_Report from './Person_Report'; 

// const TransactionDashboard = () => {
//   return (
//     <>
//       <div style={styles.dashboardContainer}>
//         <DataProvider>
//           <Person_Piechart /> 
//           <Person_Report />
//         </DataProvider>
//       </div>
//     </>
//   );
// };

// const styles = {
//   dashboardContainer: {
//     backgroundColor: '#d5dbdb',
//     padding: '1rem' 
//   },
// };

// export default TransactionDashboard;




import React from 'react';
import DataProvider from './Person_Filter';
import Person_Piechart from './Person_Piechart';
import Person_Report from './Person_Report';  

const TransactionDashboard = () => {
  return (
    <div style={styles.dashboardContainer}>
      <DataProvider>
        <Person_Piechart /> 
         <Person_Report />  
      </DataProvider>
    </div>
  );
};

const styles = {
  dashboardContainer: {
    backgroundColor: '#d5dbdb',
    padding: '1rem',
  },
};

export default TransactionDashboard;
