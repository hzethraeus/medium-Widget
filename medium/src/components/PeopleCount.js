import React, { useState, useEffect } from 'react';
import Card from './UI/Card/Card';
import styles from './PeopleCount.module.css';
import PeopleWidget from './PeopleWidget';
const PeopleCount = () =>{
    const [now, setNow] = useState(new Date());
    const [prevTime, setPrevTime] = useState(new Date());
    const [open, setOpen] = useState(true);
    useEffect(() => {
        //We check the time right now with:
        var today = new Date();
        var time = today.getHours(); 
        //Kallbadet openinghours are between 6 and 22.
        if(6<time.valueOf() && time.valueOf()<22){
          setOpen(true);
          setNow(new Date());
        //PrevTime is calculated through decreasing the current time with 1 
        //hour and 2 minutes. (2 mins is to safeguard so we dont miss any data)
          var timeBefore= new Date();
          timeBefore.setHours(timeBefore.getHours()-1);
          timeBefore.setMinutes(timeBefore.getMinutes()-2);
          setPrevTime(timeBefore);
        } else {
          setOpen(false);
        }
        // Creates an interval which will update the current data every minute
        const timer = setInterval(() => { 
        //We check the time right now with:
        var today = new Date();
        var time = today.getHours();
        //Kallbadet openinghours are between 6 and 22.
        if(6<time.valueOf() && time.valueOf()<22){
          setOpen(true);
          setNow(new Date());
          var timeBefore= new Date();
          timeBefore.setHours(timeBefore.getHours()-1);
          timeBefore.setMinutes(timeBefore.getMinutes()-2);
          setPrevTime(timeBefore);
        } else {
          setOpen(false);
        }
        }, 60 * 1000);
        return () => {
        // Return a funtion to clear the timer so that it will stop being //called on unmount
        clearInterval(timer); 
        }
        }, []);
return(<Card className={styles.entire}>
    <div className={styles.floatChild}>
     <div className={styles.mainText}>
      Visitors right now
     </div>
     <div className={styles.subText}>
      <a href="https://www.galiot.io/solutions" target="_blank">
        Read about the data here
      </a>
     </div>
    </div>
    <div className={styles.responseText}>
     <PeopleWidget 
       openingHour={open} 
       timeRN={now} 
       timeBF={prevTime} />
    </div>
    </Card>)
};
export default PeopleCount;