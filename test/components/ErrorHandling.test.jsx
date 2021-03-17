import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Container } from 'semantic-ui-react';
import { Route } from 'react-router-dom';
import { MemoryRouter } from 'react-router';

import ErrorBoundary from 'components/errorhandling/ErrorBoundary';
import ErrorPage from 'components/errorhandling/ErrorPage';

describe('ErrorBoundary.jsx', () => {
  const renderErrorBoundaryComponent = () =>
    render(
      <MemoryRouter>
        <ErrorBoundary>
          <Container data-testid="main-container">
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
    const { reload } = window.location;

    beforeAll(() => {
      Object.defineProperty(window.location, 'reload', {
        configurable: true,
      });
      window.location.reload = jest.fn();
    });

    afterAll(() => {
      window.location.reload = reload;
    });

    const ComponentWithError = () => {
      throw new Error('woops!');
    };

    const renderComponentWithError = () =>
      render(
        <MemoryRouter>
          <ErrorBoundary>
            <ComponentWithError />
            <Route exact path="/error" component={ErrorPage} />
          </ErrorBoundary>
        </MemoryRouter>
      );

    test('leads to redirection to error page', () => {
      expect(jest.isMockFunction(window.location.reload)).toBe(true);
      renderComponentWithError();
      expect(window.location.reload).toHaveBeenCalled();
    });
  });
});

describe('ErrorPage.jsx', () => {
  describe('the error page', () => {
    const sampleProp = {
      errorInfo: 'some error',
      prevLocation: 'test',
    };

    const wrapper = () =>
      render(
        <MemoryRouter>
          <ErrorPage sampleProp={sampleProp} />
        </MemoryRouter>
      );
    test('renders to the DOM', () => {
      const { getByTestId } = wrapper();
      getByTestId('error-container');
    });
    test('error can be inspected', () => {
      const { getByTestId } = wrapper();
      getByTestId('error-inspection-container');
    });
    test('clicking on the link opens up the error stack', () => {
      const { getByText } = wrapper();
      const link = getByText('Inspect the error');
      fireEvent.click(link);
      getByText('some error');
    });
  });
});
