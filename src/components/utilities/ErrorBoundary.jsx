import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import ErrorPage from "../../pages/ErrorPage";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.error("Error caught in ErrorBoundary:", error);
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error details:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPage />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
