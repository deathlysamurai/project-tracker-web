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
      <Route path="/project-tracker-web" element={<RootLayout />}>
        <Route index element={<Navigate to="/project-tracker-web/projects" />} />
        <Route path="projects" element={<Projects />} />
        <Route path="/project-tracker-web/projects/:projectId" element={<SingleProject />} />
        <Route path="bugs" element={<Bugs />} />
        <Route path="/project-tracker-web/bugs/list" element={<BugList />} />
        <Route path="/project-tracker-web/bugs/:bugId" element={<SingleBug />} />
      </Route>
    )
  );

  return (
    <RouterProvider router={router} />
  );
}
