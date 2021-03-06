import React, { useState } from 'react';
import { Container, Accordion, Icon } from 'semantic-ui-react';
import { withRouter, useHistory } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

import './ErrorPage.css';

// As a basis for this page, I used a template made by Colorlib (https://colorlib.com)
// and adjusted the coloring to fit with Ospin's brand image.

const ErrorPage = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  let history = useHistory();

  let prevLocation = props.history.location.state || props.sampleProp;

  let errorInfo = null;

  const goBack = () => {
    if (prevLocation) history.go(-2);
    else history.push('/devices');
  };

  const isOpenHandler = () => {
    setIsOpen(!isOpen);
  };

  if (prevLocation) {
    errorInfo = (
      <Accordion data-testid="error-inspection-container">
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
          <Button className="error-button" onClick={goBack}>
            <i className="backward icon"></i>Go Back
          </Button>
          <div className="error-info-box">{errorInfo}</div>
        </div>
      </div>
    </Container>
  );
};

export default withRouter(ErrorPage);
