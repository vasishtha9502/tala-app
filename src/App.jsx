import { useState, useRef, useEffect } from "react";
import './App.css';

function HandGestures({ gesture }) {
  switch (gesture) {
    case "clap":
      return <p>clap.svg</p>
    case "littleFinger":
      return <p>littleFinger.svg</p>
    case "ringFinger":
      return <p>ringFinger.svg</p>
    case "middleFinger":
      return <p>middleFinger.svg</p>
    case "palmTurn":
      return <p>palmTurn.svg</p>
    default:
      return <p>plainhand.svg</p>
  }
}

function Metronome() {
  const [beat, setBeat] = useState(0);
  const [bpm, setBpm] = useState(70);
  const [tala, setTala] = useState("Adi Tala");
  const [isRunning, setIsRunning] = useState(false);
  const [startButton, setStartButton] = useState(true);
  const timerRef = useRef(null);
  const latestBpm = useRef(70);

  useEffect(() => {
    latestBpm.current = bpm;
  }, [bpm]);

  function start() {
    clearInterval(timerRef.current);
    const ms = 60000 / latestBpm.current;
    timerRef.current = setInterval(() => {
      setBeat(b => b + 1);
    }, ms);
    setIsRunning(true);
  }

  function stop() {
    clearInterval(timerRef.current);
    timerRef.current = null;
    setBeat(0);
    setIsRunning(false);
  }

  function pause() {
    clearInterval(timerRef.current);
    timerRef.current = null;
    setIsRunning(false);
  }

  function reset() {
    clearInterval(timerRef.current);
    timerRef.current = null;
    setBeat(0);
    setBpm(70);
    setIsRunning(false);
    setStartButton(true);
  }

  function increase() {
    if (bpm === 250) {
    } else {
      setBpm(bpm => bpm + 1);
    }
    if (timerRef.current != null) {
      clearInterval(timerRef.current);
      const ms = 60000 / latestBpm.current;
      timerRef.current = setInterval(() => {
        setBeat(b => b + 1);
      }, ms);
    }
  }

  function decrease() {
    if (bpm <= 50) {
    } else {
      setBpm(bpm => bpm - 1);
    }
    if (timerRef.current != null) {
      clearInterval(timerRef.current);
      const ms = 60000 / latestBpm.current;
      timerRef.current = setInterval(() => {
        setBeat(b => b + 1);
      }, ms);
    }
  }

  const beatNo = (beat % 8) + 1;
  const gestures = {
    1: "clap",
    2: "littleFinger",
    3: "ringFinger",
    4: "middleFinger",
    5: "clap",
    6: "palmTurn",
    7: "clap",
    8: "palmTurn"
  };
  const currentGesture = gestures[beatNo];
  const bars = [
    {id: 1, height: 70}, {id: 2, height: 40}, {id: 3, height: 40}, {id: 4, height: 40},
    {id: 5, height: 70}, {id: 6, height: 40}, {id: 7, height: 70}, {id: 8, height: 40}
  ];

  return (
    <div className="app">
      <div className="header">
        <div className="tala-dropdown">
          <select value={tala} onChange={e => setTala(e.target.value)}>
            <option value="Adi Tala">Adi Tala</option>
          </select>
        </div>
        <div className="handSigns">
          {isRunning && <HandGestures gesture={currentGesture} />}
        </div>
      </div>
      {bpm === 250 && <p>max speed limit reached</p>}
      {bpm <= 50 && <p>min speed limit reached</p>}
      <div className="beat-bars">
        {bars.map((bar) => {
          return <div key={bar.id} className={isRunning && bar.id === beatNo ? "bar-active" : "bar"} style={{height: bar.height}}></div>
        })}
      </div>
      <div className="bpm-card">
        <div className="inner-bpm-row">
          <button className="decrease-btn" onClick={decrease}>-</button>
          <div className="bpm">
            <input className="bpm-input" type="number" value={bpm} onChange={e => setBpm(Number(e.target.value))} />
            <p className="bpm-text">BPM</p>
          </div>
          <button className="increase-btn" onClick={increase}>+</button>
        </div>
        <div className="bpm-buttons">
          <button className="stop-btn" onClick={stop}>⏹ STOP</button>
          <button className="start-btn" onClick={() => {
            if (startButton) { start(); setStartButton(false); }
            else { pause(); setStartButton(true); }
          }}>{startButton ? "▶ START" : "⏸ PAUSE"}</button>
          <button className="reset-btn" onClick={reset}>⟳ RESET</button>
        </div>
      </div>
    </div>
  );
}

export default Metronome;