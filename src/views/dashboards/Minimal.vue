<template>
  <v-container fluid class="down-top-padding">
    <v-row>
      <v-col cols="12" sm="12">
        <StatsCard></StatsCard>
      </v-col>        
      <v-col cols="12" sm="12" lg="6">
        <RecentIssues></RecentIssues>
      </v-col>
      <v-col cols="12" sm="12" lg="6">
        <RecentSeries></RecentSeries>
      </v-col>              
      <v-col cols="12" lg="4">
        <RecentPublishers></RecentPublishers>
      </v-col> 
      <v-col cols="12" lg="4">
        <RecentFranchises></RecentFranchises>
      </v-col>            
      <v-col cols="12" lg="4">
        <RecentCreators></RecentCreators>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Minimal",
  data: () => ({
    page: {
      title: "Dashboard"
    },
    breadcrumbs: [
      {
        text: "Dashboard",
        disabled: false,
        to: "#"
      }
    ]
  }),
  components: {
    StatsCard: () =>
      import(
        "@/views/dashboards/dashboardComponents/stats-card/StatsCard"
      ),
    RecentSeries: () =>
      import(
        "@/views/dashboards/dashboardComponents/recent-series/RecentSeries"
      ),  
    RecentIssues: () =>
      import(
        "@/views/dashboards/dashboardComponents/recent-issues/RecentIssues"
      ),              
    RecentCreators: () =>
      import(
        "@/views/dashboards/dashboardComponents/recent-creators/RecentCreators"
      ),        
    RecentFranchises: () =>
      import(
        "@/views/dashboards/dashboardComponents/recent-franchises/RecentFranchises"
      ),        
    RecentPublishers: () =>
      import(
        "@/views/dashboards/dashboardComponents/recent-publishers/RecentPublishers"
      )    
  }
};
</script>