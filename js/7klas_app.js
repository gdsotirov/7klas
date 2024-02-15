/* 7klas Application */

const app = Vue.createApp({
    setup() {
        var class_ranks_yrs = Vue.ref(["2019"])
        var edit = Vue.ref(true)
        var rnkYear = Vue.ref(new Date().getFullYear().toString())
        var show_form = Vue.ref(false)
        var stNEABEL =  Vue.ref('')
        var stNEABEL_mul =  Vue.ref(1)
        var stNEAMAT =  Vue.ref('')
        var stNEAMAT_mul =  Vue.ref(3)
        var stName = Vue.ref('')
        var stRank =  Vue.ref('')
        var stRankBy =  Vue.ref('both')
        var stSubj1 =  Vue.ref('')
        var stSubj2 =  Vue.ref('')

        function addStudent() {
            edit.value = true
            show_form.value = true
        }

        function cancel() {
            show_form.value = false
        }

        return {
            addStudent,
            cancel,
            class_ranks_yrs,
            edit,
            rnkYear,
            show_form,
            stNEABEL,
            stNEABEL_mul,
            stNEAMAT,
            stNEAMAT_mul,
            stName,
            stRank,
            stRankBy,
            stSubj1,
            stSubj2
        }
    }
})

app.mount('#a7klas_app')
