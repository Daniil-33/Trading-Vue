import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import { ChartDataEl, APIDataEl, APIResponse, Signal, Order } from '../meta/types';

export default new Vuex.Store({
  state: {
    chartData: [],
    orders: [],
    signals: [],
    updateDate: Date.now(),
    isLoading: false,
  },
  mutations: {
    SET_CHART_DATA(state, data): void {
      state.chartData = data;
    },
    SET_ORDERS(state, data): void {
      state.orders = data;
    },
    SET_SIGNALS(state, data): void {
      state.signals = data;
    },
    SET_UPDATE_DATE(state, data) {
      state.updateDate = data;
    },
    SET_LOADING(state, data) {
      state.isLoading = data;
    },
  },
  actions: {
    async getChartData({ commit }, timeframe: string): Promise<void> {
      try {
        commit('SET_LOADING', true);

        const response: Response = await fetch(`https://api.huobi.pro/market/history/kline?period=${timeframe}&symbol=btcusdt&size=2000`);
        const responseJSON: APIResponse = await response.json();

        commit('SET_CHART_DATA', responseJSON.data);
        commit('SET_LOADING', false);
      } catch (error) {
        alert('Error occured');
        commit('SET_LOADING', false);
      }
    },
    async connectSoket({ commit }): Promise<void> {
      try {
        const ws: WebSocket = new WebSocket("wss://robothub7.nitrex.online/ws/v2/web-client/171cf177-b43d-4337-ad57-7aa8fecd2acd");;
        const sendPingMsg = (): void => {
          ws.send(JSON.stringify({
            type: "ping",
            data: {
              timestamp: new Date().getTime(),
            },
          }));
        }

        ws.onopen = (): void => {
          sendPingMsg();
          setInterval(sendPingMsg, 3000);
        }
      
        ws.onmessage = (event: MessageEvent): void => {
          const robotData = JSON.parse(event.data);

          if (robotData.type !== 'data_from_robot') return;
    
          const signals: Signal[] = []//robotData.data?.trading_info?.buy_signal?.signal_points || [];
          const orders: Order[] = robotData.data?.trading_state?.orders || [];

          Object.entries(robotData.data.trading_info).forEach(([key, value]: [string, any]): void => {
            if (key === 'buy_signal' || key === 'sell_signal') {
              signals.push(...(value?.signal_points || []))
            }
          })

          commit('SET_ORDERS', orders);
          commit('SET_SIGNALS', signals);
          commit('SET_UPDATE_DATE', Date.now());
        }
      } catch(error) {
        alert('WebSoket connection failed');
      }
    }
  },
  getters: {
    chartData: (state): ChartDataEl[] => {
      return state.chartData?.map((el: APIDataEl) => {
        const { id, open, close, low, high, vol } = el;

        return [
          id * 1000,
          open,
          high,
          low,
          close, 
          vol
        ]
      })
    },
    signals: (state): Signal[] => state.signals,
    orders: (state): Order[] =>  state.orders,
    updateDate: (state): number => state.updateDate,
    isLoading: (state): boolean => state.isLoading
  }
})
