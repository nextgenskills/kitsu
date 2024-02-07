<template>
  <div
    :class="{
      modal: true,
      'is-active': active
    }"
  >
    <div class="modal-background" @click="$emit('cancel')"></div>

    <div class="modal-content">
      <div class="box">
        <h1 class="title">
          {{ $t('main.search_query_edit') }}
        </h1>

        <form v-on:submit.prevent>
          <text-field
            ref="nameField"
            :label="$t('assets.fields.name')"
            v-model.trim="form.name"
            @enter="runConfirmation"
            v-focus
          />

          <text-field
            :label="$t('main.search_query')"
            v-model.trim="form.search_query"
            @enter="runConfirmation"
          />

          <combobox
            :label="$t('main.filter_group')"
            :options="groupOptions"
            v-model="form.search_filter_group_id"
            v-if="isGroupEnabled"
          />
        </form>

        <modal-footer
          :error-text="$t('main.search_query_edit_error')"
          :is-error="isError"
          :is-loading="isLoading"
          @confirm="runConfirmation"
          @cancel="$emit('cancel')"
        />
      </div>
    </div>
  </div>
</template>

<script>
/*
 * Modal used to edit search filter information. Users prefer to rename the
   filter label when it's too complex to read or too long.
 */
import { modalMixin } from '@/components/modals/base_modal'
import ModalFooter from '@/components/modals/ModalFooter'

import Combobox from '@/components/widgets/Combobox'
import TextField from '@/components/widgets/TextField'

export default {
  name: 'edit-search-filter-modal',
  mixins: [modalMixin],
  components: {
    Combobox,
    ModalFooter,
    TextField
  },

  props: {
    active: {
      type: Boolean,
      default: false
    },
    isError: {
      type: Boolean,
      default: false
    },
    isGroupEnabled: {
      type: Boolean,
      default: false
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    searchQueryToEdit: {
      type: Object,
      default: () => {}
    },
    groupOptions: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      form: {
        id: null,
        name: '',
        search_filter_group_id: null,
        search_query: '',
        task_status_id: null
      }
    }
  },

  methods: {
    runConfirmation(event) {
      if (!this.form.name.length) {
        this.$refs.nameField.focus()
        return
      }

      if (!event || event.keyCode === 13 || !event.keyCode) {
        this.$emit('confirm', {
          id: this.searchQueryToEdit.id,
          ...this.form
        })
      }
    }
  },

  watch: {
    searchQueryToEdit() {
      if (this.searchQueryToEdit?.id) {
        this.form.id = this.searchQueryToEdit.id
        this.form.name = this.searchQueryToEdit.name
        this.form.search_filter_group_id =
          this.searchQueryToEdit.search_filter_group_id
        this.form.search_query = this.searchQueryToEdit.search_query
      } else {
        this.form = {
          id: null,
          name: '',
          search_filter_group_id: null,
          search_query: '',
          task_status_id: null
        }
      }
    },

    active() {
      if (this.active) {
        setTimeout(() => {
          this.$refs.nameField.focus()
        }, 100)
      }
    }
  }
}
</script>
