import reqwest from 'reqwest';
import { message } from 'antd';
import BufferState from '../component/BufferState';
import { hashHistory } from 'react-router'



export default {

  fetchData : (
    url,
    params,
    callback,
    error = ()=>{message.error('服务器似乎出现了一些小问题');
  }) => {
    reqwest({
      url: url,
      method: 'post',
      data: params,
      type: 'json',
      success: callback,
      error: error,
    });
  },


  fetchDataWithCode : (
    url,
    params,
    callback,
    error = ()=>{message.error('服务器似乎出现了一些小问题');},) => {
      let buffer = new BufferState();
      let code = buffer.getCode();
      if(code){
        params.code = code;
        reqwest({
          url: url,
          method: 'post',
          data: params,
          type: 'json',
          success: callback,
          error: error,
        });
      }

      else{
        message.error('授权异常');
        hashHistory.replace('/login');
      }
    },

};
