import React, {useState} from "react";
import { ReactComponent as WeSkiLogo} from '../../icons/weski-logo.svg';
import './trip-search-bar.scss';
import Select from "../select/select";
import Button from "../button/button";
import dayjs, {Dayjs} from "dayjs";
import {siteData} from "../../sites/site-data";
import DatePicker from "../date-picker/date-picker";
import {Spin} from "antd";

export type TripSearch = {
    site: number;
    startDate: Dayjs;
    endDate: Dayjs;
    groupSize: number;
}

const dateFormat = 'YYYY/MM/DD';

const getDefaultSearch = (): TripSearch => ({
    site: 1,
    startDate: dayjs(dayjs().toISOString(), dateFormat),
    endDate: dayjs(dayjs().add(1, 'day').toISOString(), dateFormat),
    groupSize: 2
})


interface Props {
    onSearch: (search: TripSearch) => void;
    loading?: boolean;
}

const TripSearchBar: React.FC<Props> = ({ onSearch, loading }) => {
    const [search, setSearch] = useState<TripSearch>(getDefaultSearch());

    const onSiteChange = (site: number) => {
        setSearch(search => ({...search, site}))
    }

    const onGroupChange = (groupSize: number) => {
        setSearch(search => ({...search, groupSize}))
    }

    const onDateChange = (range: (Dayjs | null)[] | null) => {
        if (!range) {
            return;
        }

        const [startDate, endDate] = range;
        if (!startDate || !endDate) {
            return;
        }

        setSearch(search => ({...search, startDate, endDate}))
    }

    return (
        <div className="trip-search-bar">
            <WeSkiLogo />

            <div className="search-dropdowns">
                <Select onChange={onSiteChange} value={search.site} options={siteData.map(site => ({label: site.name, value: site.id}))}/>
                <Select
                    onChange={onGroupChange}
                    value={search.groupSize}
                    options={Array.from({length: 10}).map((_, index) =>
                        ({label: `${index + 1} ${index === 0 ? 'person' : 'people'}`, value: index + 1}))}
                />
                <DatePicker onChange={onDateChange} value={[search.startDate, search.endDate]} format={"MMM D"}/>
            </div>

            <Button onClick={() => onSearch(search)}>Search</Button>

            { loading && <Spin className="trip-search-bar-loader" /> }
        </div>
    );
}

export default TripSearchBar;