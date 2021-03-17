import React, { useState } from 'react';
import { Container, Accordion, Icon } from 'semantic-ui-react';
import { withRouter, useHistory } from 'react-router-dom';

import './ErrorPage.css';

// As a basis for this page, I used a template made by Colorlib (https://colorlib.com)
// and adjusted the coloring to fit with Ospin's brand image.

const ErrorPage = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  let history = useHistory();
  const goBack = () => {
    history.go(-2);
  };

  const prevLocation = props.history.location.state;

  let errorInfo = null;

  const isOpenHandler = () => {
    setIsOpen(!isOpen);
  };

  if (prevLocation) {
    errorInfo = (
      <Accordion>
        <Accordion.Title active onClick={isOpenHandler}>
          <Icon name="dropdown" />
          Inspect the error
        </Accordion.Title>
        <Accordion.Content active={isOpen}>
          {prevLocation.errorInfo}
        </Accordion.Content>
      </Accordion>
    );
  }

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
          <a onClick={{ goBack }}>Go Back</a>
          <div className="error-info-box">{errorInfo}</div>
        </div>
      </div>
    </Container>
  );
};

export default withRouter(ErrorPage);
