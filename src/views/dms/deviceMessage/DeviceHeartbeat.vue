<template>
  <Card>
    <Descriptions title="心跳数据" bordered :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }" >
      <Descriptions.Item label="上报时间"> {{ formatToDateTime(deviceInfo?.renew_time)}}</Descriptions.Item>
      
      <Descriptions.Item label="系统运行时长"> {{ formatUptime(deviceInfo?.sys_uptime)}}</Descriptions.Item>
      <Descriptions.Item label="系统名称"> {{ deviceInfo?.sys_name }}</Descriptions.Item>
      <Descriptions.Item label="设备型号"> {{ deviceInfo?.device_model }}</Descriptions.Item>
      <Descriptions.Item label="设备MAC"> {{ deviceInfo?.device_mac?.toUpperCase() }}</Descriptions.Item>
      <Descriptions.Item label="软件版本"> {{ deviceInfo?.software_version }}</Descriptions.Item>
      <Descriptions.Item label="设备工作模式"> {{ deviceInfo?.work_mode }}</Descriptions.Item>
      <Descriptions.Item label="网络类型"> {{ deviceInfo?.network_type }}</Descriptions.Item>
      <Descriptions.Item label="模组IMEI"> {{ deviceInfo?.modem_imei }}
        <CopyOutlined v-if="deviceInfo?.modem_imei" class="copy-icon" @click="handleCopy(deviceInfo?.modem_imei)" />
      </Descriptions.Item>
      <Descriptions.Item label="卡IMSI"> {{ deviceInfo?.sim_imsi }}
        <CopyOutlined v-if="deviceInfo?.sim_imsi" class="copy-icon" @click="handleCopy(deviceInfo?.sim_imsi)" />
      </Descriptions.Item>
      <Descriptions.Item label="卡ICCID"> {{ deviceInfo?.sim_iccid }}
        <CopyOutlined v-if="deviceInfo?.sim_iccid" class="copy-icon" @click="handleCopy(deviceInfo?.sim_iccid)" />
      </Descriptions.Item>
      <Descriptions.Item label="网络小区LAC"> {{ deviceInfo?.signal_lac }}</Descriptions.Item>
      <Descriptions.Item label="网络小区CellID"> {{ deviceInfo?.signal_cellid }}</Descriptions.Item>
      <Descriptions.Item label="信号接收质量CSQ(0-31)"> {{ deviceInfo?.signal_csq }}</Descriptions.Item>
      <Descriptions.Item label="信号接收强度RSSI(dBm)"> {{ deviceInfo?.signal_rssi }}</Descriptions.Item>
      <Descriptions.Item label="信号接收功率RSRP(dBm)"> {{ deviceInfo?.signal_rsrp }}</Descriptions.Item>
      <Descriptions.Item label="信号接收质量RSRQ(dB)"> {{ deviceInfo?.signal_rsrq }}</Descriptions.Item>
      <Descriptions.Item label="信噪干扰比SINR(dB)"> {{ deviceInfo?.signal_snr }}</Descriptions.Item>
      <Descriptions.Item label="LAN内网 IP">  {{ deviceInfo?.local_lan }}</Descriptions.Item>
            <Descriptions.Item label="WAN出口 IP"> {{ deviceInfo?.network_wan }}</Descriptions.Item>

      <Descriptions.Item label="WAN出口 上行流量/速率">
        {{ (parseFloat(deviceInfo?.network_down_rate || '0') / 1048576).toFixed(2) }} MB
      </Descriptions.Item>
      <Descriptions.Item label="WAN出口 下行流量/速率">
        {{ (parseFloat(deviceInfo?.network_up_rate || '0') / 1048576).toFixed(2) }} MB
      </Descriptions.Item>

      <Descriptions.Item label="坐标GNSS"> 
        <span>经度: {{ deviceInfo?.gnss?.latitude }}</span>&nbsp;&nbsp;&nbsp;&nbsp;||
        <span>纬度: {{ deviceInfo?.gnss?.longitude }}</span>&nbsp;&nbsp;&nbsp;&nbsp;||
        <span>高度: {{ deviceInfo?.gnss?.altitude }}</span>&nbsp;&nbsp;&nbsp;&nbsp;||
        <span>定位质量: {{ deviceInfo?.gnss?.quality }}</span>&nbsp;&nbsp;&nbsp;&nbsp;||
        <span>卫星数量: {{ deviceInfo?.gnss?.satellites }}</span>
      </Descriptions.Item>
    </Descriptions>
    <br/>
    <!-- <Descriptions title="内网客户端" bordered :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }" >
      <BasicTable @register="registerTable" />
    </Descriptions> -->
    <BasicTable @register="registerTable" />
  </Card>
</template>

<script lang="ts" setup>
import { ref, onMounted , watch } from 'vue';
import { BasicTable, useTable } from '@/components/Table';
import { Descriptions, Card, message } from 'ant-design-vue';
import { CopyOutlined } from '@ant-design/icons-vue'; 
import { getDeviceMessageReport } from '@/api/dms/deviceMessage'; // 导入 API 函数
import { formatToDateTime } from '@/utils/dateUtil';
import { GatewayDeviceReportStatusInfo } from './deviceMessage.data'
import { style } from '@logicflow/extension/es/bpmn-elements/presets/icons';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const clientInfo = JSON.parse(localStorage.getItem('clientinfo') || "{}")
const deviceInfo = ref<GatewayDeviceReportStatusInfo>(); // 初始化 deviceInfo
const deviceSubClinets = ref<[]>(); // 初始化 deviceInfo


const props = defineProps({
  activeKey: {
    type: String,
    required: true
  }
});

onMounted(async () => {
  if (props.activeKey === 'heartbeat') {
    await fetchDeviceData(); // 如果初始 activeKey 是 heartbeat，则调用获取设备数据的函数
  }
});

watch(
  () => props.activeKey,
  async (newVal) => {
    // console.log('heartbeat page activeKey changed:', newVal);
    if (newVal === 'heartbeat') {
      await fetchDeviceData(); // 当 activeKey 变为 heartbeat 时，调用获取设备数据的函数
    }
  }
);


async function fetchDeviceData() {
  try {
    const response = await getDeviceMessageReport({
      device_sn: clientInfo.deviceSn,
      device_mac: clientInfo.deviceMac,
      device_client_id: clientInfo.clientId
    }); // 调用 API 获取设备信息，传递 MAC 地址
    // console.log('Device message report:', response.data);
    deviceInfo.value = JSON.parse(response.data as string);
    // 确保 clients 数据存在并且是一个数组
    if (deviceInfo.value?.clients && Array.isArray(deviceInfo.value.clients)) {
      deviceSubClinets.value = deviceInfo.value.clients as [];
    } else {
      deviceSubClinets.value = [];
    }
    // console.log('Device message deviceInfo:', deviceInfo.value);
  } catch (error) {
    console.error('获取设备信息失败:', error);
  }
}


// 复制功能
const handleCopy = (text: string) => {
  if (!text) return;
  navigator.clipboard.writeText(text).then(() => {
    message.success('复制成功');
  }).catch(() => {
    message.error('复制失败');
  });
};

function formatUptime(uptime) {
  if (uptime == null) return '-'; // 如果 uptime 为 null，返回 '-'
  
  const totalSeconds = Math.floor(uptime);
  const days = Math.floor(totalSeconds / (24 * 3600));
  const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60; // 计算剩余的秒数
  
  return `${days}天 ${hours}小时 ${minutes}分钟 ${seconds}秒`;
}
function formatLeaseTime(leaseTime) {
  if (leaseTime == null) return '-'; // 如果 leaseTime 为 null，返回 '-'
  
  const totalSeconds = Math.floor(leaseTime);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60; // 计算剩余的秒数
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

const [registerTable] = useTable({
  title: t('dms.deviceMessage.lan_clients'),
  columns: [
    { title: 'IP', dataIndex: 'ip', width: 100 },
    { title: 'Mac', dataIndex: 'mac', width: 100 },
    { title: 'Name', dataIndex: 'name', width: 100 },
    {
      title: 'LeaseTime',
      dataIndex: 'lease_time',
      width: 100,
      customRender: ({ text }) => formatLeaseTime(text)
    },
  ],
  dataSource: deviceSubClinets,
  bordered: true,
  showTableSetting: false,
  showIndexColumn: false,
  clickToRowSelect: false,

});

// 将 fetchDeviceData 方法暴露给外部组件
defineExpose({ fetchDeviceData });
</script>

<style lang="less" scoped>
.copy-icon {
  margin-left: 8px;
  cursor: pointer;
  color: #1890ff;
  
  &:hover {
    opacity: 0.8;
  }
}

.connection-params {
  margin-top: 24px;
  
  h3 {
    margin-bottom: 16px;
  }
}

// :deep(.ant-descriptions) {
//   .ant-descriptions-item-label {
//     background-color: #fafafa;
//   }
  
//   .ant-descriptions-item-content {
//     background-color: #fff;
//   }

//   &.ant-descriptions-bordered {
//     .ant-descriptions-item-label,
//     .ant-descriptions-item-content {
//       border-right: 1px solid #f0f0f0;
//     }

//     .ant-descriptions-row {
//       border-bottom: 1px solid #f0f0f0;
//     }
//   }
// }
</style>
