
<script lang="ts">
  import { formatNumber } from '../ts/main';

  import type { Timeseries } from '../types/YrWeather';

  export let now: Timeseries;
</script>



<div class="w-full flex flex-wrap gap-4 justify-between items-center text-4xl">
  <div class="w-full sm:w-auto">
    <img
      src="/weathericons/{now.data.next_1_hours.summary.symbol_code}.svg"
      alt=""
      class="w-24 mx-auto"
    />
  </div>
  <div class="text-red-500">
    {formatNumber(now.data.instant.details.air_temperature, 'celsius')}
  </div>
  <div class="text-blue-500">
    {formatNumber(now.data.next_1_hours.details.precipitation_amount, 'millimeter')}
  </div>
  <div class="text-gray-500">
    {formatNumber(now.data.instant.details.wind_speed, 'meter-per-second')}
  </div>
</div>