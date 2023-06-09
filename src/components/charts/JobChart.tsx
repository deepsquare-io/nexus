import type { ChartOptions, ChartData } from 'chart.js';
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
