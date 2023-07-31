// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
import Image from 'next/image';
import type { ReactElement } from 'react';
import { AspectRatio } from '@mui/icons-material';
import ArtTrackIcon from '@mui/icons-material/ArtTrack';
import askord from '@public/icons/askord.png';
import blender from '@public/icons/blender.svg';
import mindfactory from '@public/icons/mindFactory.png';
import unity from '@public/icons/unity.svg';

export type AppDefinition = {
  title: string;
  body: string;
  path: string;
  icon: ReactElement;
};

export const communityApps: AppDefinition[] = [
  {
    title: 'Mind Factory',
    body: 'Mind Factory is a comprehensive development platform on the DeepSquare testnet, catering to both Web2 and Web3 applications. Our platform provides a feature-rich IDE, seamlessly integrated as a VS Code extension, to streamline your development process. With Mind Factory, you can easily manage and deploy your projects, ensuring a smooth and efficient workflow.',
    path: 'https://mind.squarefactory.io/',
    icon: <Image alt="Mind SquareFactory icon" src={mindfactory} height={80} width={80} />,
  },
  {
    title: 'Askord Imagine',
    body: 'Introducing Askord Imagine, the Telegram bot powered by generative AI, offering seamless text-to-image and image-to-image conversion features from the command line. Experience stable diffusion-based functionality and unlock your creative potential with ease.',
    path: 'https://t.me/AskordImgn_bot',
    icon: <Image alt="Askord icon" src={askord} height={80} width={80} />,
  },
];

export const demoApps: AppDefinition[] = [
  {
    title: 'Blender',
    body: 'Render 3D graphics, animations, and models with the Blender application.',
    path: '/blender',
    icon: <Image alt="Blender icon" src={blender} height={40} width={40} />, // Change this line
  },
  {
    title: 'Text to Image',
    body: 'Transform text into stunning visuals.',
    path: '/texttoimage',
    icon: <ArtTrackIcon sx={{ color: '#cd45FF ', fontSize: 40, width: 40 }} />,
  },
  {
    title: 'AI Upscaling',
    body: 'Enhance the resolution and quality of your images with the AI Upscaling App.',
    path: '/upscaling',
    icon: <AspectRatio sx={{ color: '#cd45FF', fontSize: 32, width: 32 }} />,
  },
  {
    title: 'Unity Render Streaming',
    body: 'Build and deploy high-quality games with Unity Render Streaming.',
    path: '/unity',
    icon: <Image alt="Unity icon" src={unity} height={40} width={40} />,
  },
];
