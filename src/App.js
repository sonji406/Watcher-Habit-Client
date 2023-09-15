import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Home from './pages/Home';
import CreateNickname from './pages/CreateNickname';
import CreateHabit from './pages/CreateHabit';
import MyHabit from './pages/MyHabit';
import Group from './pages/Group';
import AwsS3Test from './pages/AwsS3Test';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create-nickname' element={<CreateNickname />} />
          <Route
            path='/my-habit/:nickname/new-habit'
            element={<CreateHabit />}
          />
          <Route path='/my-habit/:nickname' element={<MyHabit />} />
          <Route path='/group/:groupId' element={<Group />} />
          <Route path='/aws-s3-test' element={<AwsS3Test />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
