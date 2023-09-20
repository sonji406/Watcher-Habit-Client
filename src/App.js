import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Home from './pages/Home';
import Group from './pages/Group';
import MyHabit from './pages/MyHabit';
import AwsS3Test from './pages/AwsS3Test';
import Header from './components/common/Header';
import Sidebar from './components/sidebar/Sidebar';
import CreateNickname from './pages/CreateNickname';

const CreateHabit = React.lazy(() => import('./pages/CreateHabit'));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create-nickname' element={<CreateNickname />} />
          <Route
            path='*'
            element={
              <div className='flex'>
                <Sidebar />
                <Header />
                <div className='flex-1'>
                  <Routes>
                    <Route
                      path='/my-habit/:nickname/new-habit'
                      element={<CreateHabit />}
                    />
                    <Route path='/my-habit/:nickname' element={<MyHabit />} />
                    <Route path='/group/:groupId' element={<Group />} />
                    <Route path='/aws-s3-test' element={<AwsS3Test />} />
                  </Routes>
                </div>
              </div>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
