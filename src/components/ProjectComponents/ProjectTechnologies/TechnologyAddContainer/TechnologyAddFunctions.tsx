import { Project } from "../../../../models/Project";
import { Technology, TechnologyType } from "../../../../models/Technology";
import { api } from "../../../../utilities/axiosConfig";

export function checkForErrors(project: Project, selectedTech: Technology | null, addedTechnologyType: string, selectedShortName: string) {
    var errors: string[] = [];
    if(!selectedTech?.name || selectedTech?.name == '') { 
        errors.push('selectedTechError');
    }
    if(addedTechnologyType == '') {
        errors.push('typeErrorClass');
    }
    var alreadyAdded = false;
    project.technologies.map((tech) => {
        if(selectedTech?.name == tech.name && addedTechnologyType == tech.type.toString() && (selectedShortName == tech.shortName || (selectedShortName == "" && !tech.shortName))) {
            alreadyAdded = true;
        }
    });
    if(alreadyAdded) {
        errors.push('currentTechError');
    }
    return errors;
}

export function checkCurrentTechs(selectedTech: Technology | null, technologies: Technology[], addedTechnologyType: string, selectedShortName: string) {
    var techFound = false;
    var techToAdd: Technology = selectedTech ? { ...selectedTech } : {} as Technology
    technologies.map((tech) => {
        if(techToAdd.name == tech.name && addedTechnologyType == tech.type.toString() && (selectedShortName == tech.shortName || (selectedShortName == "" && !tech.shortName))) {
            techFound = true;
            if(techToAdd.id != tech.id) { 
                techToAdd.id = tech.id; 
                techToAdd.shortName = tech.shortName;
                techToAdd.type = tech.type;
            }
        }
    });
    return {currentTech: techFound, techToAdd: techToAdd};
}

export function handleSelectedTechChange(selectedTechName: string, selectedShortName: string, technologies: Technology[]) {
    var name = selectedTechName;
    var techType = 'FRONTEND';
    var id = 0;
    var shortName = selectedShortName;
    if(name.split(" ").length > 1 && TechnologyType[+TechnologyType[name.split(" ")[name.split(" ").length - 1].slice(1, -1) as any]] as any) {
        techType = name.split(" ")[name.split(" ").length - 1].slice(1, -1);
        name = name.split(" ").slice(0, name.split(" ").length - 1).toString().replace(',', ' ');
    }
    technologies.map((techCheck) => {
        if(name == techCheck.name && techType == techCheck.type.toString()) {
            id = techCheck.id;
            shortName = techCheck.shortName ? techCheck.shortName : "";
        }
    });
    var tech = {
        id: id,
        name: name,
        shortName: shortName,
        type: TechnologyType[+TechnologyType[techType as any]] as any
    }
    return {shortName: shortName, techType: techType, tech: tech};
}

export function getCurrentTechToUpdate(id: number, technologies: Technology[]) {
    var currentTech = {} as Technology;
    technologies.map((techCheck) => {
        if(id == techCheck.id) {
            currentTech = techCheck;
        }
    });
    return currentTech;
}

export async function addNewTechToProject(newTech: Technology, setProject: React.Dispatch<React.SetStateAction<Project>>, updateProject: () => Promise<void>, setTechnologies: React.Dispatch<React.SetStateAction<Technology[]>>) {
    try {
        const response = await api.post("/api/private/technologies/add", { ...newTech });
        setProject((updateProject) => {
            const updatedProject = { ...updateProject };
            updatedProject.technologies.push(newTech);
            return updatedProject;
        });
        updateProject();
        setTechnologies(response?.data);
    } catch(err) {
        alert(err);
    }
}
