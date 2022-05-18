import React from 'react';
import {useQuery, gql} from '@apollo/client';
export  const PEOPLE = gql`
query Query ($timerangestart: String, $timerangeend: String){
 
 device(deviceId:"e255344f-cbc2-46f1-9bdf-671e23ef7077"){
  verboseName
  lastHeard
  history(timerangestart: $timerangestart, timerangeend: $timerangeend, fields: "COUNTER_A")
 
 }
}`;
const PeopleWidget = (props) =>{
    //We save our props in two variables to be used in the query
    //startTime is from what time we want to start measuring
    var startTime =props.timeBF; 
    //endTime is to what time we want to stop measuring
    var endTime = props.timeRN;
    //We deconstruct our return from useQuery saving only data
    //You might want to store loading and error as well
    const {data} = useQuery(PEOPLE, {
     variables: {
      "timerangestart": startTime,
      "timerangeend": endTime
     },
    });
    //We create people which will store the return string and check that //data contains something, if not we set people to 'Not available'.
    var people='';
    if (typeof data !== 'undefined') {
    //We store the history in obj
     const obj = JSON.parse(data?.device.history);
    //We store lastHeard as a Datetime format which with endTime we use //to check that there has been data collected in a given //timeinterval (we use 1.5 hours)
    //if not we set people to 'Not available'.
     const lastHeard =new Date(data?.device.lastHeard);
     const dif = endTime-lastHeard;
     if(dif<5400000){  // 1.5 hours
       //For each reading counter_a has made, we add that to the sum
       var sum = 0;
       
       obj.forEach(element => {
        sum+= (element.COUNTER_A);
    
       });
    //The sum is then converted from an int to a string value for people
      if(sum<=6){
       people='Low';
       }else if(sum<=12){
        people='Mid';
       }else{
        people='High';
       }
      }else{
       people='Not available';
      }
     }else{
      people='Not available';
     }
    //Lastly we check that Kallbadet is open and pass back people, //otherwise we pass back 'Closed'.
    if(props.openingHour){
      return <div>{people}</div>
     }else{
      return <div>Closed</div>
     }
    }
    export default PeopleWidget;