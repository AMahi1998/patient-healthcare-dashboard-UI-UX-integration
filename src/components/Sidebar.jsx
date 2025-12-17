import { Settings } from "lucide-react";
import DrJoseImage from "../images/Dr Jose Simmons.png";
import OverviewIcon from "../images/Overview Icon.svg";
import TransactionIcon from "../images/Transaction.svg";
import VerticalSelectIcon from "../images/Vertical Select.svg";

export default function Sidebar() {
  const navItems = [
    {
      label: 'Overview',
      icon: OverviewIcon,
      active: false
    },
    {
      label: 'Patients',
      icon: '/group_FILL0_wght300_GRAD0_opsz24.svg',
      active: true
    },
    {
      label: 'Schedule',
      icon: '/calendar_today_FILL0_wght300_GRAD0_opsz24.svg',
      active: false
    },
    {
      label: 'Message',
      icon: '/chat_bubble_FILL0_wght300_GRAD0_opsz24.svg',
      active: false
    },
    {
      label: 'Transactions',
      icon: TransactionIcon,
      active: false
    }
  ];

  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '16px',
      backgroundColor: 'white',
      borderBottom: '1px solid #e5e7eb',
      padding: '8px 24px',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      whiteSpace: 'nowrap',
      overflow: 'visible'
    }}>
      {/* Left side - Logo */}
      <div style={{ flexShrink: 0, minWidth: 'fit-content' }}>
        <img 
          src="/TechCareLogo.svg" 
          alt="TechCare"
          style={{
            height: '32px',
            width: 'auto'
          }}
        />
      </div>

      {/* Center - Navigation Items */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: 'rgb(112, 128, 144)',
          flex: 1,
          marginLeft: '16px',
          minWidth: 0
        }}
      >
        {navItems.map((item) => (
          <div 
            key={item.label}
            style={{
              cursor: 'pointer',
              transition: 'all 0.15s ease-in-out',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontWeight: item.active ? '600' : '500',
              fontSize: '13px',
              color: item.active ? '#14b8a6' : 'rgb(112, 128, 144)',
              whiteSpace: 'nowrap',
              padding: '4px 10px',
              borderRadius: item.active ? '16px' : '0px',
              backgroundColor: item.active ? '#d1faf8' : 'transparent',
              flexShrink: 0
            }}
            className={item.active ? 'hover:text-teal-700' : 'hover:text-teal-600'}
          >
            <img 
              src={item.icon} 
              alt={item.label}
              style={{
                width: '16px',
                height: '16px',
                display: 'inline-block'
              }}
            />
            {item.label}
          </div>
        ))}
      </div>

      {/* Right side - User Profile */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px',
        flexShrink: 0,
        minWidth: 'fit-content'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px'
        }}>
          <img 
            src={DrJoseImage}
            alt="Doctor"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%'
            }}
          />
          <div style={{ fontSize: '13px' }}>
            <p style={{ fontWeight: '600', color: '#1f2937', margin: '0' }}>Dr. Jose Simmons</p>
            <p style={{ color: '#9ca3af', margin: '0', fontSize: '11px' }}>General Practitioner</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Settings size={18} style={{ color: '#9ca3af', cursor: 'pointer' }} />
          <img 
            src={VerticalSelectIcon}
            alt="More options"
            style={{
              width: '18px',
              height: '18px',
              cursor: 'pointer'
            }}
          />
        </div>
      </div>
    </nav>
  );
}
