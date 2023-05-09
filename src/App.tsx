import './App.css';
import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import RootLayout from './layouts/RootLayout/RootLayout';
import Projects from './pages/Projects/Projects';
import Bugs from './pages/Bugs/Bugs';
import SingleProject from './pages/SingleProject/SingleProject';
import BugList from './pages/BugList/BugList';
import SingleBug from './pages/SingleBug/SingleBug';

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Navigate to="/projects" />} />
        <Route path="projects" element={<Projects />} />
        <Route path="/projects/:projectId" element={<SingleProject />} />
        <Route path="bugs" element={<Bugs />} />
        <Route path="/bugs/list" element={<BugList />} />
        <Route path="/bugs/:bugId" element={<SingleBug />} />
      </Route>
    )
  );

  return (
    <RouterProvider router={router} />
  );
}
