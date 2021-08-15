import { CarouselProvider, Slide, Slider } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import React from "react";
import home from "../css/home.module.css";

const items = [
  "https://images.unsplash.com/photo-1621452773781-0f992fd1f5cb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=626&q=80",
  "https://images.unsplash.com/photo-1577877777751-3f1ec20a0715?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=615&q=80",
  "https://images.unsplash.com/photo-1497169345602-fbb1a307de16?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80",
  "https://images.unsplash.com/photo-1603140841883-07975d34dd9f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
  "https://images.unsplash.com/photo-1602542165989-999c53234fdd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
  "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
];

const Carouse = () => {
  return (
    <div className={home.carouse}>
      <CarouselProvider
        totalSlides={6}
        visibleSlides={1.2}
        isPlaying={true}
        naturalSlideWidth={100}
        naturalSlideHeight={125}
        dragEnabled={true}
        infinite={true}
        //   hasMasterSpinner={true}
      >
        <Slider>
          <Slide>
            <div className={home.space}>
              {" "}
              <img src={items[0]} alt="" className={home.img} />
            </div>
          </Slide>
          <Slide>
            <div className={home.space}>
              {" "}
              <img src={items[1]} alt="" className={home.img} />
            </div>
          </Slide>
          <Slide>
            <div className={home.space}>
              {" "}
              <img src={items[2]} alt="" className={home.img} />
            </div>
          </Slide>
          <Slide>
            <div className={home.space}>
              {" "}
              <img src={items[3]} alt="" className={home.img} />
            </div>
          </Slide>
          <Slide>
            <div className={home.space}>
              {" "}
              <img src={items[4]} alt="" className={home.img} />
            </div>
          </Slide>
          <Slide>
            <div className={home.space}>
              {" "}
              <img src={items[5]} alt="" className={home.img} />
            </div>
          </Slide>
        </Slider>
      </CarouselProvider>
    </div>
  );
};

export default Carouse;
