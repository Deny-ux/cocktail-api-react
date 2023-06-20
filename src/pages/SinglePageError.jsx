import { useRouteError } from 'react-router-dom';

function SinglePageError() {
  const error = useRouteError();
  console.log(error);
  return <div>{error.message}</div>;
}
export default SinglePageError;
