


import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function MetaData({meta}) {
  return (
    <HelmetProvider>
      <Helmet>

        <title>{meta?.title}</title>
      </Helmet>
    </HelmetProvider>
  )
}
