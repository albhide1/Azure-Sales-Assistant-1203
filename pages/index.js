import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';

const Home = () => {
  const [userInput, setUserInput] = useState('Product You are Pitching:\nName of Customer:\nRole at Company: \nCompany of Customer:');
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
  
    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }
  const onUserChangedText = (event) => {
    console.log(event.target.value);
    setUserInput(event.target.value);
  };
  return (
    <div className="root">
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Azure Sales Assistant</h1>
          </div>
          <div className="header-subtitle">
            <center><h2>Generate Talking Points and Company-Specific Use Cases</h2></center>
            <h3>This tool will allow you to develop custom talking points and use-cases for your sales efforts. Simpily input the Microsoft Azure product you are selling, the name of your customer, the name of your customer's company, and their role at their organization, and this technology will generate key talking points and specific use-cases for your customer's organization. Note that these talking points and use-cases are tailored to the size of the company you are working with and the technical expertise of your client (based on their role at the organization).</h3>
            <hr></hr>
            <center><h3>
            <b>Example</b>
            <br/> Product You are Pitching: Synapse
            <br/> Name of Customer: Andy Johansen
            <br/> Role at Company: Chief Technology Officer
            <br/> Company: McDonalds </h3> </center>
          </div>
        </div>
        <div className="prompt-container">
          <h3><b>Input Here</b></h3>
          <textarea
            className="prompt-box"
            placeholder="start typing here"
            value={userInput}
            onChange={onUserChangedText}
        />;
          <div className="prompt-buttons">
          <a
    className={isGenerating ? 'generate-button loading' : 'generate-button'}
    onClick={callGenerateEndpoint}
  >
    <div className="generate">
    {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
    </div>
</a>
  </div>
  {apiOutput && (
  <div className="output">
    <div className="output-header-container">
      <div className="output-header">
        <h3>Output</h3>
      </div>
    </div>
    <div className="output-content">
      <p>{apiOutput}</p>
    </div>
  </div>
)}
        </div>
      </div>
    </div>
  );
};

export default Home;
