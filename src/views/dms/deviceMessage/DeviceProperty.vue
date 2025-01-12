<template>
  <Card>
    <Descriptions title="基本信息" bordered :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }" >
      <Descriptions.Item label="设备名">{{ deviceInfo.name || '-' }}
        <CopyOutlined v-if="deviceInfo.name" class="copy-icon" @click="handleCopy(deviceInfo.name)" />
      </Descriptions.Item>
      <Descriptions.Item label="MAC地址">{{ deviceInfo.deviceMac?.toUpperCase() || '-' }}
        <CopyOutlined v-if="deviceInfo.deviceMac" class="copy-icon" @click="handleCopy(deviceInfo.deviceMac)" />
      </Descriptions.Item>
      <Descriptions.Item label="设备SN/ID">
        {{ deviceInfo.deviceSn || '-' }}
        <CopyOutlined v-if="deviceInfo.deviceSn" class="copy-icon" @click="handleCopy(deviceInfo.deviceSn)" />
      </Descriptions.Item>

      <!-- <Descriptions.Item label="设备密钥">
        {{ props.deviceInfo.secret || '-' }}
        <CopyOutlined v-if="props.deviceInfo.secret" class="copy-icon" @click="handleCopy(props.deviceInfo.secret)" />
      </Descriptions.Item> -->
      <Descriptions.Item label="所属产品型号">
        {{ deviceInfo.product || '-' }}
      </Descriptions.Item>
      <Descriptions.Item label="产品Code">
        {{ deviceInfo.productCode || '-' }}
        <CopyOutlined v-if="deviceInfo.productCode" class="copy-icon" @click="handleCopy(deviceInfo.productCode)" />
      </Descriptions.Item>
      <Descriptions.Item label="所属分组">
        {{ deviceInfo.group || '-' }}
        <!-- <CopyOutlined v-if="props.deviceInfo.group" class="copy-icon" @click="handleCopy(props.deviceInfo.group)" /> -->
      </Descriptions.Item>

      <!-- <Descriptions.Item label="所属用户账号">{{ props.deviceInfo.user || '-' }}</Descriptions.Item> -->
      <!-- <Descriptions.Item label="设备类型">{{ props.deviceInfo.type || '-' }}</Descriptions.Item> -->
      <Descriptions.Item label="标签">{{ deviceInfo.tags || '-' }}
        <div v-for="(value, key) in deviceInfo.tags" :key="key">
            {{ value }}  &nbsp;&nbsp;{{ key }}
          </div>
      </Descriptions.Item>
      <!-- <Descriptions.Item label="启用状态">{{ props.deviceInfo.isEnable || '未启用' }}</Descriptions.Item> -->
      <Descriptions.Item label="创建时间">
        {{ formatTimestamp(deviceInfo.createdAt) || '-' }}
      </Descriptions.Item>
      <Descriptions.Item label="激活时间">
        {{ formatTimestamp(deviceInfo.firstLogin) || '-' }}
      </Descriptions.Item>
      <Descriptions.Item label="最后登录时间">
        {{ formatTimestamp(deviceInfo.lastLogin) || '-' }}
      </Descriptions.Item>

      <Descriptions.Item label="最后登录IP">-</Descriptions.Item>
      <Descriptions.Item label="软件版本">{{ deviceInfo.version || '-' }}</Descriptions.Item>
      <!-- <Descriptions.Item label="租户编码">
        default <CopyOutlined class="copy-icon" @click="handleCopy('default')" />
      </Descriptions.Item> -->

      <Descriptions.Item label="模组IMEI">{{ deviceInfo.modemImei || '-' }}</Descriptions.Item>
      <Descriptions.Item label="SIM卡号">{{ deviceInfo.iccid || '-' }}</Descriptions.Item>
      <Descriptions.Item label="安装地址">{{ deviceInfo.address || '-' }}</Descriptions.Item>
      <Descriptions.Item label="安装地编码">{{ deviceInfo.adcode || '-' }}</Descriptions.Item>
      <Descriptions.Item label="坐标GPS">
          <div v-if="deviceInfo.position">
            经度: &nbsp; {{ deviceInfo.position.logitude?deviceInfo.position.logitude:'-'}}&nbsp;&nbsp;&nbsp;&nbsp;
            纬度: &nbsp; {{ deviceInfo.position.latitude?deviceInfo.position.latitude:'-'}}&nbsp;&nbsp;&nbsp;&nbsp;
            <!-- 坐标系: &nbsp; {{ props.deviceInfo.position.coordinate_system?props.deviceInfo.position.coordinate_system:'-' }} -->
         
          </div>
          <div v-else>
            无可用坐标信息
          </div>
          
      </Descriptions.Item>
      <!-- <Descriptions.Item label="坐标GPS经度">{{ props.deviceInfo.version || '-' }}</Descriptions.Item>
      <Descriptions.Item label="坐标GPS纬度">{{ props.deviceInfo.version || '-' }}</Descriptions.Item> -->
    </Descriptions>

    <!-- 添加设备连接参数部分 -->
    <div class="connection-params">
      <h3>MQ连接参数</h3>
      <Descriptions bordered :column="1">
        <Descriptions.Item label="ClientId" :labelStyle="{ width: '100px' }">
          {{ deviceInfo.clientId }}
          <CopyOutlined class="copy-icon" @click="handleCopy(deviceInfo.clientId)" />
        </Descriptions.Item>
        <Descriptions.Item label="Username" :labelStyle="{ width: '100px' }">
          {{ deviceInfo.loginName }}
          <CopyOutlined v-if="deviceInfo.loginName" class="copy-icon" @click="handleCopy(deviceInfo.loginName)" />
        </Descriptions.Item> 
        <Descriptions.Item label="Password" :labelStyle="{ width: '100px' }">
          {{ deviceInfo.loginPasswd }}
          <CopyOutlined v-if="deviceInfo.loginPasswd" class="copy-icon" @click="handleCopy(deviceInfo.loginPasswd)" />
        </Descriptions.Item>
      </Descriptions>
    </div>

    <!-- 订阅/发布主题 -->
    <div class="connection-params">
      <h3>MQ消息主题</h3>
      <Descriptions bordered :column="1">
        <Descriptions.Item label="发布主题" :labelStyle="{ width: '110px' }">
          <div v-for="(value, key) in deviceInfo.push_topics" :key="key">
            {{ value }}<CopyOutlined class="copy-icon" @click="handleCopy(value)" />  &nbsp;&nbsp;{{ key }} 
          </div>
        </Descriptions.Item>
        <Descriptions.Item label="订阅主题" :labelStyle="{ width: '110px' }">
          <div v-for="(value, key) in deviceInfo.sub_topics" :key="key">
            {{ value }} <CopyOutlined class="copy-icon" @click="handleCopy(value)" />  &nbsp;&nbsp;{{ key }}
          </div>
        </Descriptions.Item>
      </Descriptions>
    </div>
  </Card>
</template>

<script lang="ts" setup>
import { Descriptions, Card, message } from 'ant-design-vue';
import { CopyOutlined } from '@ant-design/icons-vue';
import { onMounted ,ref} from 'vue';
import { DeviceDetailMessageInfo} from '@/api/dms/model/deviceMessageModel';


const deviceInfo = JSON.parse(localStorage.getItem('clientinfo') || "{}")
// const deviceInfo = ref<DeviceDetailMessageInfo>({}); // 初始化 deviceInfo

// 定义 props
// const props = defineProps<{
//   deviceInfo: DeviceDetailMessageInfo; // 接收传来的设备信息
// }>();

// 复制功能
const handleCopy = (text: string) => {
  if (!text) return;
  navigator.clipboard.writeText(text).then(() => {
    message.success('复制成功');
  }).catch(() => {
    message.error('复制失败');
  });
};

// 时间戳格式化函数
const formatTimestamp = (timestamp?: number): string => {
  if (!timestamp) return '-';
  const date = new Date(timestamp);
  return date.toLocaleString(); // 可以根据需要自定义格式
};

onMounted(() => {
  const info = JSON.parse(localStorage.getItem('clientinfo') || "{}")
})
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
</style>
