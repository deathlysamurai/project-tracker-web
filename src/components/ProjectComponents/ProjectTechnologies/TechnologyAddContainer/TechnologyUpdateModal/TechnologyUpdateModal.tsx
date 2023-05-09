import './TechnologyUpdateModal.css';
import { Button, Dialog, DialogActions, DialogContent, TextField } from "@mui/material";
import EastIcon from '@mui/icons-material/East';
import SouthIcon from '@mui/icons-material/South';
import { Technology } from '../../../../../models/Technology';
import { useEffect, useState } from 'react';
import { addNewTechToProject, getCurrentTechToUpdate } from '../TechnologyAddFunctions';
import { Project } from '../../../../../models/Project';
import { api } from '../../../../../utilities/axiosConfig';

export default function TechnologyUpdateModal(props: {
    openTechUpdateModal: boolean,
    setOpenTechUpdateModal: React.Dispatch<React.SetStateAction<boolean>>,
    techToAdd: Technology,
    technologies: Technology[],
    setProject: React.Dispatch<React.SetStateAction<Project>>,
    updateProject: () => Promise<void>,
    setTechnologies: React.Dispatch<React.SetStateAction<Technology[]>>,
    getProject: () => Promise<void>
}) {
    const [currentTech, setCurrentTech] = useState({} as Technology)

    useEffect(() => {
        setCurrentTech(getCurrentTechToUpdate(props.techToAdd.id, props.technologies));
    }, [props.openTechUpdateModal]);

    const handleClose = () => {
        props.setOpenTechUpdateModal(false);
    }

    const updateCurrent = async () => {
        var newTech: Technology = {
            id: currentTech.id,
            name: props.techToAdd.name,
            shortName: props.techToAdd.shortName,
            type: props.techToAdd.type
        }
        try {
            var route = "/api/private/technologies/" + currentTech.id;
            const response = await api.put(route, { ...newTech });
            props.getProject();
            props.setTechnologies(response?.data);
        } catch(err) {
            alert(err);
        }
        handleClose();
    }

    const createNewTech = async () => {
        var newTech: Technology = {
            id: props.technologies ? props.technologies.slice(-1)[0].id + 1 : 1,
            name: props.techToAdd.name,
            shortName: props.techToAdd.shortName,
            type: props.techToAdd.type
        }
        addNewTechToProject(newTech, props.setProject, props.updateProject, props.setTechnologies);
        handleClose();
    }

    return(
        <Dialog
            open={props.openTechUpdateModal}
            onClose={handleClose}
        >
            <DialogContent className="tech-update-modal-grid-container">
                <div className='update-technology-container'>
                    <h4>Current:</h4>
                    <TextField disabled fullWidth label="Name" value={currentTech.name ? currentTech.name : ' '} />
                    <TextField disabled fullWidth label="Short Name" value={currentTech.shortName ? currentTech.shortName : ' '} />
                    <TextField disabled fullWidth label="Type" value={currentTech.type ? currentTech.type : ' '} />
                </div>
                <div>
                    <EastIcon className='tech-update-right-icon' />
                    <SouthIcon className='tech-update-down-icon' />
                </div>
                <div className='update-technology-container'>
                    <h4>New:</h4>
                    <TextField disabled fullWidth label="Name" value={props.techToAdd.name} />
                    <TextField disabled fullWidth label="Short Name" value={props.techToAdd.shortName ? props.techToAdd.shortName : ' '} />
                    <TextField disabled fullWidth label="Type" value={props.techToAdd.type} />
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button variant="outlined" onClick={updateCurrent}>Update Current</Button>
                <Button className="create-new-tech-button" variant="contained" onClick={createNewTech}>Create New</Button>
            </DialogActions>
        </Dialog>
    )
}