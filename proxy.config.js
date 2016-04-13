
module.exports = {
  'POST /upload.json': {mediaId:'1',status:"ok"},
  'POST /delGoods.json': {status:"1",data:"删除成功"},
  'POST /goodslist.json' : {
    status:1,
    data:{
      totalCount : 3,
      list:[{
        key: '1',
        name: '白菜',
        price: '1元/斤',
        status: '缺货'
      }, {
        key: '2',
        name: '西瓜',
        price: '0.5元/斤',
        status: '正常'
      }, {
        key: '3',
        name: '大白兔奶糖',
        price: '5元/包',
        status: '正常'
      }]
    },},
  'POST /goodsCommit.json' : {
    status:1,
    data: "修改成功"
  },
  'POST /goodsInfo.json' : {
    status:1,
    data:{
      id: 45,
      intro: "sdfsdfsdf" ,
      name: "545454878" ,
      price: "121元/斤",
      uploadList: [{
        uid:"1",
        name: "xxx.jpg",
        state: "done",
        thumbUrl:"https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png",
        url:"https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png"}]}},

  'POST /oauthCode.json' : {
    "status":1,
    "data":{
      "id":"2",
      "user_id":"1",
      "name":"\u591c\u58f0\u6280\u672f",
      "intro":"1111",
      "phone":"15655656561",
      "address":"\u57ce\u5317\u8def\u82b1\u679c\u5c71",
      "lng":"11.00000","lat":"11.00000",
      "ctime":"11",
      "scope_business":"0",
      uploadList: [{
        uid:"1",
        name: "xxx.jpg",
        state: "done",
        thumbUrl:"https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png",
        url:"https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png"}],}},
  'POST /editShop.json' : {
    "status":1,
    "data":"保存成功"},
  //'POST /oauthCode.json' : {"status":1,data:{}},
  'POST /openShop.json' : {
    "status":1,
    "data":{
      "id":"2",
      "user_id":"1",
      "name":"\u591c\u58f0\u6280\u672f",
      "intro":"1111",
      "phone":"15655656561",
      "address":"\u57ce\u5317\u8def\u82b1\u679c\u5c71",
      "lng":"11.00000","lat":"11.00000",
      "ctime":"11",
      "scope_business":"0",
      uploadList: [{
        uid:"1",
        name: "xxx.jpg",
        state: "done",
        thumbUrl:"https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png",
        url:"https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png"}],}},

};
