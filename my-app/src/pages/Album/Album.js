import React, { Component } from 'react';
import styles from './Album.less';
import router from 'umi/router';
import { Timeline, Avatar, Upload, Button, Icon, message } from 'antd';

const props = {
    name: '123.png',
    action: 'http://121.199.21.183:8080/upload',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

export default class Album extends Component {
    render() {
        return (
            <div className={styles.body}>
                <div className={styles.upload}>
                    <Upload {...props}>
                        <Button size="large">
                            <Icon type="upload" /> Click to Upload
                        </Button>
                    </Upload>
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
                            <Timeline.Item><img className={styles.image} src="http://121.199.21.183:8080/upload/1.jpg" /></Timeline.Item>
                            <Timeline.Item><img className={styles.image} src="http://121.199.21.183:8080/upload/2.jpg" /></Timeline.Item>
                            <Timeline.Item><img className={styles.image} src="http://121.199.21.183:8080/upload/3.jpg" /></Timeline.Item>
                            <Timeline.Item><img className={styles.image} src="http://121.199.21.183:8080/upload/4.jpg" /></Timeline.Item>
                        </Timeline>

                    </div>

                </div>
            </div>
        )
    }
};