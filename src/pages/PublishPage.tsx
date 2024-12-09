import React, { useState } from 'react';
import { usePageStore } from '../store/pageStore';
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

const PublishPage: React.FC = () => {
  const { settings } = usePageStore();
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentStatus, setDeploymentStatus] = useState<{
    success?: boolean;
    url?: string;
    error?: string;
  }>({});

  const handleDeploy = async () => {
    setIsDeploying(true);
    try {
      // Here we would integrate with Netlify's API to deploy the site
      // For now, we'll simulate a deployment
      await new Promise(resolve => setTimeout(resolve, 2000));
      setDeploymentStatus({
        success: true,
        url: 'https://your-site.netlify.app'
      });
    } catch (error) {
      setDeploymentStatus({
        success: false,
        error: 'Failed to deploy. Please try again.'
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
              {!settings.stripeAccountId ? (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 mr-3" />
                    <div>
                      <h3 className="text-sm font-medium text-yellow-800">
                        Connect Stripe to Accept Payments
                      </h3>
                      <p className="mt-1 text-sm text-yellow-700">
                        Before publishing, you need to connect your Stripe account to process payments.
                      </p>
                      <button className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700">
                        Connect Stripe Account
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mr-3" />
                    <p className="text-sm text-green-700">
                      Stripe account connected and ready to accept payments
                    </p>
                  </div>
                </div>
              )}

              <button
                onClick={handleDeploy}
                disabled={isDeploying || !settings.stripeAccountId}
                className={`w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${
                  isDeploying || !settings.stripeAccountId
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                {isDeploying ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Deploying...
                  </>
                ) : (
                  <>
                    Publish Store <ArrowRight className="ml-2" />
                  </>
                )}
              </button>

              {deploymentStatus.success && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 mr-3" />
                    <div>
                      <h3 className="text-sm font-medium text-green-800">
                        Store Published Successfully!
                      </h3>
                      <p className="mt-1 text-sm text-green-700">
                        Your store is now live at:{' '}
                        <a
                          href={deploymentStatus.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium underline"
                        >
                          {deploymentStatus.url}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {deploymentStatus.error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 mr-3" />
                    <div>
                      <h3 className="text-sm font-medium text-red-800">
                        Deployment Failed
                      </h3>
                      <p className="mt-1 text-sm text-red-700">
                        {deploymentStatus.error}
                      </p>
                    </div>
                  </div>
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