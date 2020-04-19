<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="true"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <el-submenu :index="index+''" v-for="(item,index) in routes" v-if="!item.hidden" :key="index">
          <template slot="title">
            <i style="color: #409eff;margin-right: 5px" :class="item.iconCls"></i>
            <span>{{item.name}}</span>
          </template>
<!--            <el-menu-item :index="child.path" :to="resolvePath(child.path)" v-for="(child,indexj) in item.children" :key="indexj">-->
<!--              {{child.name}}-->
<!--            </el-menu-item>-->
          <template v-for="(child,indexj) in item.children">
            <app-link :to="resolvePath(child.path)" >
              <el-menu-item :index="child.path" :key="indexj">
                {{child.name}}
              </el-menu-item>
            </app-link>
          </template>


        </el-submenu>
      </el-menu>
<!--      <el-menu-->
<!--        :default-active="activeMenu"-->
<!--        :collapse="isCollapse"-->
<!--        :background-color="variables.menuBg"-->
<!--        :text-color="variables.menuText"-->
<!--        :unique-opened="true"-->
<!--        :active-text-color="variables.menuActiveText"-->
<!--        :collapse-transition="false"-->
<!--        mode="vertical"-->
<!--      >-->
<!--        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />-->
<!--      </el-menu>-->
    </el-scrollbar>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import { mapGetters } from 'vuex'
import Logo from './Logo'
import AppLink from './Link'
import SidebarItem from './SidebarItem'
import variables from '@/assets/styles/variables.scss'

export default {
  components: { SidebarItem, Logo,AppLink },
  props: {
    // route object
    basePath: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ]),
    routes() {
      return this.$store.getters.menu_routes;
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods: {
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        console.log("routePath "+routePath);
        return routePath
      }
      if (isExternal(this.basePath)) {
        console.log("isExternal "+this.basePath);
        return this.basePath
      }

      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
