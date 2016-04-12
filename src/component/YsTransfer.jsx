import React from 'react';
import {  Upload, Button, Icon } from 'antd';


/**
let upload = YsPicUpload();
upload.getNode();

upload.setInitPicList([{
    uid: -1,
    name: 'xxx.png',
    status: 'done',
    url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
    thumbUrl: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
  }, {
    uid: -2,
    name: 'yyy.png',
    status: 'done',
    url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
    thumbUrl: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
  }]);

upload.getAllPicList();
**/

const YsPicUpload = ()=>{
  let picList = [];

  const setUploadFiles = (picList)=>{
    if(picList){
      this.picList = picList;
    }else{
      throw Exception();
    }
  }

  const getUploadFiles = ()=>{
    return this.picList;
  }

  const node = React.createClass({
    uploadProps : {
      action: '/upload.json',
      listType: 'picture',
      onChange : (info)=>{
        let fileList = info.fileList;
        setUploadFiles(fileList);
      },
      beforeUpload : (info)=>{
        const size = getUploadFiles().length;
        if(size>=5){
          message.error('最多只能上传5张图片');
          return false;
        }
      }
    },
    render(){
      return <Upload {...this.uploadProps} className="upload-list-inline">
        <Button type="ghost">
          <Icon type="upload" /> 点击上传
        </Button>
      </Upload>
    }
  });

  return {
    getNode:()=>{return node;},
    setUploadFiles : setUploadFiles,
    getUploadFiles : getUploadFiles,
  }
};


export {YsPicUpload};
