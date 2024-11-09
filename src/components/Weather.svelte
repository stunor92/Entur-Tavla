<script lang="ts">
  import { formatNumber, convertSymbolKeyToId } from '../ts/main';

  import type { Timeseries } from '../types/YrWeather';

  export let weather: Timeseries;
</script>



<div class="w-full gap-4 justify-between items-center text-white">
  <div class="">
    {weather.time.substring(11, 16)}
  </div>
  <div class="flex">
    <img
      src="/weathericons/{convertSymbolKeyToId(weather.data.next_1_hours.summary.symbol_code)}.svg"
      alt=""
      class="w-100"/>
    <div class=" text-xl">
      <div class="flex">
        <img src="/thermometer.svg" class="w-7"/>
        {#if weather.data.instant.details.air_temperature > 0}
          <div class="text-red-500">
            {formatNumber(weather.data.instant.details.air_temperature, 'celsius')}
          </div>
        {:else}
          <div class="text-blue-500">
            {formatNumber(weather.data.instant.details.air_temperature, 'celsius')}
          </div>
        {/if}
      </div>
      <div class="flex text-gray-500">
        <img src="/umbrella.svg" class="w-7"/>
        {formatNumber(weather.data.next_1_hours.details.precipitation_amount, 'millimeter')}
      </div>
      <div class="flex text-gray-500">
        <img src="/wind.svg" class="w-7"/>
        {formatNumber(weather.data.instant.details.wind_speed, 'meter-per-second')}
      </div>
    </div>
  </div>
  
</div>