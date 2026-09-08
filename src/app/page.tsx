import HomeCard from "@/components/layout/pages/home/HomeCard";
import HomeInformation from "@/components/layout/pages/home/HomeInformation";
import Newsletter from "@/components/layout/pages/home/Newsletter";
import ShopByCategory from "@/components/layout/pages/home/ShopByCategory/ShopByCategory";
import Swiper from "@/components/layout/pages/home/swiper";
import React from "react";
import FeaturedProducts from "@/components/layout/pages/home/FeaturedProducts/FeaturedProducts";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <React.Fragment>
      <div>
        <Swiper />
        <HomeInformation />
        <ShopByCategory />
        <FeaturedProducts/>
        <HomeCard />
        <Newsletter />
      </div>
    </React.Fragment>
  )
}
