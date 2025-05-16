<script lang="ts">
  import { formatNumber, convertSymbolKeyToId } from '../ts/main';

  import type { Timeseries } from '../types/YrWeather';

  export let weather: Timeseries;
</script>



<div>
  <div class="centered-container header">
    {weather.time.substring(11, 16)}
  </div>
  <div class="box">
    <img
      src="/weathericons/{convertSymbolKeyToId(weather.data.next_1_hours.summary.symbol_code)}.svg"
      alt=""
      class="weather-icon"/>
    <div class="black">
      <div class="flex">
        <img src="/thermometer.svg" class="icon"/>
        {#if weather.data.instant.details.air_temperature > 0}
          <div class="red">
            {formatNumber(weather.data.instant.details.air_temperature, 'celsius')}
          </div>
        {:else}
          <div class="blue">
            {formatNumber(weather.data.instant.details.air_temperature, 'celsius')}
          </div>
        {/if}
      </div>
      <div class="flex black">
        <img src="/umbrella.svg" class="icon"/>
        {formatNumber(weather.data.next_1_hours.details.precipitation_amount, 'millimeter')}
      </div>
      <div class="flex black">
        <img src="/wind.svg" class="icon"/>
        {formatNumber(weather.data.instant.details.wind_speed, 'meter-per-second')}
      </div>
    </div>
  </div>
  
</div>