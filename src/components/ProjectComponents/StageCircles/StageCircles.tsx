import './StageCircles.css';
import { ProjectStage } from "../../../models/Project";

export default function StageCircles(props: {stage: ProjectStage, keyString: string, mini?: boolean, clickable?: boolean, setProjectStage?: React.Dispatch<React.SetStateAction<ProjectStage>>}) {
    const getCircleClassName = (active: boolean) => {
        var className = 'stage-circle';
        className = props.mini ? className + ' mini-circle' : className;
        className = active ? className + ' active-stage-circle' : className;
        className = props.clickable ? className + ' clickable-circle' : className;
        return className;
    }

    const handleClick = (stage: string) => {
        if(props.setProjectStage) {
            props.setProjectStage(ProjectStage[+ProjectStage[stage as any]] as any);
        }
    }

    return (
        <div className="stage-circle-wrapper">
            <div className="stage-circles-container">
                {
                    Object.keys(ProjectStage).map((circleStage) => (
                        isNaN(+circleStage) ?
                            <div className="stage-circle-container" key={circleStage+'-'+props.keyString}>
                                {
                                    (+ProjectStage[circleStage as any] > +ProjectStage[props.stage]) ?
                                        <div onClick={() => handleClick(circleStage)} className={getCircleClassName(false)}>
                                            <span className="invisible">.</span>
                                        </div> :
                                        <div onClick={() => handleClick(circleStage)} className={getCircleClassName(true)}>
                                            <span className="invisible">.</span>
                                        </div>
                                }
                            </div> :
                            null
                    ))
                }
            </div>
        </div>
    )
}