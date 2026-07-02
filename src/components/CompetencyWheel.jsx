import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const CompetencyWheel = ({ scores, maxScores, labels, isBWS }) => {
  const brandColor = isBWS ? 'rgba(49, 165, 41, 0.6)' : 'rgba(255, 0, 0, 0.6)';
  const brandBorder = isBWS ? 'rgba(49, 165, 41, 1)' : 'rgba(255, 0, 0, 1)';

  // Calculate percentages for the radar chart to normalize the scale (0-100%)
  const percentageScores = scores.map((score, index) => {
    return maxScores[index] > 0 ? (score / maxScores[index]) * 100 : 0;
  });

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Jouw Score (%)',
        data: percentageScores,
        backgroundColor: brandColor,
        borderColor: brandBorder,
        borderWidth: 2,
        pointBackgroundColor: brandBorder,
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: brandBorder,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)'
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          stepSize: 20,
          callback: function(value) {
            return value + '%';
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        pointLabels: {
          font: {
            size: 12,
            family: "'Inter', 'Arial', sans-serif"
          },
          color: '#4B5563'
        }
      },
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            family: "'Inter', 'Arial', sans-serif"
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `Score: ${Math.round(context.raw)}%`;
          }
        }
      }
    },
  };

  return <Radar data={data} options={options} />;
};

export default CompetencyWheel;
