import React from 'react'
import Flickity from 'react-flickity-component'
import './flickity.css'

const Carousel: React.FC<{ images: string[] }> = ({ images }) => {
    return (
        <Flickity className='carousel' options={{ setGallerySize: false }}>
            <img src={"https://media.activechristianity.org/2016/12/The-Grace-that-is-in-Chris-Jesus-table-of-content.jpg"} alt="" />
            {images.map(item => <img className='carousel-cell' key={item} src={item} />)}
        </Flickity>

    )
}

export default Carousel