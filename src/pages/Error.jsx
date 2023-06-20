import Wrapper from '../assets/wrappers/ErrorPage';
import { Link, useRouteError } from 'react-router-dom';
import img from '../assets/not-found.svg';
function Error() {
  const error = useRouteError();
  console.log(error);
  if (error.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={img} alt='not found' />
          <p>Whooops! We can't find this page</p>
          <Link to='/'>back home</Link>
        </div>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div className=''>
        <h3>Something went wrong</h3>
      </div>
    </Wrapper>
  );
}
export default Error;
