<template>
  <div class="device-message p-4">
    <!-- 页面头部，包含刷新时间选择器 -->
    <div class="header">
      <div class="refresh-selector">
        <label for="refresh-interval">在线状态刷新间隔:</label>
        <select v-model="refreshInterval">
          <option value="5000">5秒</option>
          <option value="10000">10秒</option>
          <option value="30000">30秒</option>
          <option value="60000">60秒</option>
          <option value="300000">5分钟</option>
          <option value="600000">10分钟</option>
        </select>
      </div>
      <div class="refresh-selector">
        <!-- <Button type="primary" :style="{marginRight:'20px'}" disabled>激活远程访问</Button> -->
        <Button type="primary" :style="{marginRight:'20px'}" :onclick='BtnRenewReport'>{{ t('dms.taskPush.taskTypeRenewReport') }}</Button>
        <Button type="primary" :style="{marginRight:'20px'}" :onclick='BtnReportLog'>{{ t('dms.taskPush.taskTypeReportLog') }}</Button>
        <Button type="primary" :style="{marginRight:'10px'}" :onclick='BttnReboot'>{{ t('dms.taskPush.taskTypeReboot') }}</Button>
      </div>
    </div>

    <!-- 统计卡片 -->
    <Row :gutter="16" class="mb-4">
      <Col :span="6">
        <Card class="stat-card dark-card">
          <Statistic
            :value="`${deviceInfo?.name}__${deviceInfo?.deviceMac}`"
            :value-style="{ color: '#fffff' }"
            title="设备"
          />
        </Card>
      </Col>
      <Col :span="6">
        <Card class="stat-card dark-card">
          <Statistic
            :value="onlineStatus?.isOnline===1 ? '在线' : '离线'"
            :value-style="{ color: onlineStatus?.isOnline===DeviceStatuwEnum.isOnline ? '#52c41a' : '#ff4d4f' }"
            title="状态"
          >
          <template #prefix>
            <Badge :status="onlineStatus?.isOnline===DeviceStatuwEnum.isOnline ? 'success' : 'error'" />
          </template>
          <template #suffix>
            <span class="duration-text">({{ onlineStatus.protocolType }})</span>
            <span class="duration-text">{{ getDurationText }}</span>
          
          </template>
          </Statistic>
        </Card>
      </Col>

      <!-- <Col :span="6">
        <Card class="stat-card dark-card">
          <Statistic
            :value="0.00"
            :value-style="{ color: '#3f8600' }"
            :precision="2"
            prefix="$"
            title="事件"
          />
        </Card>
      </Col> -->
    </Row>


    <!-- Tab切换 -->
    <Tabs v-model:activeKey="activeKey" type="card" class="custom-tabs">
      <TabPane key="property" tab="属性">
        <DeviceProperty :device-info="deviceInfo" :active-key="activeKey" />
      </TabPane>
      <TabPane key="heartbeat" tab="心跳数据">
        <DeviceHeartbeat ref="deviceHeartbeat" :active-key="activeKey" />
      </TabPane>
      <TabPane key="lan" tab="LAN局域网">
        <Lan :active-key="activeKey" />
      </TabPane>
      <TabPane key="wifi" tab="WIFI服务">
        <Wifi :active-key="activeKey" />
      </TabPane>
      <TabPane key="vpn" tab="VPN服务">
        <Vpn :active-key="activeKey" />
      </TabPane>
      <!-- <TabPane key="serial" tab="AIot服务">
        <Iot :active-key="activeKey" />
      </TabPane> -->

      <TabPane key="remote" tab="远程访问" v-if="onlineStatus.protocolType !== 'http'">
        <Remote :active-key="activeKey" />
      </TabPane>
      <TabPane key="debug" tab="调试">
        <OnlineDebug :active-key="activeKey" />
      </TabPane>

      <TabPane key="upgrade" tab="升级固件">
        <Update :active-key="activeKey" />
      </TabPane>
      <!-- <TabPane key="backup" tab="备份恢复">
        <Backup :active-key="activeKey" />
      </TabPane> -->

      <TabPane key="record" tab="数据记录">
        <RecordTabs :active-key="activeKey" />
      </TabPane>
      <!-- <TabPane key="setting" tab="设置">
        设备基本信息
      </TabPane> -->
    </Tabs>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, onUnmounted,computed, watch } from 'vue';
  import { Card, Row, Col, Statistic, Tabs, Badge,Button,Modal,message } from 'ant-design-vue';
  import DeviceProperty from './DeviceProperty.vue';
  import DeviceHeartbeat from './DeviceHeartbeat.vue';
  import { getDeviceOnline } from '@/api/dms/deviceMessage'; // 导入 API 函数
  import RecordTabs from './record/RecordTabs.vue';
  import Update from './upgrade/upgrade.vue';
  import Lan from './lan/lan.vue';
  import Wifi from './wifi/wifi.vue';
  import Remote from './remote/remote.vue';
  import Vpn from './vpn/vpn.vue';
  import OnlineDebug from './onlineDebug/debug.vue';
  import { useI18n } from 'vue-i18n';
  const { t } = useI18n();
  const { TabPane } = Tabs; // 解构 TabPane

  import { DeviceStatuwEnum } from '@/utils/enum/deviceTask';
  import { DeviceOnlineStatusInfo} from '@/api/dms/model/deviceMessageModel';
  import {handleCallbackOnline,handleReboot,handleReportLog} from '@/views/dms/devicetask/action';


  const activeKey = ref('property');
  // const deviceInfo = ref<DeviceDetailMessageInfo>({}); // 初始化 deviceInfo
  const onlineStatus = ref<DeviceOnlineStatusInfo>({});
  const deviceInfo = JSON.parse(localStorage.getItem('clientinfo') || "{}")


  // 获取设备信息
  async function getStatus() {
    try {
      const response = await getDeviceOnline({id: deviceInfo.deviceSn}); 
      // console.log("online data ===>", response)
      onlineStatus.value = response.data; 
      // localStorage.setItem('clientinfo',JSON.stringify(deviceInfo.value))
    } catch (error) {
      // console.error('获取设备信息失败:', error);
    }
  }

  // 计算时长文本
  const getDurationText = computed(() => {
    const lastLogin = onlineStatus.value?.lastLogin;
    if (!lastLogin) return '';
    return getDuration(lastLogin);
  });

  // 计算时长
  function getDuration(lastLogin: number): string {
    const now = Date.now();
    const diff = Math.abs(now - lastLogin); // 毫秒差值
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    const parts: string[] = [];
    
    if (days > 0) {
      parts.push(`${days}天`);
    }
    if (hours % 24 > 0) {
      parts.push(`${hours % 24}时`);
    }
    if (minutes % 60 > 0) {
      parts.push(`${minutes % 60}分`);
    }
    if (seconds % 60 > 0 || parts.length === 0) {
      parts.push(`${seconds % 60}秒`);
    }
    
    return parts.join('');
  }

  function BtnRenewReport() {
      Modal.confirm({
        title: t('dms.taskPush.confirm'),
        content: t('dms.taskPush.taskTypeRenewReport'),
        width: 500,
        async onOk() {handleCallbackOnline([deviceInfo.clientId]) },
      });
  }

  function BttnReboot() {
      Modal.confirm({
        title: t('dms.taskPush.confirm'),
        content: t('dms.taskPush.taskTypeReboot'),
        width: 500,
        async onOk() {handleReboot([deviceInfo.clientId]) },
      });
  }
  function BtnReportLog() {
    Modal.confirm({
      title: t('dms.taskPush.confirm'),
      content: t('dms.taskPush.taskTypeReportLog'),
      width: 500,
      async onOk() {handleReportLog([deviceInfo.clientId])},
    });
  }


  // 定义刷新间隔选项
  const refreshInterval = ref(300000); // 默认 5 分钟

  let timer: NodeJS.Timeout | null = null;

  // 启动定时器
  function startTimer() {
    if (timer) {
      clearInterval(timer);
    }
    timer = setInterval(getStatus, refreshInterval.value);
  }

  // 清除定时器
  function clearTimer() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  onMounted(() => {
    getStatus(); // 初始获取设备信息
    startTimer(); // 启动定时器
  });

  onUnmounted(() => {
    clearTimer(); // 清除定时器
  });

  // 监听刷新间隔变化
  watch(refreshInterval, () => {
    startTimer(); // 当刷新间隔变化时，重新启动定时器
  });

</script>

<style lang="less" scoped>
.device-message {
  // background-color: #141414;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }
}

    .refresh-selector {
      label {
        // color: rgba(255, 255, 255, 0.65);
        margin-right: 8px;
      }

      select {
        // background-color: #1f1f1f;
        // color: #fff;
        // border: 1px solid #444;
        padding: 4px 8px;
        border-radius: 4px;
        width: 100px;
      }
    }

  .stat-card {
    border-radius: 8px;
    
    &.dark-card {
      // background-color: #1f1f1f;
      border: none;
      
      :deep(.ant-statistic-title) {
        // color: rgba(255, 255, 255, 0.65);
      }
      
      :deep(.ant-statistic-content) {
        // color: #1f1f1f;
      }
    }
  }

  :deep(.custom-tabs) {
    .ant-tabs-nav {
      margin-bottom: 16px;
      
      &::before {
        border-bottom: none;
      }
    }

    .ant-tabs-tab {
      background: transparent;
      border: none;
      // color: rgba(255, 255, 255, 0.65);
      
      &:hover {
        // color: #fff;
      }
      
      &.ant-tabs-tab-active {
        background: transparent;
        
        .ant-tabs-tab-btn {
          // color: #fff;
        }
      }
    }

    .ant-tabs-nav-list {
      border: none;
    }

    .ant-tabs-content {
      // color: #fff;
    }
  }

  :deep(.duration-text) {
    font-size: 14px;  // 或者其他你想要的大小
    margin-left: 8px;
    opacity: 0.85;    // 略微降低不透明度使其不那么显眼
  }

</style>