/* 7klas Application */

const app = Vue.createApp({
    setup() {
        var class_ranks_yrs = Vue.ref(["2019"])
        var edit = true
        var show_form = false

        function addStudent() {
            edit = true
            show_form = true
        }

        return {
            addStudent,
            class_ranks_yrs,
            edit,
            show_form
        }
    }
})

app.mount('#a7klas_app')
