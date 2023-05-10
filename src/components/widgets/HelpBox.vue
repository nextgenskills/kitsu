<template>
    <div class="helpbox" @click="minimized=!minimized">
      <div class="helpbox-title"  v-if="!minimized">Helpful tip</div>
      <div class="helpbox-title-small"  v-if="minimized">Helpful tip <maximize-2-icon class="icon" /></div>
      <div class="helpbox-content" v-if="!minimized">
      We'll show you lots of hints and tips on how you can perfect your professional skills within each area of the studio pipeline and everyday interactions with colleagues.
  </div>
      </div>
  </template>
  
  <script>
  import {
    ClockIcon,
    EditIcon,
    KeyIcon,
    RotateCcwIcon,
    Maximize2Icon,
    TrashIcon
  } from 'vue-feather-icons'
  
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
  