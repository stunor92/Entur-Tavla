export interface NominatimReverse {
  place_id: number;
  license: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  display_name: string;
  address: {
    highway?: string;
    road?: string;
    village?: string;
    municipality?: string;
    city?: string;
    city_district?: string;
    suburb?: string;
    county: string;
    'ISO3166-2-lvl4': string;
    postcode: string;
    country: string;
    country_code: string;
  };
  boundingbox: {
    0: string;
    1: string;
    2: string;
    3: string;
  };
}
