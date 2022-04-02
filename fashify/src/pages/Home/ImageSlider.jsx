import React from 'react';
import { Carousel } from 'react-responsive-carousel';

export const ImageSlider = () => (
  <Carousel autoPlay showArrows={true} showThumbs={false}>
    <div>
      <img
        alt=''
        src='https://res.cloudinary.com/donqbxlnc/image/upload/v1648837630/fashify/01042022-D-Unisex-topbannercarousel-p2-reebok-3060_d1f2yu.jpg'
      />
    </div>
    <div>
      <img
        alt=''
        src='https://res.cloudinary.com/donqbxlnc/image/upload/v1648837541/fashify/01042022-D-Unisex-topbannercarousel-p4-tops_tees-startingat199_hrdanp.jpg'
      />
    </div>
    <div>
      <img
        alt=''
        src='https://res.cloudinary.com/donqbxlnc/image/upload/v1648837512/fashify/01042022-D-Unisex-topbannercarousel-p3-brands-4090_bwk2pu.jpg'
      />
    </div>
  </Carousel>
);
