import '../common/lib';
import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route, Link, hashHistory, IndexRoute } from 'react-router'
import reqwest from 'reqwest';
import cookie from 'react-cookie';

import MainFrame from '../Page/MainFrame';
import LoginPage from '../Page/LoginPage';
import MainPage from '../Page/MainPage';
import {ShopInfoPage,OpenShopPage} from '../Page/ShopInfoPage';
import {PromotionPage,PromotionAddPage,PromotionIndexPage} from '../Page/PromotionPage';
import {GoodsPage, GoodsIndexPage, GoodsAddPage} from '../Page/GoodsManagerPage';
import {PanicBuyMainPage, PanicBuyIndexPage, PanicBuyAddPage} from '../Page/PanicBuyManagerPage';
import BufferState from '../component/BufferState';
import Utils from '../component/YsUtils';


const authHandler = (nextState, replace) =>{
  let buffer = new BufferState();
  if(!buffer.getCode()){
      let code = cookie.load('code');
      if(code){
        Utils.fetchData(
          '/oauthCode.json',
          {code:code},
          (result) => {
            if(result.status==1){
              buffer.setCode(code);
              if(result.data.id){
                buffer.setShopInfo(result.data);
                hashHistory.replace('/promotionPage');
              }else{
                hashHistory.replace('/openShop');
              }
            }
            else{
              cookie.remove('code');
              replace("/login");
            }
          },
        )
      }
      else{
        replace("/login");
      }
  }

}


ReactDOM.render(<Router history={hashHistory}>
    <Route path="/" component={MainFrame} onEnter={authHandler}>
      <IndexRoute component={PromotionPage} />
      <Route path="shopInfo" breadcrumbName="商户信息" component={ShopInfoPage} />

      <Route path="promotionPage" breadcrumbName="特惠活动" component={PromotionPage}>
        <IndexRoute component={PromotionIndexPage} />
        <Route path="add" breadcrumbName="添加活动" component={PromotionAddPage} />
      </Route>

      <Route path="goodsManagerPage" breadcrumbName="商品管理" component={GoodsPage}>
        <IndexRoute component={GoodsIndexPage} />
        <Route path="add" breadcrumbName="添加商品" component={GoodsAddPage} />
      </Route>

      <Route path="panicBuyPage" breadcrumbName="抢购活动" component={PanicBuyMainPage}>
        <IndexRoute component={PanicBuyIndexPage} />
        <Route path="add" breadcrumbName="添加活动" component={PanicBuyAddPage} />
      </Route>

    </Route>
    <Route path="login" component={LoginPage} />
    <Route path="openShop" breadcrumbName="开店" component={OpenShopPage} onEnter={authHandler} />
  </Router>
  , document.getElementById('react-content'));
