import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import AppRoutes from "routes/AppRoutes";

function App() {
  return (
    <Container className="my-4">
      <AppRoutes />
    </Container>
  );
}

export default App;
