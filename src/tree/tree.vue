<script>
export default {
  name: 'tree',
  props: {
    datas: {
      type: [Array, Object]
    }
  },
  render(h) {
    const _this = this
    if (_this.datas instanceof Array) {
      return _this.renderEl(h, _this.datas)
    } else {
      return h(
        'div',
        {
          class: ['main', 'item-has-children']
        },
        [
          h(
            'div',
            {
              class: 'item'
            },
            [
              h(
                'span',
                {
                  class: 'item-content'
                },
                [_this.datas.title]
              )
            ]
          ),
          _this.renderEl(h, _this.datas.children)
        ]
      )
    }
  },
  methods: {
    renderEl(h, datas) {
      const _this = this
      return h(
        'ul',
        {
          class: 'parant'
        },
        [_this.renderItem(h, datas)]
      )
    },
    renderItem(h, datas) {
      const _this = this
      return datas.map(item => {
        if (item.children) {
          return h('li', { class: 'item-has-children', key: item.id }, [
            h(
              'div',
              {
                class: 'item'
              },
              [
                h(
                  'span',
                  {
                    class: 'item-content'
                  },
                  [item.title]
                )
              ]
            ),
            _this.renderEl(h, item.children)
          ])
        } else {
          return h(
            'li',
            {
              key: item.id
            },
            [
              h(
                'div',
                {
                  class: 'item'
                },
                [
                  h(
                    'span',
                    {
                      class: 'item-content'
                    },
                    [item.title]
                  )
                ]
              )
            ]
          )
        }
      })
    }
  }
}
</script>
<style lang="postcss" scoped>
.main {
    display: flex;
}
.parant {
    /* display: flex; */
}
.item-has-children {
    display: flex;
    align-items: center;
    &>.item > .item-content {
        position: relative;
        display: flex;
        align-item: center;
        &::after {
            content: '';
            position: absolute;
            right: -10px;
            width: 10px;
            height: 1px;
            background-color: #ccc;
        }
    }
}
.item {
    display: flex;
    align-items: center;
    padding: 10px;
}
.item-content {
padding: 10px;
border: 1px solid #ccc;
}
</style>

