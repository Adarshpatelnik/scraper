import React from 'react';
import TransecationFilter from './TransecationFilter';
import TransactionChart from './TransactionChart';
import TransactionPiechart from './TransactionPiechart';
import TransactionReport from './TransactionReport';
// import SidebarComponent from './Sidebar';
// import PolicyNavbar from './PolicyNavbar';

const TransactionDashboard = () => {
  return (
    <>
      {/* <SidebarComponent /> */}
      <div style={styles.dashboardContainer}>
        {/* <PolicyNavbar /> */}
        <TransecationFilter>
          <TransactionChart /> 
          <TransactionPiechart />
        </TransecationFilter>
        <TransactionReport />
      </div>
    </>
  );
};

const styles = {
  dashboardContainer: {
    // marginLeft: '6%', 
    // marginTop: '5rem',
    backgroundColor: '#d5dbdb',
    padding: '1rem' 
  },
};

export default TransactionDashboard;








