import React, { Component } from 'react';
import styles from './PlaceAlbumDetail.less';
import router from 'umi/router'
import { Button, Avatar, Card } from 'antd'

export default class PlaceAlbumDetail extends Component {
    back = () => {
        router.push("/PlaceAlbum")
    }

    render() {
        return (
            <div className={styles.body}>
                <div style={{marginLeft:100}}>
                <Button type="link"  style ={{float: "left"}}onClick={(e) => { this.back() }}>
                    <Avatar style={{ backgroundColor: 'rgba(0,0,0,0.5)', width: 60, height: 60, margin: 10 }} src="http://121.199.21.183:8080/upload/back.png" />
                </Button>
                <div style={{ marginTop: 30, marginLeft: 30, fontSize:50, color:"white"}}>
                    KANG BAIHAN'S TRIP
                </div>
                <div style={{marginLeft:30, marginTop:30,float:"left"}}>
                    <div>
                    <img className={styles.image} src="http://121.199.21.183:8080/upload/1.jpg" />
                    <img className={styles.image} src="http://121.199.21.183:8080/upload/2.jpg" />
                    <img className={styles.image} src="http://121.199.21.183:8080/upload/3.jpg" />
                    <img className={styles.image} src="http://121.199.21.183:8080/upload/4.jpg" />
                    </div>
                </div>
                <div style={{marginLeft:30, marginTop:30, float:"left"}}>
                    <div>
                    <img className={styles.image} src="http://121.199.21.183:8080/upload/1.jpg" />
                    <img className={styles.image} src="http://121.199.21.183:8080/upload/2.jpg" />
                    <img className={styles.image} src="http://121.199.21.183:8080/upload/3.jpg" />
                    <img className={styles.image} src="http://121.199.21.183:8080/upload/4.jpg" />
                    </div>
                </div>

                <div style={{float:"left"}}>
                    <img src="http://121.199.21.183:8080/upload/about.png"/>
                    <Card className={styles.card}>
                    <p style={{color:"white", fontSize:20}}>
                    用ant design pro框架做的项目，打包之后每一个页面加载的速度都特别慢，在.webpackrc里面配置了ignoreMomentLocale: true, disableDynamicImport: false, 进行按需加载还是运行速度缓慢
    浏览器加载时有个js加载了1s多，打包了以后的js也很大. 请教一下大家，怎么做一下打包优化，还有页面性能的问题
                    </p>
                    </Card>
                </div>
                </div>
            </div>
        )
    }
}