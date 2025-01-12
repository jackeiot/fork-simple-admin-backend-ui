<template>
  <div class="device-detail">
    <Card :title="deviceInfo?.deviceName" :loading="loading">
      <Descriptions :column="3">
        <DescriptionsItem :label="t('dms.deviceInfo.deviceSn')">
          {{ deviceInfo?.deviceSn }}
        </DescriptionsItem>
        <DescriptionsItem :label="t('dms.deviceInfo.status')">
          {{ deviceInfo?.status }}
        </DescriptionsItem>
        <!-- 添加其他设备基本信息 -->
      </Descriptions>
    </Card>

    <Card class="mt-4">
      <Tabs v-model:activeKey="activeTab">
        <TabPane key="status" :tab="t('dms.deviceInfo.statusInfo')">
          <!-- <BasicTable @register="registerStatusTable" /> -->
        </TabPane>
        <TabPane key="connection" :tab="t('dms.deviceInfo.connectionLogs')">
          <!-- <BasicTable @register="registerConnectionTable" /> -->
        </TabPane>
        <TabPane key="heartbeat" :tab="t('dms.deviceInfo.heartbeatLogs')">
          <!-- <BasicTable @register="registerHeartbeatTable" /> -->
        </TabPane>
      </Tabs>
    </Card>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { Card, Descriptions, Tabs } from 'ant-design-vue';
import { useI18n } from 'vue-i18n';
import { BasicTable, useTable } from '@/components/Table';
// import { getDeviceDetai,getDeviceStatusLog,getDeviceConnectionLogs,getDeviceHeartbeatLogs } from '@/api/dms/deviceInfo';

const TabPane = Tabs.TabPane;
const DescriptionsItem = Descriptions.Item;

const { t } = useI18n();
const route = useRoute();
const deviceSn = ref(route.params.deviceSn as string);
const deviceInfo = ref<Recordable>();
const loading = ref(false);
const activeTab = ref('status');

// 状态记录表格
// const [registerStatusTable] = useTable({
//   api: getDeviceStatusLogs,
//   columns: statusColumns,
//   params: { deviceSn },
// });

// // 上下线记录表格
// const [registerConnectionTable] = useTable({
//   api: getDeviceConnectionLogs,
//   columns: connectionColumns,
//   params: { deviceSn },
// });

// // 心跳记录表格
// const [registerHeartbeatTable] = useTable({
//   api: getDeviceHeartbeatLogs,
//   columns: heartbeatColumns,
//   params: { deviceSn },
// });

// 获取设备详情
// async function loadDeviceInfo() {
//   loading.value = true;
//   try {
//     const result = await getDeviceDetail(deviceSn.value);
//     if (result.code === 0) {
//       deviceInfo.value = result.data;
//     }
//   } finally {
//     loading.value = false;
//   }
// }

// onMounted(() => {
//   loadDeviceInfo();
// });
</script>

<style lang="less" scoped>
.device-detail {
  padding: 16px;
  background-color: #f0f2f5;
  
  :deep(.ant-card) {
    border-radius: 4px;
  }
}
</style> 