<template>
    <div id="is-busy">
      <div
          id="animation"
          ref="animation"
      ></div>
    </div>
</template>

<script>
import lottie from 'lottie-web';
import animation from '@/assets/lottie/loading-animation.json';

export default {
    name: 'is-busy.IsBusy.components',
    methods: {
      isBusy: function () {
        return (this.anim = lottie.loadAnimation({
          container: this.$refs.animation, // the dom element that will contain the animation
          renderer: "svg",
          loop: true,
          autoplay: true,
          animationData: animation, // the path to the animation json
        }));
      },
      isBusyStop: function () {
        const element = document.getElementById('animation');
        element.style.display = 'none';

        return this.anim.stop();
      }
    }
};
</script>

<style lang="scss" scoped>
#is-busy {
  &--animation {
    position: absolute;
    z-index: 999;
    text-align: center;
    background: transparent;
    height: 800px;
    width: 100%;
  }
}
</style>
