<template>
  <div>
    <h1>Saving...</h1>
    <div class="pulse-container">
      <div class="pulse-box">
        <svg class="pulse-svg" width="50px" height="50px" viewBox="0 0 50 50">
          <circle class="circle first-circle" fill="#FF6347" cx="25" cy="25" r="25"></circle>
          <circle class="circle second-circle" fill="#FF6347" cx="25" cy="25" r="25"></circle>
          <circle class="circle third-circle" fill="#FF6347" cx="25" cy="25" r="25"></circle>
          <circle class="circle" fill="#FF6347" cx="25" cy="25" r="25"></circle>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Saving',
  mounted() {
    
    setTimeout(() => {
      this.$router.push('/go');
    }, 1000)
  },
}
</script>

<style scoped>
  .pulse-box {
    float: left;
    width: 50%;
    height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  /* pulse in SVG */
  svg.pulse-svg {
    overflow: visible;
  }
  svg.pulse-svg .first-circle, svg.pulse-svg .second-circle, svg.pulse-svg .third-circle {
    fill: #f00;
    transform: scale(0.5);
    transform-origin: center center;
    animation: pulse-me 3s linear infinite;
  }
  svg.pulse-svg .second-circle {
    animation-delay: 1s;
  }
  svg.pulse-svg .third-circle {
    animation-delay: 2s;
  }

  @keyframes pulse-me {
    0% {
      transform: scale(0.5);
      opacity: 0;
    }
    50% {
      opacity: 0.1;
    }
    70% {
      opacity: 0.09;
    }
    100% {
      transform: scale(5);
      opacity: 0;
    }
  }

</style>