import { useLoaderData, Link, useNavigation, Navigate } from 'react-router-dom';
import axios from 'axios';
import Wrapper from '../assets/wrappers/CocktailPage';
import { QueryClient, useQuery } from '@tanstack/react-query';

const singleCocktailUrl =
  'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

const singleCocktailQuery = (id) => {
  return {
    queryKey: ['cocktail', id],
    queryFn: async () => {
      const { data } = await axios.get(`${singleCocktailUrl}${id}`);
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params: { id } }) => {
    // const { id } = params;
    // const d = await queryClient.ensureQueryData(singleCocktailQuery(id));
    return { id };
  };

function getIngredients(drink) {
  let currentIngredientNumber = 1;
  const ingredients = [];
  let currentIngredient = null;

  do {
    try {
      currentIngredient = drink[`strIngredient${currentIngredientNumber}`];
      if (!currentIngredient) {
        break;
      }
      ingredients.push(currentIngredient);
      currentIngredientNumber++;
    } catch (error) {
      break;
    }
  } while (currentIngredient);
  return ingredients;
}

function Cocktail() {
  const { id } = useLoaderData();

  // if (!data) {
  //   return <h2>something went wrong...</h2>;
  // }
  const { data } = useQuery(singleCocktailQuery(id));

  if (!data) {
    return <Navigate to='/' />;
  }

  const navigation = useNavigation();
  const singleDrink = data.drinks[0];
  const {
    strDrink: name,
    strDrinkThumb: image,
    strAlcoholic: info,
    strCategory: category,
    strGlass: glass,
    strInstructions: instructions,
  } = singleDrink;

  const ingredients = getIngredients(singleDrink);
  //strIngredient2
  return (
    <Wrapper>
      <header>
        <Link to='/' className='btn'>
          back Home
        </Link>
        <h3>{name}</h3>
      </header>
      <div className='drink'>
        <img src={image} alt={name} className='img' />
        <div className='drink-info'>
          <p>
            <span className='drink-data'>name :</span>
            {name}
          </p>
          <p>
            <span className='drink-data'>category :</span>
            {category}
          </p>
          <p>
            <span className='drink-data'>info :</span>
            {info}
          </p>
          <p>
            <span className='drink-data'>glass :</span>
            {glass}
          </p>
          <p>
            <span className='drink-data'>ingredients :</span>
            {ingredients.map((ingredient, index) => {
              return (
                <span className='ing' key={index}>
                  {ingredient}
                  {index < ingredients.length - 1 ? ',' : ''}
                </span>
              );
            })}
          </p>
          <p>
            <span className='drink-data'>instructions :</span>
            {instructions}
          </p>
        </div>
      </div>
    </Wrapper>
  );
}
export default Cocktail;
