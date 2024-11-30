import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";

import PropertyFilteringBanner from "@/components/listing/grid-view/banner-search-v1/PropertyFilteringBanner";

import React from "react";

import MetaData from "@/components/common/MetaData";

const metaInformation = {
  title: "Banner Search V1 || Homez - Real Estate ReactJS Template",
};

const BannerSearchV1 = () => {
  return (
    <>
    <MetaData meta={metaInformation} />
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* Home Banner Style V1 */}
      <PropertyFilteringBanner/>
      {/* Property Filtering */}

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default BannerSearchV1;
