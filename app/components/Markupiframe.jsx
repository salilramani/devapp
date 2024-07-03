import React from 'react';

const Markupiframe = ({ markupUrl, iframeRef }) => {
  return (
    
    <iframe
      ref={iframeRef} // Use the iframeRef to reference the iframe element
      src={markupUrl}
      style={{ width: '100%', height: '1800px', border: 'none' }} // Set height to 2000px
    />
    
  );
};

export default Markupiframe;