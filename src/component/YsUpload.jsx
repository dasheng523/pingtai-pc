import React from 'react';
import {  Upload, Button, Icon, message } from 'antd';


const YsPicUpload = ()=>{
  let picList = [];

  const getUploadFiles = ()=>{
    return picList;
  }

  const createNode = ()=>{
    return React.createClass({
      render(){

        if(this.props.value){
          picList = this.props.value;
        }
        else if(this.props.piclist){
          picList = this.props.piclist;
        }
        else{
          picList = [];
        }
        let maxCount ;
        if(!this.props.maxCount){
          maxCount = 5;
        }else{
          maxCount = this.props.maxCount;
        }
        let uploadProps = {
          action: '/upload.json',
          listType: 'picture',
          onChange : (info)=>{
            let fileList = info.fileList;
            fileList = fileList.map((file) => {
              if (file.response) {
                file.mediaId = file.response.mediaId;
              }
              return file;
            });
            picList = fileList;
          },
          beforeUpload : (info)=>{
            const size = getUploadFiles().length;
            if(size>=maxCount){
              message.error('最多只能上传'+maxCount+'张图片');
              return false;
            }
          },
          defaultFileList : picList,
        };
        return <Upload {...uploadProps} className="upload-list-inline">
          <Button type="ghost">
            <Icon type="upload" /> 点击上传
          </Button>
        </Upload>
      }
    });
  }

  return {
    getNode:createNode,
    getUploadFiles : getUploadFiles,
  }
};


export {YsPicUpload};
