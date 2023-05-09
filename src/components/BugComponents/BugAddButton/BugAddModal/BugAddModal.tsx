import { Button, Dialog, DialogActions, DialogContent, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { Bug, BugSeverity } from "../../../../models/Bug";
import BugPriorityIcons from "../../BugPriorityIcons/BugPriorityIcons";
import { Project } from "../../../../models/Project";
import { addBug } from "../../../../pages/BugList/BugListFunctions";

export default function BugAddModal(props: {
    openBugAddModal: boolean,
    handleClose: () => void,
    newBug: Bug,
    setNewBug: React.Dispatch<React.SetStateAction<Bug>>,
    bugPriority: BugSeverity,
    setBugPriority: React.Dispatch<React.SetStateAction<BugSeverity>>,
    emptyTitleError: boolean,
    emptyProjectError: boolean,
    emptyDescriptionError: boolean,
    setEmptyTitleError: React.Dispatch<React.SetStateAction<boolean>>,
    setEmptyProjectError: React.Dispatch<React.SetStateAction<boolean>>,
    setEmptyDescriptionError: React.Dispatch<React.SetStateAction<boolean>>,
    updateBugs: () => void,
    projects: Project[],
    getProject: (id?: number) => Promise<void>
}) {
    return(
        <Dialog
                open={props.openBugAddModal}
                onClose={props.handleClose}
            >
                <DialogContent className="project-bug-modal-container">
                    <FormControl fullWidth size='small'>
                        <InputLabel id="project-filter-select-label">Project</InputLabel>
                        <Select
                            labelId="project-filter-select-label"
                            value={props.newBug.project?.id ? props.newBug.project.id : 0}
                            onChange={(event: SelectChangeEvent<number>, child: React.ReactNode) => props.getProject(Number(event.target.value))}
                            fullWidth
                            label="Project"
                        >
                            <MenuItem key='all-filter-select' value={0}>Choose Project</MenuItem>
                            {props.projects.map((project) => (
                                <MenuItem key={`${project.title}-bug-add-filter-select`} value={project.id}>{project.title}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <p className={props.emptyProjectError ? 'empty-project-error active-error' : 'empty-project-error'}>*Project must not be empty.</p>
                    <TextField 
                        fullWidth 
                        label="Title" 
                        sx={{marginTop: '5px'}}
                        value={props.newBug.title ? props.newBug.title : ' '} 
                        onChange={ (event: React.ChangeEvent<HTMLInputElement>) => {props.setNewBug((bug) => {
                            var updatedBug = { ...bug };
                            updatedBug.title = event.target.value;
                            return updatedBug;
                        })}} 
                    />
                    <p className={props.emptyTitleError ? 'empty-bug-error active-error' : 'empty-bug-error'}>*Title must not be empty.</p>
                    <TextField multiline fullWidth label="Description" 
                        sx={{marginTop: '5px'}}
                        value={props.newBug.description ? props.newBug.description : ' '}
                        onChange={ (event: React.ChangeEvent<HTMLInputElement>) => {props.setNewBug((bug) => {
                            var updatedBug = { ...bug };
                            updatedBug.description = event.target.value;
                            return updatedBug;
                        })}}
                    />
                    <p className={props.emptyDescriptionError ? 'empty-description-error active-error' : 'empty-description-error'}>*Description must not be empty.</p>
                    <div className='add-priority-container'>
                        <p className='add-priority-title'>Priority:</p>
                        <BugPriorityIcons priority={props.bugPriority} keyString={'bug-add'} clickable={true} setBugPriority={props.setBugPriority} />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" 
                        onClick={() =>
                            addBug(
                                props.newBug, 
                                props.setEmptyTitleError, 
                                props.setEmptyDescriptionError, 
                                props.setEmptyProjectError,
                                props.updateBugs,
                                props.handleClose
                            )
                        }
                    >Add Bug</Button>
                </DialogActions>
            </Dialog>
    )
}