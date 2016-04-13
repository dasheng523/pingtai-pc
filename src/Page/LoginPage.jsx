import React from 'react';
import { Menu, Breadcrumb, Icon } from 'antd';
import reqwest from 'reqwest';
import { hashHistory } from 'react-router'

import config from '../component/Config';
import BufferState from '../component/BufferState';
import Cookie from '../component/YsCookie';
import Utils from '../component/YsUtils';
import cookie from 'react-cookie';

import './LoginPage.less';


const LoginPage = React.createClass({
  getInitialState() {
    return {
      code: new Date().getTime(),
      interval : null,
    };
  },

  componentDidMount(){

    var interval = setInterval(() => {
      Utils.fetchData(
        '/oauthCode.json',
        {code:this.state.code},
        (result) => {
          let buffer = new BufferState();
          if(result.status == 1){
              cookie.save('code',this.state.code);
              buffer.setCode(this.state.code);
            if(result.data.id){
              buffer.setShopInfo(result.data);
              hashHistory.replace('/promotionPage');
            }else{
              hashHistory.replace('/openShop');
            }
            clearInterval(this.state.interval);
          }
        }
      );
    },3000);
    this.setState({interval:interval});

  },

  render(){
    let qcodeUrl = "http://qr.liantu.com/api.php?text=" + encodeURIComponent(config.domain + '/index.php/Phone/Shop/login');
    return <div className="ys-loginbox">
      <h3 className="ys-loginbox-title">
        店多多 商户后台
      </h3>
      <div className="ys-panel text-center padding">
        <h3>微信扫一扫即可登录后台</h3>
        <img src={qcodeUrl} />
      </div>
    </div>;
  }
});

export default LoginPage;
