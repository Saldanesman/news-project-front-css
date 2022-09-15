import axios from 'axios';
import  React, { useNavigate } from 'react-router-dom';

// Import CSS
import './NewsCard.css';

// Import for alerts styles
import Swal from 'sweetalert2';


export const NewsCard = ({news}) => {

  // boolean constant to determine the drawing of the buttons
  const inArchivedNews = window.location.href.includes('/archivednews');

  const navigate = useNavigate();


  // Function to archive news
  function archiveNews(news) {

    const currentDate = new Date();

    var archivedNewsForm = {
      title: news.title,
      description: news.description,
      date: news.date,
      content: news.content,
      author: news.author,
      idNews: news.idNews,
      archivedDate: currentDate.toLocaleDateString()
    };

    axios.post('/api/new/archivednews', archivedNewsForm)
    .then(res => {
      Swal.fire('Nice!', 'News successfully added to the ARCHIVED list');
      navigate('/');
    })
    .then(err => {
      console.log(err);
    });

    axios.post('/api/new/deletearchivednews', {idNews: news.idNews}).then( res => {
      navigate(0);
    }).catch(err => {
      console.log(err);
    });
  };

  // Function to delete news
  function deleteNews(idNews) {
    axios.post('/api/new/deletenews', {idNews: idNews}).then( res => {
      navigate(0);
      Swal.fire('Nice!', 'News successfully deleted to the list');
    }).catch(err => {
      console.log(err);
    });
  };

  return (
    <div className={"container"}>
      <div className={"title"}>
        {news.title}
      </div>
      <div className={"info-buttons"}>
        <div className={"author"}>
          {news.author}
        </div>
        <div className={"date"}>
          {news.date}
        </div>
      </div>
      <div className={"description"}>
        {news.description}
      </div>
      <div className={"content"}>
        {news.content}
      </div>
      {inArchivedNews &&
        <div className={"archived-date"}> 
          Archived Data: {news.archivedDate} 
        </div>
      }
      <div className={'buttons'}>
        {!inArchivedNews &&
          <button className={'archive-button'} onClick={() => archiveNews(news)}> Archive </button>
        }
        {inArchivedNews &&
          <button className={'delete-button'} onClick={() => {deleteNews(news.idNews)}}> Delete </button>
        }
      </div>
    </div>
  );
};

