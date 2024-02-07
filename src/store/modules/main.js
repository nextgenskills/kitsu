import client from '@/store/api/client'
import crisp from '@/lib/crisp'
import {
  USER_LOGIN,
  TOGGLE_DARK_THEME,
  TOGGLE_SIDEBAR,
  TOGGLE_SUPPORT_CHAT,
  TOGGLE_SIMPLE_MODE,
  TOGGLE_USER_MENU,
  SET_CONFIG,
  SET_LAST_PRODUCTION_SCREEN,
  SET_HELP_SECTION,
  SET_CURRENT_PRODUCTION,
  SHOW_PREVIEW_FILE,
  HIDE_PREVIEW_FILE,
  RESET_ALL
} from '@/store/mutation-types'

const initialState = {
  currentProductionScreen: 'assets',
  isDarkTheme: false,
  isSimpleMode: true,
  isSidebarHidden: true,
  isSupportChat: true,
  isUserMenuHidden: true,
  lastProductionScreen: 'assets',
  lastProductionViewed: null,
  previewFileIdToShow: '',
  helpSection: 'default',
  mainConfig: {},
  previewFileIdToShow: ''
}

const state = { ...initialState }

const getters = {
  currentProductionScreen: state => state.currentProductionScreen,
  isDarkTheme: state => state.isDarkTheme,
  isSimpleMode: state => state.isSimpleMode,
  isSidebarHidden: state => state.isSidebarHidden,
  isSupportChat: state => state.isSupportChat,
  isUserMenuHidden: state => state.isUserMenuHidden,
  lastProductionScreen: state => state.lastProductionScreen,
  lastProductionViewed: state => state.lastProductionViewed,
  previewFileIdToShow: state => state.previewFileIdToShow,
  helpSection: state => state.helpSection,
  mainConfig: state => state.mainConfig,

}

const actions = {
  toggleDarkTheme({ commit, state }) {
    commit(TOGGLE_DARK_THEME)
    if (localStorage) {
      localStorage.setItem('dark-theme', state.isDarkTheme)
    }
  },

  setSupportChat({ commit, state }, isSupportChat) {
    commit(TOGGLE_SUPPORT_CHAT, isSupportChat)
    crisp.setChatVisibility(isSupportChat)
  },

  toggleSidebar({ commit, state }) {
    commit(TOGGLE_SIDEBAR)
  },

  toggleUserMenu({ commit, state }) {
    commit(TOGGLE_USER_MENU)
  },

  setLastProductionScreen({ commit, state }, lastProductionScreen) {
    commit(SET_LAST_PRODUCTION_SCREEN, lastProductionScreen)
  },

  setHelpSection({ commit, state }, helpSection) {
    commit(SET_HELP_SECTION, helpSection)
  },

  loadEvents({ commit, state }, { after, before }) {
    return client.getEvents(after, before)
  },

  async setMainConfig({ commit }) {
    let config = {}
    try {
      config = await client.getConfig()
    } catch (error) {
      console.log(error)
    }
    commit(SET_CONFIG, config)
    return config
  },

  searchData(_, { query, limit = 3, offset = 0, productionId, index_names }) {
    return client.searchData(query, limit, offset, index_names, productionId)
  }
}

const mutations = {
  [TOGGLE_DARK_THEME](state) {
    state.isDarkTheme = !state.isDarkTheme
  },

  [TOGGLE_SUPPORT_CHAT](state, isSupportChat) {
    state.isSupportChat = isSupportChat
  },

  [TOGGLE_SIDEBAR](state) {
    state.isSidebarHidden = !state.isSidebarHidden
  },

  [TOGGLE_USER_MENU](state) {
    state.isUserMenuHidden = !state.isUserMenuHidden
  },

  [SET_LAST_PRODUCTION_SCREEN](state, lastProductionScreen) {
    state.lastProductionScreen = lastProductionScreen
  },

  [SET_HELP_SECTION](state, helpSection) {
    state.helpSection = helpSection
  },

  [SET_CURRENT_PRODUCTION](state, productionId) {
    if (productionId) state.lastProductionViewed = productionId
  },

  [USER_LOGIN](state, user) {
    if (user && user.role === 'client') {
      state.lastProductionScreen = 'playlists'
    }
  },

  [SHOW_PREVIEW_FILE](state, previewFileId) {
    state.previewFileIdToShow = previewFileId
  },

  [HIDE_PREVIEW_FILE](state) {
    state.previewFileIdToShow = ''
  },

  [SET_CONFIG](state, mainConfig) {
    state.mainConfig = mainConfig
  },

  [RESET_ALL](state) {
    const isDarkTheme = state.isDarkTheme
    Object.assign(state, { ...initialState })
    state.isDarkTheme = isDarkTheme
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
