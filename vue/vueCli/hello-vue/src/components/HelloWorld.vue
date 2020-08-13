<template>
  <div class="hello">
    <p>{{ count }}</p>
    <p>{{ countAlias }}</p>
    <p>{{ countPlusLocalState }}</p>
    <p>doubleCount---{{ doubleCount }}</p>
    <p>aCount---{{ this.$store.state.moduleA.aCount }}</p>
    <button @click="addCount">add</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "HelloWorld",
  mounted() {
    console.log(this);
  },
  props: {
    msg: String,
  },
  computed: {
    ...mapState({
      count: (state) => state.count,
      countAlias: "count",
      aCount: "moduleA/aCount",
      countPlusLocalState: (state) => {
        return state.count * 2;
      },
    }),
    ...mapGetters(["doubleCount"]),
  },
  methods: {
    addCount() {
      this.$store.commit("moduleA/increment", 10);
      // this.$store.state.count++;
    },
    ...mapMutations(["increment", "aIncrement"]),
    ...mapActions(["asyncIncrement", "actionB"]),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
