import monthPickerComp from './MonthPicker'

const monthPicker = {
    install(Vue, options) {
        Vue.component('MonthPicker', monthPickerComp)
    }
}

export default monthPicker