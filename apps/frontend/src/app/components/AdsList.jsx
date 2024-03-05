'use client';

import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { IconButton, Skeleton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

import SingleAd from './SingleAd';
import FiltersButton from './FiltersButton';
import { fetchData } from '../../utils';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../index.module.scss';

const AdsList = () => {
  const [list, setList] = useState([]);
  const [filters, setFilters] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const handleSubmit = (values) => {
    setFilters(values);
  };

  const resetFilters = () => {
    setFilters({});
  };

  useEffect(() => {
    fetchData({
      filters,
    })
      .then((data) => {
        setIsLoading(false);
        setList(data.results);
      })
      .catch((error) => {
        toast.error(error.message, {
          autoClose: 1000,
        });
      });
  }, [filters]);

  const skeletonLists = Array.from({ length: 20 }, (_, index) => (
    <Skeleton key={index} variant="rounded" width={250} height={270} />
  ));

  return (
    <div>
      <div className={styles.adsTitle}>
        <h1>List of ads</h1>
        <FiltersButton handleSubmit={handleSubmit} />
        <IconButton aria-label="delete" onClick={resetFilters}>
          <ClearIcon />
        </IconButton>
      </div>
      <ToastContainer />
      <div className={styles.AdsList}>
        {isLoading
          ? skeletonLists
          : list.map((ad) => (
              <SingleAd
                title={ad.title}
                city={ad.city_name}
                price={ad.price}
                key={ad.id}
                thumbnail={ad.images[0].image || ''}
                id={ad.id}
              />
            ))}
      </div>
    </div>
  );
};

export default AdsList;
