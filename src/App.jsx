import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import {
  About,
  Cocktail,
  Error,
  HomeLayout,
  Newsletter,
  Landing,
  SinglePageError,
} from './pages';
import { loader as landingLoader } from './pages/Landing';
import { loader as singleCocktailLoader } from './pages/Cocktail';
import { action as newsletterAction } from './pages/Newsletter';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // how long it will be valid
      // 5 minutes
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <Error />,
    element: <HomeLayout />,
    children: [
      {
        index: true,
        loader: landingLoader(queryClient),
        element: <Landing />,
        errorElement: <SinglePageError />,
      },
      {
        path: '/newsletter',
        element: <Newsletter />,
        action: newsletterAction,
      },
      {
        path: 'cocktail/:id',
        errorElement: <SinglePageError />,
        loader: singleCocktailLoader(queryClient),
        element: <Cocktail />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/error',
        element: <Error />,
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default App;
