import './TechnologyHeader.css';
import { IconButton, Tooltip } from "@mui/material";
import DataObjectIcon from '@mui/icons-material/DataObject';
import ComputerIcon from '@mui/icons-material/Computer';
import StorageIcon from '@mui/icons-material/Storage';
import EditIcon from '@mui/icons-material/Edit';
import { useAppSelector } from '../../../../redux/hooks';
import { api } from '../../../../utilities/axiosConfig';
import { Technology } from '../../../../models/Technology';

export default function TechnologyHeader(props: {
    technologyFilter: string, 
    setEditTechnologies: React.Dispatch<React.SetStateAction<boolean>>,
    setTechnologies: React.Dispatch<React.SetStateAction<Technology[]>>,
    setTechnologyFilter: React.Dispatch<React.SetStateAction<string>>
}) 
{
    const loggedIn = useAppSelector((state) => state.auth.loggedIn);

    const updateTechnologyEditState = async () => {
        props.setEditTechnologies((currentEditState) => !currentEditState)
        try {
            const response = await api.get("/api/public/technologies");
            props.setTechnologies(response.data);
        } catch(err) {
            alert(err);
        }
    }

    const updateTechnologyFilter = (newFilter: string) => {
        if(props.technologyFilter == newFilter) {
            props.setTechnologyFilter('');
        } else {
            props.setTechnologyFilter(newFilter);
        }
    }

    return (
        <div className='grid-section-title'>
            <h3>Technologies:</h3>
            <div className='technology-filters'>
                <Tooltip title="Frontend" className='tooltip'>
                    <IconButton className={props.technologyFilter == "FRONTEND" ? "technology-filter-icon-active" : ""} onClick={() => {updateTechnologyFilter("FRONTEND")}}>
                        <ComputerIcon fontSize='small' />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Backend" className='tooltip'>
                    <IconButton className={props.technologyFilter == "BACKEND" ? "technology-filter-icon-active" : ""} onClick={() => {updateTechnologyFilter("BACKEND")}}>
                        <DataObjectIcon fontSize='small' />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Database" className='tooltip'>
                    <IconButton className={props.technologyFilter == "DATABASE" ? "technology-filter-icon-active" : ""} onClick={() => {updateTechnologyFilter("DATABASE")}}>
                        <StorageIcon fontSize='small' />
                    </IconButton>
                </Tooltip>
            </div>
            {
                loggedIn ? 
                <Tooltip title="Edit" className='tooltip'>
                    <IconButton onClick={updateTechnologyEditState}>
                        <EditIcon fontSize='small' />
                    </IconButton>
                </Tooltip> : null
            }
        </div>
    )
}