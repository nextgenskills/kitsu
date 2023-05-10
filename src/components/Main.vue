<template>
  <XyzTransition appear xyz="fade">
    <div class="main">
      <topbar />
      <sidebar />
      <router-view />
      <help-box text="helllooo" />
    </div>
  </XyzTransition>
</template>

<script>
import Topbar from '@/components/tops/Topbar'
import Sidebar from '@/components/sides/Sidebar'
import HelpBox from '@/components/widgets/HelpBox'

export default {
  name: 'main-wrapper',
  components: {
    Topbar,
    Sidebar,
    HelpBox
  },

  mounted() {
    this.$socket.connect()
  }
}
</script>

<style>
.main {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: $white-grey;
}
</style>
