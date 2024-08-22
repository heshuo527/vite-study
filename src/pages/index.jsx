import React, { useState } from 'react';

const Index = () => {
  const [str, setStr] = useState(null);

  return (
    <div className="index">
      <h2>{str}</h2>
    </div>
  );
};

export default Index;
