import './BugsProjectContainer.css';
import { LinearProgress } from "@mui/material";
import { Project } from "../../../models/Project";
import { useEffect, useState } from "react";

export default function BugsProjectContainer(props: {bugProjects: Project[]}) {
    const [projectGraphs, setProjectGraphs] = useState<{title: string, count: number, percent: number}[]>([]);

    useEffect(() => {
        if(props.bugProjects.length > 0) {
            var totalProjects = props.bugProjects.length;
            var newProjectGraphs: {title: string, count: number, percent: number}[] = [];
            var tempProjects: {Project: Project, count: number}[] = [];
            var tempIds: number[] = [];
            props.bugProjects.map((project) => {
                if(!tempIds.includes(project.id)) {
                    tempIds.push(project.id);
                    tempProjects.push({Project: project, count: 1});
                } else {
                    tempProjects.map((element) => {
                        if(element.Project.id == project.id) { element.count++ }
                    });
                }
            });
            tempProjects.map((val) => {
                var percent = (val.count / totalProjects) * 100;
                newProjectGraphs.push({title: val.Project.title, count: val.count, percent: percent});
            });
            newProjectGraphs.sort((a,b) => { return a.count < b.count ? 1 : -1 });
            setProjectGraphs(newProjectGraphs);
        }
    }, [props.bugProjects]);

    return(
        <div className='bugs-per-project-container bugs-grid-item'>
        <h3>Per Projects</h3>
        <div className='project-graph-container'>
            {projectGraphs.map((project) => (
                <div key={`${project.title}-project-graph`} className='project-graph-entry'>
                    <h4 className='project-line-title'>{project.title}</h4>
                    <div className='project-line-graph'><LinearProgress variant="determinate" value={project.percent} /></div>
                    <h4 className='project-line-number'>{project.count}</h4>
                </div>
            ))}
        </div>
      </div>
    )
}