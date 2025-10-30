import styled from 'styled-components';
import { useEffect } from 'react';
import { useUser } from '../features/authentication/useUser';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';

const FullPage = styled.div`
   height: 100vh;
   background-color: var(--color-grey-50);
   display: flex;
   align-items: center;
   justify-content: center;
`;

function ProtectedRoute({ children }) {
   const navigate = useNavigate();
   // 1. Load the authenticated user
   const { isPending, isAuthenticated } = useUser();

   // 2. If there is NO authenticated user, redirect to the /login
   useEffect(
      function () {
         if (!isAuthenticated && !isPending)
            navigate('/login', { replace: true });
      },
      [isAuthenticated, navigate, isPending]
   );

   // 3. While loading, show a spinner
   if (isPending)
      return (
         <FullPage>
            <Spinner />
         </FullPage>
      );

   // 4. If there IS a user, render the app
   if (isAuthenticated) return children;
   return null;
}

export default ProtectedRoute;
