import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import ServerAPI from '../../utils/ServerAPI';

import './ErrorPage.css';

class ErrorBoundary extends Component {
  state = {
    hasError: false,
    errorInfo: '',
    isNavigationAway: false,
  };

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, errorInfo) {
    // ServerAPI.reportError({
    //   errorName: error,
    //   stackTrace: errorInfo,
    //   creationTime: Date.now(),
    // });
  }

  render() {
    if (this.state.hasError) {
      return null;
    } else {
      return this.props.children;
    }
  }
}

export default withRouter(ErrorBoundary);
