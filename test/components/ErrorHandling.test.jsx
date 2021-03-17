import React from 'react';
import { render } from '@testing-library/react';
import { Container } from 'semantic-ui-react';
import { Route } from 'react-router-dom';
import { MemoryRouter } from 'react-router';

import ErrorBoundary from 'components/errorhandling/ErrorBoundary';
import ErrorPage from 'components/errorhandling/ErrorPage';
import Profile from 'components/profile/Profile';

describe('ErrorBoundary.jsx', () => {
  const renderErrorBoundaryComponent = () =>
    render(
      <MemoryRouter>
        <ErrorBoundary>
          <Container data-testid="main-container">
            <Profile />
            <Route exact path="/error" component={ErrorPage} />
          </Container>
        </ErrorBoundary>
      </MemoryRouter>
    );

  describe('no error detected', () => {
    test('renders child components', () => {
      const { getByTestId } = renderErrorBoundaryComponent();
      getByTestId('main-container');
    });
  });

  describe('error thrown', () => {
    const ComponentWithError = () => {
      throw new Error('woops!');
    };

    const renderComponentWithError = () =>
      render(
        <MemoryRouter>
          <ErrorBoundary>
            <Container>
              <ComponentWithError />
              <Route exact path="/error" component={ErrorPage} />
            </Container>
          </ErrorBoundary>
        </MemoryRouter>
      );

    test('leads to redirection to error page', () => {
      expect(jest.isMockFunction(window.location.reload)).toBe(true);
      renderComponentWithError();
      expect(window.location.reload).toHaveBeenCalled();
    });
  });
  describe('the error page', () => {
    const wrapper = () =>
      render(
        <MemoryRouter>
          <ErrorPage />
        </MemoryRouter>
      );
    test('renders to the DOM', () => {
      const { getByTestId } = wrapper();
      getByTestId('error-container');
    });
  });
});
