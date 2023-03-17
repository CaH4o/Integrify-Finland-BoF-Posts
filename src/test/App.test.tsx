import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import { store } from '../redux/store';
import App from '../App';

test('search for console.log in the doc', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  
  expect(getByText(/console.log/i)).toNotBeInTheDocument();
});
