import { createContext, useState, } from 'react';
import run from '../Gemini';
export const datacontext=createContext()

function UserContext({children}) {
let [speaking,setSpeaking]=useState(false)
let [prompt,setprompt]=useState("listening...")
let [response,setResponse]=useState(false)
    function speak(text){
      window.speechSynthesis.cancel();
let text_speak=new SpeechSynthesisUtterance(text)
text_speak.volume=1;
text_speak.rate=1;
text_speak.pitch=1;
text_speak.lang="hi-IN"
window.speechSynthesis.speak(text_speak)
    }
  async function aiResponse(prompt) {
     console.count("AI Response Called");
    let text=await run(prompt)
    let newText = text
  .replace(/\*\*/g, '')
  .replace(/\*/g, '')
  .replace(/google/gi, 'Pradeep Yadav');
    setprompt(newText)
    speak(newText)
    setResponse(true)
    setTimeout(()=>{
      setSpeaking(false)
    },4000)
  }
  let speechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition
  let recognition=new speechRecognition()
  let finalTranscript = "";
  recognition.interimResults = false;
recognition.continuous = false; 

recognition.onresult = (e) => {
  finalTranscript = e.results[e.results.length - 1][0].transcript.trim();
  console.log("Recognized:", finalTranscript);
  setprompt(finalTranscript);
};

recognition.onend = () => {
  if (finalTranscript) {
    tekeCommand(finalTranscript.toLowerCase());
    finalTranscript = "";
  }
};

// recognition.onresult = (e) => {
//   const transcript =
//     e.results[e.results.length - 1][0].transcript.trim();
//   console.log("Recognized:", transcript);
//   setprompt(transcript);
//   tekeCommand(transcript.toLowerCase());
// };

  function tekeCommand(command){
    if(command.includes("open") && command.includes("youtube")){
      window.open("https://www.youtube.com/","_blank")
      speak("opening Youtube")
      setprompt("opening Youtube...")
      setTimeout(()=>{
        setSpeaking(false)
        },4000)
    }

    else if(command.includes("open") && command.includes("google")){
      window.open("https://www.google.com/","_blank")
      speak("opening google")
      setprompt("opening google...")
      setTimeout(()=>{
        setSpeaking(false)
        },4000)
    }

    else if(command.includes("open") && command.includes("instagram")){
      window.open("https://www.instagram.com/","_blank")
      speak("opening instagram")
      setprompt("opening instagram...")
      setTimeout(()=>{
        setSpeaking(false)
       },4000)
    }

    else if(command.includes("open") && command.includes("whatsapp")){
      window.open("https://web.whatsapp.com/","_blank")
      speak("opening whatsapp")
      setprompt("opening whatsapp...")
      setTimeout(()=>{
        setSpeaking(false)
       },4000)
    }
    
    else{
      aiResponse(command)
    }
  } 

    let value={
      recognition,
      speaking,
      setSpeaking,
      prompt,
      setprompt,
      response,
      setResponse
    }
  return (
    <div>
      <datacontext.Provider value={value}>
        {children}
      </datacontext.Provider>
        
       
    </div>
  )
}

export default UserContext;