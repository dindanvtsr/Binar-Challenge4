import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams} from 'react-router-dom';
import Button from '@mui/material/Button';
import styles from './home.module.css';

export default function Input() {
  const [task, setTask] = useState("");
  const navigate = useNavigate();

  const params = useParams();
  console.log(params);
  console.log(task);

  const handleEditTask = useCallback(() => {
    axios
      .get(`https://fake-api-coba.herokuapp.com/todos/${params.id}`)
      .then((response) => {setTask(response.data.task);
      });
  }, [params.id])

  function handleUpdateTask() {
    axios
      .patch(`https://fake-api-coba.herokuapp.com/todos/${params.id}`, {
        task : task
      })
      .then((response) => console.log(response));
  }

  function handleAddTask(e) {
    e.preventDefault();
    axios
      .post('https://fake-api-coba.herokuapp.com/todos', {
        complete : false,
        task : task
      })
      .then((response) => console.log(response));
  }

  useEffect(() => {
    handleEditTask()
  }, [handleEditTask]);

  return (
    <div className="App">
      <h1>TodoInput</h1>
      <form>
        <input className={styles.inputBox} type="text" placeholder='Input/Edit Todo' onChange={(e)=>setTask(e.target.value)} value={task}></input>
      </form>
      {params.id ? (
          <Button
            variant="contained"
            style={{
              paddingLeft:"235px",
              paddingRight:"235px"
            }}
            onClick={(e) => {
              e.preventDefault();
              handleUpdateTask();
              navigate('/');
            }}
          >
            SUBMIT
          </Button>
        ) : (
          <Button
            variant="contained"
            style={{
              paddingLeft:"235px",
              paddingRight:"235px"
            }}
            onClick={(e) => {
              e.preventDefault();
              handleAddTask(e);
              navigate('/');
            }}
          >
            SUBMIT
          </Button>
        )}
    </div>
  );
}