<template>
  <v-app-bar app clipped-left clipped-right color="primary" dark>
    <!---Logo part -->
    <v-toolbar-title class="align-center d-flex">
      <span class="logo-icon">
        <img src="../../../assets/images/logo-light-icon.png" />
      </span>
      <span class="logo-text ml-2" :class="`${showLogo ? '' : 'hidelogo'}`">
        <img src="../../../assets/images/logo-light-text.png" class="mt-2" />
      </span>
    </v-toolbar-title>
    <!---Logo part -->
    <!---/Toggle sidebar part -->
    <div @click="showhideLogo">
      <v-app-bar-nav-icon
        @click="
          $vuetify.breakpoint.smAndDown
            ? setSidebarDrawer(!Sidebar_drawer)
            : $emit('input', !value)
        "
      />
    </div>
    <!---/Toggle sidebar part -->
    <!---Search part -->
    <v-btn dark icon class="mr-1 d-sm-block d-none" @click="searchbox">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <div v-if="showSearch" class="searchinput primary">
      <template>
        <v-text-field
          placeholder="Search & hit enter"
          class="mt-3 mb-0"
          append-icon="mdi-close"
          @click:append="searchbox"
        ></v-text-field>
      </template>
    </div>
    <!---/Search part -->
    <v-spacer />
    <!---right part -->
    <!---Notification -->
    <v-menu
      bottom
      left
      offset-y
      v-if="this.$store.getters.isAuthenticated"      
      origin="top right"
      transition="scale-transition"
    >
      <template v-slot:activator="{ on }">
        <v-btn dark icon v-on="on" class="mr-1">
          <v-badge color="red" dot>
            <v-icon>mdi-message</v-icon>
          </v-badge>
        </v-btn>
      </template>

      <v-list>
        <h4 class="px-5 py-3 pt-2 font-weight-medium title">Notifications</h4>
        <v-divider></v-divider>
        <v-list-item v-for="(item, i) in notifications" :key="i" @click="href">
          <v-list-item-title>
            <div class="d-flex align-center py-3">
              <div class>
                <v-btn
                  class="mr-3"
                  depressed
                  fab
                  small
                  dark
                  :color="item.iconbg"
                >
                  <v-icon dark>{{ item.icon }}</v-icon>
                </v-btn>
              </div>
              <div>
                <h4 class="font-weight-medium">{{ item.title }}</h4>
                <span
                  class="text--secondary caption descpart d-block text-truncate"
                  >{{ item.desc }}</span
                >
                <small class="text--secondary">{{ item.time }}</small>
              </div>
            </div>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <!---Notification -->
    <!---User -->
    <v-menu
      bottom
      left
      offset-y
      origin="top right"
      transition="scale-transition"
    >

      <template v-slot:activator="{ on }" v-if="!this.$store.getters.isAuthenticated">
        <v-btn dark icon v-on="on" class="mr-1" to="/login">
          <v-avatar size="40" class="mdi mdi-login-variant" style="font-size:36px;">
          </v-avatar>
        </v-btn>
      </template>

      <template v-slot:activator="{ on }" v-else>
        <v-btn dark icon v-on="on" class="mr-1">
          <v-avatar size="40">
            <img :src="currentUserAvatarUrl" :alt="currentUserUsername" :title="currentUserUsername" />
          </v-avatar>
        </v-btn>
      </template>

      <v-list v-if="this.$store.getters.isAuthenticated">
        <v-list-item
          v-for="(item, i) in userprofile"
          :key="i"
          :to="item.to"
          @click="href"
        >
          <v-icon class="mr-1">{{ item.icon }}</v-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <!---User -->
  </v-app-bar>
</template>
<script>
// Utilities
import { mapState, mapMutations } from "vuex";
export default {
  name: "Header",

  components: {},

  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    showLogo: true,
    showSearch: false,
    notifications: [
      {
        title: "Launch Admin",
        iconbg: "error",
        icon: "mdi-link-variant",
        desc: "Just see the my new admin!",
        time: "9:30AM",
      },
      {
        title: "Event today",
        iconbg: "success",
        icon: "mdi-calendar-check",
        desc: "Just a reminder that you have event",
        time: "10:30AM",
      },
      {
        title: "Settings",
        iconbg: "info",
        icon: "mdi-cog",
        desc: "You can customize this template as you want",
        time: "11:30AM",
      },
      {
        title: "Pavan Kumar",
        iconbg: "indigo",
        icon: "mdi-account",
        desc: "Sent you an notification",
        time: "12:30AM",
      },
    ],
    userprofile: [
      { 
        to:"/editprofile",
        title: "Profile Settings",
        icon: "mdi mdi-account-circle",        
      },
      { 
        to:"/logout", 
        icon: "mdi mdi-logout-variant",
        title: "Logout" 
      },
    ],
    href() {
      return undefined;
    },
  }),

  computed: {
    ...mapState(["Sidebar_drawer"]),
    currentUserAvatarUrl() {
      return this.$store.getters.user.avatarUrl;
    },   
    currentUserUsername() {
      return this.$store.getters.user.username;
    }
  },

  methods: {
    ...mapMutations({
      setSidebarDrawer: "SET_SIDEBAR_DRAWER",
    }),
    showhideLogo: function() {
      this.showLogo = !this.showLogo;
    },
    searchbox: function() {
      this.showSearch = !this.showSearch;
    }   
  },
};
</script>

<style lang="scss">
.hidelogo {
  display: none;
}
.searchinput {
  position: absolute;
  width: 100%;
  margin: 0;
  left: 0;
  z-index: 10;
  padding: 0 15px;
}
.descpart {
  max-width: 220px;
}
</style>
