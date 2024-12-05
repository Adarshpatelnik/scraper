import React from 'react';
import DataFetchFilterComponent from './DataFetchFilterComponent';
import ChartComponent from './ChartComponent';
import ExpirationPie from './ExpirationPie';
import ClaimReport from './Claim_Report';
// import SidebarComponent from './Sidebar';
// import NavbarExpired from './NavbarExpired';

const Dashboard = () => {
  return (
    <>
      {/* <SidebarComponent /> */}
      <div style={styles.dashboardContainer}>
        {/* <NavbarExpired /> */}
        <DataFetchFilterComponent>
          <ChartComponent /> 
          <ExpirationPie />
        </DataFetchFilterComponent>
        <ClaimReport />
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

export default Dashboard;
