import React, { useEffect, useState } from 'react';
import './Content1.css';
import axios from 'axios';

export default function Content1() {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState();
  const [taskTitle, setTaskTitle] = useState('');
  const [taskType, setTaskType] = useState('');

  const fetchEmail = async () => {
    try {
      const token = localStorage.getItem('access');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/accounts/api/get_email/`, {
        headers: {
          Authorization: `JWT ${token}`,
        },
      });
      setEmail(response.data.email);
    } catch (error) {
      console.error('Error fetching email:', error);
    }
  }
  const fetchFirstName = async () => {
    try {
      const token = localStorage.getItem('access');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/accounts/api/get_first_name/`, {
        headers: {
          Authorization: `JWT ${token}`,
        },
      });

      setFirstName(response.data.first_name);
    } catch (error) {
      console.error('Error fetching first name:', error);
    }
  };

  const addTaskEvent = async () => {
    try {
      const token = localStorage.getItem('access');
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/accounts/api/add_task/`,{
          email,
          task_title: taskTitle,
          task_type: taskType,
        },
        {
          headers: {
            Authorization: `JWT ${token}`,
          },
        }
      );
      window.location.reload();
      console.log(response.data);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  }

  useEffect(() => {
    fetchFirstName();
    fetchEmail();
  }, []);

  const handleTaskTitleChange = (e) => {
    setTaskTitle(e.target.value);
  }

  const handleTaskTypeChange = (e) => {
    setTaskType(e.target.value);
  }

  return (
    <>
      <div className="con1">
        <div className="con1Head">
          <div className="con1HeadText">
            <h1 className='con1_heading1'>Good Day, {firstName}</h1>
            <h5 className='con1_heading5'>Let's finish your task today!</h5>
          </div>
        </div>
        <div className="con1Main">
          <div className="con1MainHead">
            <h2 className='con1MainHeadH2'>Add Task</h2>
          </div>
          <div className="con1MainForm">
            <div className="con1MainFormIp1">
              <input type="text" placeholder="Enter Task" name="text" className="inputTaskTitle" id='inputTaskTitle' value={taskTitle} onChange={handleTaskTitleChange} />
            </div>
            <div className='con1MainFormIp2'>
              <select className='con1MainFormIp2Select' value={taskType} onChange={handleTaskTypeChange}>
                <option value="" disabled defaultValue>Select Task Type</option>
                <option value="Personal_Task" className='con1MainFormIp2Op1'>Personal Task</option>
                <option value="Work_Task" className='con1MainFormIp2Op2'>Work Task</option>
                <option value="Priority_Task" className='con1MainFormIp2Op3'>Priority Task</option>
              </select>
            </div>
            <div className="con1MainFormBtnDiv">
              <button className='con1MainFormBtn' onClick={addTaskEvent}>Add</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
