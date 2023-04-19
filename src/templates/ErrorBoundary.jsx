import { Component } from 'react';

/* eslint-disable react/prop-types */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }
  static getDerivedStateFromError(err) {
    return { hasError: true, error: err };
  }
  componentDidCatch(err, errInfo) {
    console.error(err);
    console.error(errInfo);
  }
  render() {
    const { hasError, error } = this.state;
    console.log('hasError', hasError);
    if (hasError) {
      return (
        <div style={{ width: '80vw', margin: '2rem auto' }}>
          <h1>Opps! Something went wrong?. Error: {error?.message}</h1>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
