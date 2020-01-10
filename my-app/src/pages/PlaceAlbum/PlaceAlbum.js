import React, { Component } from 'react';
import styles from './PlaceAlbum.less';
import { Avatar, Progress, Card, Icon, Skeleton, Button } from 'antd';
import router from 'umi/router';
import { connect } from 'dva';

@connect(({ trip,user }) => ({
    trip,
    user
}))

export default class PlaceAlbum extends Component {
    back = () => {
        router.push("/MyWorldMap")
    }

    album = (user_id) => {
        console.log(user_id)
        const{dispatch} = this.props;
        dispatch({
            type: 'user/savePlaceUserId',
            payload:  user_id,   
        })
        router.push("/PlaceAlbumDetail")
    }

    render() {
        const { trip: { tripInfo , place_record} } = this.props;

        return (
            <div className={styles.body}>
                <Button type="link" onClick={(e) => { this.back() }}>
                    <Avatar style={{ backgroundColor: 'rgba(0,0,0,0.5)', width: 60, height: 60, margin: 10 }} src="http://121.199.21.183:8080/upload/back.png" />
                </Button>
                <div className={styles.text}>
                    <p style={{ fontSize: 70, color: "white", fontWeight: 500 }}>Welcome to</p>
        <p style={{ fontSize: 70, color: "white", fontWeight: 1000 }}>{place_record}</p>
                </div>
                <div style={{ overflowX: "scroll" }}>
                    <div style={{ width: "999%" }}>
                        {
                            tripInfo.userList.map((item)=>{
                                return(<Card className={styles.member}
                                    hoverable="true"
                                    onClick={()=>{this.album(item.user_id)}}
                                    >
                                    <Card.Meta
                                        avatar={<Avatar size={100} src={item.avatar} />}
                                        title={<div style={{ fontSize: 50 }}>{item.nick_name}</div>}
                                    />
                                </Card>)
                            })
                        }
                        
                    </div>
                </div>
            </div>
        )
    }
}