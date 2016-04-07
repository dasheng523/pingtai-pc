import '../common/lib';
import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route, Link, hashHistory, IndexRoute } from 'react-router'

import MainFrame from '../Page/MainFrame';
import LoginPage from '../Page/LoginPage';
import MainPage from '../Page/MainPage';
import ShopInfoPage from '../Page/ShopInfoPage';
import PanicBuyPage from '../Page/PanicBuyPage';
import {PromotionPage,PromotionAddPage,PromotionIndexPage} from '../Page/PromotionPage';

const authHandler = (nextState, replace) =>{
  //replace('/');
}


ReactDOM.render(<Router history={hashHistory}>
    <Route path="/" component={MainFrame} onEnter={authHandler}>
      <IndexRoute component={MainPage} />
      <Route path="shopInfo" breadcrumbName="商户信息" component={ShopInfoPage} />

      <Route path="promotionPage" breadcrumbName="特惠活动" component={PromotionPage}>
        <IndexRoute component={PromotionIndexPage} />
        <Route path="add" breadcrumbName="添加活动" component={PromotionAddPage} />
      </Route>


      <Route path="panicBuyPage" breadcrumbName="抢购活动" component={PanicBuyPage} />
    </Route>
    <Route path="login" component={LoginPage} />
  </Router>
  , document.getElementById('react-content'));
