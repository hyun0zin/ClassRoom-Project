'use client';
//yarn add embla-carousel
//yarn add embla-carousel-autoplay
import React, { useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import ClassCard from './ClassCard';
import { EmblaOptionsType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useLatestClassInfoStore } from '@/store/classInfoStore';
import { getLatestClassInfo } from '@/app/api/mainpage/getClassAllInfo';
import style from './emblaCarousel.module.css';

export const dynamic = 'force-dynamic';

const LatestClass = () => {
  const { LatestClassInfos, setLatestClassInfos } = useLatestClassInfoStore();
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: 'start' }, [Autoplay({ delay: 3000 })]);

  //카드들이 제대로 나오지 않는 경우가 있는 경우 방지

  useEffect(() => {
    if (embla && LatestClassInfos.length > 0) {
      embla.reInit();
    }
  }, [embla, LatestClassInfos]);

  useEffect(() => {
    const fetchClassInfo = async () => {
      const infos = await getLatestClassInfo();
      setLatestClassInfos(infos);
    };

    fetchClassInfo();
  }, [setLatestClassInfos]);

  return (
    <div className="flex w-full flex-col">
      <div className="ml-2 w-full">
        <p className="px-2 pb-1 text-xl">클룸 신규 클래스 🎉</p>
      </div>
      <div className={`${style.embla} mt-2 w-full overflow-hidden`} ref={emblaRef}>
        <div className={style.embla__container}>
          {LatestClassInfos.map((infos) => (
            <div className={style.embla__slide} key={infos.class_id}>
              <ClassCard classInfos={infos} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestClass;
