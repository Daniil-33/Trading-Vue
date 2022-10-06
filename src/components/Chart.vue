<template>
    <div ref="chart" class="chart">
        <trading-vue
            v-if="apiData.length"
            :data="chartData"
            :titleTxt="'BTCUSDT'"
            :width="width"
            :height="height"
            :toolbar="false"
        >
        </trading-vue>
    </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { APIResponse, Signal } from '../meta/types';
import { LIBTimeframes } from '../meta/enums';

import TradingVue from 'trading-vue-js';

export default Vue.extend({
    props: {
        timeframe: {
            type: String,
            default: () => '1min'
        }
    },
    components: { TradingVue },
    data() {
        return {
            LIBTimeframes,
            width: window.innerWidth,
            height: window.innerHeight,
            colors: {},
            key: 0
        }
    },
    computed: {
        ...mapGetters({
            apiData: 'chartData',
            signals: 'signals',
            orders: 'orders'
        }),
        chartData() {
            this.key++;

            return {
                ohlcv: [
                    ...this.apiData.sort((a: APIResponse, b: APIResponse) => a[0] - b[0])
                ],
                chart: {
                    tf: this.LIBTimeframes[this.timeframe],
                    indexBased: true,
                },
                onchart: [
                    {   name: 'Sell Signals',
                        type: 'Trades',
                        settings: {
                            "z-index": 1,
                        },
                        data: this.signals
                            .filter((el: Signal) => el.signal_type !== 'buy')
                            .map((el: Signal): [number, number, number] => ([el.timestamp, 0, el.price])),
                    },
                    {
                        name: 'Buy Signals',
                        type: 'Trades',
                        settings: {
                            "z-index": 1,
                        },
                        data: this.signals
                            .filter((el: Signal) => el.signal_type == 'buy')
                            .map((el: Signal): [number, number, number] => ([el.timestamp, 1, el.price])),
                    },
                ],
            }
        }
    },
    methods: {
        onResize(): void {
            this.width = this.$refs?.chart.parentNode.clientWidth;
            this.height = this.$refs?.chart.parentNode.clientHeight;
        }
    },
    mounted() {
        this.onResize();
        window.addEventListener('resize', this.onResize)
    }
})
</script>