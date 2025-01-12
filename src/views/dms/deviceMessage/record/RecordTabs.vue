<template>
  <div class="device-message ">
    <!-- Tab切换 -->
    <Tabs v-model:activeKey="recordActiveKey" type="card" class="record-tabs">

      <TabPane key="online" tab="上下线记录">
        <Online />
      </TabPane>
      <TabPane key="event" tab="事件记录">
        <Event />
      </TabPane>
      <TabPane key="flow" tab="心跳流量记录">
        <Flow />
      </TabPane>
      <TabPane key="network" tab="网络信号记录">
        <Network />
      </TabPane>
      <TabPane key="task" tab="远程下发记录">
        <Task />
      </TabPane>
      <TabPane key="log" tab="日志记录">
        <Logs />
      </TabPane>
    </Tabs>
  </div>
</template>

<script lang="ts" setup>
import { ref} from 'vue';
import {  Tabs,  } from 'ant-design-vue';
import Online from './online.vue';
import Event from './event.vue';
import Flow from './flow.vue';
import Task from './task.vue';
import Logs from './logs.vue';
import Network from './network.vue';
const { TabPane } = Tabs; // 解构 TabPane

const recordActiveKey = ref('online');

</script>


<style lang="less" scoped>
// .device-message {
//   background-color: #141414;
//   min-height: 100vh;
//   display: flex;
//   flex-direction: column;


//   :deep(.record-tabs) {
//     .ant-tabs-nav {
//       margin-bottom: 16px;
      
//       &::before {
//         border-bottom: none;
//       }
//     }

//     .ant-tabs-tab {
//       background: transparent;
//       border: none;
//       color: rgba(255, 255, 255, 0.65);
      
//       &:hover {
//         color: #fff;
//       }
      
//       &.ant-tabs-tab-active {
//         background: transparent;
        
//         .ant-tabs-tab-btn {
//           color: #fff;
//         }
//       }
//     }

//     .ant-tabs-nav-list {
//       border: none;
//     }

//     .ant-tabs-content {
//       color: #fff;
//     }
//   }

//   :deep(.duration-text) {
//     font-size: 14px;  // 或者其他你想要的大小
//     margin-left: 8px;
//     opacity: 0.85;    // 略微降低不透明度使其不那么显眼
//   }
// }
</style>