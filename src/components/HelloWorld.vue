<template>
  <div class="hello">
    <h2>{{ msg }}</h2>
    <h2>Google Auth Initiated: {{ Vue3GoogleOauth.isInit }}</h2>
    <h3>User Authorized: {{ Vue3GoogleOauth.isAuthorized }}</h3>
    <!-- Basic details -->   
    <div> 
    <h4 v-if="userName">Name: {{userName}}</h4>
    <h4 v-if="user">Email Id: {{user}}</h4>
    <h4 v-if="userFamilyName">Family Name: {{userFamilyName}}</h4>
    <h4 v-if="userGivenName">Given Name: {{userGivenName}}</h4>
    <h5>User Profile Picture</h5>
    <img class="user-image" v-if="userImage" alt="user logo" :src="userImage">
    </div>
    <!-- Basic details End -->
    <button @click="handleClickSignIn" :disabled="!Vue3GoogleOauth.isInit || Vue3GoogleOauth.isAuthorized">sign in</button>
    <button @click="handleClickGetAuthCode" :disabled="!Vue3GoogleOauth.isInit">get authCode</button>
    <button @click="handleClickSignOut" :disabled="!Vue3GoogleOauth.isAuthorized">sign out</button>
    <button @click="handleClickDisconnect" :disabled="!Vue3GoogleOauth.isAuthorized">disconnect</button>
</div>
</template>

<script>
import { inject, toRefs } from "vue";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data(){
    return {
      user: '',
      userImage:'',
      userName:'',
      userFamilyName:'',
      userGivenName:''
    }
  },
  methods: {
    async handleClickSignIn(){
      try {
        const googleUser = await this.$gAuth.signIn();
        if (!googleUser) {
          return null;
        }
        console.log("googleUser", googleUser);
        
        this.user = googleUser.getBasicProfile().getEmail();
        this.userImage = googleUser.getBasicProfile().getImageUrl();
        this.userName = googleUser.getBasicProfile().getName();
        this.userFamilyName = googleUser.getBasicProfile().getFamilyName();
        this.userGivenName = googleUser.getBasicProfile().getGivenName();

        console.log("getId", this.user);
        console.log('Name',this.userName);
        console.log('FamilyName',this.userFamilyName);
        console.log('GivenName',this.userGivenName);
        console.log("Image",this.userImage);
        console.log("getBasicProfile", googleUser.getBasicProfile());
        console.log("getAuthResponse", googleUser.getAuthResponse());
        console.log(
          "getAuthResponse",
          this.$gAuth.instance.currentUser.get().getAuthResponse()
        );
      } catch (error) {
        //on fail do something
        console.error(error);
        return null;
      }
    },
    async handleClickGetAuthCode(){
      try {
        const authCode = await this.$gAuth.getAuthCode();
        console.log("authCode", authCode);
      } catch(error) {
        //on fail do something
        console.error(error);
        return null;
      }
    },
    async handleClickSignOut() {
      try {
        await this.$gAuth.signOut();
        console.log("isAuthorized", this.Vue3GoogleOauth.isAuthorized);
        this.user = "";
        this.userImage ="";
        this.userName = "";
        this.userFamilyName = "";
        this.userGivenName="";
        this.getImageUrl="";
      } catch (error) {
        console.error(error);
      }
    },
    handleClickDisconnect() {
      window.location.href = `https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=${window.location.href}`;
    },
  },
  setup(props) {
    const { isSignIn } = toRefs(props);
    const Vue3GoogleOauth = inject("Vue3GoogleOauth");
    const handleClickLogin = () => {};
    return {
      Vue3GoogleOauth,
      handleClickLogin,
      isSignIn,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  -webkit-transition: 0.1s;
  transition: 0.1s;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  margin-right: 1em;
}
button:disabled {
  background: #fff;
  color: #ddd;
  cursor: not-allowed;
}

.user-image{
  height : 150px;
  width: auto;
}
</style>

