<template>
  <v-container fluid class="down-top-padding">
    <BaseBreadcrumb :title="page.title" :icon="page.icon" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-toolbar dense flat>
            <v-toolbar-title>Creators title</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text>
            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit</span>
            <br />
            <br />
            <br />
            <br />
            <br />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "CreatorsPage",
  data: () => ({
    page: {
      title: "Creators"
    },
    elementVisible: false,
    breadcrumbs: [
      {
        text: "Dashboard",
        disabled: false,
        to: "/"
      },
      {
        text: "Creators",
        disabled: true
      }
    ]
  })
};
</script>