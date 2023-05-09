import './SingleBugNotes.css';
import { Bug } from "../../../models/Bug";
import { useAppSelector } from '../../../redux/hooks';
import { Button, IconButton, TextField, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from 'react';
import { api } from '../../../utilities/axiosConfig';

export default function SingleBugNotes(props: {bug: Bug}) {
    const loggedIn = useAppSelector((state) => state.auth.loggedIn);
    const [editBug, setEditBug] = useState(false);
    const [newBug, setNewBug] = useState<Bug>({} as Bug);

    useEffect(() => {
        setNewBug({...props.bug});
    }, [props.bug]);

    const updateNoteValue = (value: string) => {
        setNewBug((current) => {
            var updatedBug = {...current};
            updatedBug.notes = value;
            return updatedBug;
        });
    }

    const handleNotesSave = async () => {
        try {
            const response = await api.put(`/api/private/bugs/${newBug.id}`, {...newBug});
        } catch(err) {
            alert(err);
        }
        setEditBug(false);
    }

    return(
        <div className='single-bug-notes-section'>
            <div className='single-bug-note-title'>
                <h3>Notes:</h3>
                {loggedIn ? 
                <Tooltip title="Edit" className='tooltip'>
                    <IconButton onClick={() => setEditBug((currentEditState) => !currentEditState)}>
                        <EditIcon fontSize='small' />
                    </IconButton>
                </Tooltip> : null}
            </div>
            {editBug ?
                <>
                    <TextField 
                        sx={{backgroundColor: "rgba(var(--primaryRGB),.3)"}}
                        fullWidth
                        variant="outlined" 
                        value={newBug.notes} 
                        multiline
                        onChange={ (event: React.ChangeEvent<HTMLInputElement>) => { updateNoteValue(event.target.value) } } 
                    />
                    <Button variant="outlined" sx={{marginTop: "3px", float: "right"}} onClick={handleNotesSave}>Save</Button>
                </> : 
                <p className='single-bug-notes'>{newBug.notes}</p>
            }
        </div>
    )
}