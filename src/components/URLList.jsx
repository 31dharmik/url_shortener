import React from 'react';
import URLItem from './URLItem';
import { BarChart3 } from 'lucide-react';
// import '../styles/URLList.css';

const URLList = ({ urls, onDelete, onCopy, onVisit }) => {
  return (
    <div className="url-list-card">
      <h2 className="list-title">
        <BarChart3 className="list-icon" />
        Your Shortened URLs
      </h2>

      {urls.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <p className="empty-text">No shortened URLs yet</p>
          <p className="empty-subtext">Create your first short link above!</p>
        </div>
      ) : (
        <div className="url-list">
          {urls.map((item) => (
            <URLItem
              key={item.short_code}
              item={item}
              onDelete={onDelete}
              onCopy={onCopy}
              onVisit={onVisit}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default URLList;
