import './TechnologyAddContainer.css';
import { Technology, TechnologyType } from '../../../../models/Technology';
import { Autocomplete, IconButton, TextField, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TechnologyTypeChips from './TechnologyTypeChips/TechnologyTypeChips';
import { useEffect, useState } from 'react';
import { Project } from '../../../../models/Project';
import { addNewTechToProject, checkCurrentTechs, checkForErrors, handleSelectedTechChange } from './TechnologyAddFunctions';
import TechnologyUpdateModal from './TechnologyUpdateModal/TechnologyUpdateModal';

export default function TechnologyAddContainer(props: {
    editTechnologies: boolean, 
    technologies: Technology[], 
    project: Project,
    setProject: React.Dispatch<React.SetStateAction<Project>>,
    updateProject: () => Promise<void>,
    setTechnologies: React.Dispatch<React.SetStateAction<Technology[]>>,
    getProject: () => Promise<void>
}) {
    const [selectedTech, setSelectedTech] = useState<Technology | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedTechName, setSelectedTechName] = useState('');
    const [selectedTechError, setSelectedTechError] = useState('empty-tech-error');
    const [typeErrorClass, setTypeErrorClass] = useState('type-error');
    const [ currentTechError, setCurrentTechError] = useState('current-tech-error'); 
    const [addedTechnologyType, setAddedTechnologyType] = useState('');
    const [selectedShortName, setSelectedShortName] = useState('');
    const [openTechUpdateModal, setOpenTechUpdateModal] = useState(false);

    useEffect(() => {
        if(!loading) {
            var newSelectedTech = handleSelectedTechChange(selectedTechName, selectedShortName, props.technologies);
            setSelectedShortName(newSelectedTech.shortName);
            setAddedTechnologyType(newSelectedTech.techType);
            setSelectedTech(newSelectedTech.tech);
        }
        setLoading(false);
    }, [selectedTechName]);

    const handleAddTechnology = async () => {
        var errors: string[] = checkForErrors(props.project, selectedTech, addedTechnologyType, selectedShortName);
        if(errors.length > 0) { 
            errors.includes('selectedTechError') ? setSelectedTechError('empty-tech-error-active') : setSelectedTechError('empty-tech-error');
            errors.includes('typeErrorClass') ? setTypeErrorClass('type-error-active') : setTypeErrorClass('type-error');
            errors.includes('currentTechError') ? setCurrentTechError('current-tech-error-active') : setCurrentTechError('current-tech-error');
            return;
        }
        var currentTechs = checkCurrentTechs(selectedTech, props.technologies, addedTechnologyType, selectedShortName);
        if(currentTechs.currentTech) {
            addCurrentTechToProject(currentTechs.techToAdd);
        } else {
            if(selectedTech?.id == 0) {
                var newTech: Technology = {
                    id: props.technologies ? props.technologies.slice(-1)[0].id + 1 : 1,
                    name: selectedTech ? selectedTech?.name : "DEFAULT TECH",
                    shortName: selectedShortName,
                    type: TechnologyType[+TechnologyType[addedTechnologyType as any]] as any
                }
                addNewTechToProject(newTech, props.setProject, props.updateProject, props.setTechnologies);
            } else {
                setOpenTechUpdateModal(true);
            }
        }
    }

    const addCurrentTechToProject = (techToAdd: Technology) => {
        props.setProject((updateProject) => {
            const updatedProject = { ...updateProject };
            updatedProject.technologies.push(techToAdd);
            return updatedProject;
        });
        props.updateProject();
    }

    return(
            props.editTechnologies ?
                <div className='technology-edit-container technology-add-container'>
                    <TechnologyUpdateModal 
                        openTechUpdateModal={openTechUpdateModal} 
                        setOpenTechUpdateModal={setOpenTechUpdateModal} 
                        techToAdd={{id: selectedTech ? selectedTech.id : 0, 
                            name: selectedTech ? selectedTech.name : '', 
                            shortName: selectedShortName, 
                            type: TechnologyType[+TechnologyType[addedTechnologyType as any]] as any
                        }}
                        technologies={props.technologies}
                        setProject={props.setProject}
                        updateProject={props.updateProject}
                        setTechnologies={props.setTechnologies}
                        getProject={props.getProject}
                    />
                    <div className='technology-add-inputs-container'>
                        <Autocomplete fullWidth size='small' clearOnBlur={false} renderInput={(params) => <TextField {...params} />}
                            options={props.technologies?.sort((a,b) => {return (a.id > b.id) ? 1 : -1}).map((tech) => `${tech.name} (${tech.type.toString()})`)}
                            onInputChange={(e: React.SyntheticEvent<Element, Event>, newValue: string) => setSelectedTechName(newValue)}
                        />
                        <TextField fullWidth size='small' label="'Short Name'" variant="outlined" sx={{marginTop: '5px'}} value={selectedShortName}
                            onChange={ (event: React.ChangeEvent<HTMLInputElement>) => { setSelectedShortName(event.target.value) } } 
                        />
                        <TechnologyTypeChips addedTechnologyType={addedTechnologyType} setAddedTechnologyType={setAddedTechnologyType} />
                        <p className={selectedTechError}>*technology must not be blank</p>
                        <p className={typeErrorClass}>*set technology type</p>
                        <p className={currentTechError}>*technology already attached to project</p>
                    </div>
                    <div className='technology-add-icon'>
                        <Tooltip title="Add" className='tooltip'>
                            <IconButton sx={{padding: 0}} onClick={() => {handleAddTechnology()}}>
                                <AddIcon fontSize='small' />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div> :
                null
    )
}