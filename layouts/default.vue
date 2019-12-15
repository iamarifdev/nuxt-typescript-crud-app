<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
      <v-list dense>
        <template v-for="item in items">
          <v-row v-if="item.heading" :key="item.heading" align="center">
            <v-col cols="6">
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-col>
            <v-col cols="6" class="text-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-col>
          </v-row>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon
          >
            <template v-slot:activator>
              <v-list-item :to="item.to">
                <v-list-item-content>
                  <v-list-item-title>{{ item.text }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <v-list-item v-for="(child, i) in item.children" :key="i" link :to="item.to">
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ child.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item v-else :key="item.text" link :to="item.to">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down">{{ appName }}</span>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        class="hidden-sm-and-down"
      />
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>

      <v-menu bottom origin="center center" transition="scale-x-transition">
        <template v-slot:activator="{ on }">
          <v-btn icon large v-on="on">
            <v-avatar size="32px" item>
              <v-img src="/avatar.png" alt="avatar" />
            </v-avatar>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Account Settings</v-list-item-title>
          </v-list-item>
          <v-list-item @click="logout">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- <v-btn icon large>
        <v-avatar size="32px" item>
          <v-img src="/avatar.png" alt="avatar" />
        </v-avatar>
      </v-btn> -->
    </v-app-bar>
    <v-content>
      <v-container class="container container--fluid">
        <nuxt />
      </v-container>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
import { AuthenticationModule } from '~/store/modules';

@Component
export default class Default extends Vue {
  @Prop({ type: String }) readonly source!: string;
  public authModule: AuthenticationModule;

  public appName: string = 'CRUD Application';
  public drawer = null;
  public items = [
    { icon: 'mdi-home', text: 'Home', to: '/' },
    { icon: 'mdi-account-multiple', text: 'Customers', to: '/customer/list' }
    // {
    //   icon: 'mdi-chevron-up',
    //   'icon-alt': 'mdi-chevron-down',
    //   text: 'Labels',
    //   model: true,
    //   children: [{ icon: 'mdi-plus', text: 'Create label' }]
    // },
    // {
    //   icon: 'mdi-chevron-up',
    //   'icon-alt': 'mdi-chevron-down',
    //   text: 'More',
    //   model: false,
    //   children: [
    //     { text: 'Import' },
    //     { text: 'Export' },
    //     { text: 'Print' },
    //     { text: 'Undo changes' },
    //     { text: 'Other contacts' }
    //   ]
    // },
  ];

  public created(): void {
    this.authModule = getModule(AuthenticationModule, this.$store);
  }

  public logout(): void {
    this.authModule.logout();
    this.$router.push('/auth/login');
  }
}
</script>
