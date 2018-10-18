import { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends Component {
  state = {
    hasError: false,
    errorMessage: ''
  }

  componentDidCatch = (error) => {
    this.setState({ hasError: true, errorMessage: error });
  }

  render() {
    const { hasError } = this.state;
    if (hasError) {
      const { errorMessage } = this.state;
      return (
        <h1>
          { errorMessage }
        </h1>
      );
    }

    const { children } = this.props;
    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
};

export default ErrorBoundary;
