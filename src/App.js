import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateHabit from './pages/CreateHabitPage';
import MyHabit from './pages/MyHabitPage';
import GroupPage from './pages/GroupPage';
import AwsS3Test from './pages/AwsS3Test';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/my-habit/:nickname/new-habit' element={<CreateHabit />} />
        <Route path='/my-habit/:nickname' element={<MyHabit />} />
        <Route path='/group/:groupId' element={<GroupPage />} />
        <Route path='/aws-s3-test' element={<AwsS3Test />} />
      </Routes>
    </Router>
  );
}

export default App;
