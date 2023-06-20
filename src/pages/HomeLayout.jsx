import { Outlet, useNavigation } from 'react-router-dom';
import Navbar from '../components/Navbar';

function HomeLayout() {
  const navigation = useNavigation();
  // console.log(navigation);
  const isPageLoading = navigation.state === 'loading';

  // const value = 'something';
  return (
    <div>
      <Navbar />
      <section className='page'>
        {isPageLoading ? (
          <div className='loading' />
        ) : (
          // <Outlet context={{ value }} />
          <Outlet />
        )}
      </section>
    </div>
  );
}
export default HomeLayout;
