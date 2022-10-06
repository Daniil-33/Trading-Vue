<template>
    <div ref="loader" class="loader" :style="{'width': width+ 'px', 'height': height + 'px'}">
        <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data: () => ({
        width: window.innerWidth,
        height: window.innerHeight,
    }),
    methods: {
        onResize(): void {
            this.width = this.$refs?.loader.parentNode.clientWidth;
            this.height = this.$refs?.loader.parentNode.clientHeight;
        }
    },
    mounted() {
        this.onResize();
        window.addEventListener('resize', this.onResize)
    }
})
</script>
<style scoped lang="scss">
.loader {
    background: rgba($color: #000000, $alpha: 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 0;
    top: 0;
}
.lds-spinner {
  color: official;
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

  &  div {
    transform-origin: 40px 40px;
    animation: lds-spinner 1.2s linear infinite;
  }

  & div:after  {
    content: " ";
    display: block;
    position: absolute;
    top: 3px;
    left: 37px;
    width: 6px;
    height: 18px;
    border-radius: 20%;
    background: #fff;
  }

  & div:nth-child(1) {
    transform: rotate(0deg);
    animation-delay: -1.1s;
  }
  
  & div:nth-child(2) {
    transform: rotate(30deg);
    animation-delay: -1s;
  }

  & div:nth-child(3) {
    transform: rotate(60deg);
    animation-delay: -0.9s;
  }

  & div:nth-child(4) {
    transform: rotate(90deg);
    animation-delay: -0.8s;
  }

  & div:nth-child(5) {
    transform: rotate(120deg);
    animation-delay: -0.7s;
  }

  & :nth-child(6) {
    transform: rotate(150deg);
    animation-delay: -0.6s;
  }

  & div:nth-child(7) {
    transform: rotate(180deg);
    animation-delay: -0.5s;
  }

  & div:nth-child(8) {
    transform: rotate(210deg);
    animation-delay: -0.4s;
  }

  & div:nth-child(9) {
    transform: rotate(240deg);
    animation-delay: -0.3s;
  }

  & div:nth-child(10) {
    transform: rotate(270deg);
    animation-delay: -0.2s;
  }

  & div:nth-child(11) {
    transform: rotate(300deg);
    animation-delay: -0.1s;
  }

   & div:nth-child(12) {
    transform: rotate(330deg);
    animation-delay: 0s;
  }
}

@keyframes lds-spinner {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

</style>