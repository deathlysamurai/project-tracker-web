import './BugsStatusContainer.css';
import { CircularProgress, Typography } from "@mui/material";
import { Bug, BugStatus } from "../../../models/Bug";
import { useEffect, useState } from "react";

export default function BugsStatusContainer(props: {bugs: Bug[]}) {
    const [graphValues, setGraphValues] = useState<{name: string, count: number, percent: number}[]>([]);

    useEffect(() => {
        var totalBugs = props.bugs.length;
        var newGraphValues: {name: string, count: number, percent: number}[] = [];
        Object.keys(BugStatus).forEach((status) => {
            if(isNaN(+status)) {
                var count = 0;
                props.bugs.forEach((bug) => {
                    if(bug.status?.toString() == status) {
                        count++;
                    }
                });
                newGraphValues.push({name: status, count: count, percent: 0});
            }
        });
        newGraphValues.map((val) => {
            val.percent = (val.count / totalBugs) * 100;
        });
        setGraphValues(newGraphValues);
    }, [props.bugs]);

    return(
        <div className='bugs-status-container bugs-grid-item'>
            <h3>Statuses</h3>
            <div className='status-percents-container'>
                {graphValues.map((val) => (
                    <div key={`${val.name}-status-graph-container`} className='status-graph-container'>
                        <CircularProgress variant="determinate" value={val.percent} size={'150px'} />
                        <div className='status-graph-text'>
                        <Typography variant="h5" component="h5">{val.name}</Typography>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}