'use client';

import React from 'react';

import styles from './index.module.scss';
import AdsList from './components/AdsList';

export default function Index() {
  return (
    <div className={styles.container}>
      <AdsList />
    </div>
  );
}
