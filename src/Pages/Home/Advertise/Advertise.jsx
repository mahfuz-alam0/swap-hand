import React from 'react';
import Carousel from 'react-multi-carousel';
import ProductModal from '../Products/ProductModal';
import AdvertiseSingle from './AdvertiseSingle';

const Advertise = ({ advertises }) => {

    const [modal, setModal] = React.useState(null);
    const [payment, setPayment] = React.useState(false);
    const [transectionId, setTransectionId] = React.useState(null);

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    return (
        <div className='mb-5'>
            <div>
                <h2 className='text-5xl text-center my-10 underline'>Advertise</h2>
                <Carousel responsive={responsive}>
                    {
                        advertises?.map(item => <AdvertiseSingle setModal={setModal} key={item._id} advertises={item} />)
                    }
                </Carousel>
            </div>
            {
                modal && <ProductModal product={modal} setModal={setModal} />
            }
        </div>
    );
};

export default Advertise;