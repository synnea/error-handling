import { Component } from 'react';
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

  navigateToErrorRoute = () => {
    if (!this.state.isNavigationAway) {
      return (
        this.props.history.push({
          pathname: '/error',
          state: {
            errorInfo: this.state.errorInfo,
            prevLocation: this.props.location.pathname,
          },
        }),
        window.location.reload(),
        this.setState({ isNavigationAway: true })
      );
    }
  };

  render() {
    if (this.state.hasError) {
      this.navigateToErrorRoute();
      return null;
    } else {
      return this.props.children;
    }
  }
}

export default withRouter(ErrorBoundary);
