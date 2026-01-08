import React from 'react';
import { Copy, ExternalLink, Trash2, BarChart3 } from 'lucide-react';
// import '../styles/URLItem.css';

const URLItem = ({ item, onDelete, onCopy, onVisit }) => {
  const BASE_URL = 'https://short.ly';
  const shortUrl = `${BASE_URL}/${item.short_code}`;

  return (
    <div className="url-item">
      <div className="url-item-content">
        <div className="url-info">
          <div className="url-header">
            <span className="short-url">{shortUrl}</span>
            <button
              onClick={() => onCopy(shortUrl)}
              className="icon-button icon-button-copy"
              title="Copy to clipboard"
            >
              <Copy className="icon" />
            </button>
            <button
              onClick={() => onVisit(item.short_code, item.original_url)}
              className="icon-button icon-button-visit"
              title="Visit URL"
            >
              <ExternalLink className="icon" />
            </button>
          </div>
          
          <p className="original-url">{item.original_url}</p>

          <div className="url-stats">
            <span className="stat-badge">
              <BarChart3 className="stat-badge-icon" />
              <span className="stat-badge-value">{item.clicks}</span> clicks
            </span>
            <span className="stat-date">
              📅 {new Date(item.created_at).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </span>
          </div>
        </div>

        <button
          onClick={() => onDelete(item.short_code)}
          className="icon-button icon-button-delete"
          title="Delete"
        >
          <Trash2 className="icon" />
        </button>
      </div>
    </div>
  );
};

export default URLItem;