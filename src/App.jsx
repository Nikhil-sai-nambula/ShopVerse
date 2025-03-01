import { BrowserRouter as Router, ScrollRestoration } from "react-router-dom";
import "./App.css";

import { CartProvider } from "./context/CartContext";
import AnimatedRoutes from "./AnimatedRoutes";
import { AuthProvider } from "./context/AuthContext";
import ErrorBoundary from "./components/utilities/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
    <CartProvider>
      <AuthProvider>
        <Router>
          <AnimatedRoutes />
        </Router>
      </AuthProvider>
    </CartProvider>
    </ErrorBoundary>
  );
}

export default App;
