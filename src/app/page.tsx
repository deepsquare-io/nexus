'use client';

import type { NextPage } from 'next';
import { cloneElement } from 'react';
import { communityApps, demoApps } from '@components/data/appData';
import InfoCard from '@components/ui/containers/Card/InfoCard';
import { Dashboard } from '@mui/icons-material';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import CodeIcon from '@mui/icons-material/Code';
import ConstructionIcon from '@mui/icons-material/Construction';
import DescriptionIcon from '@mui/icons-material/Description';
import PublishIcon from '@mui/icons-material/Publish';

const LandingPage: NextPage = () => {
  return (
    <>
      {/* Hero Image section */}
      <div className="bg-gradient-to-br from-[#c95cf1] to-[#6953ff] py-20 mb-20 bg-gray-100">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white mb-8">DeepSquare Portal</h1>
            <p className="text-2xl sm:text-xl text-white mb-4">
              Explore community-crafted, cutting-edge applications running on DeepSquare Platform.
            </p>
            <p className="text-2xl sm:text-xl text-white mb-4">
              Harness our high-performance computing power, kickstart your innovation journey.
            </p>
          </div>
        </div>
      </div>
      {/* Features section */}
      <div className="container my-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <InfoCard
            icon={<AppRegistrationIcon sx={{ color: '#cd45FF' }} color="primary" />}
            title="Pre-built Applications"
            body="Explore pre-built applications showcasing the power of High Performance Computing (HPC). Text-to-Image, Blender, Unity Render Streaming, AI Upscaling and more, each designed for optimal performance on DeepSquare."
          />

          <InfoCard
            icon={<ConstructionIcon sx={{ color: '#cd45FF' }} color="primary" />}
            title="Build Your Own Apps"
            body={
              <>
                Empower your innovation by designing and running custom jobs on the DeepSquare infrastructure.
                <br />
                Utilize our{' '}
                <a href="/sandbox" target="_blank" rel="noopener noreferrer">
                  Dev App
                </a>{' '}
                or leverage the full-featured{' '}
                <a
                  href="https://www.npmjs.com/package/@deepsquare/deepsquare-client"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  DeepSquare SDK
                </a>{' '}
                for direct development and execution.
              </>
            }
          />

          <InfoCard
            icon={<Dashboard sx={{ color: '#cd45FF' }} color="primary" />}
            title="App Hub & Community"
            body={
              <>
                Find inspiration and unlock your creativity with our{' '}
                <a href="https://github.com/deepsquare-io/workflow-catalog" target="_blank" rel="noopener noreferrer">
                  Workflow Catalog.{' '}
                </a>
                Discover the gems in our community-built app collection. Connect with developers on Discord, share
                feedback, and contribute to enriching the catalog.
              </>
            }
          />
        </div>
      </div>
      {/* Demo apps section */}
      <h2 className="text-primary text-4xl font-semibold text-center my-20 mx-20">
        Experience the power of DeepSquare's HPC infrastructure with these Demo Apps
      </h2>
      <div className="container mx-auto my-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-10">
          {demoApps.map((app) => (
            <InfoCard
              key={app.title}
              icon={cloneElement(app.icon, { className: 'icon' })}
              title={app.title}
              body={app.body}
              buttons={[
                {
                  text: 'Try it',
                  link: app.path,
                },
              ]}
              textCenter={true}
            />
          ))}
        </div>
      </div>
      {/* Community apps section */}
      <h2 className="text-primary text-4xl font-semibold text-center my-20 mx-20">
        Discover community-built apps running on DeepSquare
      </h2>
      <div className="container mx-auto my-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {communityApps.map((app) => (
            <InfoCard
              key={app.title}
              icon={cloneElement(app.icon, { className: 'icon ' })}
              title={app.title}
              body={app.body}
              buttons={[
                {
                  text: 'Launch app',
                  link: app.path,
                },
              ]}
            />
          ))}
        </div>
      </div>
      {/* Building apps section */}

      <h2 className="text-primary text-4xl font-semibold text-center my-20 mx-20">
        Build and Run your applications with DeepSquare
      </h2>
      <div className="container mx-auto my-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <InfoCard
            title="Workflow File"
            icon={<CodeIcon sx={{ color: '#cd45FF' }} color="primary" />}
            buttons={[
              {
                text: 'Get Credits',
                link: 'https://share-eu1.hsforms.com/1PVlRXYdMSdy-iBH_PXx_0wev6gi',
              },
            ]}
            body="Experience hassle-free application deployment with only two prerequisites: a workflow file and a crypto wallet.
              The workflow file serves as your guide for resource allocation and operational instructions."
          />
          <InfoCard
            title="Deploy"
            icon={<PublishIcon sx={{ color: '#cd45FF' }} color="primary" />}
            buttons={[
              {
                text: 'Dev App',
                link: '/sandbox',
              },
              {
                text: 'SDK',
                link: 'https://www.npmjs.com/package/@deepsquare/deepsquare-client',
              },
            ]}
            body="Run workflows instantly with our 'Dev' app. For enhanced use of the platform, our powerful DeepSquare SDK offers flexibility and customization. Choose the approach that suits your needs and unleash DeepSquare's full potential."
          />
          <InfoCard
            title="Documentation"
            icon={<DescriptionIcon sx={{ color: '#cd45FF' }} color="primary" />}
            buttons={[
              {
                text: 'Documentation',
                link: 'https://docs.deepsquare.run/workflow/introduction/overview',
              },
            ]}
            body={
              <>
                Lay the foundation for success with DeepSquare by familiarising yourself with our robust infrastructure.
                <br />
                Unlock the platform's full potential by delving into our comprehensive documentation.
              </>
            }
          />
        </div>
      </div>
    </>
  );
};

export default LandingPage;
