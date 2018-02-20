<template>
  <div class="flex-wrapper">
    <div class="search-form wrapper">
      <h2>Choose an influencer to assess</h2>
      <div class="menu-container">
        <span class="ig" v-on:click="toggleMenu">
          <div class="icon ig"></div><div class="box">instagram <span class="arrow" v-bind:class="{ open: menuOpen }">&#x25BE;</span></div>
            <div class="drop-down" v-bind:class="{ open : menuOpen }">
              <span>twitter</span>
              <span>facebook</span>
              <span>www</span>
            </div>
          </span>
      </div>
      <input v-model="user" placeholder="@username" type="text" v-on:keyup.enter="setUserSearch(user)" v-bind:class="{ active: user !== ''}">
      <p v-on:click="setUserSearch(user)" class="btn" v-bind:class="{ active: user !== ''}">Evaluate account <span>&#x25B8;</span></p>
    </div>
  </div>
</template>
<script>

export default {
  name: 'MailForm',
  data () {
    return {
      user: '',
      error: false,
      menuOpen: false
    }
  },
  methods: {
    // Set input value to store
    setUserSearch (user) {
      this.$store.commit('setUserSearch', this.user)
      this.$store.commit('setIsLoading', true)
      return false
    },
    toggleMenu () {
      this.menuOpen = !this.menuOpen
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/css/colors.scss';

.flex-wrapper {
  justify-content: flex-end;
}
.search-form {
  padding: 0px 0 15vh 0;
  h2 {
    font-size: 5vh;
    line-height: 6.4vh;
  }
  .menu-container {
    position: relative;
  }
  span.ig {
    background: #fff;
    border: 5px solid $light-grey;
    box-sizing: border-box;
    color: $black;
    cursor: pointer;
    display: inline-block;
    font-size: 4vh;
    font-weight: 600;
    padding: 2vh;
    position: absolute;
    width: 90vw;
    .box {
      display: flex;
      justify-content: space-between;
    }
    .arrow {
      color: $turquoise;
      display: inline-block;
      transition: 0.4s;
    }
    .arrow.open {
      transform: rotate(180deg);
    }
  }
  .drop-down {
    background: #fff;
    color: $light-grey;
    display: flex;
    display: none;
    flex-direction: column;
    height: auto;
    left: 0;
    padding: 1vh 0;
    span {
      align-items: center;
      cursor: initial;
      display: flex;
      font-size: 4vh;
      line-height: 5vh;
    }
  }
  .drop-down.open {
    display: flex;
  }
  input {
    border: none;
    border-bottom: 5px solid $turquoise;
    border-radius: 0;
    font-size: 5.5vh;
    font-style: italic;
    font-weight: 600;
    height: 5vh;
    height: auto;
    margin-right: 2vw;
    margin: 18vh 0 10vh 0;
    outline: none;
    padding-bottom: 2vh;
  }
  input.active {
    border-bottom: 5px solid $dark-grey;
  }
  input::placeholder {
    color: #e6e6e6;
  }
  p {
    margin: 0;
  }
  .btn {
    align-items: center;
    border: 5px solid $turquoise;
    display: flex;
    justify-content: center;
    position: relative;
    transition: 0.3s;
    visibility: hidden;
    width: 100%;
    span {
      font-size: 4vh;
      padding-left: 2vh;
    }
  }
  .btn.active {
    visibility: visible;
  }
}
@media screen and (min-width: 768px) {
  .flex-wrapper {
    justify-content: center;
  }
  .search-form {
    padding: 0;
    p {
      width: 90%;
    }
    h2 {
      font-size: 4.2vh;
      line-height: 5vh;
      width: 100%;
    }
    span.ig {
      font-size: 4.2vh;
      line-height: 5vh;
      padding: 1vh 2vh;
      width: 70vw;
      span {
        font-size: 3.8vh;
      }
    }
    input {
      font-size: 4.7vh;
      margin: 16vh 0 7vh 0;
    }
  }
}
@media screen and (min-width: 1200px) {
  .search-form {
    align-items: flex-start;
    width: 50vw;
    p {
      width: 100%;
    }
    h2 {
      font-size: 4vh;
      width: 80%;
    }
    span.ig {
      border: 5px solid $light-grey;
      font-size: 4vh;
      width: 37vw;
      span {
        font-size: 3.5vh;
        line-height: 4.5vh;
      }
    }
    .btn {
      width: 50%;
      span {
        font-size: 3.5vh;
        transition: 0.4s transform;
      }
      &:hover {
        span {
          transform: translateX(8px);
        }
      }
    }
    input {
      font-size: 5vh;
      width: 36.9vw;
    }
  }
}
</style>
