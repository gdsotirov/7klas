/* 7klas Application Controller */

const $7klas_ctrl = {
setup() {
  var stName = Vue.ref('')
  var stNEABEL = Vue.ref('')
  var stNEABEL_mul = Vue.ref(2)
  var stNEAMAT = Vue.ref('')
  var stNEAMAT_mul = Vue.ref(2)
  var stSubj1 = Vue.ref('')
  var stSubj2 = Vue.ref('')
  var stRank = Vue.ref('')
  var stRankBy = Vue.ref('both')
  var schlDist = Vue.ref([])
  var rnkYear = Vue.ref(new Date().getFullYear().toString())

  /* For running locally *
  var cls_ranks_all = Vue.ref([
    {clsYear: "2019", schlName:'Училище 1', clsName:"Клас А", min_rank_I:456, min_rank_II:432 },
    {clsYear: "2019", schlName:'Училище 2', clsName:"Клас Б", min_rank_I:321, min_rank_II:234 },
    {clsYear: "2019", schlName:'Училище 3', clsName:"Клас В", min_rank_I:123, min_rank_II:111 }
  ])
  var cls_ranks = Vue.ref(cls_ranks_all.value)

  var cls_ranks_yrs = Vue.ref(['2018', '2019', '2020', '2021', '2022', '2023', '2024']) */

  var cls_ranks = Vue.ref([])
  var cls_ranks_all = Vue.ref(null)
  const cls_ranks_url = Vue.ref("get_ranks.php")
  const sch_dist_url  = Vue.ref("get_dist.php")
  var cls_ranks_yrs = Vue.ref([])
  var districts = Vue.ref([])

  Vue.watchEffect(async () => {
      districts.value = await (await fetch(`${sch_dist_url.value}`)).json()

      cls_ranks_all.value = await (await fetch(`${cls_ranks_url.value}`)).json()
      cls_ranks_all.value.forEach(function(item) {
        item.src = 'db'
        if ( cls_ranks_yrs.value.indexOf(item.clsYear) == -1 ) {
          cls_ranks_yrs.value.push(item.clsYear)
        }
      })

      /* More recent years first */
      cls_ranks_yrs.value.sort().reverse()

      rnkYear.value = $7klas_utl.getMaxOfArray(cls_ranks_yrs.value)

      cls_ranks.value = cls_ranks_all.value.filter(function(item) {
        return item.clsYear == rnkYear.value
      })
  })

  var edit = Vue.ref(true)
  var error = Vue.ref(false)
  var incomplete = Vue.ref(true)
  var showForm = Vue.ref(false)

  /**
   * Shows form for adding student and checks whether information is complete
   */
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

  /**
   * Calculates student's rank from available information
   * @param bel Result from NEA on BEL
   * @param b_mul Multiplier for BEL
   * @param mat Result from NEA on Mathematics
   * @param m_mul Multiplier for Mathematics
   * @param subj1 Mark for subject 1
   * @param subj2 Mark for subject 2
   * @returns Calculated rank rounded to 2 decimal digits
   */
  function calcRank(bel, b_mul, mat, m_mul, subj1, subj2) {
    var rank = (b_mul * bel) + (m_mul * mat) +
               $7klas_utl.markToScore(subj1, rnkYear.value) +
               $7klas_utl.markToScore(subj2, rnkYear.value)
    return $7klas_utl.round(rank, 2)
  }

  /**
   * Updates calculated student's rank
   */
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

  /**
   * Ranks student among available class ranks
   */
  function rankStudent() {
    showForm.value = false

    var first_sorted = []
    var first_rank_class = 'n/a'
    var student_ranked = false
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

    if ( stRankBy.value == 'first' || stRankBy.value == 'both' ) {
      /* copy ranks and sort by first ranking... */
      cls_ranks.value.forEach(function(item) {
        first_sorted.push(item)
      })
      first_sorted.sort(function(a, b){return a.min_rank_I - b.min_rank_I}).reverse()

      /* ...and find student rank in sorted list */
      first_sorted.some(function(item) {
        first_rank_class = item.clsName
        return ( item.source != 'user' && stRank.value >= parseFloat(item.min_rank_I) );
      })

      cls_ranks.value.forEach(function(item) {
        if ( item.clsName == first_rank_class && !student_ranked ) {
          student_ranked = true
          if ( stRankBy.value == 'both' ) {
            new_item.schlName += " (I)"
          }
          new_item.rnkNum = '--'
          new_item.clsName = item.clsName
          new_item.source = 'user'
          new_arr.push(new_item)
          new_arr.push(item)
        }
        else { /* just push other items */
          new_arr.push(item)
        }
      })
    }
    else {
      new_arr = cls_ranks.value
    }

    /* Loop again to rank by second ranks */
    if ( stRankBy.value == 'second' || stRankBy.value == 'both' )
    {
      cls_ranks.value = new_arr

      var new_item2 = {}
      new_item2.schlName = stName.value
      if ( stRankBy.value == 'both' ) {
        new_item2.schlName += " (II)"
      }
      new_item2.clsName  = 'n/a'
      new_item2.min_rank_I = 0.0
      new_item2.min_rank_II = stRank.value

      new_arr = []
      student_ranked = false

      cls_ranks.value.forEach(function(item) {
        if ( stRank.value >= parseFloat(item.min_rank_II)
             && !student_ranked
             && item.source != 'user' /* avoid previous ranking */ )
        {
          student_ranked = true
          new_item2.rnkNum = '--'
          new_item2.clsName = item.clsName
          new_item2.source = 'user'
          new_arr.push(new_item2)
          new_arr.push(item)
        }
        else { /* just push other items */
          new_arr.push(item)
        }
      })
    }

    /* Add at the very end if not ranked higher */
    if ( !student_ranked ) {
      new_arr.push(new_item)
    }

    cls_ranks.value = new_arr
  }

  /**
   * Hides form for adding student
   */
  function cancel() {
    showForm.value = true
  }

  /**
   * Verifies user input to ensure correct values and sets error if problems
   * are found
   */
  function verifyInputs() {
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

    /* Mark is between 3 and 6 */
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

  /**
   * Recalculates multiplier for MAT when multiplier for BEL changes
   */
  function changeMulBel() {
    stNEAMAT_mul.value = 4 - stNEABEL_mul.value
    showRank()
  }

  /**
   * Recalculates multiplier for BEL when multiplier for MAT changes
   */
  function changeMulMat() {
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

  /**
   * Updates class ranks when a filter changes
   */
  function filterChange() {
    cls_ranks.value = cls_ranks_all.value.filter(function(item) {
      return (
        item.clsYear == rnkYear.value
        && ( schlDist.value.length === 0 || schlDist.value.includes(Number(item.schlDist.split(' ')[0])) )
      )
    })

    if ( !error.value && !incomplete.value ) {
      rankStudent()
    }
  }

  Vue.watch(stName  , verifyInputs())
  Vue.watch(stNEABEL, function(newVal) {
    /* Ensure comma is replaced with dot as decimal separator */
    stNEABEL.value = newVal.replace(/,/g, '.')
    verifyInputs()
    showRank()
  })
  Vue.watch(stNEAMAT, function(newVal) {
    /* Ensure comma is replaced with dot as decimal separator */
    stNEAMAT.value = newVal.replace(/,/g, '.')
    verifyInputs()
    showRank()
  })
  Vue.watch(stSubj1 , function() {
    verifyInputs()
    showRank()
  })
  Vue.watch(stSubj2 , function() {
    verifyInputs()
    showRank()
  })

  return {
    addStudent,
    cancel,
    changeMulBel,
    changeMulMat,
    cls_ranks,
    cls_ranks_yrs,
    districts,
    edit,
    error,
    filterChange,
    getItemStyle,
    incomplete,
    rankStudent,
    rnkYear,
    schlDist,
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
