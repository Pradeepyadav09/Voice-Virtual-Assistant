import{ useContext } from 'react';
import './App.css';
import va from './assets/ai.png';
import { CiMicrophoneOn } from 'react-icons/ci';
import { datacontext } from './context/UserContext';
import speakingGif from './assets/speak.gif';
import aigif from './assets/aiVoice.gif';

function App() {
  const {
    recognition,
    speaking,
    setSpeaking,
    prompt,
    setprompt,
    response,
    setResponse
  } = useContext(datacontext);

  return (
    <div className="main">
      <img src={va} alt="AI Assistant" id="shifra" />

      <span>
        I'm Pradeep, Your Advanced Virtual Assistant
      </span>

      {!speaking ? (
        <button
          onClick={() => {
            if (recognition) {
              setprompt('listening...');
              setSpeaking(true);
              setResponse(false);

              try {
                recognition.start();
              } catch (error) {
                console.error(error);
                setSpeaking(false);
              }
            } else {
              alert('Speech recognition is not supported!');
            }
          }}
        > Click here <CiMicrophoneOn /></button>
      ) : (
        <div className="response">
          {!response ? (
            <img
              src={speakingGif}
              alt="Listening"
              id="speak"
            />
          ) : (
            <img
              src={aigif}
              alt="AI Assistant responding"
              id="aigif"
            />
          )}

          <p>{prompt}</p>
        </div>
      )}
    </div>
  );
}

export default App;
