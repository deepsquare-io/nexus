// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
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
