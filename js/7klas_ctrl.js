/* 7klas Application Controller */

const $7klas_ctrl = {
setup() {
  var stName = Vue.ref('')
  var stNEABEL = Vue.ref('')
  var stNEABEL_mul = Vue.ref(1)
  var stNEAMAT = Vue.ref('')
  var stNEAMAT_mul = Vue.ref(3)
  var stSubj1 = Vue.ref('')
  var stSubj2 = Vue.ref('')
  var stRank = Vue.ref('')
  var stRankBy = Vue.ref('both')
  var rnkYear = Vue.ref(new Date().getFullYear().toString())

  /* For running locally *
  var cls_ranks_all = Vue.ref([
    {clsYear: "2019", schlName:'Училище 1', clsName:"Клас А", min_rank_I:456, min_rank_II:432 },
    {clsYear: "2019", schlName:'Училище 2', clsName:"Клас Б", min_rank_I:321, min_rank_II:234 },
    {clsYear: "2019", schlName:'Училище 3', clsName:"Клас В", min_rank_I:123, min_rank_II:111 }
  ])
  var cls_ranks = Vue.ref(cls_ranks_all.value)

  var cls_ranks_yrs = Vue.ref(['2018', '2019', '2020', '2021', '2022', '2023', '2024'])

  var num = 0
  cls_ranks.value.forEach(function(item) {
    item.number = ++num
  })*/

  var cls_ranks = Vue.ref([])
  var cls_ranks_all = Vue.ref(null)
  const cls_ranks_url = Vue.ref("get_ranks.php")
  var cls_ranks_yrs = Vue.ref([])

  Vue.watchEffect(async () => {
      /* Number rows here, because in MySQL 5.7 Window functions (e.g.
       * ROW_NUMBER) are not available.
       */
      var num = 0
      cls_ranks_all.value = await (await fetch(`${cls_ranks_url.value}`)).json()
      var prev_yr = cls_ranks_all.value[0].clsYear
      cls_ranks_all.value.forEach(function(item) {
        if ( item.clsYear != prev_yr ) {
          num = 0 /* rest numbering for each year */
          prev_yr = item.clsYear
        }
        item.number = ++num
        item.src = 'db'
        if ( cls_ranks_yrs.value.indexOf(item.clsYear) == -1 ) {
          cls_ranks_yrs.value.push(item.clsYear)
        }
      })

      /* More recent years first */
      cls_ranks_yrs.value.sort().reverse()

      rnkYear.value = $7klas.getMaxOfArray(cls_ranks_yrs.value)

      cls_ranks.value = cls_ranks_all.value.filter(function(item) {
        return item.clsYear == rnkYear.value
      })
  })

  var edit = Vue.ref(true)
  var error = Vue.ref(false)
  var incomplete = Vue.ref(false)
  var showForm = Vue.ref(false)

  function addStudent() {
    showForm.value = true

    edit.value = true

    incomplete.value = true
    if (edit             &&
        stName.value.length    &&
        stNEABEL.value.length  &&
        stNEAMAT.value.length  &&
        stSubj1.value !== null &&
        stSubj2.value !== null
       )
    {
      incomplete.value = false
    }
  }

  function calcRank(bel, bmul, mat, mmul, subj1, subj2) {
    var rank = (bmul * bel) + (mmul * mat) +
               $7klas.mark_to_score(subj1) + $7klas.mark_to_score(subj2)
    return rank
  }

  function showRank() {
    var scBEL, scMAT
    if ( stNEABEL.value == '' || isNaN(stNEABEL.value) ) {
      scBEL = 0
    }
    else {
      scBEL = parseFloat(stNEABEL.value)
    }

    if ( stNEAMAT.value == '' || isNaN(stNEAMAT.value) ) {
      scMAT = 0
    }
    else {
      scMAT = parseFloat(stNEAMAT.value)
    }

    stRank.value = calcRank(scBEL, stNEABEL_mul.value,
                            scMAT, stNEAMAT_mul.value,
                            stSubj1.value, stSubj2.value)
  }

  function rankStudent() {
    showForm.value = false

    var student_ranked = false
    var rank_by = 0
    var new_arr = []
    var new_item = {}

    /* Initialize with student's data */
    new_item.schlName = stName.value
    new_item.clsName  = 'n/a'
    if ( stRankBy.value == 'first' || stRankBy.value == 'both' ) {
      new_item.min_rank_I = stRank.value
      new_item.min_rank_II = 0.0
    }
    else if ( stRankBy.value == 'second' ) {
      new_item.min_rank_I = 0.0
      new_item.min_rank_II = stRank.value
    }

    var num = 0
    cls_ranks.value.forEach(function(item) {
      if ( stRankBy.value == 'first' || stRankBy.value == 'both' ) {
        rank_by = parseFloat(item.min_rank_I)
      }
      else {
        rank_by = parseFloat(item.min_rank_II)
      }

      if ( stRank.value >= rank_by && !student_ranked ) {
        student_ranked = true
        if ( stRankBy.value == 'both' ) {
          new_item.schlName += " (I)"
        }
        new_item.number = '--'
        new_item.clsName = item.clsName
        new_item.source = 'user'
        new_arr.push(new_item)
        item.number = ++num
        new_arr.push(item)
      }
      else if ( item.source == 'user' ) { /* just push user items */
        new_arr.push(item)
      }
      else {
        item.number = ++num
        new_arr.push(item)
      }
    })

    /* Loop again to rank by second ranks */
    if ( stRankBy.value == 'both' )
    {
      cls_ranks.value = new_arr

      var new_item2 = {}
      new_item2.schlName = stName.value + " (II)"
      new_item2.clsName  = 'n/a'
      new_item2.min_rank_I = 0.0
      new_item2.min_rank_II = stRank.value

      new_arr = []
      student_ranked = false
      num = 0

      cls_ranks.value.forEach(function(item) {
        if ( stRank.value >= parseFloat(item.min_rank_II)
             && !student_ranked
             && item.source != 'user' /* avoid previous ranking */ )
        {
          student_ranked = true
          new_item2.number = '--'
          new_item2.clsName = item.clsName
          new_item2.source = 'user'
          new_arr.push(new_item2)
          item.number = ++num
          new_arr.push(item)
        }
        else if ( item.source == 'user' ) {  /* just push user items */
          new_arr.push(item)
        }
        else {
          item.number = ++num
          new_arr.push(item)
        }
      })
    }

    /* Add at the very end if not ranked higher */
    if ( !student_ranked ) {
      new_item.number = ++num
      new_arr.push(new_item)
    }

    cls_ranks.value = new_arr
  }

  function cancel() {
    showForm.value = true
  }

  /* Verify user input */
  function verify() {
    error.value = false
    /* Name should have value */
    if ( stName.value == "" ) {
      error.value = true
    }

    /* Score should be between 0 and 100 */
    if ( parseFloat(stNEABEL.value) < 0.0 || parseFloat(stNEABEL.value) > 100.0 ) {
      error.value = true
    }

    /* Score should be between 0 and 100 */
    if ( parseFloat(stNEAMAT.value) < 0.0 || parseFloat(stNEAMAT.value) > 100.0 ) {
      error.value = true
    }

    /* Mark is between 3 and 6 */
    if ( stSubj1.value < 3 || stSubj1.value > 6 ) {
      error.value = true
    }

    /* Mark i between 3 and 6 */
    if ( stSubj2.value < 3 || stSubj2.value > 6 ) {
      error.value = true
    }

    incomplete.value = false
    if ( edit.value             &&
        (!stName.value.length   ||
         !stNEABEL.value.length ||
         !stNEAMAT.value.length ||
         stSubj1.value == null  ||
         stSubj2.value == null
        )
       )
    {
      incomplete.value = true
    }
  }

  function mul_change_bel() {
    stNEAMAT_mul.value = 4 - stNEABEL_mul.value
    showRank()
  }

  function mul_change_mat() {
    stNEABEL_mul.value = 4 - stNEAMAT_mul.value
    showRank()
  }

  function getItemStyle(itm) {
    if ( itm.source == 'user' ) {
      return "red"
    }
    else {
      return "inherit"
    }
  }

  Vue.watch(stName  , verify)
  Vue.watch(stNEABEL, function(newVal) {
    /* Ensure comma is replaced with dot as decimal separator */
    stNEABEL.value = newVal.replace(/,/g, '.')
    verify()
    showRank()
  })
  Vue.watch(stNEAMAT, function(newVal) {
    /* Ensure comma is replaced with dot as decimal separator */
    stNEAMAT.value = newVal.replace(/,/g, '.')
    verify()
    showRank()
  })
  Vue.watch(stSubj1 , function() {verify(); showRank()})
  Vue.watch(stSubj2 , function() {verify(); showRank()})

  function rnkYearChange() {
    cls_ranks.value = cls_ranks_all.value.filter(function(item) {
      return item.clsYear == rnkYear.value
    })

    if ( !error.value && !incomplete.value ) {
      rankStudent()
    }
  }

  return {
    addStudent,
    cancel,
    cls_ranks,
    cls_ranks_yrs,
    edit,
    error,
    getItemStyle,
    incomplete,
    mul_change_bel,
    mul_change_mat,
    rankStudent,
    rnkYear,
    rnkYearChange,
    showForm,
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
}}
