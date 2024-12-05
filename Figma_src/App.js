// // // import React from 'react';
// // import PolicyReport from './New_Report/PolicyReport';

// // function App() {
// //     return (
// //         <div className="App">
// //             <PolicyReport />
// //         </div>
// //     );
// // }
// // export default App;


// // import React from 'react';
// // import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// // import Landing from './Landing';
// // import DashboardPage from './DashboardPage';
// // import PolicyTransactionDashboard from './PolicyTransactionDashboard';
// // import DataDashboard from './DataDashboard';
// // const App = () => {
// //   return (
// //     <Router>
// //       <div className="App">
// //         <Routes>
// //           <Route path="/" element={<Landing />} />
// //           <Route path="/DashboardPage" element={<DashboardPage />} />
// //           <Route path="/PolicyTransactionDashboard" element={<PolicyTransactionDashboard />} />
// //           <Route path="/DataDashboard" element={<DataDashboard />} />
// //         </Routes>
// //       </div>
// //     </Router>
// //   );
// // };
// // export default App;




// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Landing from './Landing2'; 
// import Persondashbord from './Person_Performance/Persondashbord';
// const App = () => {
//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           <Route path="/" element={<Landing />} />
            
//           <Route path="/Persondashbord" element={<Persondashbord />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };
// export default App;




import React from 'react';
import TransactionDashboard from './Person_Filters';

function App() {
    return (
        <div className="App">
            <TransactionDashboard />
        </div>
    );
}

export default App;