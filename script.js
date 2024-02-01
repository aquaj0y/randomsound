const apiKey = '47edfd3289e7fef8424cfccaa16adf82'
const audioApiKey = '523532'

console.log('working')
/////////////////////////////////////
//// Query DOM elements
// Home Page
const searchBtn = document.querySelector('#search-btn')
const searchInput = document.querySelector('#search-input')

const artistsResult = document.querySelector('.artists')
const albumsResult = document.querySelector('.album')
const albumNoResult = document.querySelector('#album-no-result')



const slide = document.querySelector('.slide')



// Track Page
const trackResultEl = document.querySelector('#track')
const trackNameEl = document.querySelector('#track-name')
const artistNameEl = document.querySelector('#artist-name')
const albumNameEl = document.querySelector('#album-name')
const albumCoverEl = document.querySelector('#album-cover')
const trackListEl = document.querySelector('#track-list')

///////////////////////////////////
//// Event Listeners

// On load
document.addEventListener('DOMContentLoaded', getHighlightAlbums) 

// Key Press
searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const searchValue = document.querySelector('#search-input').value

    getArtistTopSongs(searchValue)
    getData(searchValue)
    getArtistName(searchValue)
    getAlbums(searchValue)
  }
})

// Search Button Click
searchBtn.addEventListener('click', () => {
  if (searchInput.value) {

    getArtistTopSongs(searchValue)
    getData()
    getArtistName(searchValue)
    getAlbums(searchValue)
  }
})


///////////////////////////////////
//// Functions

async function getData(searchValue) {
  // const searchValue = document.querySelector('#search-input').value

  // Return Artist details from artist name
  // let artistResponse = await axios.get(`https://theaudiodb.com/api/v1/json/523532/search.php?s=${searchValue}`)
  
  // // Return all Album details from artist name
  // let artistAlbumsResponse = await axios.get(`theaudiodb.com/api/v1/json/523532/searchalbum.php?s=${searchValue}`)

  // // Song Search Result
  // // let songResponse = await axios.get(`theaudiodb.com/api/v1/json/{APIKEY}/searchtrack.php?s=coldplay&t=yellow`)

  // // Country Search Result
  // let countryResponse = await axios.get(`http://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=${searchValue}&api_key=47edfd3289e7fef8424cfccaa16adf82&format=json`)

  // console.log('this is response', artistResponse)
}

async function getHighlightAlbums() {
  let response = await axios.get(`https://theaudiodb.com/api/v1/json/523532/trending.php?country=us&type=itunes&format=albums`)
  let albumsArr = response.data.trending;
  
  albumsArr.forEach((album, index) => {
    let albumCover = album.strAlbumThumb
    slide.innerHTML += `<div class="numbertext">${index+1} / ${albumsArr.length}</div>
    <img src='${album.strAlbumThumb}' style="width: 100%" />`;
    // console.log(album.strAlbumThumb)
    // console.log('index is:', index)
  })
}

async function getArtistName(searchValue) {
  // if returns a value
  let artistResponse = await axios.get(`https://theaudiodb.com/api/v1/json/523532/search.php?s=${searchValue}`)
  let artistNameArr = artistResponse.data.artists

  // if return value is null
  if (artistResponse.data.artists === null) {
    artistsResult.innerHTML = `
    <h3>Artists</h3>
    <p>No Results</p>`
  } else {
    artistNameArr.forEach((artist) => {
      // if the artist result is one or more, try 'John Williams' return two artists
      artistsResult.innerHTML += `
      <div class="artist">
        <img id='search-profile' src="${artist.strArtistThumb}" alt="artist profile picture" />
        <div class="artist-name">${artist.strArtist}</div>
      </div>`
      // console.log(artist.strArtistThumb)
      // console.log(artist.strArtist)
    })
  }
}

async function getArtistTopSongs(searchValue) {
  let topSongs = await axios.get(`https://theaudiodb.com/api/v1/json/523532/track-top10.php?s=${searchValue}`)

  let song = topSongs.data.track
  let songResults = document.querySelector('#song-results')
  if (song === null) {
    songResults.classList.toggle('hidden')
  }
  console.log('top songs', topSongs)
}

async function getAlbums(searchValue) {
  let artistAlbumsResponse = await axios.get(`https://theaudiodb.com/api/v1/json/523532/searchalbum.php?s=${searchValue}`)

  let albumsArr = artistAlbumsResponse.data.album
  
  if (artistAlbumsResponse.data.album === null) {
    albumNoResult.classList.toggle('hidden')
  } else {
    albumsArr.forEach((album) => {
      albumsResult.innerHTML += `
      <img src="${album.strAlbumThumb}" alt="album cover" />
      <div class="album-name">${album.strAlbum}</div>
      <div class="artist-name">${album.strArtist}</div>
      <p>Herrrro</p>
      `
      // console.log(album)
    })
  }
}

  // async function getData() {
//   try {
//     let response = await axios.get(`https://theaudiodb.com/api/v1/json/523532/search.php?s=adele`)
//     console.log(response)

//   } catch (error) {
//     console.error('Error is: ', error)
//   }
// }
















// function getTrackInfo(response) {
//   let trackName = response.data.track.name
//   let trackArtist = response.data.track.album.artist
//   trackNameEl.textContent = trackName;
//   artistNameEl.textContent = trackArtist;
//   // console.log('track name dom element', trackNameEl)
//   console.log(trackName)  
//   console.log(trackArtist)  
// }

// function getAlbumInfo(response, albumResponse) {
//   // Album Name
//   let albumName = response.data.track.album.title
//   albumNameEl.textContent = albumName;
  
//   // Album Cover
//   let albumCover = response.data.track.album.image[2]['#text']
//   albumCoverEl.setAttribute('src', `${albumCover}`)

//   // Track List
//   let trackListArr = albumResponse.data.album.tracks.track
//   trackListArr.forEach((element) => {
//     trackListEl.innerHTML += `<li>${element['@attr'].rank}. ${element.name}</li>`
//     console.log(element['@attr'].rank)
//     console.log(element.name)
//   })

//   // console.log(albumName)  
//   // console.log(albumCover)  
//   // console.log(trackListArr)
// }

// function showResult() {
  
// }