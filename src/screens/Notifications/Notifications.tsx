import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeviceFrame } from "../../components/DeviceFrame/DeviceFrame";
import { useDeviceDetection } from "../../hooks/useDeviceDetection";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { RSVPPage } from "../../components/RSVPPage/RSVPPage";
import { SearchIcon } from "lucide-react";

interface Notification {
  id: string;
  title: string;
  timestamp: string;
  avatar: string;
  type: 'permission' | 'invoice' | 'post' | 'document';
  onClick?: () => void;
}

const notifications: Notification[] = [
  {
    id: '3',
    title: 'Olivia Wilson shared a post',
    timestamp: 'Today',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
    type: 'post'
  },
  {
    id: '6',
    title: 'Little Explorers created a poll for Next Garden Party Date',
    timestamp: 'Aug 5, 7:27pm',
    avatar: '/frame-12.png',
    type: 'post'
  },
  {
    id: '1',
    title: 'Little Explorers would like you to give permission for Amanda regarding Can your child ride the bus?',
    timestamp: 'Aug 29, 3:41pm',
    avatar: '/frame-12.png',
    type: 'permission'
  },
  {
    id: '2',
    title: 'Sandbox Childcare sent you a new invoice',
    timestamp: 'Aug 29, 12:01pm',
    avatar: '/nursery-logo-1.svg',
    type: 'invoice'
  },
  {
    id: '4',
    title: 'Little Explorers invited you to Parent teacher conference',
    timestamp: 'Aug 27, 2:30pm',
    avatar: '/frame-12.png',
    type: 'permission'
  },
  {
    id: '5',
    title: 'Little Explorers published a lesson plan',
    timestamp: 'Aug 26, 10:15am',
    avatar: '/frame-12.png',
    type: 'document'
  },
];

export const Notifications = (): JSX.Element => {
  const { shouldShowFrame } = useDeviceDetection();
  const navigate = useNavigate();
  const [showRSVP, setShowRSVP] = useState(false);
  const [rsvpState, setRsvpState] = useState({
    hasReplied: false,
    isAttending: null as boolean | null,
    attendeeCount: 1,
    comment: ""
  });

  const handleNotificationClick = (notification: Notification) => {
    switch (notification.type) {
      case 'permission':
        if (notification.id === '4') {
          // Parent teacher conference notification
          setShowRSVP(true);
        } else {
          navigate('/child-profile');
        }
        break;
      case 'invoice':
        navigate('/');
        break;
      case 'post':
        navigate('/');
        break;
      case 'document':
        navigate('/activity-plans');
        break;
      default:
        break;
    }
  };

  if (showRSVP) {
    return (
      <DeviceFrame showFrame={shouldShowFrame}>
        <RSVPPage 
          onClose={() => setShowRSVP(false)} 
          initialState={rsvpState}
          onStateChange={setRsvpState}
        />
      </DeviceFrame>
    );
  }

  const appContent = (
    <div className={`flex flex-col bg-white ${shouldShowFrame ? 'h-full' : 'min-h-screen'} ${!shouldShowFrame ? 'touch:h-screen' : ''}`}>
      {/* Header */}
      <header className={`flex flex-col w-full items-start relative ${!shouldShowFrame ? 'sticky top-0 z-50' : ''}`}>
        <div className={`flex items-end justify-center px-0 py-2 relative w-full bg-mfprimaryp-400 ${!shouldShowFrame ? 'hidden' : ''}`}>
          <div className="flex flex-col w-[106px] items-start justify-center gap-2 pl-5 pr-0 pt-0 pb-[3px] relative">
            <div className="relative w-[54px] h-[21px] rounded-3xl">
              <div className="absolute top-px left-[11px] [font-family:'Inter',Helvetica] font-medium text-mfneutralsn-0 text-base text-center tracking-[-0.32px] leading-[21px] whitespace-nowrap">
                9:41
              </div>
            </div>
          </div>

          <div className="flex flex-col h-8 items-center justify-center relative flex-1">
            <div className="relative flex-1 w-[108px] bg-mfneutralsn-0 rounded-[100px] opacity-0" />
          </div>

          <img
            className="relative w-[106px] h-full"
            alt="Right side"
            src="/right-side.svg"
          />
        </div>

        <nav className="flex h-12 items-center justify-between px-4 py-2 relative w-full bg-mfprimaryp-400">
          <h1 className="font-MF-headings-h6-emphasis font-[number:var(--MF-headings-h6-emphasis-font-weight)] text-mfneutralsn-0 text-[length:var(--MF-headings-h6-emphasis-font-size)] leading-[var(--MF-headings-h6-emphasis-line-height)] tracking-[var(--MF-headings-h6-emphasis-letter-spacing)] [font-style:var(--MF-headings-h6-emphasis-font-style)]">
            Notifications
          </h1>

          <div className="w-6 h-6" />
        </nav>
      </header>

      {/* Content */}
      <div className={`flex-1 overflow-y-auto bg-gray-50 ${!shouldShowFrame ? 'touch:pb-20' : ''}`}>
        <div className="flex flex-col">
          {notifications.map((notification) => (
            <Button
              key={notification.id}
              variant="ghost"
              onClick={() => handleNotificationClick(notification)}
              className="flex items-start gap-3 h-auto p-4 text-left rounded-none hover:bg-gray-100 border-b border-gray-100 min-h-[80px]"
            >
              <Avatar className="w-12 h-12 flex-shrink-0 mt-1">
                <AvatarImage src={notification.avatar} alt="Notification avatar" />
                <AvatarFallback>
                  {notification.type === 'post' ? 'OW' : 'LE'}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col items-start flex-1 min-w-0">
                <p className="font-modern-famly-body-text-body font-[number:var(--modern-famly-body-text-body-font-weight)] text-mfneutralsn-400 text-[length:var(--modern-famly-body-text-body-font-size)] tracking-[var(--modern-famly-body-text-body-letter-spacing)] leading-[var(--modern-famly-body-text-body-line-height)] [font-style:var(--modern-famly-body-text-body-font-style)] mb-2 break-words whitespace-normal overflow-wrap-anywhere pr-2">
                  {notification.title}
                </p>
                <span className="font-MF-body-text-body-small font-[number:var(--MF-body-text-body-small-font-weight)] text-mfneutralsn-300 text-[length:var(--MF-body-text-body-small-font-size)] tracking-[var(--MF-body-text-body-small-letter-spacing)] leading-[var(--MF-body-text-body-small-line-height)] [font-style:var(--MF-body-text-body-small-font-style)]">
                  {notification.timestamp}
                </span>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className={`bottom-nav flex flex-col max-w-screen-md items-center justify-end px-[9px] py-0 w-full bg-mfneutralsn-0 rounded-[0px_0px_16px_16px] ${!shouldShowFrame ? 'sticky bottom-0 z-50 shadow-lg' : ''}`}>
        <div className="flex items-center gap-[46px] pl-2 pr-4 pt-3 pb-[21px] relative self-stretch w-full flex-[0_0_auto]">
          <div className="flex items-center justify-between relative flex-1 grow">
            {/* Newsfeed */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              className="no-zoom flex w-14 h-14 items-center justify-center px-4 py-3 relative rounded-xl"
            >
              <img
                className="relative w-7 h-7 ml-[-2.00px] mr-[-2.00px]"
                alt="Newsfeed"
                src="/navigation.svg"
              />
            </Button>

            {/* Child Profile */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/child-profile')}
              className="no-zoom flex w-14 h-14 items-center justify-center px-4 py-3 relative rounded-xl"
            >
              <Avatar className="w-12 h-12">
                <AvatarImage
                  src="/infant--girl--profile-picture--caucasian--dark-hair.png"
                  alt="Child profile"
                  className="border border-solid border-white object-cover"
                />
                <AvatarFallback>CP</AvatarFallback>
              </Avatar>
            </Button>

            {/* Messages */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/messages')}
              className="no-zoom flex w-14 h-14 items-center justify-center px-4 py-3 relative rounded-xl"
            >
              <img
                className="relative w-7 h-7 ml-[-2.00px] mr-[-2.00px]"
                alt="Messages"
                src="/navigation-2.svg"
              />
            </Button>

            {/* Notifications - Active */}
            <Button
              variant="ghost"
              size="icon"
              className="no-zoom flex w-14 h-14 items-center justify-center px-4 py-3 relative rounded-xl bg-mfprimaryp-100"
            >
              <img
                className="relative w-7 h-7 ml-[-2.00px] mr-[-2.00px]"
                alt="Notifications"
                src="/navigation-1.svg"
              />
            </Button>

            {/* Account */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/menu')}
              className="no-zoom flex w-14 h-14 items-center justify-center px-4 py-3 relative rounded-xl"
            >
              <Avatar className="w-12 h-12">
                <AvatarImage
                  src="/avatar-2.png"
                  alt="Account"
                  className="border border-solid border-white object-cover"
                />
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <DeviceFrame showFrame={shouldShowFrame}>
      {appContent}
    </DeviceFrame>
  );
};