import { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import 'react-big-calendar/lib/css/react-big-calendar.css';

function CalendarComponent() {
  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then(response => response.json())
    .then((data) => {
      const fetchData = data;
      const trainings = [];
      for (let i = 0; i < fetchData.length; i++) {
        const training = {};
        training.title = `${fetchData[i].activity} / ${fetchData[i].customer.firstname} ${fetchData[i].customer.lastname}`;
        training.start = new Date(fetchData[i].date);
        training.end = new Date(moment(fetchData[i].date).add(fetchData[i].duration, 'minutes').format());
        trainings.push(training);
      }
      setEvents(trainings);
    })
    .catch(err => console.error(err))
  }

  return (
    <div style={{marginTop: 10}}>
      <Calendar
        localizer={localizer}
        events={events}
        style={{height: 500, width: '99%', margin: 'auto'}}
      />
    </div>
  );
}

export default CalendarComponent;
