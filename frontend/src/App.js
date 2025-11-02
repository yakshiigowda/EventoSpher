// src/App.js
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./login";
// import Dashboard from "./dashboard";

// function App() {
//   return (
//     <div>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Login />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;

// -----user gretting----

// import React from 'react';
// import Usergreet from './usergreeting';

// function App(){
// //   return <div><Usergreet username="sachine"/> 
// //  <Usergreet healthcare="cureblend"/> </div>  // if i do like that i can get two times welcome paragraph -- go to option 2

// return <div> <Usergreet isloggedin={true} username="RAMA" healthcare="cureblend"/>
// </div>
// }
// export default App;

import Contact from './counter';
function App(){
    return <div> <Contact/> </div>
}
export default App;