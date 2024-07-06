import { useEffect, useState } from 'react';
import './assets/style/App.css';
import { Chart } from "react-google-charts";
import { Result, Totals } from './interfaces/interfaces';
import * as CryptoJS from 'crypto-js';

function App() {
	const [result, setResult] = useState<Result>({});
	const [totals, setTotals] = useState<Totals>({
		total: 0,
		success: 0,
		fail: 0
	});
	const [successRate, setSuccessRate] = useState<number>(0);

	useEffect(() => {
		// Generate an HMAC hash with a fixed secret and phrase
		const secretKey = '98SADF9843';
		const hmac = CryptoJS.HmacSHA256("tasks-dashboard", secretKey);
		const hmacInBase64 = CryptoJS.enc.Base64.stringify(hmac);

		const ws: WebSocket = new WebSocket('ws://localhost:8080');

		// Send a message when the connection is opened to authenticate
		ws.onopen = () => {
			ws.send(JSON.stringify({ token: hmacInBase64 }));
		};

		// Listen to messages sent by the serve
		ws.onmessage = (event) => {
			const message = JSON.parse(event.data);

			// Sum total results by operation type
			setResult(currentObject => ({
				...currentObject,
				[message.operation]: {
					total: (currentObject[message.operation]?.total || 0) + 1,
					success: (currentObject[message.operation]?.success || 0) + (message.success ? 1 : 0),
				}
			}));

			// Sum total results
			setTotals(currentObject => ({
				total: currentObject.total + 1,
				success: currentObject.success + (message.success ? 1 : 0),
				fail: currentObject.fail + (message.requestError.error ? 1 : 0)
			}))

			console.log('Received:', message);
		};

		return () => {
			ws.close();
		};
	}, []);

	// Success rate calc
	useEffect(() => {
		if (totals.total == 0) {
			return;
		}

		setSuccessRate((totals.success / totals.total) * 100);
	}, [totals]);

	const operations = Object.keys(result);

	const data = [
		["Operation", "Success", "Total"],
		...operations.map((operation) => [
			operation,
			result[operation].success,
			result[operation].total
		])
	];

	const options = {
		title: "Total operations and successes by operation type",
		chartArea: { width: "50%" },
		hAxis: {
			title: "Total operations",
			minValue: 0,
		},
		vAxis: {
			title: "Operations",
		},
	};

	return (
		<div className="app">

			<div className="container">
				<h1>
					Tasks Dashboard
				</h1>
			</div>

			<div className="container bg-white">
				<div className="card">
					<h2>Total</h2>
					<p>{totals.total}</p>
				</div>
				<div className="card">
					<h2>Fails</h2>
					<p>{totals.fail}</p>
				</div>
				<div className="card">
					<h2>Successes</h2>
					<p>{totals.success}</p>
				</div>
				<div className="card">
					<h2>Success rate</h2>
					<p>{successRate.toFixed(2).toString()}%</p>
				</div>
			</div>

			<div className="container bg-white">
				{Object.keys(result).length > 0 && (<Chart
					chartType="BarChart"
					width="100%"
					height="400px"
					data={data}
					options={options}
				/>)}
			</div>

		</div>
	);
}

export default App;
