// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
import type { ChartData, ChartOptions } from 'chart.js';
import { Chart as ChartJS, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { Bar } from 'react-chartjs-2';

ChartJS.register(...registerables);

// Change data type to accept an array of TimestampValue
interface TimestampValue {
  timestamp: number;
  value: number;
}

interface ChartComponentProps {
  data: TimestampValue[];
}

const ChartComponent = ({ data }: ChartComponentProps) => {
  const chartData: ChartData<'bar', { x: number; y: number }[], string> = {
    datasets: [
      {
        label: 'Jobs per day',
        data: data.map((item) => ({
          x: item.timestamp * 1000,
          y: Math.round(item.value),
        })),
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      x: {
        type: 'timeseries',
        time: {
          unit: 'day',
          displayFormats: {
            day: 'MMM d',
          },
        },
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Jobs',
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default ChartComponent;
