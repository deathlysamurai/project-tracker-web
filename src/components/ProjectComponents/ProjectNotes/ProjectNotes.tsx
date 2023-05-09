import './ProjectNotes.css';
import { Button, IconButton, TextField, Tooltip } from "@mui/material"
import { Project } from "../../../models/Project"
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { useAppSelector } from '../../../redux/hooks';

export default function ProjectNotes(props: {project: Project, setProject: React.Dispatch<React.SetStateAction<Project>>, updateProject: () => Promise<void>}) {
    const loggedIn = useAppSelector((state) => state.auth.loggedIn);
    const [editNotes, setEditNotes] = useState(false);

    const updateNoteValue = (newValue: string) => {
        props.setProject((project) => {
            const updatedProject = { ...project }
            updatedProject.notes = newValue;
            return updatedProject;
        });
    }

    const handleNotesSave = () => {
        setEditNotes(false);
        props.updateProject();
    }

    return(
        <div className='grid-section'>
            <h3 className='grid-section-title'>Notes: {loggedIn ? 
                <Tooltip title="Edit" className='tooltip'>
                    <IconButton onClick={() => setEditNotes((currentEditState) => !currentEditState)}>
                        <EditIcon fontSize='small' />
                    </IconButton>
                </Tooltip> : null}
            </h3>
            <div className='notes-content'>
                {
                    editNotes ? 
                        <>
                        <TextField 
                            sx={{backgroundColor: "rgba(var(--primaryRGB),.3)"}}
                            fullWidth
                            variant="outlined" 
                            value={props.project?.notes ? props.project.notes : ''} 
                            multiline
                            onChange={ (event: React.ChangeEvent<HTMLInputElement>) => { updateNoteValue(event.target.value) } } 
                        />
                        <Button variant="outlined" sx={{marginTop: "3px", float: "right"}} onClick={handleNotesSave}>Save</Button></>
                        : <p className='project-note-content'>{props.project?.notes}</p>
                }
            </div>
        </div>
    )
}