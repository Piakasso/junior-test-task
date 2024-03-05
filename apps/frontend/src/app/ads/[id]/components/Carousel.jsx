import React, { useState } from 'react';
import Image from 'next/image';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { IconButton } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import styles from '../../../index.module.scss';

export default function Carousel({ img }) {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep >= img.length - 1) {
      setActiveStep(0);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep === 0) {
      setActiveStep(img.length - 1);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  return (
    <div className={styles.carousel}>
      <div>
        <Image
          src={img[activeStep].image}
          alt={img[activeStep].id}
          width={400}
          height={400}
          priority
        />
      </div>

      <IconButton
        className={styles.leftButton}
        size="large"
        onClick={handleBack}
        sx={{ position: 'absolute' }}
      >
        <ChevronLeftIcon fontSize="large" />
      </IconButton>

      <IconButton
        size="large"
        className={styles.rightButton}
        onClick={handleNext}
        sx={{ position: 'absolute' }}
      >
        <ChevronRightIcon fontSize="large" />
      </IconButton>
    </div>
  );
}
