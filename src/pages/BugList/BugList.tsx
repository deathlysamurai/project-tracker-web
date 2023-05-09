import './BugList.css';
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Bug } from "../../models/Bug";
import { CircularProgress } from "@mui/material";
import BugFilterGroup from '../../components/BugComponents/BugFilterGroup/BugFilterGroup';
import { Project } from '../../models/Project';
import PaginationContainer from '../../components/PaginationContainer/PaginationContainer';
import BugPriorityIcons from '../../components/BugComponents/BugPriorityIcons/BugPriorityIcons';
import { getBugProjects, getBugs, statusIcon } from './BugListFunctions';
import BugAddButton from '../../components/BugComponents/BugAddButton/BugAddButton';

export default function BugList() {
  const navigate = useNavigate();
  const DEFAULT_ORDER = 'desc';
  const DEFAULT_ORDER_BY = 'id';
  const DEFAULT_ROWS_PER_PAGE = 5;
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const [page, setPage] = useState(0);
  const [orderDirection, setOrderDirection] = useState(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = useState(DEFAULT_ORDER_BY);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
  const [totalRows, setTotalRows] = useState(0);
  const [previousPageClass, setPreviousPageClass] = useState('inactive-icon');
  const [nextPageClass, setNextPageClass] = useState('');
  const [projectId, setProjectId] = useState(0);
  const [bugSeverity, setBugSeverity] = useState('');
  const [bugStatus, setBugStatus] = useState('');
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [bugProjects, setBugProjects] = useState<Project[]>([]);

  useEffect(() => {
    getBugProjects(setBugProjects);
    if(query.get('projectId')) {
      setProjectId(Number(query.get('projectId')));
    }
    if(query.get('bugSeverity')) {
      setBugSeverity(String(query.get('bugSeverity')));
    }
    if(query.get('bugStatus')) {
      setBugStatus(String(query.get('bugStatus')));
    }
    setPageLoaded(true);
  }, []);

  useEffect(() => {
    updateBugs();
  }, [bugStatus, bugSeverity, projectId, pageLoaded, page, rowsPerPage, orderBy, orderDirection]);

  const goToBug = (bugId: number) => {
    return navigate(`/bugs/${bugId}`);
  }

  const updateBugs = () => {
    if(pageLoaded) {
      getBugs(page, rowsPerPage, orderDirection, orderBy, projectId, bugSeverity, bugStatus, setIsLoading,
        setPreviousPageClass, setNextPageClass, setBugs, setTotalRows, bugProjects, setBugProjects
      );
    }
  }

  return (
    <div className="bug-list-container">
      <BugFilterGroup statusIcon={statusIcon} bugStatus={bugStatus} setBugStatus={setBugStatus} bugSeverity={bugSeverity}
        setBugSeverity={setBugSeverity} projectId={projectId} setProjectId={setProjectId} bugProjects={bugProjects} setPage={setPage}
      />
      {
          isLoading ? <CircularProgress className='bug-spinner' /> : null
      }
      {
        bugs.length == 0 ?
        <div className='bug-container'><h2 className='empty-bugs'>No bugs found</h2></div> :
          bugs.map((bug) => (
              <div className='bug-container' key={bug.id} onClick={() => goToBug(bug.id)}>
                  <div className='bugs-list-title-container'>
                    <div className='bugs-list-status-icon'>{statusIcon(bug.status.toString())}</div>
                    <h1 className='bug-title'>{bug.title}</h1>
                  </div>
                  <BugPriorityIcons priority={bug.severity} keyString={bug.id.toString()} />
              </div>
          ))
      }
      <PaginationContainer DEFAULT_ROWS_PER_PAGE={DEFAULT_ROWS_PER_PAGE} totalRows={totalRows} rowsPerPage={rowsPerPage} page={page} setPage={setPage} setRowsPerPage={setRowsPerPage}
          setPreviousPageClass={setPreviousPageClass} setNextPageClass={setNextPageClass} previousPageClass={previousPageClass} nextPageClass={nextPageClass}
      />
      <BugAddButton projectId={projectId} projects={bugProjects} updateBugs={updateBugs} />
    </div>
  )
}