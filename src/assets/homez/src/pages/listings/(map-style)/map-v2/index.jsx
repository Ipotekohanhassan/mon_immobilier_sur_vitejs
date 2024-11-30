import DefaultHeader from "@/components/common/DefaultHeader";

import MobileMenu from "@/components/common/mobile-menu";

import PropertyFilteringThree from "@/components/listing/map-style/map-v2/PropertyFilteringThree";

import React from "react";

import MetaData from "@/components/common/MetaData";

const metaInformation = {
  title: "Map V2 || Homez - Real Estate ReactJS Template",
};

const MapV2 = () => {
  return (
    <>
    <MetaData meta={metaInformation} />
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}
            {/* Property Filtering */}
      <PropertyFilteringThree/>

     
      {/* Property Filtering */}
    </>
  );
};

export default MapV2;
