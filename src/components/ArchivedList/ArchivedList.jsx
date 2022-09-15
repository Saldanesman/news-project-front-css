import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { NewsCard } from '../NewsCard/NewsCard';

// Import CSS
import './ArchivedList.css';


const ArchivedList = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    axios.get('api/new/getnews').then(res => {
      setNewsData(res.data);
    }).catch(err => {
      console.log(err);
    })
  }, []);

  //Mapping archived news list in news objects
  const newsArchivedList = newsData.map((news) => {
    const dateExist = news.archivedDate !== null ? true : false;
    return (
      <div>
        {dateExist &&
          <NewsCard news={news}/>
        }
      </div>
    );
  });

  return (
    <div className={'container-archived-news'}>
      <h1 className={"title-archived-news_news"}> Archived </h1>
      <h1 className={"title-archived-news_archived"}> News </h1>
      {newsArchivedList}
    </div>
  )
}

export default ArchivedList