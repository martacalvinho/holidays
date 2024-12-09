import { PageSettings } from '../types';

const NETLIFY_API_URL = 'https://api.netlify.com/api/v1';

interface NetlifyDeployment {
  id: string;
  url: string;
  state: 'uploading' | 'processing' | 'ready' | 'error';
  error?: string;
}

class NetlifyService {
  private static instance: NetlifyService;
  private accessToken: string | null = null;

  private constructor() {}

  public static getInstance(): NetlifyService {
    if (!NetlifyService.instance) {
      NetlifyService.instance = new NetlifyService();
    }
    return NetlifyService.instance;
  }

  public async authorize(): Promise<boolean> {
    // Netlify OAuth flow
    const clientId = process.env.REACT_APP_NETLIFY_CLIENT_ID;
    if (!clientId) {
      throw new Error('Netlify client ID not configured');
    }

    // Create OAuth popup window
    const width = 600;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    
    const popup = window.open(
      `https://app.netlify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${window.location.origin}/auth/netlify/callback`,
      'Netlify Authorization',
      `width=${width},height=${height},left=${left},top=${top}`
    );

    return new Promise((resolve, reject) => {
      const checkPopup = setInterval(() => {
        if (!popup || popup.closed) {
          clearInterval(checkPopup);
          reject(new Error('Authorization cancelled'));
        }

        try {
          if (popup.location.href.includes('access_token=')) {
            const params = new URLSearchParams(popup.location.hash.substring(1));
            this.accessToken = params.get('access_token');
            popup.close();
            clearInterval(checkPopup);
            resolve(true);
          }
        } catch (e) {
          // Cross-origin error, ignore
        }
      }, 500);
    });
  }

  public async deployPage(settings: PageSettings): Promise<NetlifyDeployment> {
    if (!this.accessToken) {
      throw new Error('Not authorized. Please connect to Netlify first.');
    }

    try {
      // 1. Create a new site if it doesn't exist
      const site = await this.createSite(settings.pageId);

      // 2. Generate the static files
      const files = await this.generateStaticFiles(settings);

      // 3. Deploy the files
      const deployment = await this.deploy(site.id, files);

      return deployment;
    } catch (error) {
      console.error('Deployment failed:', error);
      throw error;
    }
  }

  private async createSite(name: string) {
    const response = await fetch(`${NETLIFY_API_URL}/sites`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: `holiday-store-${name}`,
        custom_domain: null,
      })
    });

    if (!response.ok) {
      throw new Error('Failed to create site');
    }

    return response.json();
  }

  private async generateStaticFiles(settings: PageSettings) {
    // Generate HTML, CSS, and JS files for the store
    // This would include:
    // 1. index.html with the store layout
    // 2. Bundled CSS and JS
    // 3. Assets (images, etc.)
    
    // For now, return a basic HTML file
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${settings.businessName} - Holiday Store</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body>
          <div id="root"></div>
          <script>
            window.STORE_SETTINGS = ${JSON.stringify(settings)};
          </script>
        </body>
      </html>
    `;

    // Convert the HTML string to a File object
    const file = new File([html], 'index.html', { type: 'text/html' });
    return [file];
  }

  private async deploy(siteId: string, files: File[]): Promise<NetlifyDeployment> {
    // Create a new deployment
    const deploymentResponse = await fetch(`${NETLIFY_API_URL}/sites/${siteId}/deploys`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (!deploymentResponse.ok) {
      throw new Error('Failed to create deployment');
    }

    const deployment = await deploymentResponse.json();

    // Upload files
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files[]', file);
    });

    const uploadResponse = await fetch(deployment.required_files_url, {
      method: 'POST',
      body: formData
    });

    if (!uploadResponse.ok) {
      throw new Error('Failed to upload files');
    }

    return {
      id: deployment.id,
      url: deployment.url,
      state: deployment.state,
    };
  }

  public isAuthorized(): boolean {
    return !!this.accessToken;
  }
}

export const netlifyService = NetlifyService.getInstance();
