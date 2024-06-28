import React from 'react';

const Markupiframe = ({ markupUrl }) => {
  if (!markupUrl) return <p>No URL provided</p>;

  return (
    <div>
      <iframe src={markupUrl} width="100%" height="600px" title="Markup" />
    </div>
  );
};

export default Markupiframe;