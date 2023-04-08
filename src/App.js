import { Route, Routes } from 'react-router-dom';
import {
  UserPage,
  UsersPage,
  NewUserPage,
  PositionsPage,
  HomePage,
} from './pages';
function App() {
  return (
    <Routes>
      <Route path="/users" element={<UsersPage />} />
      <Route path="/users/:id" element={<UserPage />} />
      <Route path="/newUser" element={<NewUserPage />} />
      <Route path="/positions" element={<PositionsPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<h1>Page not found</h1>} />
    </Routes>
  );
}
export default App;
