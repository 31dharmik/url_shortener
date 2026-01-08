import React from 'react';
// import '../styles/URLForm.css';

const URLForm = ({ url, setUrl, customCode, setCustomCode, loading, message, onSubmit }) => {
  const BASE_URL = 'https://short.ly';

  return (
    <div className="url-form-card">
      <h2 className="form-title">Create Short Link</h2>
      
      <div className="form-group">
        <label className="form-label">🌐 Enter Your Long URL</label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/very/long/url/that/needs/shortening"
          className="form-input"
          onKeyPress={(e) => e.key === 'Enter' && onSubmit()}
        />
      </div>

      <div className="form-group">
        <label className="form-label">✨ Custom Short Code (Optional)</label>
        <div className="custom-url-input">
          <span className="url-prefix">{BASE_URL}/</span>
          <input
            type="text"
            value={customCode}
            onChange={(e) => setCustomCode(e.target.value)}
            placeholder="my-custom-link"
            className="form-input-custom"
            onKeyPress={(e) => e.key === 'Enter' && onSubmit()}
          />
        </div>
        <p className="form-hint">Leave empty for auto-generated code</p>
      </div>

      {message.text && (
        <div className={`message message-${message.type}`}>
          {message.text}
        </div>
      )}

      <button
        onClick={onSubmit}
        disabled={loading}
        className={`submit-button ${loading ? 'submit-button-loading' : ''}`}
      >
        {loading ? '⏳ Shortening...' : '🚀 Shorten URL'}
      </button>
    </div>
  );
};

export default URLForm;