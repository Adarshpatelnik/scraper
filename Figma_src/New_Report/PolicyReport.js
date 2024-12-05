import React from 'react';
import PolicyChart from '../PolicyChart';
import PolicyTable from '../PolicyTable';

const PolicyReport = () => {
  return (
    <div>
      <h1>Policy Expiration Report</h1>
      <PolicyChart />
      <PolicyTable />
    </div>
  );
};

export default PolicyReport;
