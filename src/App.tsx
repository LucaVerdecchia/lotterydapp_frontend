import { useEffect, useState } from "react";
import "./App.css";
import LotteryContract from './web3/lotterycontract';
import logo from "./logo.png";
import NextExtractionSection from "./components/NextExtractionSection";
import PastExtractionTable from "./components/PastExtractionTable";

function App() {

  const [currentExtractionDate, setCurrentExtractionDate] = useState<number | null>(null);
  const [pastExtractionDates, setPastExtractionDates] = useState<number[]>([]);

  useEffect(() => {
    LotteryContract.methods.getExtractionDate().call().then((result) => {
      // @ts-ignore
      const extractionDate = result as string;
      setCurrentExtractionDate(parseInt(extractionDate, 10));
    })

    LotteryContract.methods.getExtractionDates().call().then((result) => {
      const _pastExtractions = result.map(extractionDate => parseInt(extractionDate, 10));
      setPastExtractionDates(_pastExtractions);
    })

  }, []);



  return (
    <div className="wrapper">
      <div>
        <nav className="headerNav">
          <ul className="header">
            <li className="headerItem">Home</li>
            <li className="headerItem">Whitepaper</li>
            <li className="headerItem">Faq</li>
            <img src={logo} alt="logo" className="headerLogo"></img>
            <li className="headerItem">Getting Started</li>
            <li className="headerItem">Owner Section</li>
          </ul>
        </nav>
      </div>
      <NextExtractionSection currentExtractionDate={currentExtractionDate}/>
      {pastExtractionDates && pastExtractionDates.map(pastExtraction => <PastExtractionTable extractionDate={pastExtraction} />)}
    </div>
  );
}

export default App;
