document.addEventListener('DOMContentLoaded', function () {
  // Get the current tab's URL
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const tab = tabs[0];
    const url = tab.url;

    // Display the URL in the popup
    const urlElement = document.getElementById('url');
    urlElement.textContent = url;

    // Extract the problem name from the URL
    const problemName = extractProblemNameFromURL(url);

    // If a problem name is found, search YouTube for related videos
    if (problemName) {
      searchYouTubeVideos(problemName);
      // displayResults(problemName);
    }
  });

  function extractProblemNameFromURL(url) {
    // Parse the URL to extract the problem name (assuming LeetCode URL format)
    const urlParts = url.split('/');
    const problemNameIndex = urlParts.indexOf('problems') + 1;
    if (problemNameIndex < urlParts.length) {
      return urlParts[problemNameIndex];
    }
    return null; // Return null if the problem name couldn't be extracted
  }

  function searchYouTubeVideos(query) {
    // const pn = document.getElementById('pname');
    // pn.innerHTML=`<p>${problemName}</p>`;
    const apiKey = "AIzaSyAElG2xW7N24c6JpTHQcTgXpx6pQprdSVo"; // Replace with your YouTube API key
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&type=video&q=${query}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        displayResults(data.items);
      })
      .catch(error => {
        console.error('Error:', error);
        displayErrorMessage('Failed to fetch YouTube videos.');
      });
  }
  function displayResults(videos) {
    

    const videoContainer = document.getElementById('video-container');
  
    if (videos.length === 0) {
      displayErrorMessage('No videos found.');
      return;
    }
  
    // Clear any existing content in the video container
    videoContainer.innerHTML = '';
  
    videos.forEach(video => {
      const videoId = video.id.videoId;
      const videoTitle = video.snippet.title;
  
      // Create a div to hold each embedded YouTube player
      const videoElement = document.createElement('div');
      videoElement.className = 'video-container'; // Add a CSS class for styling
  
      // Create an iframe for the YouTube video
      const youtubePlayer = document.createElement('iframe');
      youtubePlayer.src = `https://www.youtube.com/embed/${videoId}`;
      youtubePlayer.width = 560;
      youtubePlayer.height = 315;
      youtubePlayer.title = videoTitle;
      youtubePlayer.frameborder = 0;
      youtubePlayer.allowfullscreen = true;
  
      // Append the iframe to the video container
      videoElement.appendChild(youtubePlayer);
      videoContainer.appendChild(videoElement);
    });
  
    // Show the video container
    videoContainer.style.display = 'block';
  }
  
  

  function displayErrorMessage(message) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `<p>${message}</p>`;
  }
});
