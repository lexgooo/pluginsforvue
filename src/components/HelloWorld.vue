<template>
  <div class="hello">
    <month-picker :data-gap="['2018-1', '2019-12']"></month-picker>
    <div class="lib">
      <tree :datas="tree"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      show: true,
      tree: {
        title: '总菜单',
        children: [
          {
            title: '菜单1',
            id: '1',
            children: [
              {
                title: '菜单1-1',
                id: '1-1'
              },
              {
                title: '菜单1-2',
                id: '1-2'
              },
              {
                title: '菜单1-3',
                id: '1-3',
                children: [
                  {
                    title: '菜单1-3-1',
                    id: '1-3-1'
                  },
                  {
                    title: '菜单1-3-2',
                    id: '1-3-2'
                  },
                  {
                    title: '菜单1-3-3',
                    id: '1-3-3'
                  }
                ]
              }
            ]
          },
          {
            title: '菜单2',
            id: '2'
          },
          {
            title: '菜单3',
            id: '3'
          },
          {
            title: '菜单4',
            id: '4'
          }
        ]
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="postcss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

