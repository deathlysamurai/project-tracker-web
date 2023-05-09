import './SingleProject.css';
import { useParams } from "react-router-dom";
import { Project } from "../../models/Project";
import { useEffect, useState } from "react";
import { api } from '../../utilities/axiosConfig';
import ProjectNotes from '../../components/ProjectComponents/ProjectNotes/ProjectNotes';
import ProjectTechnologies from '../../components/ProjectComponents/ProjectTechnologies/ProjectTechnologies';
import ProjectTasks from '../../components/ProjectComponents/ProjectTasks/ProjectTasks';
import ProjectSection from '../../components/ProjectComponents/ProjectSection/ProjectSection';

export default function SingleProject() {
    let params = useParams();
    let projectId = params.projectId;
    const [project, setProject] = useState<Project>({} as Project);

    const getProject = async () =>{
        try {
            var route = "/api/public/projects/" + projectId;
            const response = await api.get(route);
            setProject(response?.data);
        } catch(err) {
            alert(err);
        }
    }

    useEffect(() => {
        getProject();
    }, []);

    const updateProject = async () => {
        try {
            var route = "/api/private/projects/" + projectId;
            await api.put(route, { ...project });
        } catch(err) {
            alert(err);
        }
    }

    return(
        <div className="single-project-container">
            <ProjectSection project={project} setProject={setProject} updateProject={updateProject} />
            <div className="grid-container">
                <ProjectNotes project={project} setProject={setProject} updateProject={updateProject} />
                <ProjectTechnologies project={project} setProject={setProject} updateProject={updateProject} getProject={getProject} />
            </div>
            <ProjectTasks project={project} setProject={setProject} updateProject={updateProject} />
        </div>
    )    
}