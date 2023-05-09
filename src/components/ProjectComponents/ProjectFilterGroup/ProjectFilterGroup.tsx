import './ProjectFilterGroup.css';
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import StageCircles from "../StageCircles/StageCircles";
import { ProjectStage } from "../../../models/Project";

export default function ProjectFilterGroup(props: {
    filter: string,
    setFilter: React.Dispatch<React.SetStateAction<string>>,
    setPage: React.Dispatch<React.SetStateAction<number>>,
    setPreviousPageClass: React.Dispatch<React.SetStateAction<string>>,
    setNextPageClass: React.Dispatch<React.SetStateAction<string>>
}) {
    const filterProjects = (event: React.MouseEvent<HTMLElement>, newFilter: string,) => {
        props.setPage(0);
        props.setPreviousPageClass('inactive-icon');
        props.setNextPageClass('');
        props.setFilter(newFilter);
    }

    return(
        <ToggleButtonGroup
            className='filter-toggle-container'
            value={props.filter}
            exclusive
            onChange={filterProjects}
            >
                {Object.keys(ProjectStage).map((stage) => (
                    isNaN(+stage) ?
                    <ToggleButton value={stage} key={stage}>
                        <span>
                            {stage}
                            <StageCircles stage={ProjectStage[+ProjectStage[stage as any]] as any} keyString={"filter"} mini={true} />
                        </span>
                    </ToggleButton> :
                    null
                ))}
        </ToggleButtonGroup>
    )
}