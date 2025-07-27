'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function JobImageSlider({ images, title }) {
  if (!images || images.length === 0) return null;

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination]}
        className="aspect-video rounded overflow-hidden"
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx} className="w-full h-full">
            <div className="w-full h-full">
              <img
                src={`https://admin.hrpostingpartner.com/storage/${img.image_path}`}
                alt={`${title} - image ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
