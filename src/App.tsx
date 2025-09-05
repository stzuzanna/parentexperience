import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDeviceDetection } from './hooks/useDeviceDetection';
import { IphoneProMax } from './screens/IphoneProMax/IphoneProMax';
import { ChildProfile } from './screens/ChildProfile/ChildProfile';
import { AboutPage } from './screens/ChildProfile/components/AboutPage/AboutPage';
import { Messages } from './screens/Messages/Messages';
import { Chat } from './screens/Messages/Chat';
import { Menu } from './screens/Menu/Menu';
import { Balance } from './screens/Balance/Balance';
import { ActivityPlans } from './screens/ActivityPlans/ActivityPlans';
import { Notifications } from './screens/Notifications/Notifications';

function App() {
  const { shouldShowFrame } = useDeviceDetection();

  return (
    <Router>
      <div className="w-full h-full">
        
        <Routes>
          <Route path="/" element={<IphoneProMax />} />
          <Route path="/demo/parent" element={<IphoneProMax />} />
          <Route path="/child-profile" element={<ChildProfile />} />
          <Route path="/child-profile/about" element={<AboutPage />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/messages/chat/:chatId" element={<Chat />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/balance" element={<Balance />} />
          <Route path="/activity-plans" element={<ActivityPlans />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;