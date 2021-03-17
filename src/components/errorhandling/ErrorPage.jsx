import React from 'react';
import { Container, Accordion, Icon } from 'semantic-ui-react';

import './ErrorPage.css';

// As a basis for this page, I used a template made by Colorlib (https://colorlib.com)
// and adjusted the coloring to fit with Ospin's brand image.

const ErrorPage = () => {
  return (
    <Container id="error" data-testid="error-container">
      <div className="error">
        <div className="error-image"></div>
        <div className="error-box">
          <h1>500</h1>
          <h2>Oops! Something went wrong</h2>
          <p>
            We're experiencing an internal error. Please try again later or
            contact us!
          </p>
          <a onClick={console.log('goback')}>Go Back</a>
          <div className="error-info-box">{console.log('placeholder')}</div>
        </div>
      </div>
    </Container>
  );
};

export default ErrorPage;
