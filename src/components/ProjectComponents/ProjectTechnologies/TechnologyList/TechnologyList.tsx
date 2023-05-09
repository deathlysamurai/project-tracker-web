import './TechnologyList.css';
import { Project } from '../../../../models/Project';
import RemoveIcon from '@mui/icons-material/Remove';

export default function TechnologyList(props: {
    editTechnologies: boolean, 
    project: Project,
    setProject: React.Dispatch<React.SetStateAction<Project>>,
    updateProject: () => Promise<void>,
    technologyFilter: string
}) 
{
    const removeTechnology = async (id: number) => {
        props.setProject((updateProject) => {
            const updatedProject = { ...updateProject };
            var techIndex = null;
            var i = 0;
            updatedProject.technologies.map((tech) => {
                if(tech.id == id) {
                    techIndex = i;
                }
                i++;
            });
            if(techIndex != null) {
                updatedProject.technologies.splice(techIndex, 1);
            }
            return updatedProject;
        });
        props.updateProject();
    }

    return(
        <ul className='technology-list'>
                {
                    props.editTechnologies ?
                        props.project?.technologies?.sort((a,b) => {return (a.id > b.id) ? 1 : -1})
                        .filter((e,i,a) => {
                            return props.technologyFilter != '' ? e.type.toString() == props.technologyFilter : true
                        })
                        .map((technology) => (
                            <li key={technology.name + '-' + technology.id.toString()} onClick={() => {removeTechnology(technology.id)}}>
                                <div className='technology-edit-container technology-remove-container'>
                                    <div className='tech-name-container'>
                                        <p>{technology.name}</p>
                                        {
                                            technology.shortName && technology.shortName != "" ?
                                                <p>*{technology.shortName}</p> :
                                                null
                                        }
                                    </div>
                                    <RemoveIcon fontSize='small' />
                                </div>
                            </li>
                        )) :
                        props.project?.technologies?.sort((a,b) => {return (a.id > b.id) ? 1 : -1})
                        .filter((e,i,a) => {
                            return props.technologyFilter != '' ? e.type.toString() == props.technologyFilter : true
                        })
                        .map((technology) => (
                            <li key={technology.name + '-' + technology.id.toString()}>
                                <div className='tech-name-container'>
                                    <p>{technology.name}</p>
                                    {
                                        technology.shortName && technology.shortName != "" ?
                                            <p>*{technology.shortName}</p> :
                                            null
                                    }
                                </div>
                            </li>
                        ))
                }
            </ul>
    )
}