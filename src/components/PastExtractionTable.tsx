import { useEffect, useState } from "react";
import LotteryContract from '../web3/lotterycontract';

interface IPastExtractionTable {
  extractionDate: number;
}

const PastExtractionTable = ({ extractionDate }: IPastExtractionTable) => {

  const [extractionUsers, setExtractionUsers] = useState<string[]>([]);
  const [winner, setWinner] = useState<string>('');
  const [randomWord, setRandomWord] = useState<string>('');
  const [requestId, setRequestId] = useState<string>('');

  useEffect(() => {
    console.log(extractionDate);
    // @ts-ignore
    LotteryContract.methods.getLotteryInfo(extractionDate).call().then((result) => {
      // @ts-ignore
      if(result && result[3]){
        // @ts-ignore
        setExtractionUsers(result[3]);
        // @ts-ignore
        setWinner(result[0]);
        // @ts-ignore
        setRandomWord(result[1]);
        // @ts-ignore 
        setRequestId(result[4]);

      }
    })
  }, [extractionDate])

  function timestampToDateFormat(timestamp: number) {
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }

  return (
    <div style={{ marginTop: "100px" }}>
      <h3 style={{ color: "white" }}>
        Extraction dated: {timestampToDateFormat(extractionDate)}{" "}
      </h3>
      {winner && (
        <h4 style={{ color: "white" }}>
          Winner: <br></br>
          <a
            href={`https://goerli.etherscan.io/address/${winner}`}
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "underline" }}
          >
            {winner}
          </a>
        </h4>
      )}

        <div style={{marginTop: '30px', marginBottom: '30px'}}>
        {randomWord && (
        <h5 style={{ color: "white" }}>
          VRF Random Word: <br></br>
          {randomWord}
        </h5>
      )}
      {requestId && (
        <h5 style={{ color: "white" }}>
          VRF Request Id: <br></br>
            {requestId}
        </h5>
      )}
        </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Users in lottery</th>
          </tr>
        </thead>
        <tbody>
          {extractionUsers &&
            extractionUsers.map((user) => {
              return (
                <tr key={user}>
                  <th scope="row">
                    <a
                      href={`https://goerli.etherscan.io/address/${user}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{ textDecoration: "underline" }}
                    >
                      {user}
                    </a>
                  </th>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default PastExtractionTable;
