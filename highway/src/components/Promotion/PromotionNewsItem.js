import React from 'react';
import newsList from '../../utils/NewsDummyData';
import {Link} from 'react-router-dom';
import { Image, List } from 'antd';

const PromotionNewsItem = () => {
    return (
        <List
        itemLayout="horizontal"
        dataSource={newsList}
        renderItem={(item) => (
          <List.Item>
            <Image preview={false} width={277} height={122} src={item.src} />
            <List.Item.Meta
              title={<Link to={`/promotion/news/${item.newsId}`}>{item.newsTitle}</Link>}
              description={item.newsContent}
            />
          </List.Item>
        )}
      />
    );
};

export default PromotionNewsItem;