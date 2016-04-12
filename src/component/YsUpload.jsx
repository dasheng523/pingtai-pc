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
        if(this.props.piclist){
          picList = this.props.piclist;
        }
        let uploadProps = {
          action: '/upload.json',
          listType: 'picture',
          onChange : (info)=>{
            let fileList = info.fileList;
            picList = fileList;
          },
          beforeUpload : (info)=>{
            const size = getUploadFiles().length;
            if(size>=5){
              message.error('最多只能上传5张图片');
              return false;
            }
          },
          defaultFileList : this.props.piclist,
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
