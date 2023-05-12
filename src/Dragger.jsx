import { InboxOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload, Modal } from 'antd';
import { useState } from 'react';
const { Dragger } = Upload;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const DraggerComp = (props) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const { fileList, setFileList } = props;
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  return (
    <div style={{textAlign:'center'}}>
      {
        fileList.length > 0 ? (
          <>
            <Upload
              action="/upload"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              beforeUpload={file => false}
            >
              <div>
                <PlusOutlined />
                <div>Upload</div>
              </div>
            </Upload>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
              <img
                alt="example"
                style={{
                  width: '100%',
                }}
                src={previewImage}
              />
            </Modal>
          </>
        ) : (
          <Dragger
            name="file"
            multiple={true}
            action="/upload"
            showUploadList={false}
            onChange={info => {
              const { status } = info.file;
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
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
            <p className="ant-upload-hint"> 支持单个或批量上传 </p>
          </Dragger>
        )
      }
    </div>

  )
};
export default DraggerComp;