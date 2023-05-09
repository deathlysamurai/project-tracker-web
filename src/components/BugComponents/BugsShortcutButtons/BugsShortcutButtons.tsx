import './BugsShorcutButtons.css';
import { Button } from "@mui/material";
import { BugSeverity, BugStatus } from "../../../models/Bug";
import { useEffect, useState } from "react";
import { Project } from "../../../models/Project";
import { useNavigate } from 'react-router-dom';

export default function BugsShortcutButtons(props: {bugProjects: Project[]}) {
    const navigate = useNavigate();
    const [topProjects, setTopProjects] = useState<Project[]>([]);

    useEffect(() => {
        if(props.bugProjects.length > 0) {
            var newTopProjects: Project[] = [];
            var tempTopProjects: {Project: Project, count: number}[] = [];
            var tempIds: number[] = [];
            props.bugProjects.map((project) => {
                if(!tempIds.includes(project.id)) {
                    tempIds.push(project.id);
                    tempTopProjects.push({Project: project, count: 1});
                } else {
                    tempTopProjects.map((element) => {
                        if(element.Project.id == project.id) { element.count++ }
                    });
                }
            });
            tempTopProjects.sort((a,b) => { return a.count > b.count ? 1 : -1 });
            for(var i = 0; i <= 2; i++) {
                var newProject = tempTopProjects.pop();
                if(newProject) {
                    newTopProjects.push(newProject.Project);
                }
            }
            setTopProjects(newTopProjects);
        }
    }, [props.bugProjects]);

    const goToBugList = (params?: {name: string, value: string}[]) => {
        var route = '/bugs/list';
        if(params && params.length > 0) {
            route += '?';
            params.forEach((param) => {
                route += `${param.name}=${param.value}`;
            });
        }
        return navigate(route, { state: { bugProjects: props.bugProjects } });
    }

    return(
        <div className='shortcut-buttons-container bugs-grid-item'>
          <div className='shortcut-button-group'>
            <h2>Bugs</h2>
            <Button fullWidth variant="contained" onClick={() => goToBugList()}>View All</Button>
          </div>
          <div className='shortcut-button-group'>
            <h3>Priority</h3>
            {Object.keys(BugSeverity).map((severity) => {
                return isNaN(+severity) ? 
                    <Button fullWidth variant="outlined" key={`${severity}-shortcut-button`} onClick={() => goToBugList([{name: 'bugSeverity', value: severity}])}>
                        {severity}
                    </Button> : 
                    null;
            })}
          </div>
          <div className='shortcut-button-group'>
            <h3>Status</h3>
            {Object.keys(BugStatus).map((status) => {
                return isNaN(+status) ? 
                <Button fullWidth variant="outlined" key={`${status}-shortcut-button`} onClick={() => goToBugList([{name: 'bugStatus', value: status}])}>
                    {status}
                </Button> : 
                null;
            })}
          </div>
          <div className='shortcut-button-group'>
            <h3>Top Projects</h3>
            {topProjects.map((project) => (
                <Button fullWidth variant="outlined" key={`${project.title}-project-button`} onClick={() => goToBugList([{name: 'projectId', value: project.id.toString()}])}>
                    {project.title}
                </Button>
            ))}
          </div>
        </div>
    )
}