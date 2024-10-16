import {http, HttpResponse} from 'msw';

import {END_POINT} from '@/constants/endPoint';
import {DB} from '@/db/db';
import {TripData} from '@/types';
import {
  calculateTotalTripDistance,
  formatDailyRoutes,
  measureExecutionTime,
  planTrip,
} from '@/util/tripOptimizer';

export const handlers = [
  http.get(END_POINT.place.regions, () => {
    return HttpResponse.json(DB.region, {});
  }),

  http.get(END_POINT.place.place, () => {
    return HttpResponse.json(DB.place, {});
  }),

  http.get(END_POINT.place.course, () => {
    return HttpResponse.json(DB.course, {});
  }),

  http.get(END_POINT.place.cafe, () => {
    return HttpResponse.json(DB.cafe, {});
  }),

  http.get(END_POINT.place.cityCode, () => {
    return HttpResponse.json(DB.cityCode, {});
  }),

  http.get(END_POINT.search.addPlace, ({request}) => {
    const url = new URL(request.url);
    const searchQuery = url.searchParams.get('searchQuery');
    const type = url.searchParams.get('type');

    if (!searchQuery) {
      const filterTye = DB.searchPlace.filter((place) => {
        return place.type === type;
      });
      return HttpResponse.json(type === 'all' ? DB.searchPlace : filterTye);
    }

    const filteredPlaces = DB.searchPlace.filter((place) => {
      const matchesQuery = place.name.includes(searchQuery);
      const matchesType = type === 'all' || place.type === type;
      return matchesQuery && matchesType;
    });

    return HttpResponse.json(filteredPlaces);
  }),

  http.get(END_POINT.search.addStay, ({request}) => {
    const url = new URL(request.url);
    const searchQuery = url.searchParams.get('searchQuery');
    const type = url.searchParams.get('type');

    if (!searchQuery) {
      const filterTye = DB.searchStay.filter((stay) => {
        return stay.type === type;
      });
      return HttpResponse.json(type === 'all' ? DB.searchStay : filterTye);
    }

    const filteredPlaces = DB.searchStay.filter((place) => {
      const matchesQuery = place.name.includes(searchQuery);
      const matchesType = type === 'all' || place.type === type;
      return matchesQuery && matchesType;
    });

    return HttpResponse.json(filteredPlaces);
  }),

  http.post(END_POINT.trip.optimizeTrip, async ({request}) => {
    const data = (await request.json()) as TripData;
    const {attractions, accommodations, region, title, startDate, endDate} =
      data;

    const optimizedTrip = planTrip(attractions, accommodations);
    const totalTripDistance = calculateTotalTripDistance(optimizedTrip);
    const totalExecutionTime = measureExecutionTime(
      attractions,
      accommodations,
    );
    const formattedRoutes = formatDailyRoutes(optimizedTrip);

    return HttpResponse.json({
      id: 1,
      optimizedTrip,
      formattedRoutes,
      totalTripDistance: totalTripDistance.toFixed(2),
      totalExecutionTime: totalExecutionTime.toFixed(2),
    });
  }),

  http.get(END_POINT.myPage.plan, () => {
    return HttpResponse.json(
      // NOTICE: 원래는 db에서 사용자의 여행계획을 가져와야함
      JSON.parse(sessionStorage.getItem('OTMP') as string),
      {},
    );
  }),
];
