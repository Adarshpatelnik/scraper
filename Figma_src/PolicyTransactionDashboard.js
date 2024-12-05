import React from 'react';
import FilterPolicyTransaction from './FilterPolicyTransaction';
import PolicyChartComponent from './PolicyChartComponent';
import PolicyExpirationPie from './PolicyExpirationPie';
// import SidebarComponent from './Sidebar';
// import PolicyNavbar from './PolicyNavbar';
import PolicyReport from './Policy_Report';

const PolicyTransactionDashboard = () => {
  return (
    <>
      {/* <SidebarComponent /> */}
    <div style={styles.dashboardContainer}>
    {/* <PolicyNavbar /> */}
      <FilterPolicyTransaction>
        <PolicyChartComponent /> 
        <PolicyExpirationPie />
      </FilterPolicyTransaction>
      <PolicyReport />


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

export default PolicyTransactionDashboard;