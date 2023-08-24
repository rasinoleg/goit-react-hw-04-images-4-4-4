import React, { useState, useEffect } from 'react';
import Searchbar from '../components/Searchbar/Searchbar';
import ImageGallery from '../components/ImageGallery/ImageGallery';
import Button from '../components/Button/Button';
import Loader from '../components/Loader/Loader';
import { getImages } from '../Api/Api';
import Modal from '../components/Modal/Modal';

export function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  const changeQuery = newQuery => {
    setQuery(newQuery);
    setPage(1);
    setHasLoaded(false);
  };

  const openModal = data => {
    setShowModal(true);
    setModalData(data);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalData(null);
  };

  const fetchImages = async () => {
    setLoading(true);

    try {
      const data = await getImages({ query, page });
      setImages(prevImages => (page === 1 ? data.hits : [...prevImages, ...data.hits]));
      setHasLoaded(true);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    if (query === '') {
      return;
    }

    const fetchAndSetImages = async () => {
      await fetchImages();
    };

    fetchAndSetImages();
  }, [query, page]);

  return (
    <div>
      <Searchbar onSubmit={changeQuery} />
      <ImageGallery images={images} onClickImage={openModal} />
      {loading && <Loader />}
      {hasLoaded && <Button onClick={handleLoadMore} />}
      <div id="modal-root">
        {showModal && <Modal image={modalData} onClose={closeModal} />}
      </div>
    </div>
  );
}

export default App;





