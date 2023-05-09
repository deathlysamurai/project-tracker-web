import './ProjectTask.css';
import { IconButton, TextField, Tooltip } from '@mui/material';
import { Task } from '../../../../models/Task';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../redux/hooks';

export default function ProjectTask(props: {task: Task, setNewTask: React.Dispatch<React.SetStateAction<Task>>, newTask: boolean, updateTask: (newTask: Task) => Promise<void>}) {
    const loggedIn = useAppSelector((state) => state.auth.loggedIn);
    const [updatedTask, setUpdatedTask] = useState(props.task);
    const [loading, setLoading] = useState(true);

    const updateFinished = (finishedState: boolean) => {
        setUpdatedTask((currTask) => {
            const newTask = { ...currTask };
            newTask.finished = finishedState;
            return newTask;
        });
    }

    useEffect(() => {
        if(!loading) {
            props.updateTask(updatedTask);
        }
        setLoading(false);
    }, [updatedTask]);
    
    return(
        <div className="project-task">
            {
                !props.newTask ?
                    <h3>{props.task.description}</h3> :
                    <TextField 
                        sx={{backgroundColor: "rgba(var(--primaryRGB),.3)", marginRight: '10px'}}
                        fullWidth
                        variant="outlined" 
                        value={props.task.description} 
                        onChange={ (event: React.ChangeEvent<HTMLInputElement>) => { 
                            props.setNewTask((task) => {
                                var newTask = {...task};
                                newTask.description = event.target.value;
                                return newTask;
                            }) 
                        } } 
                    />
            }
            <div className='task-check'>
                {
                    loggedIn ? 
                        props.task.finished ?
                            <Tooltip title="Uncheck" className='tooltip'>
                                <IconButton onClick={() => {
                                    props.newTask ?
                                        props.setNewTask((task) => {
                                            var newTask = {...task};
                                            newTask.finished = false;
                                            return newTask;
                                        }) :
                                        updateFinished(false)
                                }}>
                                    <CheckCircleOutlineIcon fontSize='small' />
                                </IconButton>
                            </Tooltip> :
                            <Tooltip title="Check" className='tooltip'>
                                <IconButton onClick={() => {
                                    props.newTask ?
                                        props.setNewTask((task) => {
                                            var newTask = {...task};
                                            newTask.finished = true;
                                            return newTask;
                                        }) : 
                                        updateFinished(true)
                                }}>
                                    <RadioButtonUncheckedIcon fontSize='small' />
                                </IconButton>
                            </Tooltip> :
                        props.task.finished ?
                            <CheckCircleOutlineIcon fontSize='small' /> :
                            <RadioButtonUncheckedIcon fontSize='small' />

                }
            </div>
        </div>
    )
}
