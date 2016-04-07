import React from 'react';
import { Menu, Breadcrumb, Icon } from 'antd';
import './LoginPage.less';

const LoginPage = React.createClass({

  render(){
    return <div className="ys-loginbox">
      <h3 className="ys-loginbox-title">
        店多多 商户后台
      </h3>
      <div className="ys-panel text-center padding">
        <h3>微信扫一扫即可登录后台</h3>
        <img src="http://7xsodg.com2.z0.glb.clouddn.com/qrcode_for_gh_014551192914_430.jpg" />
      </div>
    </div>;
  }
});

export default LoginPage;
