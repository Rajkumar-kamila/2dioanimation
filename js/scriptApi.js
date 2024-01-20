// fetch("https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=&order=date&type=video&maxResults=1&key=")
// .then((result)=>{
//     return result.json()
// }).then((data)=>{
//     console.log(data)
//     let videos = data.items
//     let videoContainer = document.querySelector(".youtube-container")
//     for(video of videos){
//         videoContainer.innerHTML += `
//         <img src="${video.snippet.thumbnails.high.url}">
//         `
//     }
// })


document.addEventListener('DOMContentLoaded', function() {
    getLatestVideos();
    });

    function getLatestVideos() {
    // Replace 'UCC9TWrD2caWM1Xf1SptHlmw' with your actual channel ID
    var channelId = 'UCC9TWrD2caWM1Xf1SptHlmw';
    var apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&type=video&maxResults=6&key=AIzaSyCnEUWHYeLUE9CuRiTwdYClUf9Nx73i2B4`;

    fetch(apiUrl)
       .then(response => {
          if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
       })
       .then(data => {
          if (data.items && data.items.length > 0) {
          displayVideos(data.items);
          } else {
          throw new Error('No videos found for the channel.');
          }
       })
       .catch(error => console.error('Error fetching YouTube data:', error));
    }

    function displayVideos(videos) {
    var container = document.getElementById('video-container2');

    if (!container) {
       console.error('Error: Container element not found.');
       return;
    }

    var row = document.createElement('div');
    row.classList.add('row');

    videos.forEach(video => {
       var col = document.createElement('div');
       col.classList.add('col-xl-4', 'col-md-4');

       var article = document.createElement('article');
       article.classList.add('pbmit-service-style-1');

       var postItem = document.createElement('div');
       postItem.classList.add('pbminfotech-post-item');

       var iframe = document.createElement('iframe');
       iframe.src = `https://www.youtube.com/embed/${video.id.videoId}`;
       iframe.title = 'YouTube video player';
       iframe.frameBorder = '0';
       iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
       iframe.allowFullscreen = true;

       postItem.appendChild(iframe);
       article.appendChild(postItem);
       col.appendChild(article);
       row.appendChild(col);
    });

    container.appendChild(row);
    }

