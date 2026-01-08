import React, { useState, useEffect } from 'react';
import { Copy, ExternalLink, Trash2, BarChart3, TrendingUp } from 'lucide-react';

// Mock API with dummy data
const mockAPI = {
  urls: [
    {
      short_code: 'abc123',
      original_url: 'https://www.example.com/very/long/url/that/needs/shortening',
      clicks: 245,
      created_at: '2024-01-15T10:30:00'
    },
    {
      short_code: 'xyz789',
      original_url: 'https://github.com/username/repository-name',
      clicks: 89,
      created_at: '2024-01-16T14:20:00'
    },
    {
      short_code: 'demo01',
      original_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      clicks: 512,
      created_at: '2024-01-17T09:15:00'
    }
  ],

  getAllUrls: function() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.urls]);
      }, 300);
    });
  },

  createShortUrl: function(originalUrl, customCode) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const shortCode = customCode || this.generateCode();
        
        const exists = this.urls.find(u => u.short_code === shortCode);
        if (exists) {
          reject({ message: 'Custom code already exists!' });
          return;
        }

        const newUrl = {
          short_code: shortCode,
          original_url: originalUrl,
          clicks: 0,
          created_at: new Date().toISOString()
        };

        this.urls.unshift(newUrl);
        resolve(newUrl);
      }, 500);
    });
  },

  deleteUrl: function(shortCode) {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.urls = this.urls.filter(u => u.short_code !== shortCode);
        resolve({ success: true });
      }, 300);
    });
  },

  incrementClicks: function(shortCode) {
    const url = this.urls.find(u => u.short_code === shortCode);
    if (url) {
      url.clicks += 1;
    }
  },

  generateCode: function() {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }
};

export default function URLShortener() {
  const [url, setUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [totalClicks, setTotalClicks] = useState(0);

  const BASE_URL = 'https://short.ly';

  useEffect(() => {
    fetchUrls();
  }, []);

  useEffect(() => {
    const total = urls.reduce((sum, url) => sum + url.clicks, 0);
    setTotalClicks(total);
  }, [urls]);

  const fetchUrls = async () => {
    try {
      const data = await mockAPI.getAllUrls();
      setUrls(data);
    } catch (error) {
      console.error('Error fetching URLs:', error);
    }
  };

  const shortenUrl = async () => {
    if (!url) {
      setMessage('Please enter a URL');
      return;
    }

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      setMessage('URL must start with http:// or https://');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const newUrl = await mockAPI.createShortUrl(url, customCode);
      setMessage('✅ URL shortened successfully!');
      setUrl('');
      setCustomCode('');
      fetchUrls();
    } catch (error) {
      setMessage('❌ ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteUrl = async (shortCode) => {
    try {
      await mockAPI.deleteUrl(shortCode);
      fetchUrls();
      setMessage('🗑️ URL deleted successfully');
      setTimeout(() => setMessage(''), 2000);
    } catch (error) {
      console.error('Error deleting URL:', error);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setMessage('📋 Copied to clipboard!');
    setTimeout(() => setMessage(''), 2000);
  };

  const handleVisit = (shortCode, originalUrl) => {
    mockAPI.incrementClicks(shortCode);
    fetchUrls();
    window.open(originalUrl, '_blank');
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #faf5ff, #eff6ff, #e0e7ff)',
      padding: '1rem'
    },
    maxWidth: {
      maxWidth: '80rem',
      margin: '0 auto'
    },
    header: {
      textAlign: 'center',
      marginBottom: '2rem',
      marginTop: '2rem'
    },
    iconContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '1rem'
    },
    icon: {
      width: '4rem',
      height: '4rem',
      background: 'linear-gradient(to bottom right, #6366f1, #9333ea)',
      borderRadius: '1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      fontSize: '2rem'
    },
    title: {
      fontSize: '3rem',
      fontWeight: 'bold',
      background: 'linear-gradient(to right, #4f46e5, #9333ea)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '0.75rem'
    },
    subtitle: {
      color: '#6b7280',
      fontSize: '1.125rem'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1rem',
      marginBottom: '1.5rem'
    },
    statCard: {
      background: 'white',
      borderRadius: '0.75rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      padding: '1rem',
      borderLeft: '4px solid'
    },
    card: {
      background: 'white',
      borderRadius: '1rem',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      padding: '2rem',
      marginBottom: '1.5rem',
      border: '1px solid #e5e7eb'
    },
    inputGroup: {
      marginBottom: '1.25rem'
    },
    label: {
      display: 'block',
      fontSize: '0.875rem',
      fontWeight: '600',
      color: '#374151',
      marginBottom: '0.5rem'
    },
    input: {
      width: '100%',
      padding: '1rem',
      border: '2px solid #e5e7eb',
      borderRadius: '0.75rem',
      fontSize: '1rem',
      color: '#374151',
      outline: 'none',
      transition: 'all 0.2s'
    },
    button: {
      width: '100%',
      background: 'linear-gradient(to right, #4f46e5, #9333ea)',
      color: 'white',
      padding: '1rem',
      borderRadius: '0.75rem',
      fontWeight: 'bold',
      fontSize: '1.125rem',
      border: 'none',
      cursor: 'pointer',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.2s'
    },
    urlCard: {
      border: '2px solid #f3f4f6',
      borderRadius: '0.75rem',
      padding: '1.25rem',
      marginBottom: '1rem',
      transition: 'all 0.2s'
    },
    flexBetween: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    flexStart: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: '1rem'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.maxWidth}>
        
        <div style={styles.header}>
          <div style={styles.iconContainer}>
            <div style={styles.icon}>
              <span>🔗</span>
            </div>
          </div>
          <h1 style={styles.title}>URL Shortener</h1>
          <p style={styles.subtitle}>Transform long URLs into short, shareable links</p>
        </div>

        <div style={styles.statsGrid}>
          <div style={{...styles.statCard, borderLeftColor: '#6366f1'}}>
            <div style={styles.flexBetween}>
              <div>
                <p style={{color: '#6b7280', fontSize: '0.875rem'}}>Total Links</p>
                <p style={{fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937'}}>{urls.length}</p>
              </div>
              <div style={{background: '#dbeafe', padding: '0.75rem', borderRadius: '0.5rem'}}>
                <BarChart3 style={{width: '1.5rem', height: '1.5rem', color: '#3b82f6'}} />
              </div>
            </div>
          </div>

          <div style={{...styles.statCard, borderLeftColor: '#a855f7'}}>
            <div style={styles.flexBetween}>
              <div>
                <p style={{color: '#6b7280', fontSize: '0.875rem'}}>Total Clicks</p>
                <p style={{fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937'}}>{totalClicks}</p>
              </div>
              <div style={{background: '#f3e8ff', padding: '0.75rem', borderRadius: '0.5rem'}}>
                <TrendingUp style={{width: '1.5rem', height: '1.5rem', color: '#a855f7'}} />
              </div>
            </div>
          </div>

          <div style={{...styles.statCard, borderLeftColor: '#ec4899'}}>
            <div style={styles.flexBetween}>
              <div>
                <p style={{color: '#6b7280', fontSize: '0.875rem'}}>Avg Clicks</p>
                <p style={{fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937'}}>
                  {urls.length > 0 ? Math.round(totalClicks / urls.length) : 0}
                </p>
              </div>
              <div style={{background: '#fce7f3', padding: '0.75rem', borderRadius: '0.5rem'}}>
                <span style={{fontSize: '1.5rem'}}>📊</span>
              </div>
            </div>
          </div>
        </div>

        <div style={styles.card}>
          <h2 style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1.5rem'}}>
            Create Short Link
          </h2>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>🌐 Enter Your Long URL</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/very/long/url/that/needs/shortening"
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>✨ Custom Short Code (Optional)</label>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <span style={{background: '#f3f4f6', padding: '1rem', borderRadius: '0.75rem 0 0 0.75rem', border: '2px solid #e5e7eb', borderRight: 'none', color: '#6b7280', fontFamily: 'monospace'}}>
                {BASE_URL}/
              </span>
              <input
                type="text"
                value={customCode}
                onChange={(e) => setCustomCode(e.target.value)}
                placeholder="my-custom-link"
                style={{...styles.input, borderRadius: '0 0.75rem 0.75rem 0', flex: 1}}
              />
            </div>
            <p style={{fontSize: '0.75rem', color: '#6b7280', marginTop: '0.5rem'}}>
              Leave empty for auto-generated code
            </p>
          </div>

          {message && (
            <div style={{
              marginBottom: '1.25rem',
              padding: '1rem',
              borderRadius: '0.75rem',
              fontWeight: '500',
              background: message.includes('❌') || message.includes('Error') ? '#fef2f2' : '#f0fdf4',
              color: message.includes('❌') || message.includes('Error') ? '#991b1b' : '#166534',
              border: message.includes('❌') || message.includes('Error') ? '1px solid #fecaca' : '1px solid #bbf7d0'
            }}>
              {message}
            </div>
          )}

          <button
            onClick={shortenUrl}
            disabled={loading}
            style={{...styles.button, opacity: loading ? 0.5 : 1, cursor: loading ? 'not-allowed' : 'pointer'}}
            onMouseEnter={(e) => !loading && (e.target.style.transform = 'scale(1.02)')}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            {loading ? '⏳ Shortening...' : '🚀 Shorten URL'}
          </button>
        </div>

        <div style={styles.card}>
          <h2 style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1.5rem', display: 'flex', alignItems: 'center'}}>
            <BarChart3 style={{width: '1.75rem', height: '1.75rem', marginRight: '0.75rem', color: '#4f46e5'}} />
            Your Shortened URLs
          </h2>

          {urls.length === 0 ? (
            <div style={{textAlign: 'center', padding: '4rem 0'}}>
              <div style={{fontSize: '3.75rem', marginBottom: '1rem'}}>📭</div>
              <p style={{color: '#6b7280', fontSize: '1.125rem'}}>No shortened URLs yet</p>
              <p style={{color: '#9ca3af', fontSize: '0.875rem', marginTop: '0.5rem'}}>
                Create your first short link above!
              </p>
            </div>
          ) : (
            <div>
              {urls.map((item) => (
                <div 
                  key={item.short_code} 
                  style={styles.urlCard}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#c7d2fe';
                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#f3f4f6';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={styles.flexStart}>
                    <div style={{flex: 1, minWidth: 0}}>
                      <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap'}}>
                        <span style={{fontSize: '1.125rem', fontWeight: 'bold', color: '#4f46e5', fontFamily: 'monospace'}}>
                          {BASE_URL}/{item.short_code}
                        </span>
                        <button
                          onClick={() => copyToClipboard(`${BASE_URL}/${item.short_code}`)}
                          style={{padding: '0.5rem', color: '#9ca3af', background: 'transparent', border: 'none', borderRadius: '0.5rem', cursor: 'pointer'}}
                          onMouseEnter={(e) => {
                            e.target.style.color = '#4f46e5';
                            e.target.style.background = '#eef2ff';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.color = '#9ca3af';
                            e.target.style.background = 'transparent';
                          }}
                          title="Copy to clipboard"
                        >
                          <Copy style={{width: '1rem', height: '1rem'}} />
                        </button>
                        <button
                          onClick={() => handleVisit(item.short_code, item.original_url)}
                          style={{padding: '0.5rem', color: '#9ca3af', background: 'transparent', border: 'none', borderRadius: '0.5rem', cursor: 'pointer'}}
                          onMouseEnter={(e) => {
                            e.target.style.color = '#16a34a';
                            e.target.style.background = '#f0fdf4';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.color = '#9ca3af';
                            e.target.style.background = 'transparent';
                          }}
                          title="Visit URL"
                        >
                          <ExternalLink style={{width: '1rem', height: '1rem'}} />
                        </button>
                      </div>
                      
                      <p style={{fontSize: '0.875rem', color: '#6b7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: '0.75rem', background: '#f9fafb', padding: '0.5rem 0.75rem', borderRadius: '0.5rem'}}>
                        {item.original_url}
                      </p>

                      <div style={{display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.75rem', color: '#6b7280'}}>
                        <span style={{display: 'flex', alignItems: 'center', background: '#eff6ff', padding: '0.25rem 0.75rem', borderRadius: '9999px'}}>
                          <BarChart3 style={{width: '0.75rem', height: '0.75rem', marginRight: '0.25rem', color: '#2563eb'}} />
                          <span style={{fontWeight: '600', color: '#1e40af'}}>{item.clicks}</span> clicks
                        </span>
                        <span style={{display: 'flex', alignItems: 'center'}}>
                          📅 {new Date(item.created_at).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => deleteUrl(item.short_code)}
                      style={{padding: '0.75rem', color: '#f87171', background: 'transparent', border: 'none', borderRadius: '0.5rem', cursor: 'pointer', flexShrink: 0}}
                      onMouseEnter={(e) => {
                        e.target.style.color = '#dc2626';
                        e.target.style.background = '#fef2f2';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = '#f87171';
                        e.target.style.background = 'transparent';
                      }}
                      title="Delete"
                    >
                      <Trash2 style={{width: '1.25rem', height: '1.25rem'}} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{textAlign: 'center', marginTop: '2rem', color: '#6b7280', fontSize: '0.875rem'}}>
          <p>✨ Mock API with dummy data - Ready to deploy on Vercel!</p>
        </div>
      </div>
    </div>
  );
}