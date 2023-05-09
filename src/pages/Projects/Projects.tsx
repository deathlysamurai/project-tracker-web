import './Projects.css';
import { useEffect, useState } from 'react';
import { api } from '../../utilities/axiosConfig';
import { Project } from '../../models/Project';
import { CircularProgress } from '@mui/material';
import StageCircles from '../../components/ProjectComponents/StageCircles/StageCircles';
import { useNavigate } from 'react-router-dom';
import PaginationContainer from '../../components/PaginationContainer/PaginationContainer';
import ProjectFilterGroup from '../../components/ProjectComponents/ProjectFilterGroup/ProjectFilterGroup';
import ProjectAddButton from '../../components/ProjectComponents/ProjectAddButton/ProjectAddButton';

export default function Projects() {
    const navigate = useNavigate();
    const DEFAULT_ORDER = 'desc';
    const DEFAULT_ORDER_BY = 'id';
    const DEFAULT_ROWS_PER_PAGE = 5;
    const [projects, setProjects] = useState<Project[]>([]);
    const [orderDirection, setOrderDirection] = useState(DEFAULT_ORDER);
    const [orderBy, setOrderBy] = useState(DEFAULT_ORDER_BY);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
    const [totalRows, setTotalRows] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [filter, setFilter] = useState('');
    const [previousPageClass, setPreviousPageClass] = useState('inactive-icon');
    const [nextPageClass, setNextPageClass] = useState('');

    const getProjects = async () =>{
        try {
            setIsLoading(true);
            var params = (filter == '' || filter == null) ? 
                        { page: page, size: rowsPerPage, direction: orderDirection, sort: orderBy } :
                        { page: page, size: rowsPerPage, direction: orderDirection, sort: orderBy, stageFilter: filter };
            const response = await api.get("/api/public/projects", {
                params: params
            });
            if(((page * rowsPerPage) + rowsPerPage) >= response?.data.totalElements) { setNextPageClass('inactive-icon'); }
            setProjects(response?.data.content);
            setTotalRows(response?.data.totalElements);
            setIsLoading(false);
        } catch(err) {
            alert(err);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getProjects();
    }, [page, rowsPerPage, orderBy, orderDirection, filter]);

    const goToProject = (projectId: number) => {
        return navigate(`/projects/${projectId}`);
    }

    return (
      <div className="projects-container">
         <ProjectFilterGroup filter={filter} setFilter={setFilter} setPage={setPage} setPreviousPageClass={setPreviousPageClass} setNextPageClass={setNextPageClass} />
        {
            isLoading ? <CircularProgress className='projects-spinner' /> : null
        }
        {
            projects.map((project) => (
                <div className='project-container' key={project.id} onClick={() => goToProject(project.id)}>
                    <h1 className='project-title'>{project.title}</h1>
                    <StageCircles stage={project.stage} keyString={project.id.toString()} />
                </div>
            ))
        }
        <PaginationContainer DEFAULT_ROWS_PER_PAGE={DEFAULT_ROWS_PER_PAGE} totalRows={totalRows} rowsPerPage={rowsPerPage} page={page} setPage={setPage} setRowsPerPage={setRowsPerPage}
            setPreviousPageClass={setPreviousPageClass} setNextPageClass={setNextPageClass} previousPageClass={previousPageClass} nextPageClass={nextPageClass}
        />
        <ProjectAddButton getProjects={getProjects} />
      </div>
    )
}