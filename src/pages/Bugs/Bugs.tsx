import './Bugs.css';
import BugsShortcutButtons from '../../components/BugComponents/BugsShortcutButtons/BugsShortcutButtons';
import { useEffect, useState } from 'react';
import { Bug } from '../../models/Bug';
import { api } from '../../utilities/axiosConfig';
import { Project } from '../../models/Project';
import BugsStatusContainer from '../../components/BugComponents/BugsStatusContainer/BugsStatusContainer';
import BugsPriorityContainer from '../../components/BugComponents/BugsPriorityContainer/BugsPriorityContainer';
import BugsProjectContainer from '../../components/BugComponents/BugsProjectContainer/BugsProjectContainer';

export default function Bugs() {
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [bugProjects, setBugProjects] = useState<Project[]>([]);

  const getBugs = async () => {
    try {
      const response = await api.get("/api/public/bugs");
      setBugs(response?.data.content);
      var projects: Project[] = [];
      response?.data.content.forEach((element: Bug) => {
        projects.push(element.project);
      });
      setBugProjects(projects);
    } catch(err) {
        alert(err);
    }
  }

  useEffect(() => {
    getBugs();
  }, []);

  return (
    <div className="bugs-container">
      <BugsShortcutButtons bugProjects={bugProjects} />
      <BugsStatusContainer bugs={bugs} />
      <BugsPriorityContainer bugs={bugs} />
      <BugsProjectContainer bugProjects={bugProjects} />
    </div>
  )
}