import DefaultHeader from "@/components/common/DefaultHeader";
import MobileMenu from "@/components/common/mobile-menu";

import PropertyFilteringMapFour from "@/components/listing/map-style/map-v3/PropertyFilteringMapFour";

import React from "react";

import MetaData from "@/components/common/MetaData";

const metaInformation = {
  title: "Map V3 || Homez - Real Estate ReactJS Template",
};

const MapV3 = () => {
  return (
    <>
    <MetaData meta={metaInformation} />
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* start  filter sidebar */}
      <PropertyFilteringMapFour/>
   
      {/* Property Filtering */}
    </>
  );
};

export default MapV3;
