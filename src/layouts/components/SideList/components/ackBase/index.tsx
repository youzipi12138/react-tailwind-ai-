import React from 'react';
import AckBaseHeader from './components/AckBaseHeader';
import AckBaseBody from './components/AckBaseBody';
const AckBase: React.FC = () => {
  return (
    <div>
      <AckBaseHeader />
      <AckBaseBody />
    </div>
  );
};

export default AckBase;
