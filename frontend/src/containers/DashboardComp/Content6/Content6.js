import React, { useState, useEffect } from 'react';
import './Content6.css'

export default function Content6(props) {
  //Mode to switch between Stopwatch and Timer mode.
  const [mode1, setMode1] = useState(true);
  const [mode2, setMode2] = useState(false);

  //States used to simulate working of stopwatch
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [mili, setMili] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  //States used to simulate working of Timer 
  const [tHours, settHours] = useState(0);
  const [tMinutes, settMinutes] = useState(0);
  const [tSeconds, settSeconds] = useState(0);
  const [timerIsRunning, setTimerIsRunning] = useState(false);


  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        if (mili === 99) {
          setSeconds(seconds + 1);
          setMili(0);
        }
        else if (seconds === 59) {
          setMinutes(minutes + 1);
          setSeconds(0);
        }
        else if (minutes === 59) {
          setHours(hours + 1);
          setMinutes(0);
        }
        else {
          setMili(mili + 1);
        }
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, minutes, seconds, hours, mili]);

  const handleWatchReset = () => {
    setIsRunning(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setMili(0);
  };

  const handleTimerReset = () => {
    setTimerIsRunning(false);
    settHours(0);
    settMinutes(0);
    settSeconds(0);
  };

  const handleClick = () => {
    setIsRunning(!isRunning);
  };

  const handleMode1 = () => {
    setMode1(true);
    setMode2(false);
  }

  const handleMode2 = () => {
    setMode2(true);
    setMode1(false);
  }

  const handleChangeHour = (e) => {
    let newValue = parseInt(e.target.value, 10);
    if (isNaN(newValue)) {
      newValue = 0;
    }
    if (newValue < 0) {
      newValue = 0;
    } else if (newValue > 23) {
      newValue = 23;
    }
    settHours(newValue);
  };

  const handleChangeMin = (e) => {
    let newValue = parseInt(e.target.value, 10);
    if (isNaN(newValue)) {
      newValue = 0;
    }
    if (newValue < 0) {
      newValue = 0;
    } else if (newValue > 59) {
      newValue = 59;
    }
    settMinutes(newValue);
  };

  const handleChangeSec = (e) => {
    let newValue = parseInt(e.target.value, 10);
    if (isNaN(newValue)) {
      newValue = 0;
    }
    if (newValue < 0) {
      newValue = 0;
    } else if (newValue > 59) {
      newValue = 59;
    }
    settSeconds(newValue);
  };


  const handleTimerClick = () => {
    setTimerIsRunning(!timerIsRunning);
  }

  useEffect(() => {
    let interval;

    if (timerIsRunning) {
      interval = setInterval(() => {
        if (tHours === 0 && tMinutes === 0 && tSeconds === 0) {
          setTimerIsRunning(false);
          clearInterval(interval);
        } else {
          if (tSeconds === 0) {
            if (tMinutes === 0) {
              settMinutes(59);
              settHours(tHours - 1);
            }
            else {
              settMinutes(tMinutes - 1);
            }
            settSeconds(59);
          } else {
            settSeconds(tSeconds - 1);
          }
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerIsRunning, tSeconds, tMinutes, tHours]);

  return (
    <div className='con6' style={{ gridArea: 'con6' }}>
      <div className="c6Nav">
        <div className="stopWatch" style={{ backgroundColor: (mode1 ? '#FF8E6D' : 'white'), borderTopLeftRadius: '15px' }}>
          <button className='navBtn' onClick={handleMode1} style={{ color: 'black' }}>Stopwatch</button>
        </div>
        <div className="timer" style={{ backgroundColor: (mode2 ? '#FF8E6D' : 'white'), borderTopRightRadius: '15px' }}>
          <button className='navBtn' onClick={handleMode2} style={{ color: 'black'}}>Timer</button>
        </div>
      </div>
      {mode1 ? (
        <>
          <div className="watch">
            <h1 className='watchDigits'>
              {String(hours).padStart(2, '0')} <span className='span1'>{' : '}</span>
              {String(minutes).padStart(2, '0')} <span className='span2'>{' : '}</span>
              {String(seconds).padStart(2, '0')}
              <span className='miliDigits'>
                {String(mili).padStart(2, '0')}
              </span>
            </h1>
          </div>
          <div className='c6Btns'>
            <button className='navBtn' onClick={handleClick}>
              {isRunning ? 'Stop' : 'Start'}
            </button>
            <button className='navBtn' onClick={handleWatchReset}>
              Reset
            </button>
          </div>
        </>
      )
        :
        (
          <>
            <div className="timer1">
              <div className="dig1">
                <h1 className='watchDigits'>
                  <input
                    className='timerC6Ip1'
                    type="number"
                    value={String(tHours).padStart(2, '0')}
                    onChange={handleChangeHour}
                    min="-1"
                    max="24"
                  />
                </h1>
              </div>
              <div className="dig2">
                <h1 className='watchDigits'>
                  <span className='span12'>{' : '}</span>
                  <input
                    className='timerC6Ip1'
                    type="number"
                    value={String(tMinutes).padStart(2, '0')}
                    onChange={handleChangeMin}
                    min="-1"
                    max="60"
                  />
                  <span className='span22'>{' : '}</span>
                </h1>
              </div>
              <div className="dig3">
                <h1 className='watchDigits'>
                  <input
                    className='timerC6Ip1'
                    type="number"
                    value={String(tSeconds).padStart(2, '0')}
                    onChange={handleChangeSec}
                    min="-1"
                    max="60"
                  />
                </h1>
              </div>
            </div>

            <div className='c6Btns'>
              <button className='navBtn' onClick={handleTimerClick}>
                {timerIsRunning ? 'Stop' : 'Start'}
              </button>
              <button className='navBtn' onClick={handleTimerReset}>
                Reset
              </button>
            </div>
          </>
        )}
    </div>
  )
}
