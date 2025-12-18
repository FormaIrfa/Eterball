'use client';

import { Provider } from 'react-redux';
import { store } from './store/auth';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </Provider>
  );
}
