export const mockAPI = {
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
  
    getAllUrls() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([...this.urls]);
        }, 300);
      });
    },
  
    createShortUrl(originalUrl, customCode) {
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
  
    deleteUrl(shortCode) {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.urls = this.urls.filter(u => u.short_code !== shortCode);
          resolve({ success: true });
        }, 300);
      });
    },
  
    incrementClicks(shortCode) {
      const url = this.urls.find(u => u.short_code === shortCode);
      if (url) {
        url.clicks += 1;
      }
    },
  
    generateCode() {
      const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let code = '';
      for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return code;
    }
  };