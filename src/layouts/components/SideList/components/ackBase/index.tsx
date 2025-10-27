import React, { useState } from 'react';
import AckBaseHeader from './components/AckBaseHeader';
import AckBaseBody from './components/AckBaseBody';
const AckBase: React.FC = () => {
  const [isShowMenu, setIsShowMenu] = useState(true);

  const handleShowMenu = () => {
    setIsShowMenu(!isShowMenu);
  };
  return (
    <div>
      <AckBaseHeader onShowMenu={handleShowMenu} />
      <div
        style={{
          maxHeight: isShowMenu ? '1000px' : '0',
          opacity: isShowMenu ? 1 : 0,
          overflow: 'hidden',
          transition: 'max-height 0.2s ease-in-out, opacity 0.3s ease-in-out',
        }}
      >
        <AckBaseBody />
      </div>
    </div>
  );
};

export default AckBase;
