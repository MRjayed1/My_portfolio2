const fs = require('fs');
fetch('https://hadiza-yusuf.netlify.app/')
  .then(r => r.text())
  .then(html => {
    fs.writeFileSync('site.html', html);
    const cssMatch = html.match(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/);
    if (cssMatch) {
      console.log('CSS:', cssMatch[1]);
      return fetch('https://hadiza-yusuf.netlify.app' + cssMatch[1])
        .then(r => r.text())
        .then(css => {
          fs.writeFileSync('site.css', css);
          console.log('Saved site.css');
        });
    }
  });
