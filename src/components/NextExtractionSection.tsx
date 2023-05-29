import {useEffect, useState} from 'react';

interface IProps {
  currentExtractionDate: number | null;
}

const NextExtractionSection = ({currentExtractionDate} : IProps) => {

  const [daysRemaining, setDaysRemaining] = useState(0);
  const [hoursRemaining, setHoursRemaining] = useState(0);
  const [minutesRemaining, setMinutesRemaining] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(0);

  useEffect(() => {
    currentExtractionDate && setInterval(calculateTimeLeft, 1000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentExtractionDate])

  const calculateTimeLeft = () => {
    const currentExtractionDateInMillis = currentExtractionDate! * 1000;
    const currentDateInMillis = Date.now();
    const timeDifferenceInMillis = currentExtractionDateInMillis - currentDateInMillis;
    const millisecondsInADay = 24 * 60 * 60 * 1000;
    const millisecondsInAnHour = 60 * 60 * 1000;
    const millisecondsInAMinute = 60 * 1000;      
    const daysRemaining = Math.floor(timeDifferenceInMillis / millisecondsInADay);
    const hoursRemaining = Math.floor(
      (timeDifferenceInMillis % millisecondsInADay) / millisecondsInAnHour
    );
    const minutesRemaining = Math.floor(
      (timeDifferenceInMillis % millisecondsInAnHour) / millisecondsInAMinute
    );
    const secondsRemaining = Math.floor(
      (timeDifferenceInMillis % millisecondsInAMinute) / 1000
    );
    setDaysRemaining(daysRemaining);
    setHoursRemaining(hoursRemaining);
    setMinutesRemaining(minutesRemaining);
    setSecondsRemaining(secondsRemaining);
  }

  const renderTimeLeft = (title: number, subTitle: string) => (
    <div className="countdownCircle">
      <p className="countdownCircleTitle">{title}</p>
      <p className="countdownCircleSubTitle">{subTitle}</p>
    </div>
  );

  return (
    <div className="topSection">
    <div className="extractionContainer">
      <h1 className="heading">Next Extraction</h1>
      <div className="extractionTimeContainer">
        {renderTimeLeft(daysRemaining, "days")}
        {renderTimeLeft(hoursRemaining, "hours")}
        {renderTimeLeft(minutesRemaining, "minutes")}
        {renderTimeLeft(secondsRemaining, "seconds")}
      </div>
    </div>
    <div className="winnerAward">
      <h2 className="headingh2">Winner Awards:</h2>
      <p className="award">500 LOT Token</p>
      <p className="award">1 Unique NFT</p>
    </div>
  </div>
  )
}

export default NextExtractionSection;