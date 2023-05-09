import { Bug } from "../../models/Bug";
import { Project } from "../../models/Project";
import { api } from "../../utilities/axiosConfig";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import GradeIcon from '@mui/icons-material/Grade';

export async function getBugs(page: number, rowsPerPage: number, orderDirection: string, orderBy: string,
    projectId: number, bugSeverity: string, bugStatus: string, setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setPreviousPageClass: React.Dispatch<React.SetStateAction<string>>, setNextPageClass: React.Dispatch<React.SetStateAction<string>>,
    setBugs: React.Dispatch<React.SetStateAction<Bug[]>>, setTotalRows: React.Dispatch<React.SetStateAction<number>>,
    bugProjects: Project[], setBugProjects: React.Dispatch<React.SetStateAction<Project[]>>
) {
    try {
      var params: any = { page: page, size: rowsPerPage, direction: orderDirection, sort: orderBy };
      if(projectId != 0) {
        params['projectId'] = projectId;
      }
      if(bugSeverity != '') {
        params['severity'] = bugSeverity;
      }
      if(bugStatus != '') {
        params['status'] = bugStatus;
      }
      setIsLoading(true);
      const response = await api.get("/api/public/bugs", {
          params: params
      });
      if(page == 0) { setPreviousPageClass('inactive-icon'); }
      (((page * rowsPerPage) + rowsPerPage) >= response?.data.totalElements) ? setNextPageClass('inactive-icon') : setNextPageClass('');
      setBugs(response?.data.content);
      setTotalRows(response?.data.totalElements);
      if(bugProjects.length <= 0) {
        var projects: Project[] = [];
        var projectIds: number[] = [];
        response?.data.content.forEach((element: Bug) => {
          if(!projectIds.includes(element.project.id)) {
            projectIds.push(element.project.id);
            projects.push(element.project);
          }
        });
        setBugProjects(projects);
      }
      setIsLoading(false);
    } catch(err) {
        alert(err);
        setIsLoading(false);
    }
}

export function statusIcon(status: string) {
    switch(status) {
      case 'NEW': return <GradeIcon />;
      case 'SEEN': return <VisibilityIcon />;
      case 'STARTED': return <EditIcon />;
      case 'FINISHED': return <DoneIcon />;
    }
}

export async function getBugProjects(setBugProjects: React.Dispatch<React.SetStateAction<Project[]>>) {
    try {
      const response = await api.get("/api/public/projects/all");
      setBugProjects(response?.data);
    } catch(err) {
        alert(err);
    }
}

export async function addBug(newBug: Bug, setEmptyTitleError: React.Dispatch<React.SetStateAction<boolean>>,
  setEmptyDescriptionError: React.Dispatch<React.SetStateAction<boolean>>, setEmptyProjectError: React.Dispatch<React.SetStateAction<boolean>>,
  updateBugs: () => void, handleClose: () => void  
) {
  var error = false;
  if(!newBug.title || newBug.title == '') {
      setEmptyTitleError(true);
      error = true;
  } else { setEmptyTitleError(false); }
  if(!newBug.description || newBug.description == '') {
      setEmptyDescriptionError(true);
      error = true;
  } else { setEmptyDescriptionError(false); }
  if(!newBug.project || Object.keys(newBug.project).length === 0) {
      setEmptyProjectError(true);
      error = true;
  } else { setEmptyProjectError(false); }
  if(error) { return; }
  try {
      var bugToAdd: Bug = { ...newBug };
      await api.post("/api/public/bugs/add", { bug: bugToAdd, projectId: bugToAdd.project.id });
      updateBugs();
  } catch(err) {
      alert(err);
  }
  handleClose();
}
