import DefaultHeader from "@/components/common/DefaultHeader";

import MobileMenu from "@/components/common/mobile-menu";

import PropertyFilteringMapFive from "@/components/listing/map-style/map-v4/PropertyFilteringMapFive";

import React from "react";

import MetaData from "@/components/common/MetaData";

const metaInformation = {
  title: "Map V4 || Homez - Real Estate ReactJS Template",
};

const MapV4 = () => {
  return (
    <>
    <MetaData meta={metaInformation} />
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}
      <PropertyFilteringMapFive/>

   
      {/* Property Filtering */}
    </>
  );
};

export default MapV4;
