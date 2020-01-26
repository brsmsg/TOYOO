import React, { Component } from 'react';
import styles from './PlaceAlbumDetail.less';
import router from 'umi/router'
import { Button, Avatar, Card } from 'antd'
import { connect } from 'dva'

@connect(({ album, user,trip }) => ({
    album,
    user,
    trip
}))

export default class PlaceAlbumDetail extends Component {
    componentDidMount() {
        const { dispatch, user:{user_record}, trip:{place_record}} = this.props;

        dispatch({
            type: 'album/fetchPlaceAlbum',
            payload: {
                user_id: user_record.user_id,
                shoot_place: place_record,
            }
        });

        dispatch({
            type: 'user/fetchUser'
        })
    }

    back = () => {
        router.push("/PlaceAlbum")
    }

    render() {
        const { album: { albumList }, user: { user_record,currentUser } } = this.props;
        const imp = "旅行，只需要一颗安静的心和不停的脚步，不停地遇见，不停地思考，不停地流逝自己的思想，不停地更新自己的记忆。我是在旅行，孤独是自我，却思考着我的灵魂。"
        return (
            <div className={styles.body}>
                <div style={{ marginLeft: 100 }}>
                    <Button type="link" style={{ float: "left" }} onClick={(e) => { this.back() }}>
                        <Avatar style={{ backgroundColor: 'rgba(0,0,0,0.5)', width: 60, height: 60, margin: 10 }} src="http://121.199.21.183:8080/upload/back.png" />
                    </Button>
                    <div style={{ marginTop: 30, marginLeft: 30, fontSize: 50, color: "white" }}>
                        {user_record.nick_name}'S TRIP
                    </div>
                    <div style={{ marginLeft: 30, marginTop: 30, float: "left" }}>
                        <div>
                            {
                                (albumList||[]).map((item, i) => {
                                    if (i <= 3) {
                                        return (
                                            <img className={styles.image} src={item.url} />
                                        );
                                    }
                                })
                            }
                        </div>
                    </div>
                    <div style={{ marginLeft: 30, marginTop: 30, float: "left" }}>
                        <div>
                            {
                                (albumList||[]).map((item, i) => {
                                    if (i > 3 && i <= 7) {
                                        return (
                                            <img className={styles.image} src={item.url} />
                                        );
                                    }
                                })
                            }
                        </div>
                    </div>
                    <div style={{ marginTop: "22%" }}>
                        <img src="http://121.199.21.183:8080/upload/about.png" />
                        <Card className={styles.card}>
                            <p style={{ color: "white", fontSize: 20 }}>
                                {imp}
                            </p>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}