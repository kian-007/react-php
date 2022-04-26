import React, {useEffect, useRef} from "react";
import Slider from "react-slick";
import { PROJECT_URL } from "../../config/general";
import Image from "../images/image";
import './slideshow.css';



const ReactSlick = ({ item }) => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const slide = useRef(null)

    useEffect(() => {
        slide.current.classList.add("active")
    },[])


    return (
        <div className="slideshow" ref={slide}>
            {/* <h2> Single Item</h2> */}
            <Slider {...settings}>
                {/* {item.map((item) =>
                    <div>
                        <Image imageSrc={`${PROJECT_URL}/images/${item.image}`} />
                    </div>
                )} */}

                <div>
                    <img src={`${PROJECT_URL}/images/fantasy/mir15.jpg`} />
                </div>
                <div>
                    <img src={`${PROJECT_URL}/images/beauty/rimmel8.jpg`} />
                </div>
                <div>
                    <img src={`${PROJECT_URL}/images/beauty/brushes.jpg`} />
                </div>


            </Slider>
        </div>
    );
}

export default ReactSlick;