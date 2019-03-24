import treeComp from './tree'

const tree = {
    install(Vue, options) {
        Vue.component('tree', treeComp)
    }
}

export default tree