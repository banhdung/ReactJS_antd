import { Routes, Route } from "react-router-dom";
import Category from "../../Pages/Category";
import Home from "../../Pages/Home";
import Login from "../../Pages/Login";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Category />}></Route>
      <Route path="/:categoryId" element={<Category />}></Route>
      <Route path="/login" element={<Login />}></Route>
    </Routes>
  );
}
export default AppRoutes;
