/* 7klas Application */

const app = Vue.createApp({
    setup() {
        var class_ranks_yrs = Vue.ref(["2018", "2019", "2020", "2021", "2022", "2023", "2024"])
        var edit = Vue.ref(true)
        var error = Vue.ref(false)
        var incomplete = Vue.ref(false)
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

            incomplete.value = true;
            if (edit.value             &&
                stName.value.length    &&
                stNEABEL.value.length  &&
                stNEAMAT.value.length  &&
                stSubj1.value !== null &&
                stSubj2.value !== null
               )
            {
              incomplete.value = false;
            }
        }

        function cancel() {
            show_form.value = false
        }

        function verify() {
            error.value = false;
            /* Name should have value */
            if ( stName.value == "" ) {
              error.value = true;
            }

            /* Score should be between 0 and 100 */
            if ( parseFloat(stNEABEL.value) < 0.0 || parseFloat(stNEABEL.value) > 100.0 ) {
              error.value = true;
            }

            /* Score should be between 0 and 100 */
            if ( parseFloat(stNEAMAT.value) < 0.0 || parseFloat(stNEAMAT.value) > 100.0 ) {
              error.value = true;
            }

            /* Mark is between 3 and 6 */
            if ( stSubj1.value < 3 || stSubj1 > 6 ) {
              error.value = true;
            }

            /* Mark i between 3 and 6 */
            if ( stSubj2.value < 3 || stSubj2 > 6 ) {
              error.value = true;
            }

            incomplete.value = true;
            if (edit.value             &&
                stName.value.length    &&
                stNEABEL.value.length  &&
                stNEAMAT.value.length  &&
                stSubj1.value !== null &&
                stSubj2.value !== null
               )
            {
              incomplete.value = false;
            }
        }

        Vue.watch(stName, verify)

        return {
            addStudent,
            cancel,
            class_ranks_yrs,
            edit,
            error,
            incomplete,
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
