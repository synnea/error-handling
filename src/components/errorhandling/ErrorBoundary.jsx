import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import ServerAPI from '../../utils/ServerAPI';

import './ErrorPage.css';

class ErrorBoundary extends Component {
  state = {
    hasError: false,
    errorInfo: '',
    isNavigatingAway: false,
  };

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      errorInfo: error.stack.toString(),
    };
  }

  componentDidCatch(error, errorInfo) {
    ServerAPI.reportError({
      errorName: error,
      stackTrace: errorInfo,
      creationTime: Date.now(),
    });
  }

  render() {
    if (this.state.hasError) {
      return <h1>Houston, we have a problem</h1>;
    } else {
      return this.props.children;
    }
  }
}

export default withRouter(ErrorBoundary);
