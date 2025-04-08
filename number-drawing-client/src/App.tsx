import React, { useState } from 'react';
import './App.css';

function App() {
  const [drawnNumber, setDrawnNumber] = useState<number | null>(null);
  const [remainingNumbers, setRemainingNumbers] = useState<number>(300);
  const [error, setError] = useState<string>('');
  const [history, setHistory] = useState<number[]>([]);

  const drawNumber = async () => {
    try {
      const response = await fetch('http://localhost:5234/api/drawing/draw');
      if (!response.ok) {
        const error = await response.text();
        setError(error);
        return;
      }
      const data = await response.json();
      setDrawnNumber(data.number);
      setRemainingNumbers(data.remainingNumbers);
      setHistory(data.history);
      setError('');
    } catch (err) {
      setError('Failed to connect to the server');
    }
  };

  const resetNumbers = async () => {
    try {
      const response = await fetch('http://localhost:5234/api/drawing/reset', {
        method: 'POST'
      });
      if (response.ok) {
        setDrawnNumber(null);
        setRemainingNumbers(300);
        setHistory([]);
        setError('');
      }
    } catch (err) {
      setError('Failed to connect to the server');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Number Drawing System</h1>
        {error && <div className="error">{error}</div>}
        <div className="number-display">
          {drawnNumber ? (
            <h2>Drawn Number: {drawnNumber}</h2>
          ) : (
            <h2>Click Draw to start</h2>
          )}
          <p>Remaining numbers: {remainingNumbers}</p>
        </div>
        <div className="button-container">
          <button onClick={drawNumber}>Draw Number</button>
          <button onClick={resetNumbers}>Reset</button>
        </div>
        <div className="history-container">
          <h3>History</h3>
          <div className="history-list">
            {history.map((num, index) => (
              <span key={index} className="history-number">
                {num}
              </span>
            ))}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
