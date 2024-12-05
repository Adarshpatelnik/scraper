import React from 'react';
import DataFilter from './DataFilter';
import Datachart from './Datachart';
import DataPaichart from './Datapaichart';
import DataReport from './DataReport';
// import SidebarComponent from './Sidebar';
// import DataNavbar from './DataNavbar';

const DataDashboard = () => {
  return (
    <>
      {/* <SidebarComponent /> */}
      <div style={styles.dashboardContainer}>
        {/* <DataNavbar /> */}
        <DataFilter>
          <Datachart /> 
          <DataPaichart />
        </DataFilter>
        <DataReport />
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

export default DataDashboard;
