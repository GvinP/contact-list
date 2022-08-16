import Container from "@material-ui/core/Container";
import { Navigate, Route, Routes } from "react-router-dom";
import { ContactsList } from "./components/ContactsList/ContactsList";
import { Login } from "./components/Login/Login";

function App() {
  return (
    <Container maxWidth="lg">
      <Routes>
        <Route path="/" element={<Navigate to={"/login"} />} />
        <Route path="/contacts/*" element={<ContactsList />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Container>
  );
}

export default App;
