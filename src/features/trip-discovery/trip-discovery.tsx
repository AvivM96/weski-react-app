import React, {useRef, useState} from "react";
import TripSearchBar, {TripSearch} from "../../components/trip-search-bar/trip-search-bar";
import TripSearchResult from "../../components/trip-search-result/trip-search-result";
import './trip-discovery.scss';
import {HotelSearchResult} from "../../services/hotel-search.types";
import {HotelSearchService} from "../../services/hotel-search.service";
import {message} from "antd";
import _isEmpty from 'lodash/isEmpty';
// usually inits this in central place, and injects to the components through context
const hotelSearchService = new HotelSearchService();

const TripDiscovery: React.FC = () => {
    const [result, setResult] = useState<HotelSearchResult | null>(null);
    const interval = useRef<ReturnType<typeof setInterval> | null>(null);

    const [loading, setLoading] = useState<boolean>(false);

    const onTripSearch = async (search: TripSearch) => {
        try {
            setLoading(true);
            setResult(null);
            if (interval.current) {
                clearInterval(interval.current);
            }

            const result = await hotelSearchService.search(search);
            startSearchPolling(result.searchId);
        } catch (e) {
            message.error('failed searching for hotels')
            setLoading(false);
        }
    }

    const startSearchPolling = (searchId: string) => {
        interval.current = setInterval(() => updateSearchResult(searchId), 1000);
    }

    const updateSearchResult = async (searchId: string) => {
        const result = await hotelSearchService.getSearchResult(searchId);

        if (_isEmpty(result.hotels)) {
            return;
        }

        setResult(result);

        if (result.completed) {
            clearInterval(interval.current as ReturnType<typeof setInterval>);
            setLoading(false)
        }
    }

    return (
        <div className="trip-discovery">
            <TripSearchBar onSearch={onTripSearch} loading={loading} />
            {result && <TripSearchResult  searchResult={result} /> }
        </div>
    );
}

export default TripDiscovery;