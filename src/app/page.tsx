import Newsletter from "@/components/layout/pages/home/Newsletter";
import Swiper from "@/components/layout/pages/home/swiper";
import React from "react";

export default function Page() {
  return (
    <React.Fragment>
      <div>
        <Swiper />
        <Newsletter />
      </div>
    </React.Fragment>
  )
}
