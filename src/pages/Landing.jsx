import { useLoaderData } from 'react-router-dom';

const cocktailSearchUrl =
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

import { useQuery } from '@tanstack/react-query';

import axios from 'axios';
import CocktailList from '../components/CocktailList';
import SearchForm from '../components/SearchForm';

const searchCocktailsQuery = (searchTerm) => {
  return {
    queryKey: ['search', searchTerm || 'all'],
    queryFn: async () => {
      const response = await axios(`${cocktailSearchUrl}${searchTerm}`);
      return response.data.drinks;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const url = new URL(request.url);
    console.log(url);

    const searchTerm = url.searchParams.get('search') || '';
    await queryClient.ensureQueryData(searchCocktailsQuery(searchTerm));
    // const response = await axios(`${cocktailSearchUrl}${searchTerm}`);
    // console.log(response.data);
    // return { drinks: response.data.drinks, searchTerm };
    return { searchTerm };
  };

// export const loader =
//   (queryClient) =>
//   async ({ request }) => {
//     const url = new URL(request.url);

//     const searchTerm = url.searchParams.get('search') || '';
//     await queryClient.ensureQueryData(searchCocktailsQuery(searchTerm));
//     return { searchTerm };
//   };

function Landing() {
  const { searchTerm } = useLoaderData();
  const { data: drinks } = useQuery(searchCocktailsQuery(searchTerm));

  // if (isLoading) {
  //   return <h4>lOADING...</h4>;
  // }
  return (
    <>
      <SearchForm searchTerm={searchTerm} />
      <CocktailList drinks={drinks} />
    </>
  );
}
export default Landing;
