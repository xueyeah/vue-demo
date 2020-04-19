<template>
  <div class="homeWelcome" v-if="this.$router.currentRoute.path=='/index'">
    欢迎来到首页！
  </div>
<!--  <div class="dashboard-editor-container">-->

<!--&lt;!&ndash;    <panel-group @handleSetLineChartData="handleSetLineChartData" />&ndash;&gt;-->

<!--&lt;!&ndash;    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">&ndash;&gt;-->
<!--&lt;!&ndash;      <line-chart :chart-data="lineChartData" />&ndash;&gt;-->
<!--&lt;!&ndash;    </el-row>&ndash;&gt;-->

<!--&lt;!&ndash;    <el-row :gutter="32">&ndash;&gt;-->
<!--&lt;!&ndash;      <el-col :xs="24" :sm="24" :lg="8">&ndash;&gt;-->
<!--&lt;!&ndash;        <div class="chart-wrapper">&ndash;&gt;-->
<!--&lt;!&ndash;          <raddar-chart />&ndash;&gt;-->
<!--&lt;!&ndash;        </div>&ndash;&gt;-->
<!--&lt;!&ndash;      </el-col>&ndash;&gt;-->
<!--&lt;!&ndash;      <el-col :xs="24" :sm="24" :lg="8">&ndash;&gt;-->
<!--&lt;!&ndash;        <div class="chart-wrapper">&ndash;&gt;-->
<!--&lt;!&ndash;          <pie-chart />&ndash;&gt;-->
<!--&lt;!&ndash;        </div>&ndash;&gt;-->
<!--&lt;!&ndash;      </el-col>&ndash;&gt;-->
<!--&lt;!&ndash;      <el-col :xs="24" :sm="24" :lg="8">&ndash;&gt;-->
<!--&lt;!&ndash;        <div class="chart-wrapper">&ndash;&gt;-->
<!--&lt;!&ndash;          <bar-chart />&ndash;&gt;-->
<!--&lt;!&ndash;        </div>&ndash;&gt;-->
<!--&lt;!&ndash;      </el-col>&ndash;&gt;-->
<!--&lt;!&ndash;    </el-row>&ndash;&gt;-->


<!--  </div>-->
</template>

<!--<script>-->
<!--import PanelGroup from './dashboard/PanelGroup'-->
<!--import LineChart from './dashboard/LineChart'-->
<!--import RaddarChart from './dashboard/RaddarChart'-->
<!--import PieChart from './dashboard/PieChart'-->
<!--import BarChart from './dashboard/BarChart'-->

<!--const lineChartData = {-->
<!--  newVisitis: {-->
<!--    expectedData: [100, 120, 161, 134, 105, 160, 165],-->
<!--    actualData: [120, 82, 91, 154, 162, 140, 145]-->
<!--  },-->
<!--  messages: {-->
<!--    expectedData: [200, 192, 120, 144, 160, 130, 140],-->
<!--    actualData: [180, 160, 151, 106, 145, 150, 130]-->
<!--  },-->
<!--  purchases: {-->
<!--    expectedData: [80, 100, 121, 104, 105, 90, 100],-->
<!--    actualData: [120, 90, 100, 138, 142, 130, 130]-->
<!--  },-->
<!--  shoppings: {-->
<!--    expectedData: [130, 140, 141, 142, 145, 150, 160],-->
<!--    actualData: [120, 82, 91, 154, 162, 140, 130]-->
<!--  }-->
<!--}-->

<!--export default {-->
<!--  name: 'Index',-->
<!--  components: {-->
<!--    PanelGroup,-->
<!--    LineChart,-->
<!--    RaddarChart,-->
<!--    PieChart,-->
<!--    BarChart-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      lineChartData: lineChartData.newVisitis-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    handleSetLineChartData(type) {-->
<!--      this.lineChartData = lineChartData[type]-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<style lang="scss" scoped>
  .homeWelcome {
    text-align: center;
    font-size: 30px;
    font-family: 华文行楷;
    color: #409eff;
    padding-top: 50px;
  }
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
