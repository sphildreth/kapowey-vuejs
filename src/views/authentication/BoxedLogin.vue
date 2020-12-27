<template>
  <v-container id="login" class="fill-height justify-center" tag="section">
    <v-row justify="center">
      <v-col lg="11" sm="8" xl="7">
        <v-card class="elevation-4">
          <v-row>
            <v-col col="3">
              <div class="pa-7 pa-sm-12">
                <img src="@/assets/images/logo-icon.png" />
                <h2 class="font-weight-bold mt-4 blue-grey--text text--darken-2">Sign in</h2>
                <h6 class="subtitle-1">
                  Don't have an account?
                  <a href="/register" class>Sign Up</a>
                </h6>

                <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submit">
                  <v-text-field
                    v-model="username"
                    :rules="usernameRules"
                    label="Username"
                    class="mt-4"
                    required
                    outlined
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    :counter="10"
                    :rules="passwordRules"
                    label="Password"
                    required
                    outlined
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                  ></v-text-field>

                  <div class="d-block d-sm-flex align-center mb-4 mb-sm-0">
                    <v-checkbox
                      v-model="checkbox"
                      :rules="[v => !!v || 'You must agree to continue!']"
                      label="Remember me?"
                      required
                    ></v-checkbox>
                    <div class="ml-auto">
                      <a href="javascript:void(0)" class="link">Forgot password?</a>
                    </div>
                  </div>
                  <v-btn
                    :disabled="!valid"
                    color="info"
                    block
                    class="mr-4"
                    submit
                    @click="submit"
                  >Sign In</v-btn>
                </v-form>
                <p v-if="showError" id="error">Username or Password is incorrect</p>                
                <div class="text-center mt-6">
                  <v-chip pill class="mr-2">
                    <v-avatar left>
                      <v-btn color="blue lighten-1" class="white--text">
                        <v-icon>mdi-twitter</v-icon>
                      </v-btn>
                    </v-avatar>Twitter
                  </v-chip>
                  <v-chip pill>
                    <v-avatar left>
                      <v-btn color="teal lighten-2" class="white--text">
                        <v-icon>mdi-github</v-icon>
                      </v-btn>
                    </v-avatar>Github
                  </v-chip>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import { mapActions } from "vuex";

export default {
  name: "BoxedLogin",

  data: () => ({
    valid: true,
    password: "",
    show1: false,
    passwordRules: [
      v => !!v || "Password is required",
      v => (v && v.length <= 50) || "Password must be less than 50 characters",
      v => (v && v.length > 10) || "Password must be more than 10 characters"
    ],
    username: "",
    usernameRules: [
      v => !!v || "Username is required",
      v => (v && v.length <= 256) || "Username must be less than 256 characters",
      v => (v && v.length > 2) || "Username must be more than 2 characters"
    ],
    checkbox: false,
    showError: false
  }),
  computed: {},
  methods: {
    ...mapActions(["LogIn"]),
    async submit() {
      const auth = { username: this.username, password: this.password };    
      this.$refs.form.validate();            
      if (this.$refs.form.validate(true)) {           
        try {
            await this.LogIn(auth);
            this.$router.push({ path: "/" });
            this.showError = false
        } catch (error) {
          this.showError = true
        }
      }
    }
  }
};
</script>
