import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Checkbox from '@mui/material/Checkbox';
import styles from './home.module.css';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function Home() {
  const [data, setData] = useState([]);
  const [refetch, setRefetch] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const completeTask = data?.filter(user => user.complete === true).map(user=>user.id)
  const allTask = data?.map(user=>user.id)

  function handleUpdateCheckbox(id, data) {
    axios
      .patch(`https://fake-api-coba.herokuapp.com/todos/${id}`, {
        complete : !data
      })
      .then(()=>{
        setRefetch(true)
      })
  }

  function handleSearch() {
    axios
      .get(`https://fake-api-coba.herokuapp.com/todos?q=${search}`)
      .then((response) => {setData(response.data);
      setRefetch(false);
      });
  }
    
  function allActivity() {
    axios
      .get('https://fake-api-coba.herokuapp.com/todos')
      .then((response) => {setData(response.data);
      setRefetch(false);
      });
  }

  function doneActivity() {
    axios
      .get('https://fake-api-coba.herokuapp.com/todos?complete=true')
      .then((response) => {setData(response.data);
      setRefetch(false);
      });
  }

  function todoActivity() {
    axios
      .get('https://fake-api-coba.herokuapp.com/todos?complete=false')
      .then((response) => {setData(response.data);
      setRefetch(false);
      });
  }

  function handleDeleteActivity(id) {
    axios
      .delete(`https://fake-api-coba.herokuapp.com/todos/${id}`)
      .then((response) => console.log(response))
      .then(setRefetch(true));
  }

  useEffect((id) => {
    if(refetch) handleDeleteActivity(id); allActivity();
  }, [refetch]);

  return (
    <div className='App'>
      <h1>TodoSearch</h1>
      <input value={search} type="text" placeholder='Search Todo' className={styles.searchBox} onChange={(e)=> {e.preventDefault(); setSearch(e.target.value);}}></input>
      <br></br>
      <Button
        variant="contained"
        onClick={()=> handleSearch()}
        style={{
          marginLeft: "5px",
          paddingLeft:"185px",
          paddingRight:"185px"
        }}>
          Search
      </Button>
      <Link to="/input">
        <Button
          variant="contained"
          style={{
            marginLeft: "100px",
            paddingLeft:"40px",
            paddingRight:"40px"
          }}>
            Add New Task
        </Button>
      </Link>
      <h1>TodoList</h1>
      <Button variant="contained" onClick={()=>allActivity()} style={{paddingLeft:"95px", paddingRight:"95px", marginLeft:"10px", marginRight:"10px", marginBottom:"20px"}}>All</Button>
      <Button variant="contained" onClick={()=>doneActivity()} style={{paddingLeft:"95px", paddingRight:"95px", marginLeft:"10px", marginRight:"10px", marginBottom:"20px"}}>Done</Button>
      <Button variant="contained" onClick={()=>todoActivity()} style={{paddingLeft:"95px", paddingRight:"95px", marginLeft:"10px", marginRight:"10px", marginBottom:"20px"}}>Todo</Button>
      {
        data.map((user) => (
          <div key={user.id}>
            <p style={user.complete? {
              textDecoration:"line-through",
              textDecorationColor:"red",
              color:"red",
              borderColor:"#DBDBDB",
              borderStyle:"solid",
              borderWidth:"2px",
              width:"695px",
              borderRadius:"5px",
              marginLeft:"400px",
              textAlign:"left",
              paddingLeft:"20px",
              paddingTop:"10px",
              paddingBottom:"10px",
              marginBottom:"-30px"
            } : {
              width:"695px",
              textDecoration:"none",
              borderColor:"#DBDBDB",
              borderStyle:"solid",
              borderWidth:"2px",
              borderRadius:"5px",
              marginLeft:"400px",
              textAlign:"left",
              paddingLeft:"20px",
              paddingTop:"10px",
              paddingBottom:"10px",
              marginBottom:"-30px"
            }}>
              {user.task}
    	      </p>
            {user.complete === true?(
                 <Checkbox {...label} defaultChecked color="success"
                 onChange={()=> handleUpdateCheckbox(user.id, user.complete)}
                 style={{marginLeft:"590px", marginTop:"-45px"}}
                 />
              ):(
                <Checkbox {...label} color="success"
                onChange={()=> handleUpdateCheckbox(user.id, user.complete)}
                style={{marginLeft:"590px", marginTop:"-45px"}}
                />
              )}
              <EditIcon
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/input/${user.id}`);
                }}
                className={styles.editicon}>
              </EditIcon>
              <DeleteIcon className={styles.deleteicon} onClick={()=> handleDeleteActivity(user.id)}></DeleteIcon>
          </div>
        ))
      }
      <br></br>
      <Button
        onClick={()=> 
          Promise.all(
            completeTask.map((id) => {
              axios
                .delete(`https://fake-api-coba.herokuapp.com/todos/${id}`)
                .then(setRefetch(true))
                return null
            }).then((response) => {return response;})
          )
        }
        variant="contained" 
        color="error"
        style={{paddingLeft:"100px", paddingRight:"100px", marginLeft:"10px", marginRight:"10px", marginTop:"5px", marginBottom:"50px"}}>
          Delete done tasks
      </Button>
      <Button
        onClick={()=> 
          Promise.all(
            allTask.map((id) => {
              axios
                .delete(`https://fake-api-coba.herokuapp.com/todos/${id}`)
                .then(setRefetch(true));
                return null
            }).then((response) => {return response;})
          )
        }
        variant="contained"
        color="error"
        style={{paddingLeft:"100px", paddingRight:"100px", marginLeft:"10px", marginRight:"10px", marginTop:"5px", marginBottom:"50px"}}>
          Delete all tasks
      </Button>
    </div>
  );
}