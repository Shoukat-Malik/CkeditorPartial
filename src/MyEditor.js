import React, { useRef, useEffect } from 'react';

const MyEditor = () => {
  // Create a ref to hold the iframe element
  const iframeRef = useRef(null);
  const hardcodedData = "This is data load from db";
 


  // Function to request editor data from the iframe
  const getEditorData = () => {
    const iframe = iframeRef.current; // Get the iframe element
    // alert('Editor data');
    if (iframe && iframe.contentWindow) {
      // Ensure iframe and its contentWindow are available
      iframe.contentWindow.postMessage('getEditorData', '*');
    }
  };

  const setEditorData = () => {
    const iframe = iframeRef.current;
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage({ type: 'setEditorData', content: hardcodedData }, '*');
    }
  };


  // Set up an effect to handle messages from the iframe
  useEffect(() => {
    const handleEditorData = (event) => {
      if (event.data.type === 'editorData') {
        // Check if the message is the editor data
        console.log('Editor data:', event.data.data);
      }
    };

    // Add event listener for messages from the iframe
    window.addEventListener('message', handleEditorData);

    return () => {
      // Clean up the event listener on component unmount
      window.removeEventListener('message', handleEditorData);
    };
  }, []);

  return (
    <div>
        <iframe
            ref={iframeRef}
            src="https://uatcpaplus.edanat.com/Common/GetCKEditorView"
            style={{ width: '100%', height: '500px' }}
            title="CKEditor"
         ></iframe>
          
      <button onClick={getEditorData}>Get Editor Data</button>
      <button onClick={setEditorData}>Set Editor Data</button>

    </div>
  );
};

export default MyEditor;
