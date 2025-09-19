import type { TourDetailData } from './types';

// Import all tour details statically to ensure they are included by the bundler.
import { tourDetail as itAmalfi1 } from './tour-details/it-amalfi-1';
import { tourDetail as itTuscany1 } from './tour-details/it-tuscany-1';
import { tourDetail as itUmbria1 } from './tour-details/it-umbria-1';
import { tourDetail as vnBike1 } from './tour-details/vn-bike-1';
import { tourDetail as vnHanoi1 } from './tour-details/vn-hanoi-1';
import { tourDetail as vnMekong1 } from './tour-details/vn-mekong-1';
import { tourDetail as vnMocchau1 } from './tour-details/vn-mocchau-1';
import { tourDetail as defaultTour } from './tour-details/default';

// Create a map of the imported tour details for easy lookup.
const tourDetailsMap: Record<string, TourDetailData> = {
  'it-amalfi-1': itAmalfi1,
  'it-tuscany-1': itTuscany1,
  'it-umbria-1': itUmbria1,
  'vn-bike-1': vnBike1,
  'vn-hanoi-1': vnHanoi1,
  'vn-mekong-1': vnMekong1,
  'vn-mocchau-1': vnMocchau1,
};

/**
 * Retrieves tour detail data by its ID.
 * This function is async to maintain compatibility with the component that calls it,
 * even though the data lookup is now synchronous.
 * @param id The ID of the tour to retrieve.
 * @returns A Promise that resolves to the TourDetailData.
 */
export async function getTourDetailById(id: string): Promise<TourDetailData> {
    const tourData = tourDetailsMap[id];

    if (!tourData) {
        console.warn(`Tour with id '${id}' not found. Falling back to default.`);
        return Promise.resolve(defaultTour);
    }
    
    return Promise.resolve(tourData);
}
