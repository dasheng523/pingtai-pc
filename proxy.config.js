
module.exports = {
  'POST /upload.json': {mediaId:'1',status:"ok"},
  'POST /goods.json' : {
    totalCount : 3,
    data:[{
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
    }]},
  'POST /goodsInfo.json' : {id: 45, intro: "sdfsdfsdf" , name: "545454878" , price: "121元/斤", uploadList: [{uid:"1",name: "xxx.jpg", state: "done", thumbUrl:"https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png", url:"https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png"}]}
};
