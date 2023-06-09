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
