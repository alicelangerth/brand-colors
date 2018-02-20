<template>
  <div id="app">
    <router-link to="/"><div class="logo"><p>BC</p></div></router-link>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
@import './assets/css/normalize.css';
@import './assets/css/colors.scss';

// General styles

#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
html {
  font-size: 62.5%;
  width: 100%;
  height: 100%;
}
body {
  color: $dark-grey;
  width: 100%;
  height: 100%;
}
a {
  text-decoration: none;
  color: initial;
  width: 100%;
}
p {
  font-size: 3.2vh;
  line-height: 4.2vh;
  color: $dark-grey;
}
h1 {
  font-size: 6.5vh;
  font-weight: 600;
  line-height: 9vh;
  color: $black;
}
h2 {
  font-size: 3.8vh;
  color: $black;
}
.logo {
  position: absolute;
  left: 5%;
  top: 0%;
  p {
    font-size: 4.5vh;
    font-weight: 600;
    font-style: italic;
  }
}
.flex-wrapper {
  min-height: 100vh;
  -webkit-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  background-color: #fff;
  overflow-x: hidden;
}
.wrapper {
  width: 90vw;
  display: flex;
  flex-direction: column;
}
.btn {
  padding: 2.7vh 0;
  font-size: 3.3vh;
  width: 80%;
  font-weight: 500;
  cursor: pointer;
  text-align: center;
  margin: 7vh auto;
  transition: 0.2s;
  border: 5px solid $turquoise;
  box-sizing: border-box;
  border-radius: 0;
  color: $black;
}
@media screen and (min-width: 768px) {
  h1 {
    font-size: 4.8vh;
    line-height: 7vh;
  }
  .btn {
    font-size: 2.8vh;
    width: 60%;
    padding: 2vh 0;
    border: 5px solid #00bfa5;
  }
  p {
    font-size: 2.3vh;
    line-height: 3.5vh;
  }
  .wrapper {
    width: 70vw;
  }
}
@media screen and (min-width: 1200px) {
  .logo {
    border-radius: 50px;
    margin-bottom: 5vh;
    position: absolute;
    left: 2%;
    transition: 0.4s;
    &:hover {
      transform: translateX(1vh);
    }
    p {
      font-size: 4vh;
    }
  }
  h1 {
    font-size: 7.8vh;
    line-height: 10.5vh;
  }
  .btn {
    font-size: 3.2vh;
    width: auto;
    padding: 2vh 4vh;
    border: 7px solid #00bfa5;
    &:hover {
      color: $turquoise;
      outline: 0.1rem solid $turquoise;
    }
  }
  p {
    font-size: 2.5vh;
    line-height: 4vh;
  }
  .wrapper {
    width: 60vw;
    max-width: 1400px;
    align-items: center;
  }
}
</style>
