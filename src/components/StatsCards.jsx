import React from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';
// import '../styles/StatsCards.css';

const StatsCards = ({ urls }) => {
  const totalClicks = urls.reduce((sum, url) => sum + url.clicks, 0);
  const avgClicks = urls.length > 0 ? Math.round(totalClicks / urls.length) : 0;

  const stats = [
    {
      label: 'Total Links',
      value: urls.length,
      icon: <BarChart3 className="stat-icon" />,
      color: 'indigo'
    },
    {
      label: 'Total Clicks',
      value: totalClicks,
      icon: <TrendingUp className="stat-icon" />,
      color: 'purple'
    },
    {
      label: 'Avg Clicks',
      value: avgClicks,
      icon: <span className="stat-emoji">📊</span>,
      color: 'pink'
    }
  ];

  return (
    <div className="stats-grid">
      {stats.map((stat, index) => (
        <div key={index} className={`stat-card stat-card-${stat.color}`}>
          <div className="stat-content">
            <div className="stat-text">
              <p className="stat-label">{stat.label}</p>
              <p className="stat-value">{stat.value}</p>
            </div>
            <div className={`stat-icon-container stat-icon-${stat.color}`}>
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
