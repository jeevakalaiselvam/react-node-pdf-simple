import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import React from 'react';
import { Document, Page } from 'react-pdf';
import axios from 'axios';

function App() {
  const [pdfFileURL, setPdfFileURL] = useState('');
  useEffect(() => {
    axios(`http://localhost:4000/pdf `, {
      method: 'GET',
      responseType: 'blob',
      //Force to receive data in a Blob Format
    })
      .then((response) => {
        //Create a Blob from the PDF Stream
        const file = new Blob([response.data], {
          type: 'application/pdf',
        });
        //Build a URL from the file
        const fileURL = URL.createObjectURL(file);
        //Open the URL on new Window
        setPdfFileURL(fileURL);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="App">
      <h1>PDF Example</h1>
      <div>
        <object
          data="http://localhost:4000/pdf"
          type="application/pdf"
          width="500"
          height="678"
        >
          <iframe src={pdfFileURL} width="500" height="678" title="PDF">
            <p>This browser does not support PDF!</p>
          </iframe>
        </object>
      </div>
    </div>
  );
}

export default App;
