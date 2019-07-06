// pages/index/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Good:'加载中···',
    //当前题号
    Question:0,
    //获取的物品和答案
    GoodsAndAnswers:new Array(),
    //用户答案
    UserAnswers:new Array(),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    //请求服务器，返回题目以及答案
    wx.request({
      url: 'https://www.mfengye.xin/GetGoodsAndAnswers.php',
      data: {},
      method: 'POST',
      header: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      success: function (res) {
        for(let i in res.data)
        {
          that.data.GoodsAndAnswers.push(res.data[i]);
        }
        that.setData({
          Good: that.data.GoodsAndAnswers[that.data.Question].Good,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 用户选择图片
   */
  ClickImage:function(event){
    var that=this;
    that.data.UserAnswers.push(event.currentTarget.dataset.answer);
    if(that.data.UserAnswers.length>=10){
      //弹出结果
      this.setData({
        GoodsAndAnswers:that.data.GoodsAndAnswers,
        UserAnswers:that.data.UserAnswers,
        isRuleTrue: true
      })
    }
    else{
      //下一题
      that.data.Question+=1;
      that.setData({
        Good: that.data.GoodsAndAnswers[that.data.Question].Good,
        Question:that.data.Question
      })
    }
  },
  /**
   * 点击重新开始
   */
  RePlay:function(){
    var that=this;
    that.onLoad();
    that.setData({
      Good: '加载中···',
      //当前题号
      Question: 0,
      //获取的物品和答案
      GoodsAndAnswers: new Array(),
      //用户答案
      UserAnswers: new Array(),
      isRuleTrue:false
    });
  }
})
