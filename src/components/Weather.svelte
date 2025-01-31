<script lang="ts">
  import { formatNumber, convertSymbolKeyToId } from '../ts/main';

  import type { Timeseries } from '../types/YrWeather';

  export let weather: Timeseries;
</script>



<div class="w-full gap-4 justify-between items-center text-grey mr-10">
  <div class="w-full text-center text-xl">
    {weather.time.substring(11, 16)}
  </div>
  <div class="flex">
    <img
      src="/weathericons/{convertSymbolKeyToId(weather.data.next_1_hours.summary.symbol_code)}.svg"
      alt=""
      class="w-100 mr-5"/>
    <div class=" text-l">
      <div class="flex">
        <img src="/thermometer.svg" class="w-7 mr-3"/>
        {#if weather.data.instant.details.air_temperature > 0}
          <div class="text-red-500 text-l">
            {formatNumber(weather.data.instant.details.air_temperature, 'celsius')}
          </div>
        {:else}
          <div class="text-blue-500 text-l">
            {formatNumber(weather.data.instant.details.air_temperature, 'celsius')}
          </div>
        {/if}
      </div>
      <div class="flex text-500 text-l">
        <img src="/umbrella.svg" class="w-7 mr-3"/>
        {formatNumber(weather.data.next_1_hours.details.precipitation_amount, 'millimeter')}
      </div>
      <div class="flex text-500 text-l">
        <img src="/wind.svg" class="w-7 mr-3"/>
        {formatNumber(weather.data.instant.details.wind_speed, 'meter-per-second')}
      </div>
    </div>
  </div>
  
</div>