import { BrowserRouter as Router, ScrollRestoration } from "react-router-dom";
import "./App.css";

import { CartProvider } from "./context/CartContext";
import AnimatedRoutes from "./AnimatedRoutes";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <CartProvider>
      <AuthProvider>
        <Router>
          <AnimatedRoutes />
        </Router>
      </AuthProvider>
    </CartProvider>
  );
}

export default App;
