import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Optional: Add custom styling

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState('');

  const apiEndpoint = 'http://localhost:3001/bfhl'; // Replace with your backend API URL

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      if (!parsedInput.data) {
        setError('Invalid JSON format.');
        return;
      }
      const res = await axios.post(apiEndpoint, parsedInput);
      setResponse(res.data);
      setError('');
    } catch (err) {
      setError('Invalid JSON or failed to connect to the backend.');
    }
  };

  const handleOptionChange = (e) => {
    const options = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(options);
  };

  const renderResponse = () => {
    if (!response) return null;

    let filteredResponse = {};
    if (selectedOptions.includes('Alphabets')) {
      filteredResponse.alphabets = response.alphabets;
    }
    if (selectedOptions.includes('Numbers')) {
      filteredResponse.numbers = response.numbers;
    }
    if (selectedOptions.includes('Highest lowercase alphabet')) {
      filteredResponse.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
    }

    return (
      <pre>
        {JSON.stringify(filteredResponse, null, 2)}
      </pre>
    );
  };

  return (
    <div className="App">
      <h1>Bajaj Finserv Health Challenge</h1>
      <textarea
        rows="5"
        cols="50"
        placeholder='Enter JSON input like {"data": ["A", "1", "b", "2", "C", "c"]}'
        value={jsonInput}
        onChange={handleInputChange}
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {response && (
        <>
          <div>
            <label>Select Options to Display:</label>
            <select multiple={true} onChange={handleOptionChange}>
              <option value="Alphabets">Alphabets</option>
              <option value="Numbers">Numbers</option>
              <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
            </select>
          </div>
          {renderResponse()}
        </>
      )}
    </div>
  );
}

export default App;


