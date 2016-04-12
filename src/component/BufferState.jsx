

let instance = null;
export default class BufferState{
  constructor() {
    if (!instance) { instance = this; }
    this.time = new Date()
    this.bufferState = new Map();
    return instance;
  }

  setShopInfo(info){
    this.bufferState.set('shopInfo',info);
  }

  getShopInfo(){
    return this.bufferState.get('shopInfo');
  }
}
