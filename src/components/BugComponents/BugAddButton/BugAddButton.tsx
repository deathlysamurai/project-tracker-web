import './BugAddButton.css';
import { Button } from "@mui/material";
import { useAppSelector } from "../../../redux/hooks";
import { useEffect, useState } from "react";
import BugAddModal from "./BugAddModal/BugAddModal";
import { Bug, BugSeverity, BugStatus } from "../../../models/Bug";
import { api } from '../../../utilities/axiosConfig';
import { Project } from '../../../models/Project';

export default function BugAddButton(props: {projectId: number, projects: Project[], updateBugs: () => void}) {
    const loggedIn = useAppSelector((state) => state.auth.loggedIn);
    const [openBugAddModal, setOpenBugAddModal] = useState(false);
    const [newBug, setNewBug] = useState<Bug>({} as Bug);
    const [bugPriority, setBugPriority] = useState<BugSeverity>(BugSeverity[BugSeverity.ZERO] as any);
    const [emptyTitleError, setEmptyTitleError] = useState(false);
    const [emptyProjectError, setEmptyProjectError] = useState(false);
    const [emptyDescriptionError, setEmptyDescriptionError] = useState(false);

    const getProject = async (id?: number) => {
        try {
            var newProject: Project = {} as Project;
            var searchId = id ? id : props.projectId;
            if(id == undefined || id != 0) {
                var route = "/api/public/projects/" + searchId;
                const response = await api.get(route);
                newProject = response?.data;
            }
            setNewBug((bug) => {
                var updatedBug = { ...bug };
                updatedBug.project = newProject;
                return updatedBug;
            });
        } catch(err) {
            alert(err);
        }
    }

    useEffect(() => {
        if(openBugAddModal) {
            if(props.projectId != 0) {
                getProject();
            }
            setNewBug((bug) => {
                var updatedBug = { ...bug };
                updatedBug.status = BugStatus[BugStatus.NEW] as any;
                updatedBug.severity = BugSeverity[BugSeverity.ZERO] as any;
                return updatedBug;
            });
        }
    }, [openBugAddModal]);

    useEffect(() => {
        setNewBug((bug) => {
            var updatedBug = { ...bug };
            updatedBug.severity = bugPriority;
            return updatedBug;
        })
    }, [bugPriority]);

    const handleClose = () => {
        setNewBug({} as Bug);
        setBugPriority(BugSeverity[BugSeverity.ZERO] as any);
        setEmptyTitleError(false);
        setEmptyProjectError(false);
        setEmptyDescriptionError(false);
        setOpenBugAddModal(false);
    }

    return(
        <>
            {
                loggedIn ? 
                    <Button variant="contained" className='add-bug-button' onClick={() => setOpenBugAddModal(true)}>Add Bug</Button> :
                    null
            }
            <BugAddModal
                openBugAddModal={openBugAddModal}
                handleClose={handleClose}
                newBug={newBug}
                setNewBug={setNewBug}
                bugPriority={bugPriority}
                setBugPriority={setBugPriority}
                emptyTitleError={emptyTitleError}
                emptyProjectError={emptyProjectError}
                emptyDescriptionError={emptyDescriptionError}
                setEmptyTitleError={setEmptyTitleError}
                setEmptyProjectError={setEmptyProjectError}
                setEmptyDescriptionError={setEmptyDescriptionError}
                updateBugs={props.updateBugs}
                projects={props.projects}
                getProject={getProject}
            />  
        </>
    )
}