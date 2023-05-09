import React, { useState } from 'react';
import { Image } from 'antd'
import DraggerComp from './Dragger';

import './App.css';

const App = () => {
  const [fileList, setFileList] = useState([]);

  const handleFileChange = (file) => {
    if (file) {
      const blob = new Blob([file], { type: file.type });
      const imageUrl = URL.createObjectURL(blob);
      return imageUrl
    }
  };

  return (
    <div>
      <DraggerComp setFileList={setFileList} />
      <div className='file-list-wrapper'>
        {
          fileList.map(item => {
            return <Image width={100} preview={false} height={100} src={handleFileChange(item.originFileObj)} />
          })
        }
      </div>
    </div>
  )
};
export default App;