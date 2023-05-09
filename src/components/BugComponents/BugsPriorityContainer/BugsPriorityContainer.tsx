import './BugsPriorityContainer.css';
import { useEffect, useState } from "react";
import { Bug, BugSeverity } from "../../../models/Bug";

export default function BugsPriorityContainer(props: {bugs: Bug[]}) {
    const [tableValues, setTableValues] = useState<{severity: string, count: number}[]>([]);

    useEffect(() => {
        var newTableValues: {severity: string, count: number}[] = [];
        Object.keys(BugSeverity).forEach((severity) => {
            if(isNaN(+severity)) {
                var count = 0;
                props.bugs.forEach((bug) => {
                    if(bug.severity?.toString() == severity) {
                        count++;
                    }
                });
                newTableValues.push({severity: severity, count: count});
            }
        });
        setTableValues(newTableValues);
    }, [props.bugs]);

    return(
        <div className='bugs-priority-container bugs-grid-item'>
        <h3>Priorities</h3>
        <div className='bugs-priorities'>
          <table className='bugs-priorities-table'>
            <tbody>
                {tableValues.map((val) => (
                    <tr key={`${val.severity}-priority-row`}><td>{val.severity}:</td><td>{val.count}</td></tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    )
}