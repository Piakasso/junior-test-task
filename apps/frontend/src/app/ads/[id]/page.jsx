'use client';

import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { CircularProgress, IconButton } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { fetchDetails } from '../../../utils';
import Carousel from './components/Carousel';
import styles from '../../index.module.scss';
import 'react-toastify/dist/ReactToastify.css';

const DetailsAd = () => {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [detailsInfo, setDetailsInfo] = useState(null);
  const [isLiked, setIsLiked] = useState(localStorage.getItem(id));

  const router = useRouter();

  const addToFavourite = (event) => {
    event.preventDefault();
    if (!localStorage.getItem(id)) {
      localStorage.setItem(id, 'liked');
    } else {
      localStorage.removeItem(id);
    }
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    fetchDetails(id)
      .then((data) => {
        if (data === '') {
          router.push('/');
        } else {
          setDetailsInfo(data);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        toast.error(error.message, {
          autoClose: 1000,
        });
      });
  }, [id, router]);

  return (
    <div className={styles.detailsPage}>
      <ToastContainer />
      {isLoading ? (
        <CircularProgress className={styles.loader} />
      ) : (
        <>
          <div className={styles.adImgBlock}>
            <Carousel img={detailsInfo.images} />
          </div>
          <div className={styles.adDescr}>
            <span>{detailsInfo.title}</span>
            <span>
              <IconButton
                aria-label="delete"
                size="large"
                onClick={addToFavourite}
              >
                <FavoriteBorderIcon color={isLiked ? 'warning' : 'inherit'} />
              </IconButton>
            </span>
          </div>
          <div className={styles.adDescr}>
            <span>
              {detailsInfo.city_name}, {detailsInfo.district_name}
            </span>
            <span>{detailsInfo.price}</span>
          </div>
          <p>{detailsInfo.description}</p>
        </>
      )}
    </div>
  );
};

export default DetailsAd;
