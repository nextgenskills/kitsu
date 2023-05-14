<template>
    <div class="helpbox" @click="minimized=!minimized" v-if="visible">
      <div class="helpbox-title"  v-if="!minimized">Helpful tip</div>
      <div class="helpbox-title-small"  v-if="minimized">Helpful tip <maximize-2-icon class="icon" /></div>
      <div class="helpbox-content" v-if="!minimized">
     {{ helpText }}
  </div>
      </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex'

  import {
    ClockIcon,
    EditIcon,
    KeyIcon,
    RotateCcwIcon,
    Maximize2Icon,
    TrashIcon
  } from 'vue-feather-icons'
  
  import {
  HELP_TEXT
  } from '@/lib/helptext'


  export default {
    name: 'help-box',
    props: {
      text: {
        default: '',
        type: String
      },
      minimized: {
        default: false,
        type: Boolean
      }
    },
    components: {
      Maximize2Icon
    },
    computed: {
        ...mapGetters([
        'helpSection'
        ]),
        helpText() {

            for (const [key, value] of Object.entries(HELP_TEXT)) {
                console.log(HELP_TEXT[key].section)
                if(HELP_TEXT[key].section == this.helpSection){
                    let value_count = HELP_TEXT[key].values.length;
                    let random_index = Math.floor(Math.random() * value_count);
                    return HELP_TEXT[key].values[random_index]
                }
            }
            return '';
        },
        visible() {
            return this.helpText != '';
        }
    },


  }
  </script>
  
  <style lang="scss" scoped>
  .icon {
      height:1.3rem;
      padding:0.1rem;
  }
  .helpbox {
    cursor: pointer;
    position:fixed;
    bottom:10px;
    left:10px;
    background: #fff; 
    margin:10px;
    padding:10px;
    max-width: 400px;
    border-radius:5px;
    box-shadow: 0 0 3px 3px #eee;
  }
  
  .helpbox-title {
      font-size: 1.2em;
      margin-bottom: 5px;
  }
  
  .helpbox-title-small {
      font-size: 1em;
      margin-bottom: 5px;
  }
  
  .helpbox-content {
      font-size: 1em;
  }
  
  </style>
  