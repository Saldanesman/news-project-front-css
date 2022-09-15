import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { NewsCard } from '../NewsCard/NewsCard';

// Import CSS
import './NewsList.css';


const NewsList = () => {

  const [newsData, setNewsData] = useState([]);
  
  useEffect(() => {
    axios.get('api/new/getnews').then(res => {
      setNewsData(res.data);
    }).catch(err => {
      console.log(err);
    })
  }, []);

  // Sorted news list
  const sortedNews = newsData.slice().sort((a, b) => a.date - b.date);
  console.log(sortedNews.map(x => x.title + ' ---- ' + x.date));
  //Mapping news list in news objects


  const newsList = newsData.map((news) => {
    const dateNotExist = news.archivedDate === null ? true : false;
    return (
      <div>
        {dateNotExist &&
          <NewsCard news={news}/>
        }
      </div>
    );
  });

  return (
      <div className={'container-news-list'}>
        <h1 className={"title-news-list_news"}> News </h1>
        <h1 className={"title-news-list_list"}> list </h1>
        {newsList}
      </div>
  );
};

export default NewsList;