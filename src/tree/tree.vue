<script>
export default {
    name: 'tree',
    props: {
        datas: {
            type: [Array, Object]
        }
    },
    render (h) {
        const _this = this
        if (_this.datas instanceof Array) {
            return _this.renderEl(h, _this.datas)
        } else {
            return h(
                'div',
                {
                    'class': 'parant'
                },
                [
                    h(
                        'span',
                        {
                            'class': ['parant-item', 'item-has-children']
                        },
                        [_this.datas.title]
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
                    'class': 'children-form'
                },
                [_this.renderItem(h, datas)]
            )
        },
        renderItem(h, datas) {
            const _this = this
            return datas.map(item => {
                if (item.children) {
                    return h(
                        'li',
                        {   'class': 'item-has-children',
                            key: item.id
                        },
                        [
                            h(
                                'div',
                                {
                                    'class': 'item'
                                },
                                [item.title]
                            ),
                             _this.renderEl(h, item.children)
                        ]
                    )
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
                                    'class': 'item'
                                },
                                [item.title]
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
.parant {
  display: flex;
  align-items: center;
  /* & .item {

        } */
}
.item,
.parant-item {
  position: relative;
  margin: 12px;
  padding: 10px;
  border: 1px solid #ccc;
}
.item {
  display: flex;
  align-items: center;
  &::before {
    content: '';
    position: absolute;
    left: -12px;
    height: 1px;
    width: 12px;
    background-color: #ccc;
  }
}
li {
    border-left: 1px solid #ccc;
}
.item-has-children {
    display: flex;
  & > .item {
    display: flex;
    align-items: center;
    &::after {
      content: '';
      position: absolute;
      right: -12px;
      height: 1px;
      width: 12px;
      background-color: #ccc;
    }
  }
}
</style>

