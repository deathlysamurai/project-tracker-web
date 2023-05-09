import './SingleBug.css';
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Bug } from "../../models/Bug";
import { api } from "../../utilities/axiosConfig";
import SingleBugHeader from '../../components/BugComponents/SingleBugHeader/SingleBugHeader';
import SingleBugNotes from '../../components/BugComponents/SingleBugNotes/SingleBugNotes';

export default function SingleBug() {
    let params = useParams();
    let bugId = params.bugId;
    const [bug, setBug] = useState<Bug>({} as Bug);

    const getBug = async () =>{
        try {
            var route = "/api/public/bugs/" + bugId;
            const response = await api.get(route);
            setBug(response?.data);
        } catch(err) {
            alert(err);
        }
    }

    useEffect(() => {
        getBug();
    }, []);

    return(
        <div className="single-bug-container">
            <SingleBugHeader bug={bug} />
            <div className='single-bug-grid-section'>
                <div className='single-bug-description-section'>
                    <div className='single-bug-project-title'>
                        <h3>Project: <NavLink to={`/projects/${bug.project?.id}`}>{bug.project?.title}</NavLink></h3>
                    </div>
                    <p className='single-bug-description'>{bug.description}</p>
                </div>
                <SingleBugNotes bug={bug} />
            </div>
        </div>
    )
}