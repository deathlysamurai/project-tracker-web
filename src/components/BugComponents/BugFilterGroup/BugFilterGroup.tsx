import './BugFilterGroup.css';
import { BugSeverity, BugStatus } from '../../../models/Bug';
import { Project } from '../../../models/Project';
import BugPriorityIcons from '../BugPriorityIcons/BugPriorityIcons';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, ToggleButton, ToggleButtonGroup } from "@mui/material";

export default function BugFilterGroup(props: {
    statusIcon: (status: string) => JSX.Element | undefined, 
    bugStatus: string, 
    setBugStatus: React.Dispatch<React.SetStateAction<string>>,
    bugSeverity: string,
    setBugSeverity: React.Dispatch<React.SetStateAction<string>>,
    projectId: number,
    setProjectId: React.Dispatch<React.SetStateAction<number>>,
    bugProjects: Project[],
    setPage: React.Dispatch<React.SetStateAction<number>>
}) {
    const updateStatus = (event: React.MouseEvent<HTMLElement>, newStatus: string,) => {
        props.setBugStatus(newStatus);
        props.setPage(0);
    }

    const updateSeverity = (event: React.MouseEvent<HTMLElement>, newSeverity: string,) => {
        props.setBugSeverity(newSeverity);
        props.setPage(0);
    }

    const updateProjectId = (event: SelectChangeEvent<number>, child: React.ReactNode) => {
        props.setProjectId(Number(event.target.value));
        props.setPage(0);
    }

    return(
        <div className='bug-filter-container'>
            <div className='bug-project-filter-container'>
                <FormControl fullWidth size='small'>
                    <InputLabel id="project-filter-select-label">Project</InputLabel>
                    <Select
                        labelId="project-filter-select-label"
                        value={props.projectId}
                        onChange={updateProjectId}
                        fullWidth
                        label="Project"
                    >
                        <MenuItem key='all-filter-select' value={0}>All</MenuItem>
                        {props.bugProjects.map((project) => (
                            <MenuItem key={`${project.title}-filter-select`} value={project.id}>{project.title}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <ToggleButtonGroup
                size='small'
                className='filter-toggle-group'
                value={props.bugStatus}
                exclusive
                onChange={updateStatus}
                >
                    {Object.keys(BugStatus).map((status) => (
                        isNaN(+status) ?
                        <ToggleButton value={status} key={status}>
                            <div className='bug-filter-status-entry'>
                                <div className='bug-filter-status-icon'>{props.statusIcon(status)}</div>
                                {status}
                            </div>
                        </ToggleButton> :
                        null
                    ))}
            </ToggleButtonGroup>
            <ToggleButtonGroup
                size='small'
                className='filter-toggle-group'
                value={props.bugSeverity}
                exclusive
                onChange={updateSeverity}
                >
                    {Object.keys(BugSeverity).map((severity) => (
                        isNaN(+severity) ?
                        <ToggleButton value={severity} key={severity}>
                            <span>
                                {severity}
                                <BugPriorityIcons priority={BugSeverity[+BugSeverity[severity as any]] as any} keyString={"filter"} mini={true} />
                            </span>
                        </ToggleButton> :
                        null
                    ))}
            </ToggleButtonGroup>
        </div>
    )
}