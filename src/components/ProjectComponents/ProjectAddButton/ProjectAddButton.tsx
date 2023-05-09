import './ProjectAddButton.css';
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { Button } from "@mui/material";
import { Project, ProjectStage } from '../../../models/Project';
import { api } from '../../../utilities/axiosConfig';
import ProjectAddModal from './ProjectAddModal/ProjectAddModal';

export default function ProjectAddButton(props: {getProjects: () => Promise<void>}) {
    const loggedIn = useAppSelector((state) => state.auth.loggedIn);
    const [openProjectAddModal, setOpenProjectAddModal] = useState(false);
    const [newProject, setNewProject] = useState<Project>({} as Project);
    const [projectStage, setProjectStage] = useState<ProjectStage>(ProjectStage[ProjectStage.CONCEPTION] as any);
    const [emptyTitleError, setEmptyTitleError] = useState(false);

    useEffect(() => {
        setNewProject((project) => {
            var updatedProject = { ...project };
            updatedProject.stage = projectStage;
            return updatedProject;
        })
    }, [projectStage]);

    const handleClose = () => {
        setNewProject({} as Project);
        setProjectStage(ProjectStage[ProjectStage.CONCEPTION] as any);
        setEmptyTitleError(false);
        setOpenProjectAddModal(false);
    }

    const addProject = async () => {
        if(!newProject.title || newProject.title == '') {
            setEmptyTitleError(true);
            return;
        }
        try {
            var projectToAdd: Project = { ...newProject };
            projectToAdd.display = projectToAdd.display == null ? false : projectToAdd.display;
            console.log(projectToAdd)
            await api.post("/api/private/projects/add", { ...projectToAdd });
            props.getProjects();
        } catch(err) {
            alert(err);
        }
        handleClose();
    }

    return(
        <>
            {
                loggedIn ? 
                    <Button variant="contained" className='add-project-button' onClick={() => setOpenProjectAddModal(true)}>Add Project</Button> :
                    null
            }
            <ProjectAddModal 
                openProjectAddModal={openProjectAddModal} 
                handleClose={handleClose}
                newProject={newProject}
                setNewProject={setNewProject}
                projectStage={projectStage}
                setProjectStage={setProjectStage}
                addProject={addProject} 
                emptyTitleError={emptyTitleError}
            />
        </>
    )
}