<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import Weather from '../components/Weather.svelte';
  import type { YrWeather } from '../types/YrWeather';
  import type { NominatimReverse } from '../types/Nominatim';
  import { locationName } from '../ts/stores';
  import '../css/main.css';


  let LOCATION = { name: 'Bergen', lat: 60.39299, lng: 5.32415 };
  let intervalId: number;
  let carouselIntervalId: NodeJS.Timeout;
  let currentIframeIndex = 0;

  const icons = [
    "tram.gif",
    "train.gif",
    "bus.gif"
  ];

  const iframes = [
    "https://tavla.entur.no/8uGihZiIhNf1BuCtMTxw",
    "https://tavla.entur.no/DudXa2hEwhZFN4gTmIrM",
    "https://tavla.entur.no/V40oHZjOOJSlr1aMzJMw"

  ];

  function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (location) => {
      LOCATION = {
        name: await getNameFromCoordinates(location.coords.latitude, location.coords.longitude),
        lat: location.coords.latitude,
        lng: location.coords.longitude
      };
      locationName.set(LOCATION.name);
    });
    console.log('Retrived location', LOCATION);
  } else {
    alert('Could not retrieve location');
  }
}

  async function getYr(lat: string, lng: string): Promise<YrWeather> {
    const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lng}`;
    const result: Promise<YrWeather> = await _fetch(url);

    return result;
  }

  async function _fetch(url: string): Promise<any> {
    const result = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    })
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
      });

    return result;
  }

  async function getNameFromCoordinates(lat: number, lon: number) {
    const result = await _getNameFromCoordinates(lat, lon);

    if (result.address.city) {
      return result.address.city;
    } else if (result.address.village) {
      return result.address.village;
    }

    return 'Ukjent';
  }

  async function _getNameFromCoordinates(lat: number, lon: number): Promise<NominatimReverse> {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
    const result: Promise<NominatimReverse> = await _fetch(url);

    return result;
  }

  onMount(() => {
    intervalId = setInterval(() => {
      location.reload();
    }, 900000); // 15 minutes in milliseconds

    carouselIntervalId = setInterval(() => {
      currentIframeIndex = (currentIframeIndex + 1) % iframes.length;
    }, 20000); // 20 seconds in mill

    return () => {
      clearInterval(intervalId);
      clearInterval(carouselIntervalId);

    };
  });
</script>

<div class="flex w-full justify-center items-center">
  <img src="bergentur.png" alt="" width="50%"/>
</div>


<div class="flex w-full justify-center items-center">
  <img src={icons[currentIframeIndex]} alt="" width="30%"/>
</div>
<div class="flex justify-center items-center">
  <iframe src={iframes[currentIframeIndex]} title="Carousel iframe" width="100%" height="700" frameBorder="0"></iframe>
</div>

<div class="flex w-full justify-center items-center mt-20">
  {#if LOCATION}
  {#await getYr(String(LOCATION.lat), String(LOCATION.lng))}
  <div class="w-full">laster inner...</div>
  {:then result}
    <div class="flex gap-4 justify-between items-center">
        <Weather weather={result.properties.timeseries[0]} />
        <Weather weather={result.properties.timeseries[1]} />
        <Weather weather={result.properties.timeseries[2]} />
        <Weather weather={result.properties.timeseries[3]} />
    </div>
  {/await}
{/if}
</div>
<img src="entur.png" alt="" class="w-full mt-20"/>


