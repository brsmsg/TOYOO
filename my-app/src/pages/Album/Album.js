import React, { Component } from 'react';
import styles from './Album.less';
import router from 'umi/router';
import {connect} from 'dva'
import { Timeline, Avatar, Upload, Button, Icon, message } from 'antd';

//命名空间转换
@connect(({ album, }) => ({
    album
}))

export default class Album extends Component {
    componentDidMount(){
        const {dispatch} = this.props;
 
        dispatch({
            type:'album/fetchAlbum',
            payload:{
                user_id: 1,
            }
        });
    }

    render() {
        const{album:{albumList}}=this.props;
        console.log(albumList)
        // const a12=[
        //     {
        //       url: "http://121.199.21.183:8080/upload/1.jpg"
        //     },
        //     {
        //       url: "http://121.199.21.183:8080/upload/2.jpg"
        //     }

        // ]
        return (
            <div className={styles.body}>
                <div className={styles.upload}>
                    {/* <Upload {...props}>
                        <Button size="large">
                            <Icon type="upload" /> Click to Upload
                        </Button>
                    </Upload> */}
                </div>
                <div>
                    <Avatar style={{ marginLeft: 30, verticalAlign: "middle" }} size={80} icon="user"
                        src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1578560114173&di=01ce80031477c40e7758bee4c7fd6c68&imgtype=0&src=http%3A%2F%2Fpic1.zhimg.com%2F50%2Fv2-d5d077f05fdaadf654ab43c85ccd7db2_hd.jpg"
                    />
                    <h style={{ marginLeft: 30, verticalAlign: "middle", fontSize: 50 }}>KANG BAIHAN</h>
                </div>
                <div>

                    <div className={styles.timeLine}>
                        <Timeline>
                            {
                                albumList.map((item)=>{
                                    return(
                                        <Timeline.Item><img className={styles.image} src={item.url}    /></Timeline.Item>
                                    );
                                })
                            }
                        </Timeline>
                    </div>

                </div>
            </div>
        )
    }
};