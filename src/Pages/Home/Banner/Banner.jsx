import React from 'react';
import slide1 from "../../../Assets/Cash-on-delivary-banner.png";
import slide2 from "../../../Assets/Home-delivary-banner.png";
import slide3 from "../../../Assets/Returns_and_Exchanges.png";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Banner = () => {

    const images = [
        {
            image: slide1,
        },
        {
            image: slide2,
        },
        {
            image: slide3,
        }
    ]

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    return (
        <div className='mb-10'>
            <Carousel responsive={responsive}>
                {
                    images.map((image, index) =>
                    <img className='w-full rounded-2xl' key={index} src={image.image} alt="" />
                    )
                }
            </Carousel>
        </div>
    );
};

export default Banner;