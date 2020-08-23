<template>
  <CustomInput al="test" @click="say">
    <p>我是插槽部分</p>
  </CustomInput>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Test from "./components/test.vue";
import { provide, inject, reactive, computed, ref } from "vue";
import CustomInput from "./components/CustomInput.vue";
export default {
  name: "App",
  data() {
    return {
      name: "aaaa",
    };
  },
  provide() {
    return {
      nameProvide: computed(() => this.name),
    };
  },
  errorCaptured(...resets) {
    console.log("errorCaptured -> resets", resets);
  },

  setup() {
    let location = ref("location app");
    let updateLocation = () => {
      location.value += "app";
    };
    provide("location", location);
    provide("updateLocation", updateLocation);
    // provide({
    //   location,
    //   updateLocation,
    // });
  },
  methods: {
    say() {
      console.log("hello ");
    },
  },
  components: {
    HelloWorld,
    Test,
    CustomInput,
  },
};
</script>
