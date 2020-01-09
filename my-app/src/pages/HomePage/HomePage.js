import React, { Component } from 'react';
import styles from './HomePage.less';
import { Avatar, Progress, Card, Icon, Modal,Input,message } from 'antd';
import router from 'umi/router';

export default class HomePage extends Component {
    state = { visible: false };

    showModal = () => {
        this.setState({
        visible: true,
        });
    };

    handleOk = e => {
        message.success("添加成功！快去相册上传图片吧！");
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

    map = () => {
        router.push('/MyWorldMap')
    }

    album = () => {
        router.push('/Album')
    }

    

    render() {
        return (
            <div className={styles.body}>
                <div className={styles.left_box}>
                    <div style={{ marginTop: 20, marginLeft: 50 }}>
                        <Avatar style={{ verticalAlign: "middle" }} size={80} icon="user"
                         src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1578560114173&di=01ce80031477c40e7758bee4c7fd6c68&imgtype=0&src=http%3A%2F%2Fpic1.zhimg.com%2F50%2Fv2-d5d077f05fdaadf654ab43c85ccd7db2_hd.jpg"/>
                        <h style={{ marginLeft: 30, verticalAlign: "middle", fontSize: 50, color: "white" }}>
                            KANG BAIHAN
                        </h>
                    </div>
                    <div className={styles.distance}>
                        <p style={{ textAlign: "center", fontSize: 25, color: "white" }}>今天你已跨越13km</p>

                        <div>
                            <Progress percent={30} strokeWidth={20} status="active" />
                        </div>
                        <span style={{ color: "white", fontSize:20}}>目标跨越</span>
                        <span style={{ float: "right", color: "white", fontSize:20}}>50km</span>
                    </div>


                    <Card className={styles.card_1}>
                        <Icon type="clock-circle" style={{ float: "left", color:"white", fontSize:100}} />
                        <p style={{ textAlign: "center", fontSize: 20, color: "white" }}>你已经在TOYOO上行走了</p>
                        <p style={{ textAlign: "center", verticalAlign: "middle", fontSize: 30, color: "white" }}>
                            128分钟
                        </p>

                    </Card>

                    <Card className={styles.card_2}>
                        <p style={{ color: "white" }} >
                            <time>2019·12·31</time>
                            <br />
                            用ant design pro框架做的项目，打包之后每一个页面加载的速度都特别慢，在.webpackrc里面配置了ignoreMomentLocale: true, disableDynamicImport: false, 进行按需加载还是运行速度缓慢
    浏览器加载时有个js加载了1s多，打包了以后的js也很大. 请教一下大家，怎么做一下打包优化，还有页面性能的问题
                    </p>
                    </Card>
                </div>

                <div className={styles.right_box}>

                    <Card className={styles.map}
                        title="My World Map"
                        hoverable="true"
                        onClick={this.map}
                        cover={<img src="http://121.199.21.183:8080/upload/map.png"/>}>

                    </Card>

                    <Card className={styles.map}
                        title="My Album"
                        hoverable="true"
                        onClick={this.album}
                        cover = {<img src="http://121.199.21.183:8080/upload/MyAlbum.png"/>}>
                        
                    </Card>

                    <Card className={styles.map} hoverable="true" onClick={this.showModal}>
                        <p style={{ fontSize: 50, marginTop:18, color:"blue", textAlign:"center" }}>
                            <Icon type="plus-circle" className={styles.button} />
                            添加行程
                        </p>    

                    </Card>
                </div>
                <Modal
                title="请输入行程目的地"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
              >
                <Input placeholder="城市名"/>
              </Modal>
            </div>
        )
    }
};