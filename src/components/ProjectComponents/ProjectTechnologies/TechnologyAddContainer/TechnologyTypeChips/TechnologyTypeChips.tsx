import './TechnologyTypeChips.css';
import { Chip } from '@mui/material';
import DataObjectIcon from '@mui/icons-material/DataObject';
import ComputerIcon from '@mui/icons-material/Computer';
import StorageIcon from '@mui/icons-material/Storage';

export default function TechnologyTypeChips(props: {addedTechnologyType: string, setAddedTechnologyType: React.Dispatch<React.SetStateAction<string>>}) {
    return(
        <div className='technology-chip-container'>
                            <Chip label="FRONTEND" clickable icon={<ComputerIcon fontSize='small' />} onClick={() => props.setAddedTechnologyType("FRONTEND")} 
                                className={
                                    props.addedTechnologyType == 'FRONTEND' ? 
                                        'tech-chip web-technology-chip selected-type-chip' : 
                                        'tech-chip web-technology-chip'
                                } 
                            />
                            <Chip label="BACKEND" clickable icon={<DataObjectIcon fontSize='small' />} onClick={() => props.setAddedTechnologyType("BACKEND")} 
                                className={
                                    props.addedTechnologyType == 'BACKEND' ? 
                                        'tech-chip web-technology-chip selected-type-chip' : 
                                        'tech-chip web-technology-chip'
                                } 
                            />
                            <Chip label="DATABASE" clickable icon={<StorageIcon fontSize='small' />} onClick={() => props.setAddedTechnologyType("DATABASE")} 
                                className={
                                    props.addedTechnologyType == 'DATABASE' ? 
                                        'tech-chip web-technology-chip selected-type-chip' : 
                                        'tech-chip web-technology-chip'
                                } 
                            />
                            <Chip clickable icon={<ComputerIcon fontSize='small' />} onClick={() => props.setAddedTechnologyType("FRONTEND")} 
                                className={
                                    props.addedTechnologyType == 'FRONTEND' ? 
                                        'tech-chip mobile-technology-chip selected-type-chip' : 
                                        'tech-chip mobile-technology-chip'
                                }  
                            />
                            <Chip clickable icon={<DataObjectIcon fontSize='small' />} onClick={() => props.setAddedTechnologyType("BACKEND")}
                                className={
                                    props.addedTechnologyType == 'BACKEND' ? 
                                        'tech-chip mobile-technology-chip selected-type-chip' : 
                                        'tech-chip mobile-technology-chip'
                                }  
                            />
                            <Chip clickable icon={<StorageIcon fontSize='small' />} onClick={() => props.setAddedTechnologyType("DATABASE")} 
                                className={
                                    props.addedTechnologyType == 'DATABASE' ? 
                                        'tech-chip mobile-technology-chip selected-type-chip' : 
                                        'tech-chip mobile-technology-chip'
                                }   
                            />
                        </div>
    )
}