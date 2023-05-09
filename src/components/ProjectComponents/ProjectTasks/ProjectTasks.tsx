import './ProjectTasks.css';
import { Project } from "../../../models/Project";
import { Button } from '@mui/material';
import { useState } from 'react';
import ProjectTask from './ProjectTask/ProjectTask';
import { Task } from '../../../models/Task';
import { useAppSelector } from '../../../redux/hooks';

export default function ProjectTasks(props: {project: Project, setProject: React.Dispatch<React.SetStateAction<Project>>, updateProject: () => Promise<void>}) {
    const loggedIn = useAppSelector((state) => state.auth.loggedIn);
    const [filterTasks, setFilterTasks] = useState(false);
    const [filterButtonClass, setFilterButtonClass] = useState('');
    const [addingTask, setAddingTask] = useState(false);
    const [newTask, setNewTask] = useState({id: 0, description: '', finished: false} as Task);
    const [emptyTaskError, setEmptyTaskError] = useState(false);

    const updateTask = async (newTask: Task) => {
        props.setProject((updateProject) => {
            const updatedProject = { ...updateProject };
            updatedProject.tasks.map((taskCheck) => {
                if(taskCheck.id == newTask.id) {
                    taskCheck.description = newTask.description;
                    taskCheck.finished = newTask.finished;
                }
            });
            return updatedProject;
        });
        props.updateProject();
    }

    const addNewTask = async () => {
        if(newTask.description == "") {
            setEmptyTaskError(true);
            return;
        }
        newTask.id = props.project.tasks.length > 1 ? props.project.tasks.slice(-1)[0].id + 1 : 1;
        setAddingTask(false);
        setEmptyTaskError(false);
        props.setProject((updateProject) => {
            const updatedProject = { ...updateProject };
            updatedProject.tasks.push(newTask);
            return updatedProject;
        });
        props.updateProject();
    }

    return(
        <div className='project-tasks-container'>
            <div className='tasks-header'>
                <h2>Tasks:</h2>
                <Button className={filterButtonClass} variant="outlined" onClick={() => {
                    setFilterTasks((currentFilterTasks) => !currentFilterTasks);
                    setFilterButtonClass((currentClass) => currentClass = currentClass == '' ? 'filter-active' : '');
                }}>
                        Filter Finished
                </Button>
            </div>
            {
                props.project?.tasks?.sort((a,b) => {return (a.id > b.id) ? 1 : -1})
                .filter((e,i,a) => {
                    return filterTasks ? !e.finished : e
                })
                .map((task) => (
                    <ProjectTask key={`project-task-${task.id}`} task={task} setNewTask={setNewTask} newTask={false} updateTask={updateTask} />
                ))
            }
            {
                addingTask ?
                    <>
                        <ProjectTask task={newTask} setNewTask={setNewTask} newTask={true} updateTask={updateTask} />
                        <p className={emptyTaskError ? 'empty-task-error-active' : 'empty-task-error'}>*Description must not be blank</p>
                    </> :
                    null
            }
            <div>
                {
                    addingTask ?
                        <div>
                            <Button variant="outlined" className='add-task-button' onClick={() => addNewTask()}>Save Task</Button>
                            <Button sx={{marginRight: "10px"}} variant="outlined" className='add-task-button' onClick={() => {setAddingTask(false); setEmptyTaskError(false)}}>Remove Task</Button>
                        </div> :
                        loggedIn ? 
                            <Button variant="outlined" className='add-task-button' onClick={() => setAddingTask(true)}>Add Task</Button> :
                            null
                }
            </div>
        </div>
    )
}
