
import React, { useState, useEffect } from 'react';
import './App.css';
import Modal from './Components/Modal';
import Backdrop from './Components/Backdrop'
import axios from 'axios'

function App() {
  let [isOpen, setOpen] = useState(false)
  let [url, setUrl] = useState()
  let [pageNumber, setPageNumber] = useState(1)
  let [photos, setPhotos] = useState([])
  let [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getSetPhotos()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
    // eslint-disable-next-line
  }, [pageNumber])



  const handleScroll = () => {
    if (window.scrollY + window.innerHeight > document.body.offsetHeight) {
      setPageNumber(prevPageNumber => {
        return (prevPageNumber + 1)
      })
      getSetPhotos()

    }
  }

  const getSetPhotos = () => {
    setIsLoading(true)
    axios.get(`https://api.unsplash.com/photos?page=${pageNumber}&per_page=10&client_id=ktp-gAVLAe3zzt-4aPEvFAElC52Y0_ndtifiYKvo3-M`)
      .then(res => {
        setIsLoading(false)
        let rawPhotos = res.data.map(photo => photo.urls.regular)
        setPhotos(prevPhotos => { return [...new Set([...prevPhotos, ...rawPhotos])] })
      })
  }

  const findIndex = (url) => {
    return photos.indexOf(url)
  }

  const clicked = (e) => {
    e.preventDefault()
    setOpen(isOpen = true)
    setUrl(e.target.src)
  }

  const onClose = (e) => {
    setOpen(false)
  }

  const clickNext = () => {
    setUrl(photos[findIndex(url) + 1])

  }

  const clickPrevious = () => {
    findIndex(url) > 0 && setUrl(photos[findIndex(url) - 1])
  }

  const handleOnKeyDown = e => {
    if (e.key === 'Escape') {
      onClose()
      e.preventDefault()
    }
    else if (e.key === 'ArrowLeft') {
      clickPrevious()
      e.preventDefault()
    }
    else if (e.key === 'ArrowRight') {
      clickNext()
      e.preventDefault()
    }
  }

  return (<>

    <div className="feed"
      onKeyDown={(e) => handleOnKeyDown(e)}
      tabIndex={0}
    >
      <div className="img">
        {photos.map(photo => (
          <img
            key={photo}
            src={photo}
            alt="Good"
            onClick={(e) => clicked(e)}
          />))}
      </div>
    </div>
    <Modal show={isOpen}
      src={url}
      close={(e) => onClose(e)}
      next={() => clickNext()}
      previous={() => clickPrevious()}
    />
    <Backdrop show={isOpen} backdropClicked={(e) => onClose(e)} />
    {isLoading && <div>Loading...</div>}
  </>
  )
}

export default App;
