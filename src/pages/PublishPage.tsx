import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePageStore } from '../store/pageStore';
import { ArrowRight, CheckCircle2, AlertCircle, BarChart2, Globe } from 'lucide-react';
import { analytics } from '../services/analyticsService';
import { netlifyService } from '../services/netlifyService';

interface NetlifyDeployment {
  url: string;
  deployId: string;
  status: 'pending' | 'ready' | 'error';
}

const PublishPage: React.FC = () => {
  const navigate = useNavigate();
  const { settings } = usePageStore();
  const [showNetlifyConnect, setShowNetlifyConnect] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployment, setDeployment] = useState<NetlifyDeployment | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if already connected to Netlify
    if (netlifyService.isAuthorized()) {
      setShowNetlifyConnect(true);
    }
  }, []);

  const handleInitialPublish = () => {
    setShowNetlifyConnect(true);
  };

  const handleNetlifyConnect = async () => {
    try {
      setError(null);
      await netlifyService.authorize();
      handleDeploy();
    } catch (error) {
      console.error('Failed to connect to Netlify:', error);
      setError('Failed to connect to Netlify. Please try again.');
    }
  };

  const handleDeploy = async () => {
    setIsDeploying(true);
    setError(null);
    
    try {
      const deploymentResult = await netlifyService.deployPage(settings);
      
      setDeployment({
        url: deploymentResult.url,
        deployId: deploymentResult.id,
        status: deploymentResult.state === 'ready' ? 'ready' : 'pending'
      });
      
      // Start analytics tracking for the deployed site
      analytics.trackPageView(settings.pageId);
      
    } catch (error) {
      console.error('Deployment failed:', error);
      setError('Failed to deploy the page. Please try again.');
      setDeployment({
        url: '',
        deployId: '',
        status: 'error'
      });
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-6">Publish Your Store</h2>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 mr-3" />
                    <div>
                      <h3 className="text-sm font-medium text-red-800">Error</h3>
                      <p className="mt-1 text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {!showNetlifyConnect ? (
                <button
                  onClick={handleInitialPublish}
                  className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Publish Store <ArrowRight className="ml-2" />
                </button>
              ) : (
                <div className="space-y-6">
                  {!netlifyService.isAuthorized() ? (
                    <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
                      <Globe className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Connect to Netlify
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Deploy your store with Netlify for fast, secure hosting
                      </p>
                      <button
                        onClick={handleNetlifyConnect}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        Connect Netlify Account
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {deployment?.status === 'ready' ? (
                        <>
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <div className="flex items-start">
                              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 mr-3" />
                              <div>
                                <h3 className="text-sm font-medium text-green-800">
                                  Store Published Successfully!
                                </h3>
                                <p className="mt-1 text-sm text-green-700">
                                  Your store is now live at{' '}
                                  <a
                                    href={deployment.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-medium underline"
                                  >
                                    {deployment.url}
                                  </a>
                                </p>
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => navigate('/analytics')}
                            className="w-full inline-flex items-center justify-center px-6 py-3 border border-indigo-600 text-base font-medium rounded-md shadow-sm text-indigo-600 bg-white hover:bg-indigo-50"
                          >
                            View Analytics <BarChart2 className="ml-2" />
                          </button>
                        </>
                      ) : deployment?.status === 'error' ? (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                          <div className="flex items-start">
                            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 mr-3" />
                            <div>
                              <h3 className="text-sm font-medium text-red-800">
                                Deployment Failed
                              </h3>
                              <p className="mt-1 text-sm text-red-700">
                                There was an error deploying your store. Please try again.
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-4">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                          <p className="mt-2 text-sm text-gray-500">Deploying your store...</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PublishPage;