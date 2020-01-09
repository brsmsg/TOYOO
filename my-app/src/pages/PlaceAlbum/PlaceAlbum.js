import React, { Component } from 'react';
import styles from './PlaceAlbum.less';
import { Avatar, Progress, Card, Icon, Skeleton,Button } from 'antd';
import router from 'umi/router';
import { connect } from 'dva';

@connect(({ user }) => ({
    user
}))

export default class PlaceAlbum extends Component {
    back = () => {
        router.push("/MyWorldMap")
    }

    album = () => {
        router.push("/PlaceAlbumDetail")
    }

    render() {
        return (
            <div className={styles.body}>
                <Button type="link" onClick={(e) => { this.back() }}>
                    <Avatar style={{ backgroundColor: 'rgba(0,0,0,0.5)', width: 60, height: 60, margin: 10 }} src="http://121.199.21.183:8080/upload/back.png" />
                </Button>
                <div className={styles.text}>
                    <p style={{ fontSize: 70, color:"white", fontWeight:500 }}>Welcome to</p>
                    <p style={{ fontSize: 70, color:"white", fontWeight:1000 }}>光谷， 武汉</p>
                </div>
                <div style={{ overflowX: "scroll" }}>
                    <div style={{ width: "999%" }}>
                        <Card className={styles.member} 
                            hoverable="true"
                            onClick={this.album}>
                            <Card.Meta
                                avatar={<Avatar size={100} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1578560114173&di=01ce80031477c40e7758bee4c7fd6c68&imgtype=0&src=http%3A%2F%2Fpic1.zhimg.com%2F50%2Fv2-d5d077f05fdaadf654ab43c85ccd7db2_hd.jpg"/>}
                                title={<div style={{ fontSize: 50 }}>KANG <br />BAIHAN</div>}
                            />
                        </Card>

                        <Card className={styles.member} hoverable="true">
                            <Card.Meta
                                avatar={<Avatar size={100} src="https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=612723378,2699755568&fm=111&gp=0.jpg"/>}
                                title={<div style={{ fontSize: 50 }}>KANG <br />BAIHAN</div>}
                            />
                        </Card>
                        
                        <Card className={styles.member} hoverable="true">
                            <Card.Meta
                                avatar={<Avatar size={100} src="https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=378824344,1185609431&fm=26&gp=0.jpg"/>}
                                title={<div style={{ fontSize: 50 }}>KANG <br />BAIHAN</div>}
                            />
                        </Card>

                        <Card className={styles.member}>
                            <Card.Meta
                                avatar={<Avatar size={100} src="https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=807400438,1244204492&fm=111&gp=0.jpg"/>}
                                title={<div style={{ fontSize: 50 }}>KANG <br />BAIHAN</div>}
                            />
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}