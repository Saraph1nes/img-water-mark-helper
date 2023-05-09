import { InboxOutlined } from '@ant-design/icons';
import { message, Upload, Image } from 'antd';
const { Dragger } = Upload;
const DraggerComp = (props) => {

  return (
    <Dragger
      name="file"
      multiple={true}
      action="/upload"
      showUploadList={false}
      onChange={info => {
        const { status } = info.file;
        if (status !== 'uploading') {
          // console.log(info.file, info.fileList);
          props.setFileList(info.fileList)
        }
        if (status === 'done') {
          message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      }}
      beforeUpload={file => false} // 这里返回false以阻止antd上传文件
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
      <p className="ant-upload-hint"> 支持单个或批量上传 </p>
    </Dragger>
  )
};
export default DraggerComp;