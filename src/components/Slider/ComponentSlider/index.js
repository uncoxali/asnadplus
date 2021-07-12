import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "./style.css";
import Zoom from "react-img-zoom";

import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import InnerImageZoom from "react-inner-image-zoom";

export default ({ props, data }) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [gallery, setGallery] = React.useState(true);

  const images = data?.data.attachments;

  const [sliderRef, slider] = useKeenSlider({
    initial: 0,
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide);
    },
  });

  const image = [
    {
      img: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg",
    },
    {
      img: "https://cdn.pixabay.com/photo/2021/05/29/07/06/shiba-6292660__340.jpg",
    },
    {
      img: "https://cdn.pixabay.com/photo/2021/06/06/09/04/bridge-6314795__340.jpg",
    },
  ];

  return (
    <>
      <div className="container">
        <div className="">
          <div className="navigation-wrapper w-100" dir="ltr">
            <div ref={sliderRef} className="keen-slider">
              {images?.map((item) => (
                <div
                  key={item}
                  className={`keen-slider__slide number-slide zoom-image`}
                >
                  <InnerImageZoom
                    className=" h-auto"
                    src={item.url}
                    moveType="drag"
                  />
                  {/* <Zoom
                    img={item.url}
                    zoomScale={1.5}
                    width={1200}
                    height={400}
                    transitionTime={0.5}
                  /> */}
                </div>
              ))}

              {/* {image.map((item) => (
                <div
                  key={item.img}
                  className={`keen-slider__slide number-slide zoom-image`}
                >
                  <Zoom
                    img={item.img}
                    zoomScale={1.5}
                    width={900}
                    height={400}
                    transitionTime={0.5}
                  />
                </div>
              ))} */}
            </div>
            {slider && (
              <>
                <ArrowLeft
                  onClick={(e) => e.stopPropagation() || slider.prev()}
                  disabled={currentSlide === 0}
                />
                <ArrowRight
                  onClick={(e) => e.stopPropagation() || slider.next()}
                  disabled={currentSlide === slider.details().size - 1}
                />
              </>
            )}
          </div>
          {slider && (
            <div className="dots mt-2 " dir="ltr">
              <div className="flex">
                {/* {
                  ([...Array(slider.details().size).keys()],
                  image?.map((item, idx) => (
                    <img
                      key={idx}
                      src={item.img}
                      width="80px"
                      height="60px"
                      onClick={() => {
                        slider.moveToSlideRelative(idx);
                      }}
                      className={
                        currentSlide === idx
                          ? " border border-info h-100 border-5 p-0"
                          : ""
                      }
                    />
                  )))
                } */}
                {
                  ([...Array(slider.details().size).keys()],
                  images?.map((item, idx) => (
                    <img
                      key={idx}
                      src={item.url}
                      width="80px"
                      height="60px"
                      onClick={() => {
                        slider.moveToSlideRelative(idx);
                      }}
                      className={
                        currentSlide === idx
                          ? " border border-info h-100 border-5 p-0"
                          : ""
                      }
                    />
                  )))
                }
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

function ArrowLeft(props) {
  const disabeld = props.disabled ? " arrow--disabled" : "";
  return (
    <svg
      onClick={props.onClick}
      className={"arrow arrow--left" + disabeld}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
    </svg>
  );
}

function ArrowRight(props) {
  const disabeld = props.disabled ? " arrow--disabled" : "";
  return (
    <svg
      onClick={props.onClick}
      className={"arrow arrow--right" + disabeld}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
    </svg>
  );
}
