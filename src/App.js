import './App.css';
import { React, useState } from 'react';
import Pagination from './Components/Pagination';
const words = require('an-array-of-english-words');

function App() {
  const [list, setList] = useState([]);
  const [stringLenght, setStringLength] = useState("");
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const wordsPerPage = 1000;

    const fetchWords = (e) => {
       e.preventDefault();
       setLoading(true);
       const WordsOf5 =  words.filter((word) => (
             word.length === parseInt(stringLenght))
        )
        const Array = WordsOf5.map((word, index) => (
          { id: index+1, word: word}
        ))
        setList(Array);
        setLoading(false);
        setStringLength('');
    }

    const DownloadFile = () => {
      const fileData = JSON.stringify(list.map((item) => (item)));
      const blob = new Blob([fileData], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = "words.json";
      link.href = url;
      link.click();
    }

    const lastWordIndex = currentPage * wordsPerPage;
    const firstWordIndex = lastWordIndex - wordsPerPage;
    const currentWordList = list.slice(firstWordIndex, lastWordIndex);

  return (
    <div className="App">
      <h1>Words List Generator</h1>
      <input type='text' placeholder='Enter length of word..' value={stringLenght} onChange={(e) => setStringLength(e.target.value)}/>
      <button onClick={fetchWords}>Load Words</button>
      <br></br>
      <br></br>
      <button onClick={DownloadFile}>Download Words to JSON File</button>
      { loading 
        ? <p>Load Data...</p>
        : 
        <>
          {
            currentWordList && (
              <>
                <p>Words : {list.length}</p>
                <div className='container'>
                  { currentWordList?.map((item,) => (
                    <p key={item.id}>{item.id}.{item.word}</p>
                    ))
                  }
                </div>
              </>
            )
          }
        </> 
      }
      <Pagination
          totalWords={list.length}
          wordsPerPage={wordsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
      />
      <div className='description'>
        <span>
            I build this app to help me create a JSON File 
            with an Array of words and id for each word.
            I need this JSON File to build a Wordle Clone.
        </span>
      </div>
      
    </div>
  );
}

export default App;
