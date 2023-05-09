import './ProjectSection.css';
import StageCircles from '../../../components/ProjectComponents/StageCircles/StageCircles';
import { Button, Checkbox, IconButton, TextField, Tooltip } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import EditIcon from '@mui/icons-material/Edit';
import { Project, ProjectStage } from '../../../models/Project';
import { useAppSelector } from '../../../redux/hooks';
import { useEffect, useState } from 'react';

export default function ProjectSection(props: {project: Project, setProject: React.Dispatch<React.SetStateAction<Project>>, updateProject: () => Promise<void>}) {
    const loggedIn = useAppSelector((state) => state.auth.loggedIn);
    const [editProject, setEditProject] = useState(false);
    const [updatedStage, setUpdatedStage] = useState<ProjectStage>(ProjectStage[ProjectStage.CONCEPTION] as any);
    const [emptyTitleError, setEmptyTitleError] = useState(false);

    useEffect(() => {
        handleUpdate('stage', undefined, updatedStage);
    }, [updatedStage]);

    const handleUpdate = (property: string, event?: React.ChangeEvent<HTMLInputElement>, projectStage?: ProjectStage) => {
        props.setProject((current) => {
            var newProject = { ...current };
            switch(property) {
                case 'display':
                    newProject.display = event ? event.target.checked : false;
                    break;
                case 'url':
                    newProject.url = event ? event.target.value : '';
                    break;
                case 'stage':
                    newProject.stage = projectStage ? projectStage : ProjectStage.CONCEPTION;
                    break;
                case 'title':
                    newProject.title = event ? event.target.value : ' ';
            }
            return newProject;
        })
    }

    const updateProject = () => {
        if(props.project.title == '') {
            setEmptyTitleError(true);
            return;
        }
        setEmptyTitleError(false);
        setEditProject(false);
        props.updateProject();
    }

    return(
        <div className='project-section-wrapper'>
            <div className='title-error-wrapper'>
                <div className='single-project-title-section'>
                    <div className='project-section-title-container'>
                        {editProject ?
                            <TextField fullWidth label="Title"
                                className='single-project-title'
                                value={props.project?.title}
                                onChange={ (event: React.ChangeEvent<HTMLInputElement>) => handleUpdate('title', event)}
                            /> :
                            <h1 className='single-project-title'>{props.project?.title}</h1>
                        }
                        <StageCircles stage={props.project.stage} keyString={`single-project-${props.project.id}`} clickable={editProject} setProjectStage={setUpdatedStage} />
                    </div>
                    {loggedIn ? 
                    <Tooltip title="Edit" className='tooltip'>
                        <IconButton onClick={() => setEditProject((currentEditState) => !currentEditState)}>
                            <EditIcon fontSize='small' />
                        </IconButton>
                    </Tooltip> : null}
                </div>
                <p className={emptyTitleError ? 'empty-title-error' : 'inactive-error'}>*Title must not be empty.</p>
            </div>
            <div className='single-project-content-section'>
                <div className='single-project-content'>
                    <div className='single-project-content-entries'>
                        <p className='single-project-content-entry' >Display on landing page: 
                            <Checkbox
                                disabled={editProject ? false : true}
                                checked={props.project.display ? props.project.display : false}
                                icon={<RadioButtonUncheckedIcon />} 
                                checkedIcon={<CheckCircleOutlineIcon />} 
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleUpdate('display', event)} 
                            />
                        </p>
                        <div  className='single-project-content-entry'>
                            <TextField fullWidth label="URL"
                                disabled={editProject ? false : true}
                                value={props.project.url ? props.project.url : ' '}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleUpdate('url', event)}
                            />
                        </div>
                    </div>
                    {editProject ? <Button variant="outlined" onClick={updateProject}>Save</Button> : null}
                </div>
            </div>
        </div>
    )
}