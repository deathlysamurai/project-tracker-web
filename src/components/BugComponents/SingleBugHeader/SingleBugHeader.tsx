import './SingleBugHeader.css';
import { Button, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Tooltip } from "@mui/material";
import BugPriorityIcons from "../BugPriorityIcons/BugPriorityIcons";
import EditIcon from '@mui/icons-material/Edit';
import { useAppSelector } from "../../../redux/hooks";
import { useEffect, useState } from "react";
import { statusIcon } from "../../../pages/BugList/BugListFunctions";
import { Bug, BugSeverity, BugStatus } from "../../../models/Bug";
import { api } from "../../../utilities/axiosConfig";

export default function SingleBugHeader(props: {bug: Bug}) {
    const loggedIn = useAppSelector((state) => state.auth.loggedIn);
    const [editBug, setEditBug] = useState(false);
    const [newBug, setNewBug] = useState<Bug>({} as Bug);
    const [bugPriority, setBugPriority] = useState<BugSeverity>(BugSeverity[BugSeverity.ZERO] as any);

    useEffect(() => {
        setNewBug({...props.bug});
    }, [props.bug]);

    useEffect(() => {
        setNewBug((bug) => {
            var updatedBug = { ...bug };
            updatedBug.severity = bugPriority;
            return updatedBug;
        })
    }, [bugPriority]);

    const handleUpdate = (param: string, value: string) => {
        setNewBug((current) => {
            var newBug = { ...current };
            if(param == 'title') {
                newBug.title = value;
            } else if(param == 'status') {
                newBug.status = BugStatus[+BugStatus[value as any]] as any;
            }
            return newBug;
        })
    }

    const updateBug = async () => {
        try {
            const response = await api.put(`/api/private/bugs/${newBug.id}`, {...newBug});
        } catch(err) {
            alert(err);
        }
        setEditBug(false);
    }

    return(
        <div className='single-bug-header-wrapper'>
            <div className='bug-header-section'>
                <div className='bug-header-value-section'>
                    <div className='bug-title-container'>
                        {editBug ?
                            <>
                                <FormControl fullWidth size='small' className='bug-status-icon'>
                                    <InputLabel id="single-bug-status-label">Status</InputLabel>
                                    <Select
                                        labelId="single-bug-status-label"
                                        value={newBug?.status}
                                        onChange={(event: SelectChangeEvent<BugStatus>, child: React.ReactNode) => handleUpdate('status', event.target.value.toString())}
                                        fullWidth
                                        label="Status"
                                    >
                                        {Object.keys(BugStatus).map((status) => (
                                            isNaN(+status) ?
                                                <MenuItem key={`${status}-bug-status-update`} value={status}>{status}</MenuItem> :
                                                null
                                        ))}
                                    </Select>
                                </FormControl>
                                <TextField fullWidth label="Title" size='small'
                                    className='single-bug-title'
                                    value={Object.keys(newBug).length === 0 ? props.bug.title : newBug.title}
                                    onChange={ (event: React.ChangeEvent<HTMLInputElement>) => handleUpdate('title', event.target.value)}
                                />
                            </> :
                            <>
                                <div className='bug-status-icon'>{statusIcon(newBug?.status?.toString())}</div>
                                <h1 className='single-bug-title'>{newBug?.title}</h1>
                            </>
                        }
                    </div>
                    {editBug ?
                        <BugPriorityIcons priority={newBug?.severity} keyString={`${newBug?.id?.toString()}-edit`} clickable={true} setBugPriority={setBugPriority} /> :
                        <BugPriorityIcons priority={newBug?.severity} keyString={newBug?.id?.toString()} />
                    }
                </div>
                {loggedIn ? 
                <Tooltip title="Edit" className='tooltip'>
                    <IconButton onClick={() => setEditBug((currentEditState) => !currentEditState)}>
                        <EditIcon fontSize='small' />
                    </IconButton>
                </Tooltip> : null}
            </div>
            {editBug ? <Button variant="outlined" className="bug-update-button" onClick={updateBug}>Save</Button> : null}
        </div>
    )
}