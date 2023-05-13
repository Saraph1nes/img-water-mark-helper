import {InboxOutlined, PlusOutlined} from '@ant-design/icons';
import {message, Upload, Image} from 'antd';
import {useState} from 'react';

const {Dragger} = Upload;


const DraggerComp = (props) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const {fileList, setFileList, handleImg} = props;
  const handlePreview = async () => {
    handleImg((url, filename) => {
      // 获取 Blob 对象
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.onload = function () {
        const blob = xhr.response;

        // 生成图片 URL
        const imgUrl = URL.createObjectURL(blob);

        console.log(imgUrl, filename)
        setPreviewImage(imgUrl);
        setPreviewOpen(true);
      };

      xhr.send();
    })
  };
  const handleChange = ({fileList: newFileList}) => setFileList(newFileList);

  return (<div style={{textAlign: 'center'}}>
      {fileList.length > 0 ? (<>
          <Upload
            action="/upload"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            beforeUpload={file => false}
          >
            <div>
              <PlusOutlined/>
              <div>Upload</div>
            </div>
          </Upload>
          <Image
            width={200}
            style={{display: 'none'}}
            src={previewImage}
            preview={{
              visible: previewOpen, src: previewImage, onVisibleChange: (value) => {
                setPreviewOpen(value);
              },
            }}
          />
        </>) : (<Dragger
          name="file"
          multiple={true}
          action="/upload"
          showUploadList={false}
          onChange={info => {
            const {status} = info.file;
            if (status !== 'uploading') {
              setFileList(info.fileList)
            }
            if (status === 'done') {
              message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
              message.error(`${info.file.name} file upload failed.`);
            }
          }}
          beforeUpload={file => false}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined/>
          </p>
          <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
          <p className="ant-upload-hint"> 支持单个或批量上传 </p>
        </Dragger>)}
    </div>

  )
};
export default DraggerComp;
