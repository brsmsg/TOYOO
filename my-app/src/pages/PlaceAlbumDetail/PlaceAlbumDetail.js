import React, { Component } from 'react';
import styles from './PlaceAlbumDetail.less';
import router from 'umi/router'
import { Button, Avatar, Card } from 'antd'
import { connect } from 'dva'

@connect(({ album, user }) => ({
    album,
    user,
}))

export default class PlaceAlbumDetail extends Component {
    componentDidMount() {
        const { dispatch } = this.props;

        dispatch({
            type: 'album/fetchPlaceAlbum',
            payload: {
                user_id: 1,
                shoot_place: "wuhan",
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
        const { album: { albumList }, user: { currentUser } } = this.props;
        return (
            <div className={styles.body}>
                <div style={{ marginLeft: 100 }}>
                    <Button type="link" style={{ float: "left" }} onClick={(e) => { this.back() }}>
                        <Avatar style={{ backgroundColor: 'rgba(0,0,0,0.5)', width: 60, height: 60, margin: 10 }} src="http://121.199.21.183:8080/upload/back.png" />
                    </Button>
                    <div style={{ marginTop: 30, marginLeft: 30, fontSize: 50, color: "white" }}>
                        {currentUser.nick_name}'S TRIP
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
                                {currentUser.content}
                            </p>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}