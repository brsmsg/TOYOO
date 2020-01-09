import React, { Component } from 'react';
import Link from 'umi/link';
import router from 'umi/router';
import { connect } from 'dva';
import styles from './MyWorldMap.less';
import { Input, Modal, Button, Avatar, Icon, message } from 'antd';

@connect(({ }) => ({

}))

export default class MyWorldMap extends Component {
  state = { visible: false,attention_visible:false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    message.success("添加成功！");
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  //添加注意事项
  addAttention = () => {
    this.setState({
      attention_visible: true,
    });
  }

  //点击确认添加注意事项
  onClickOk = e => {
    message.success("添加成功！");
    this.setState({
      attention_visible: false,
    });
  };


  onClickCancel = e => {
    this.setState({
      attention_visible: false,
    });
  };

  componentDidMount() {
    //行程中照片集对应的gps经纬度
    const points = [
      {
        longitude: 113.7,
        latitude: 30,
        url: "http://121.199.21.183:8080/upload/2.jpg",
      },
      {
        longitude: 114,
        latitude: 30,
        url: "http://121.199.21.183:8080/upload/3.jpg",
      },
      {
        longitude: 115,
        latitude: 31,
        url: "http://121.199.21.183:8080/upload/4.jpg",
      },
      {
        longitude: 114.7,
        latitude: 31,
        url: "http://121.199.21.183:8080/upload/1.jpg",
      },
    ];

    const { BMap, BMAP_STATUS_SUCCESS } = window
    //批量逆地址解析----根据精度和维度获取城市名称
    // 百度地图API功能
    var map = new BMap.Map("allmap");
    map.centerAndZoom(new BMap.Point(114, 30), 10);
    map.enableScrollWheelZoom(true);
    var index = 0;
    var myGeo = new BMap.Geocoder();
    var adds = [
      new BMap.Point(points[0].longitude, points[0].latitude),
      new BMap.Point(points[1].longitude, points[1].latitude),
      new BMap.Point(points[2].longitude, points[2].latitude),
      new BMap.Point(points[3].longitude, points[3].latitude)
    ];
    for (var i = 0; i < adds.length; i++) {
      var marker = new BMap.Marker(adds[i]);
      map.addOverlay(marker);
      //-40，-60设置图片在地图标记点上方显示
      var mylabel = new BMap.Label("", { offset: new BMap.Size(-40, -60) })

      //获取图片所在的城市名称
      var pt = adds[index];
      index++;

      if (index < adds.length - 1) {
        setTimeout(window.bdGEO, 400);
      }

      myGeo.getLocation(pt, function (rs) {
        var addComp = rs.addressComponents;
        console.log(rs.addressComponents); //city城市 district县级
      });

      mylabel.setStyle({
        //任意CSS样式都行
        "background-image": "url(" + points[i].url + ")",
        "background-repeat": "no-repeat",
        "background-size": "100%",
        "width": "100px",
        "height": "58px",
        "border": "none",
      })
      //label添加点击事件
      mylabel.addEventListener("click", function () {
        //点击label跳转到相应地点的相册
        console.log("点击label图片啦")
        router.push(`/PlaceAlbum`);
      });
      marker.setLabel(mylabel);
    }

      //调用函数，求所有点的中间点
      var mid=this.getMid(points);

      //调用百度地图api绘制带方向的路径
      map.centerAndZoom(new BMap.Point(mid.x,mid.y), 10);  // 初始化地图,设置中心点坐标和地图级别
      map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
      var sy = new BMap.Symbol(BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW, {
        scale: 0.6,//图标缩放大小
        strokeColor:'#fff',//设置矢量图标的线填充颜色
        strokeWeight: '2',//设置线宽
      });
      var icons = new BMap.IconSequence(sy, '10', '30');
      // 创建polyline对象 利用之前定好的图片经纬度位置的数组
      var polyline =new BMap.Polyline(adds, {
        enableEditing: false,//是否启用线编辑，默认为false
        enableClicking: true,//是否响应点击事件，默认为true
        icons:[icons],
        strokeWeight:'8',//折线的宽度，以像素为单位
        strokeOpacity: 0.8,//折线的透明度，取值范围0 - 1
        strokeColor:"#FF1111" //折线颜色
      });
      
      map.addOverlay(polyline);          //增加折线

  }


  //求给定点数组的中间点坐标
  getMid(points)
  {
    var i = 0;
    var mid={
      x:0,
      y:0
    }
    for(i=0;i<points.length;i++)
    {
      mid.x = mid.x+points[i].longitude;
      mid.y = mid.y+points[i].latitude;
    }

    mid.x=mid.x/points.length;
    mid.y=mid.y/points.length;

    return mid;
  }

  goHomePage = () => {
    //返回首页
    router.push(`/HomePage`);
  }

  render() {
    return (
      <div>
        <div id="allmap" style={{ position: "absolute", width: "100%", height: "100%" }}></div>
        <div style={{ position: "absolute", right: 0, padding: 10 }}>
          <div>
            <Button type="link" onClick={(e) => { this.showModal(e) }}>
              <Avatar style={{ backgroundColor: 'rgba(236,225,223,0.75)', width: 60, height: 60, margin: 10 }} src="http://121.199.21.183:8080/upload/plus.png" />
            </Button>
            <Avatar style={{ width: 60, height: 60, margin: 10 }} src="https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=612723378,2699755568&fm=111&gp=0.jpg" />
            <Avatar style={{ width: 60, height: 60, margin: 10 }} src="https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=378824344,1185609431&fm=26&gp=0.jpg" />
            <Avatar style={{ width: 60, height: 60, margin: 10 }} src="https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=807400438,1244204492&fm=111&gp=0.jpg" />
            <Avatar style={{ width: 60, height: 60, margin: 10 }} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1578560114173&di=01ce80031477c40e7758bee4c7fd6c68&imgtype=0&src=http%3A%2F%2Fpic1.zhimg.com%2F50%2Fv2-d5d077f05fdaadf654ab43c85ccd7db2_hd.jpg" />
            <div>
              <Modal
                title="请输入新成员的邮箱"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
              >
                <Input placeholder="请输入该成员的邮箱"/>
              </Modal>
            </div>
          </div>
        </div>
        <div>
            <Button type="link" onClick={(e) => { this.goHomePage() }}>
              <Avatar style={{ backgroundColor: 'rgba(0,0,0,0.5)', width: 60, height: 60, margin: 10 }} src="http://121.199.21.183:8080/upload/back.png" />
            </Button>
        </div>
        <div className={styles.attention}>
            <div style={{color:"white",fontSize:18,  borderBottom:"solid 1px white",paddingBottom:8}}>今日事项</div>
            <div className={styles.attentionItem}>南方天气比较冷，带点厚衣服</div>
            <div className={styles.attentionItem}>南方天气比较冷，带点厚衣服</div>
            <div className={styles.attentionItem}>南方天气比较冷，带点厚衣服</div>
            <Icon style={{ fontSize: '25px', color: '#fff',float:"left",paddingLeft:"10%",paddingTop:"5%" }} type="plus-circle" onClick={this.addAttention}/>
        </div>
        <Modal
                title="请输入添加的注意事项"
                visible={this.state.attention_visible}
                onOk={this.onClickOk}
                onCancel={this.onClickCancel}
              >
                <Input placeholder="请输入添加的注意事项"/>
              </Modal>
      </div>
    );
  }
}