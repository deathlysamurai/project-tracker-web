import './BugPriorityIcons.css';
import { BugSeverity } from '../../../models/Bug';
import BugReportIcon from '@mui/icons-material/BugReport';

export default function BugPriorityIcons(props: {priority: BugSeverity, keyString: string, mini?: boolean, clickable?: boolean, setBugPriority?: React.Dispatch<React.SetStateAction<BugSeverity>>}) {
    const getIconClassName = (active: boolean) => {
        var className = 'priority-bug-icon';
        className = props.mini ? className + ' mini-bug-icon' : className;
        className = active ? className + ' active-bug-icon' : className;
        className = props.clickable ? className + ' clickable-bug' : className;
        return className;
    }

    const handleClick = (stage: string) => {
        if(props.setBugPriority) {
            props.setBugPriority(BugSeverity[+BugSeverity[stage as any]] as any);
        }
    }

    return (
        <div className="priority-bug-icons-wrapper">
            <div className="priority-bug-icons-container">
                {
                    Object.keys(BugSeverity).map((severity) => (
                        isNaN(+severity) ?
                            <div className="priority-bug-icon-container" key={severity+'-'+props.keyString}>
                                {
                                    (+BugSeverity[severity as any] > +BugSeverity[props.priority]) ?
                                        <div onClick={() => handleClick(severity)} className={getIconClassName(false)}>
                                            <BugReportIcon />
                                        </div> :
                                        <div onClick={() => handleClick(severity)} className={getIconClassName(true)}>
                                            <BugReportIcon />
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