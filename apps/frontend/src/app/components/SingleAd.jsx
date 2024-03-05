import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Link from 'next/link';
import Image from 'next/image';

import styles from '../index.module.scss';

const SingleAd = ({ title, city, price, thumbnail, id }) => {
  const [isLiked, setIsLiked] = useState(localStorage.getItem(id));

  const addToFavourite = (event) => {
    event.preventDefault();
    if (!localStorage.getItem(id)) {
      localStorage.setItem(id, 'liked');
    } else {
      localStorage.removeItem(id);
    }
    setIsLiked(!isLiked);
  };

  return (
    <Link href={`/ads/${id}`}>
      <div className={styles.adCard}>
        <Image
          className={styles.adImg}
          src={thumbnail}
          alt={title}
          width={250}
          height={150}
          priority
        />
        <div className={styles.adDescr}>
          <p>{title}</p>
          <IconButton aria-label="delete" size="large" onClick={addToFavourite}>
            <FavoriteBorderIcon color={isLiked ? 'warning' : 'inherit'} />
          </IconButton>
        </div>
        <div className={styles.adDescr}>
          <p>{city}</p>
          <span>{price}</span>
        </div>
      </div>
    </Link>
  );
};

export default SingleAd;
