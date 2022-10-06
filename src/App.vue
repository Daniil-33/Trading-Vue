<template>
  <div id="app" class="app">
    <div class="app__container">
      <div class="app__header">
        <Dropdown
          v-model="timeframe"
          :options="timeframeOptions"
          @change="getTimegrameData"
        >
          <template #selected="{ title }">
            <span>{{ title }}</span>
          </template>
          <template #option="{ title }">
            <span>{{ title }}</span>  
          </template>
        </Dropdown>

        <div class="app__date">
          Updated at: {{ updateDate | dateFilter }}
        </div>
      </div>
      <div class="app__chart-wrap">
        <Chart :timeframe="timeframe.value"/>
      </div>
    </div>

    <FullscreenLoader v-if="isLoading"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import { Timeframes } from './meta/enums';

import Chart from './components/Chart.vue';
import Dropdown from './components/UI/Dropdown.vue';
import FullscreenLoader from './components/UI/FullscreenLoader.vue';

export default Vue.extend({
  name: 'App',
  components: {
    Chart,
    Dropdown,
    FullscreenLoader
  },
  filters: {
    dateFilter(timestamp: number): string {
      return (new Date(timestamp)).toLocaleString()
    }
  },
  data: () => ({
    Timeframes,
    timeframe: null
  }),
  computed: {
    ...mapGetters([
      'updateDate',
      'isLoading'
    ]),
    timeframeOptions() {
      return Object.entries(this.Timeframes).map((el: [string, string]) => ({ title: el[1], value: el[0] }) );
    }
  },
  methods: {
    ...mapActions([
      'getChartData',
      'connectSoket'
    ]),
    async getTimegrameData(): Promise<void> {
      await this.getChartData(this.timeframe.value);
    }
  },
  async created() {
    this.timeframe = this.timeframeOptions[2];
    this.getTimegrameData();
    this.connectSoket();
  }
});
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  background: rgb(18, 24, 38);

  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 5px;
  }
}

:root{
  scrollbar-color: rgba(255, 255, 255, 0.1) rgb(18, 24, 38) !important;
  scrollbar-width: thin !important;
}

.app {
  &__container {
    max-width: 100%;
    padding: 10px;
  }

  &__header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  &__date {
    font-size: 18px;
    font-weight: 500;
    color: #fafafa;
  }

  &__chart-wrap {
    min-height: calc(100vh - 84px);
    height: calc(100vh - 84px);
    position: relative;
  }
}
</style>
