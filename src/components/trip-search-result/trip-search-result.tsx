import React from "react";
import './trip-search-result.scss';
import {Typography} from "antd";
import {HotelSearchResult} from "../../services/hotel-search.types";
import {siteMapping} from "../../sites/site-data";
import dayjs from "dayjs";
import _first from 'lodash/first';
import HotelCard from "../hotel-card/hotel-card";

interface Props {
    searchResult: HotelSearchResult
}
const dateFormat = 'MMM D'
const TripSearchResult: React.FC<Props> = ({searchResult}) => {
    const groupSize = _first(searchResult.groupSizeRange);

    return (
        <div className="trip-search-result">
            <Typography.Title level={2}>Select your ski trip</Typography.Title>
            <Typography.Text>
                {searchResult.hotels.length} ski trips options &bull; {" "}
                {siteMapping.get(searchResult.site)} &bull; {" "}
                {dayjs(searchResult.startDate).format(dateFormat)} - {dayjs(searchResult.endDate).format(dateFormat)} &bull; {" "}
                {groupSize} {groupSize === 1 ? 'person' : 'people' }
            </Typography.Text>

            <div>
                {searchResult.hotels.map(hotel => <HotelCard key={hotel.code} hotel={hotel} />)}
            </div>
        </div>
    );
}

export default TripSearchResult;