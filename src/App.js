import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Home from './components/Home';
import Customers from './components/Customers';
import Trainings from './components/Trainings';
import CalendarComponent from './components/Calendar';

import './App.css';
import { withStyles } from '@material-ui/core/styles';

const StyledTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      maxWidth: 40,
      width: '100%',
      backgroundColor: 'rgb(230, 230, 230)',
    },
  },
}) ((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

function App() {
  const [value, setValue] = useState('home');

  const handleChange = (event, value) => {
    setValue(value);
  }

  return (
    <div className='App'>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6'>
            PersonalTrainer
          </Typography>
          <StyledTabs value={value} onChange={handleChange}>
            <Tab value='home' label='HOME' />
            <Tab value='customers' label='CUSTOMERS' />
            <Tab value='trainings' label='TRAININGS' />
            <Tab value='calendar' label='CALENDAR' />
          </StyledTabs>
        </Toolbar>
      </AppBar>
      {value === 'home' &&
        <div>
          <Home />
        </div>}
      {value === 'customers' &&
        <div>
          <Customers />
        </div>}
      {value === 'trainings' &&
        <div>
          <Trainings />
        </div>}
      {value === 'calendar' &&
        <div>
          <CalendarComponent />
        </div>}
    </div>
  );
}

export default App;
