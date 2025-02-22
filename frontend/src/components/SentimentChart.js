// frontend/src/components/SentimentChart.js
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function SentimentChart({ sentimentData }) {
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef && chartRef.current && sentimentData) {
            const chartCanvas = chartRef.current.getContext('2d');
            if (chartCanvas) {
                new Chart(chartCanvas, {
                    type: 'pie',
                    data: {
                        labels: ['Positive', 'Negative', 'Neutral'],
                        datasets: [{
                            label: 'Sentiment Analysis',
                            data: [
                                sentimentData.positive,
                                sentimentData.negative,
                                sentimentData.neutral
                            ],
                            backgroundColor: [
                                'rgba(75, 192, 192, 0.8)',
                                'rgba(255, 99, 132, 0.8)',
                                'rgba(255, 206, 86, 0.8)'
                            ],
                            borderColor: [
                                'rgba(75, 192, 192, 1)',
                                'rgba(255, 99, 132, 1)',
                                'rgba(255, 206, 86, 1)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        title: {
                            display: true,
                            text: 'Sentiment Analysis Results'
                        }
                    }
                });
            }
        }
    }, [sentimentData]);

    return (
        <canvas ref={chartRef} />
    );
}

export default SentimentChart;