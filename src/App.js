import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import HomePage from './pages/HomePage';
import CreateNicknamePage from './pages/CreateNickname';
import CreateHabitPage from './pages/CreateHabit';
import MyHabitPage from './pages/MyHabit';
import GroupPage from './pages/Group';
import AwsS3TestPage from './pages/AwsS3Test';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/create-nickname' element={<CreateNicknamePage />} />
          <Route
            path='/my-habit/:nickname/new-habit'
            element={<CreateHabitPage />}
          />
          <Route path='/my-habit/:nickname' element={<MyHabitPage />} />
          <Route path='/group/:groupId' element={<GroupPage />} />
          <Route path='/aws-s3-test' element={<AwsS3TestPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
