<template>
  <div class="main">
    <div class="sider">
      <ul id="side">
        <li>
          <a href="#" @click="currentView = 'simple'">Simple Floor</a>
        </li>
      </ul>
    </div>
    <div class="content">
      <component id="full_div" :is="currentView" />
    </div>
  </div>
</template>

<script>
import Simple from './components/Simple';

export default {
  name: 'App',
  components: {
    Simple
  },
  data() {
    return {
      currentView: 'simple'
    };
  }
};
</script>

<style>
body {
  margin: 0px;
  font-family: Helvetica, Verdana, sans-serif;
}

.main {
  width: 100vw;
  height: 100vh;
}

.content {
  width: calc(100% - 222px);
  height: calc(100% - 22px);
  float: left;
  position: relative;
  margin: 10px;
}

.sider {
  float: left;
  width: 200px;
  height: 100vh;
}

#full_div {
  /* overflow-x: auto; */
  width: calc(100% - 2px);
  height: calc(100% - 3px);
  border: 1px solid #ccc;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

li {
  font: 200 15px/1.5 Helvetica, Verdana, sans-serif;
  border-bottom: 1px solid #ccc;
}

li:last-child {
  border: none;
}

li a {
  font-size: 15px;
  padding-left: 8px;
  text-decoration: none;
  color: #000;
  display: block;

  -webkit-transition: font-size 0.3s ease, background-color 0.3s ease;
  -moz-transition: font-size 0.3s ease, background-color 0.3s ease;
  -o-transition: font-size 0.3s ease, background-color 0.3s ease;
  -ms-transition: font-size 0.3s ease, background-color 0.3s ease;
  transition: font-size 0.3s ease, background-color 0.3s ease;
}

li a:hover {
  font-size: 20px;
  background: #f6f6f6;
}
</style>
