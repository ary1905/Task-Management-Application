import React, { useEffect, useState } from 'react';
import './Content2.css';
import './Content2Comps.css';
import Personal_Task from '../../Images/Task-Images/Personal_Task.png';
import Work_Task from '../../Images/Task-Images/Work_Task.png';
import axios from 'axios';

export default function Content2() {

  const [currentSlide, setCurrentSlide] = useState(0);

  const [tasks, setTasks] = useState([]);

  const handlePrev = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? tasks.length - 1 : prevSlide - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide === tasks.length - 1 ? 0 : prevSlide + 1));
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('access');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/accounts/api/get_tasks/`, {
        headers: {
          Authorization: `JWT ${token}`,
        },
      });
      const data = response.data;
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  
  const getImageForTaskType = (taskType) => {
    switch (taskType) {
      case 'Work_Task':
        return Work_Task;
        case 'Personal_Task':
          return Personal_Task;
          default:
            return null;
          }
        };
        
  const backgroundImage = tasks.length > 0 ? getImageForTaskType(tasks[currentSlide].task_type) : null;

  return (
    <div className="con2">
      {tasks.length > 0 && (
        <div
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'contain',
            backgroundPosition: '90%',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="con2Heading">
            <div className="taskHeading"></div>
          </div>
          <div className="con2Body">
            <div className="con2Body_Prev" style={{ gridArea: 'con2Body_Prev' }}>
              <button onClick={handlePrev} className="carousel-button">&#9664;</button>
            </div>
            <div className="con2Body_Main" style={{ gridArea: 'con2Body_Main' }}>
              <div className="con2MainHead">
                <div className="flip-card">
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                      <div className="frontText">
                        <p className="title">{tasks[currentSlide].task_id}. {tasks[currentSlide].task_title}</p>
                        <p style={{ fontSize: '0.9em', color: 'gray' }}>Due, {tasks[currentSlide].task_due_date}</p>
                      </div>
                      <div className="frontBtns">
                        <button className="button1">
                          <svg className="svgIcon1" width="800px" height="800px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                            <path d="M760 380.4l-61.6-61.6-263.2 263.1-109.6-109.5L264 534l171.2 171.2L760 380.4z" />
                          </svg>
                        </button>
                        <button className="button2">
                          <svg viewBox="0 0 448 512" className="svgIcon">
                            <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="con2Body_Next" style={{ gridArea: 'con2Body_Next' }}>
              <button onClick={handleNext} className="carousel-button">&#9654;</button>
            </div>
          </div>
          <div className="con2Dots">
            <div className="carousel-dots">
              {tasks.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                ></span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
