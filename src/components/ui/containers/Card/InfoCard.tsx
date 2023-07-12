// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
import type { FC, ReactElement, ReactNode } from 'react';
import { cloneElement } from 'react';
import Button from '@mui/material/Button';

type ButtonProps = {
  text: string;
  link: string;
};

type InfoCardProps = {
  children?: ReactNode;
  icon?: ReactElement;
  title: string | ReactElement;
  body: string | ReactNode;
  buttons?: ButtonProps[];
  textCenter?: boolean;
};

const InfoCard: FC<InfoCardProps> = ({ icon, title, body, buttons, textCenter = false }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg h-full flex flex-col">
      <div className="flex flex-col flex-grow">
        <h2 className=" text-primary text-2xl font-semibold flex items-center justify-center">
          {icon && <div className="mr-4 flex items-center">{cloneElement(icon, { className: 'icon' })}</div>}
          {title}
        </h2>
        <p className={`text-black text-lg px-5 pt-3 pb-5 ${textCenter ? 'text-center' : ''}`}>{body}</p>
      </div>
      {buttons && buttons.length > 0 && (
        <div className="flex justify-center mt-4 space-x-2">
          {buttons.map((button, index) => (
            <Button
              href={button.link}
              target="_blank"
              key={index}
              className="flex w-full items-center justify-center md:min-w-[120px] md:w-2/3 py-3 text-base"
            >
              {button.text}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default InfoCard;
