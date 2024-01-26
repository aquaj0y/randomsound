const apiKey = '47edfd3289e7fef8424cfccaa16adf82'

document.addEventListener('DOMContentLoaded', function () {
  axios.get("http://ws.audioscrobbler.com/2.0/?method=user.getTopArtists&user=test&api_key=47edfd3289e7fef8424cfccaa16adf82&limit=10&format=json")
  .then(response => {
      let html = '';
      response.data.topartists.artist.forEach(item => {
          html += `<p><a href="${item.url}" target="_blank">${item.name} - Play count: ${item.playcount}</a></p>`;
      });
      document.getElementById('result').innerHTML = html;
  })
  .catch(error => console.error('Error:', error));
});
