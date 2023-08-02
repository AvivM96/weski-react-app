import React from "react";
import {Hotel} from "../../services/hotel-search.types";
import './hotel.scss';
import {Typography} from "antd";

interface Props {
    hotel: Hotel
}

const HotelCard: React.FC<Props> = ({hotel}) => {
    // const coverImage = hotel.images.find(image => image.cover) || _first(hotel.images); // api images not working
    return (
        <div className="hotel-card">
            <div className="hotel-card-cover-image" style={{backgroundImage: `url(https://powderwhite.com/_next/image?url=https%3A%2F%2Fproductionskapit.blob.core.windows.net%2Fskapit-skapit-public%2Fimages%2Flocationimages%2Fmanual%2FDCEE8059-80DC-4FDD-8B9B-2BFA40C6E2C8.jpg%3F638265848023829867&w=1920&q=75)`}} />
            <div className="hotel-card-content">
                <Typography.Title level={4}>{hotel.name}</Typography.Title>
                <Typography.Text className= "hotel-card-details">Rating: {hotel.rating}</Typography.Text>
                <Typography.Text className= "hotel-card-details">Location: {hotel.location.nearBy[0].name}</Typography.Text>
                {/*maybe divide by how many persons*/}
                <Typography.Text className="hotel-card-details">Price: &#163; {hotel.priceBeforeTax}</Typography.Text>
            </div>
        </div>
    );
}

export default HotelCard;