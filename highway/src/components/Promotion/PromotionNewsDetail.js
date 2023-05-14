import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import newsList from "../../utils/NewsDummyData"
import { Image } from 'antd';

const PromotionNewsDetail = () => {

    const location = useLocation();
    // news테이블이 없기에 임시방편으로 세워둠
    const text = window.location.href;
    const url = parseInt(text.replace("http://localhost:3000/promotion/news/",""));
    console.log(url)
    const test = newsList.map((it)=>{
        if(it.newsId === url){
        return(
            <div key={it.newsId}>
                <div><Image width={753} height={424} preview={false} src={it.src}/></div>
                <div>{it.newsTitle}</div>
                <div>{it.newsContent}</div>
            </div>
        )
        }
    })
    return (
        <div>
            {test}
            <div>
                <Link to={`http://localhost:3000/promotion/news/${url-1}`}><button>이전</button></Link>
                <Link to={`http://localhost:3000/promotion/news/`}><button>목록으로</button></Link>
                <Link to={`http://localhost:3000/promotion/news/${url+1}`}><button>다음</button></Link>
            </div>
        </div>
    );
};

export default PromotionNewsDetail;