import {TripSearch} from "../components/trip-search-bar/trip-search-bar";
import axios from "axios";
import {HotelSearchResult} from "./hotel-search.types";

export class HotelSearchService {

    public async search(tripSearch: TripSearch): Promise<{searchId: string}> {
        const hotelSearchRequest = {
            site: tripSearch.site,
            startDate: tripSearch.startDate.format('MM/DD/YYYY'),
            endDate: tripSearch.endDate.format('MM/DD/YYYY'),
            groupSizeRange: [tripSearch.groupSize, Math.min(tripSearch.groupSize + 2, 10)]
        }

        const response = await axios.post(`${this.url}/hotels/search`, hotelSearchRequest)

        return response.data
    }

    public async getSearchResult(searchId: string): Promise<HotelSearchResult> {
        const response = await axios.get(`${this.url}/hotels/search/${searchId}`);
        return response.data
    }


    private get url() {
        return 'http://localhost:3003'
    }
}