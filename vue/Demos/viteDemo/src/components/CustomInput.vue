<!--  -->
<template>
  <!-- <input type="text" v-model="state.count" /> -->
  <p>name-------{{ name }}</p>
  <input type="text" v-model="text" />
  <p>{{ text }}</p>
  <p @click="handleClick">click ---{{ location }}</p>
  <slot></slot>
</template>

<script>
import {
  reactive,
  watchEffect,
  shallowRef,
  ref,
  onBeforeUpdate,
  onUpdated,
  watch,
  inject,
  h,
  triggerRef,
  readonly,
  customRef,
} from "vue";
export default {
  data() {
    return {
      name: "--a",
    };
  },
  renderTriggered({ key, target, type }) {
    console.log("renderTriggered---------", { key, target, type });
  },
  renderTracked({ key, target, type }) {
    console.log("rendertrack---------", { key, target, type });
    /* This will be logged when component is rendered for the first time:
    {
      key: "cart",
      target: {
        cart: 0
      },
      type: "get"
    }
    */
  },
  methods: {
    handleClick() {
      this.updateLocation();
      this.name += "---a";
    },
  },

  setup(props, context) {
    let readonlyData = readonly({ a: "aa" });
    console.log("setup -> readonlyData", readonlyData);

    readonlyData.a += "aaa";
    console.log("setup -> readonlyData", readonlyData);

    const shallow = shallowRef({
      greet: "Hello, world",
    });

    // Logs "Hello, world" once for the first run-through
    watchEffect(() => {
      console.log("shallow-------------", shallow.value.greet);
    });

    // This won't trigger the effect because the ref is shallow
    setTimeout(() => {
      shallow.value.greet = "Hello, universe";
      triggerRef(shallow);
    }, 3000);

    function useDebouncedRef(value, delay = 200) {
      let timeout;
      return customRef((track, trigger) => {
        return {
          get() {
            track();
            return value;
          },
          set(newValue) {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
              value = newValue;
              trigger();
            }, delay);
          },
        };
      });
    }

    let location = inject("location");
    console.log("setup -> location", location);
    let updateLocation = inject("updateLocation");

    let state = reactive({
      count: 0,
    });

    watchEffect(() => {
      console.log(`name is: `);
    });
    onBeforeUpdate(() => {
      console.log("更新之前");
    });
    onUpdated(() => {
      console.log("更新之后");
    });
    watch(
      () => state.count,
      (count, prevCount) => {
        console.log("setup -> count,prevCount", count, prevCount);
      }
    );
    watchEffect(
      (...resets) => {
        console.log(state.count);
        console.log("count 发生了变化", resets);
      },
      {
        onTrigger(e) {
          console.log("trigger 调用");
        },
        onTrack(e) {
          console.log("track 调用");
        },
        flush: "pre",
      }
    );
    console.log(this);
    return { location, updateLocation, text: useDebouncedRef("hello", 2000) };
  },
};
</script>
<style scoped>
</style>