import { useEffect, useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Tooltip from '@mui/material/Tooltip';

const BlinkingIcon = () => {
  const [blinks, setBlinks] = useState(0);
  const maxBlinks = 5;

  useEffect(() => {
    const blinkTimeout = setInterval(() => {
      setBlinks((prevBlinks) => prevBlinks + 1);
    }, 500);
    return () => clearInterval(blinkTimeout);
  }, []);

  return (
    <Tooltip title="Increase your allowance" arrow>
      <div className="relative flex items-center">
        <AddCircleOutlineIcon className="hover:cursor-pointer" sx={{ fontSize: 18, fill: 'url(#gradientForIcons)' }} />
        {blinks < maxBlinks && (
          <div className="absolute top-0.5 left-0.5 w-3.5 h-3.5 rounded-full bg-purple-500 animate-ping"></div>
        )}
      </div>
    </Tooltip>
  );
};

export default BlinkingIcon;
