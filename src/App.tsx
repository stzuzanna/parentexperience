import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { DemoHeader } from './components/DemoHeader/DemoHeader';
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
import { DesktopNudge } from './components/DesktopNudge';

function App() {
  const { shouldShowFrame } = useDeviceDetection();
  const [showTips, setShowTips] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('demo_show_tips');
      return saved ? saved === '1' : false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('demo_show_tips', showTips ? '1' : '0');
    } catch {}
  }, [showTips]);

  return (
    <Router>
      <div className="w-full h-full">
        <DemoHeader showFrame={shouldShowFrame} showTips={showTips} onToggleTips={() => setShowTips((v) => !v)} />
        <GlobalNudge showFrame={shouldShowFrame} showTips={showTips} />
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

function GlobalNudge({ showFrame, showTips }: { showFrame: boolean; showTips: boolean }) {
  const location = useLocation();
  if (!showFrame || !showTips) return null;

  const path = location.pathname;
  let text = '';
  switch (true) {
    case path === '/' || path === '/demo/parent':
      text = 'This is your feed — try reacting, commenting, and exploring posts';
      break;
    case path.startsWith('/child-profile'):
      text = 'Here parents can see everything you’ve logged for their child';
      break;
    case path.startsWith('/messages'):
      text = 'Open a conversation to see how messaging looks for parents';
      break;
    case path.startsWith('/notifications'):
      text = 'Notifications jump you into the right place — try one';
      break;
    case path.startsWith('/activity-plans'):
      text = 'Lesson plans shared here appear in parents’ feed';
      break;
    case path.startsWith('/balance'):
      text = 'Parents can view and pay invoices right from here';
      break;
    case path.startsWith('/menu'):
      text = 'Account and settings — explore profile and preferences';
      break;
    default:
      text = '';
  }

  if (!text) return null;
  return <DesktopNudge text={text} side="left" visible />;
}

export default App;