import React, { useEffect, useRef } from "react"
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import Plot from 'react-plotly.js';

interface SentimentData {
	timestamp: number
	sentiment: number
	commentCount: number
}

interface Props {
	data: SentimentData[]
	loading?: boolean
	chartType: "line" | "bar" | "pie"
}

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"]

export const SentimentChart: React.FC<Props> = ({ data, loading, chartType }) => {
	const chartRef = useRef(null)

	useEffect(() => {
		if (chartRef.current) {
			chartRef.current.chartInstance.update()
		}
	}, [data])

	if (loading) {
		return <VSCodeProgressRing />
	}

	const renderChart = () => {
		switch (chartType) {
			case "bar":
				return (
					<Plot
						data={[
							{
								x: data.map(d => new Date(d.timestamp).toLocaleDateString()),
								y: data.map(d => d.sentiment),
								type: 'bar',
								marker: { color: '#8884d8' },
							},
						]}
						layout={{ title: 'Sentiment Bar Chart' }}
					/>
				)
			case "pie":
				return (
					<Plot
						data={[
							{
								values: data.map(d => d.sentiment),
								labels: data.map(d => new Date(d.timestamp).toLocaleDateString()),
								type: 'pie',
								marker: { colors: COLORS },
							},
						]}
						layout={{ title: 'Sentiment Pie Chart' }}
					/>
				)
			case "line":
			default:
				return (
					<Plot
						data={[
							{
								x: data.map(d => new Date(d.timestamp).toLocaleDateString()),
								y: data.map(d => d.sentiment),
								type: 'scatter',
								mode: 'lines+markers',
								marker: { color: '#8884d8' },
							},
						]}
						layout={{ title: 'Sentiment Line Chart' }}
					/>
				)
		}
	}

	return (
		<div className="chart-container">
			<ResponsiveContainer width="100%" height={300}>
				{renderChart()}
			</ResponsiveContainer>
		</div>
	)
}
