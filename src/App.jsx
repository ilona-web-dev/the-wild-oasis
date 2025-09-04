import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import Cabins from './pages/Cabins';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Account from './pages/Account';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';

function App() {
   return (
      <>
         <GlobalStyles />
         <BrowserRouter>
            <Routes>
               <Route index element={<Navigate replace to="dashboard" />} />
               <Route path="dashboard" element={<Dashboard />} />
               <Route path="bookings" element={<Bookings />} />
               <Route path="cabins" element={<Cabins />} />
               <Route path="users" element={<Users />} />
               <Route path="settings" element={<Settings />} />
               <Route path="account" element={<Account />} />
               <Route path="login" element={<Login />} />
               <Route path="*" element={<PageNotFound />} />
            </Routes>
         </BrowserRouter>
      </>
   );
}

export default App;

// import styled from 'styled-components';
// import GlobalStyles from './styles/GlobalStyles';
// import Button from './ui/Button';
// import Heading from './ui/Heading';
// import Input from './ui/Input';
// import Row from './ui/Row';
// import Bookings from './pages/Bookings';
// import Cabins from './pages/Cabins';

// const StyledApp = styled.main`
//    padding: 20px;
// `;

// function App() {
//    return (
//       <>
//          <GlobalStyles />
//          <StyledApp>
//             <Row type="vertical">
//                <Row type="horizontal">
//                   <Heading as="h1">The Wild Oasis</Heading>
//                   <div>
//                      <Heading as="h2">Check in and out</Heading>
//                      <Button size="medium" variation="primary">
//                         Check in
//                      </Button>
//                      <Button>Check out</Button>
//                   </div>
//                </Row>
//                <Row type="vertical">
//                   <Heading as="h3">Form</Heading>
//                   <form>
//                      <Input placeholder="Number of guests" />
//                      <Input placeholder="Number of guests" />
//                   </form>
//                </Row>
//             </Row>
//          </StyledApp>
//       </>
//    );
// }

// export default App;
