import './ProjectTechnologies.css';
import { Project } from '../../../models/Project';
import { useState } from 'react';
import { Technology } from '../../../models/Technology';
import TechnologyHeader from './TechnologyHeader/TechnologyHeader';
import TechnologyAddContainer from './TechnologyAddContainer/TechnologyAddContainer';
import TechnologyList from './TechnologyList/TechnologyList';

export default function ProjectTechnologies(props: {
    project: Project, 
    setProject: React.Dispatch<React.SetStateAction<Project>>, 
    updateProject: () => Promise<void>, 
    getProject: () => Promise<void>
}) {
    const [editTechnologies, setEditTechnologies] = useState(false);
    const [technologies, setTechnologies] = useState<Technology[]>([]);
    const [technologyFilter, setTechnologyFilter] = useState('');

    return(
        <div className='grid-section'>
            <TechnologyHeader 
                technologyFilter={technologyFilter} 
                setEditTechnologies={setEditTechnologies}
                setTechnologies={setTechnologies}
                setTechnologyFilter={setTechnologyFilter}
            />
            <TechnologyList 
                editTechnologies={editTechnologies}
                project={props.project}
                setProject={props.setProject}
                updateProject={props.updateProject}
                technologyFilter={technologyFilter}
            />
            <TechnologyAddContainer 
                editTechnologies={editTechnologies} 
                technologies={technologies}
                project={props.project}
                setProject={props.setProject}
                updateProject={props.updateProject}
                setTechnologies={setTechnologies}
                getProject={props.getProject}
            />
        </div>
    )
}