import React, { useState } from 'react';
import Button from '../D2PlannerNavButton';
import { Textarea } from "@chakra-ui/react";

const CreateLink = ({ state, url }) => {
  const [text, displayText] = useState("");
  const [isShowing, showText] = useState(false);
  const [copySuccess, setSuccess] = useState(false);
  let urlString = window.location.href.split("?")[0] + "?skillPoints=";
  for (let key in state) {
    if (key.includes("r") && key.includes("t") && key.includes("c") && key.length === 6) {
      state[key] < 10 ? urlString += "0" + state[key] :
        urlString += state[key];
    }
  }

  function showTextLink() {
    showText(!isShowing);
    setTimeout(function(){ showText(false) }, 10000);
  }

  function updateClipboard(newClip) {
    navigator.clipboard.writeText(newClip).then(function() {
      setSuccess(true);
    }, function() {
      setSuccess(false);
    });
  }

  return (
    <div>
      <Button onClick={() => displayText(urlString) || showTextLink()}>Create Link</Button>
      {
        isShowing &&
          <>
          {text}
            <Textarea value={ text } isReadOnly />
            <button onClick={() => updateClipboard(text)}>Copy link to clipboard</button>
            { copySuccess && <p>Copied!</p> }
          </>
      }
    </div>
  );
};




export default CreateLink;
