import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Search, Bell, School, Shield, Sparkles, LogOut } from 'lucide-react';

export default function Header() {
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);

  if (!user) return null;

  return (
    <header className="app-top-header">
      {/* Search Input */}
      <div className="header-search">
        <Search size={16} color="var(--slate-400)" />
        <input type="text" placeholder="Search for students, tests, or jump to sections (e.g. 'Review Queue', 'Activities')..." />
      </div>

      {/* Header Context Badges & Actions */}
      <div className="header-actions">
        {/* Active School Context */}
        <div className="badge badge-emerald" style={{ padding: '0.4rem 0.85rem' }}>
          <School size={14} />
          <span>Delhi Public School - Test Campus</span>
        </div>

        {/* User Role Badge */}
        <div className="badge badge-violet" style={{ padding: '0.4rem 0.85rem' }}>
          <Shield size={14} />
          <span>{user.role} Mode</span>
        </div>

        {/* Notifications Pill */}
        <div style={{ position: 'relative' }}>
          <div 
            onClick={() => setShowNotifications(!showNotifications)}
            style={{
              position: 'relative',
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: '#FFFFFF',
              border: '1px solid var(--slate-200)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--slate-600)',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
            }}
          >
            <Bell size={18} />
            <span 
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'var(--brand-emerald)'
              }}
            />
          </div>
          
          {/* Notification Dropdown */}
          {showNotifications && (
            <div style={{
              position: 'absolute',
              top: '110%',
              right: 0,
              width: '280px',
              background: 'white',
              border: '1px solid var(--slate-200)',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              zIndex: 50,
              padding: '0.5rem 0'
            }}>
              <div style={{ padding: '0.5rem 1rem', borderBottom: '1px solid var(--slate-100)', fontWeight: 'bold', color: 'var(--slate-800)' }}>
                Notifications
              </div>
              <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--slate-100)' }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--slate-700)', margin: 0 }}>
                  <strong>New Report Available</strong>
                  <br/>Your latest career aptitude report is ready to view.
                </p>
                <span style={{ fontSize: '0.7rem', color: 'var(--slate-400)' }}>2 hours ago</span>
              </div>
              <div style={{ padding: '0.75rem 1rem' }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--slate-700)', margin: 0 }}>
                  <strong>Upcoming Assessment</strong>
                  <br/>Next week's logical reasoning aptitude test is scheduled.
                </p>
                <span style={{ fontSize: '0.7rem', color: 'var(--slate-400)' }}>1 day ago</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
