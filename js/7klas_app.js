/* 7klas Application */

const app = Vue.createApp({
    setup() {
        var class_ranks_yrs = Vue.ref(["2019"])
        var edit = Vue.ref(true)
        var show_form = Vue.ref(false)

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
            show_form
        }
    }
})

app.mount('#a7klas_app')
