import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import StatsCards from './components/StatsCards';
import URLForm from './components/URLForm';
import URLList from './components/URLList';
import Footer from './components/Footer';
import { mockAPI } from './services/mockAPI';
// import './styles/App.css';

function App() {
  const [url, setUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      const data = await mockAPI.getAllUrls();
      setUrls(data);
    } catch (error) {
      console.error('Error fetching URLs:', error);
    }
  };

  const handleShortenUrl = async () => {
    if (!url) {
      showMessage('Please enter a URL', 'error');
      return;
    }

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      showMessage('URL must start with http:// or https://', 'error');
      return;
    }

    setLoading(true);

    try {
      await mockAPI.createShortUrl(url, customCode);
      showMessage('URL shortened successfully!', 'success');
      setUrl('');
      setCustomCode('');
      fetchUrls();
    } catch (error) {
      showMessage(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUrl = async (shortCode) => {
    try {
      await mockAPI.deleteUrl(shortCode);
      fetchUrls();
      showMessage('URL deleted successfully', 'success');
    } catch (error) {
      console.error('Error deleting URL:', error);
    }
  };

  const handleCopyUrl = (text) => {
    navigator.clipboard.writeText(text);
    showMessage('Copied to clipboard!', 'success');
  };

  const handleVisitUrl = (shortCode, originalUrl) => {
    mockAPI.incrementClicks(shortCode);
    fetchUrls();
    window.open(originalUrl, '_blank');
  };

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  return (
    <div className="app">
      <div className="container">
        <Header />
        <StatsCards urls={urls} />
        <URLForm
          url={url}
          setUrl={setUrl}
          customCode={customCode}
          setCustomCode={setCustomCode}
          loading={loading}
          message={message}
          onSubmit={handleShortenUrl}
        />
        <URLList
          urls={urls}
          onDelete={handleDeleteUrl}
          onCopy={handleCopyUrl}
          onVisit={handleVisitUrl}
        />
        <Footer />
      </div>
    </div>
  );
}

export default App;