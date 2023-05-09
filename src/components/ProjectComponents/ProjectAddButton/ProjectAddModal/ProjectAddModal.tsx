import { Button, Checkbox, Dialog, DialogActions, DialogContent, TextField } from "@mui/material";
import StageCircles from "../../StageCircles/StageCircles";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { Project, ProjectStage } from "../../../../models/Project";

export default function ProjectAddModal(props: {
    openProjectAddModal: boolean,
    handleClose: () => void,
    newProject: Project,
    setNewProject: React.Dispatch<React.SetStateAction<Project>>,
    projectStage: ProjectStage,
    setProjectStage: React.Dispatch<React.SetStateAction<ProjectStage>>,
    addProject: () => Promise<void>,
    emptyTitleError: boolean
}) {
    return(
        <Dialog
                open={props.openProjectAddModal}
                onClose={props.handleClose}
            >
                <DialogContent className="project-add-modal-container">
                    <TextField 
                        fullWidth 
                        label="Name" 
                        value={props.newProject.title ? props.newProject.title : ' '} 
                        onChange={ (event: React.ChangeEvent<HTMLInputElement>) => {props.setNewProject((project) => {
                            var updatedProject = { ...project };
                            updatedProject.title = event.target.value;
                            return updatedProject;
                        })}} 
                    />
                    <p className={props.emptyTitleError ? 'empty-project-error active-error' : 'empty-project-error'}>*Name must not be empty.</p>
                    <div className='add-stage-container'>
                        <p className='add-stage-title'>Stage:</p>
                        <StageCircles stage={props.projectStage} keyString={'project-add'} clickable={true} setProjectStage={props.setProjectStage} />
                    </div>
                    <p>Display on landing page: 
                        <Checkbox className='add-project-display' 
                            icon={<RadioButtonUncheckedIcon />} 
                            checkedIcon={<CheckCircleOutlineIcon />} 
                            onChange={ (event: React.ChangeEvent<HTMLInputElement>) => {props.setNewProject((project) => {
                                var updatedProject = { ...project };
                                updatedProject.display = event.target.checked;
                                return updatedProject;
                            })}} 
                        />
                    </p>
                    <TextField fullWidth label="URL"
                        value={props.newProject.url ? props.newProject.url : ' '}
                        onChange={ (event: React.ChangeEvent<HTMLInputElement>) => {props.setNewProject((project) => {
                            var updatedProject = { ...project };
                            updatedProject.url = event.target.value;
                            return updatedProject;
                        })}}
                    />
                    <TextField multiline fullWidth label="Notes" 
                        sx={{marginTop: '5px', marginBottom: '-10px'}}
                        value={props.newProject.notes ? props.newProject.notes : ' '}
                        onChange={ (event: React.ChangeEvent<HTMLInputElement>) => {props.setNewProject((project) => {
                            var updatedProject = { ...project };
                            updatedProject.notes = event.target.value;
                            return updatedProject;
                        })}}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={props.addProject}>Add Project</Button>
                </DialogActions>
            </Dialog>
    )
}