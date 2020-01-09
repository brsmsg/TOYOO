import React, { Component } from 'react';
import styles from './HomePage.less';
import { Avatar, Progress, Card, Icon, Modal, Input, message } from 'antd';
import router from 'umi/router';
import { connect } from 'dva'

@connect(({ user }) => ({
    user
}))

export default class HomePage extends Component {
    componentDidMount() {
        const { dispatch } = this.props;

        dispatch({
            type: 'user/fetchUser',
            payload: {  
                user_id: 1
            }
        });
    }

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
        const { user: { currentUser } } = this.props;
        const distance_percent = currentUser.current_distance / currentUser.distance * 100
        
        console.log(distance_percent)
        return (
            <div className={styles.body}>
                <div className={styles.left_box}>
                    <div style={{ marginTop: 20, marginLeft: 50 }}>
                        {currentUser.Avatar}
                        <Avatar style={{ verticalAlign: "middle" }} size={80} icon="user"
                            src={currentUser.avatar} />
                        <h style={{ marginLeft: 30, verticalAlign: "middle", fontSize: 50, color: "white" }}>
                            {currentUser.nick_name}
                        </h>
                    </div>
                    <div className={styles.distance}>
                        <p style={{ textAlign: "center", fontSize: 25, color: "white" }}>今天你已跨越{currentUser.current_distance}km</p>

                        <div>
                            <Progress percent={distance_percent} strokeWidth={20} status="active" />
                        </div>
                        <span style={{ color: "white", fontSize: 20 }}>目标跨越</span>
                        <span style={{ float: "right", color: "white", fontSize: 20 }}>{currentUser.distance}km</span>
                    </div>


                    <Card className={styles.card_1}>
                        <Icon type="clock-circle" style={{ float: "left", color: "white", fontSize: 100 }} />
                        <p style={{ textAlign: "center", fontSize: 20, color: "white" }}>你已经在TOYOO上行走了</p>
                        <p style={{ textAlign: "center", verticalAlign: "middle", fontSize: 30, color: "white" }}>
                            {currentUser.total_time}分钟
                        </p>

                    </Card>

                    <Card className={styles.card_2}>
                        <p style={{ color: "white" }} >
                            {currentUser.created_time}
                            <br />
                            {currentUser.content}
                        </p>
                    </Card>
                </div>

                <div className={styles.right_box}>

                    <Card className={styles.map}
                        title="My World Map"
                        hoverable="true"
                        onClick={this.map}
                        cover={<img src="http://121.199.21.183:8080/upload/map.png" />}>

                    </Card>

                    <Card className={styles.map}
                        title="My Album"
                        hoverable="true"
                        onClick={this.album}
                        cover={<img src="http://121.199.21.183:8080/upload/MyAlbum.png" />}>

                    </Card>

                    <Card className={styles.map} hoverable="true" onClick={this.showModal}>
                        <p style={{ fontSize: 50, marginTop: 18, color: "blue", textAlign: "center" }}>
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
                    <Input placeholder="城市名" />
                </Modal>
            </div>
        )
    }
};