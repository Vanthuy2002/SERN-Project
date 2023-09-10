import BasicNav from '@/components/Navs';
import PropTypes from 'prop-types';

function MainLayout({ children }) {
  return (
    <main className='App'>
      <BasicNav />
      <section className='spacing-to-nav'>{children}</section>
    </main>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;
