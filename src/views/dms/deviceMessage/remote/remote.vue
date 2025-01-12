<template>
  <div class="m-4" >
    <span >主服务</span>
    <!-- <BasicForm @register="registerForm" @onOk="handleSubmit" :style="{ margin: '20px' }"/> -->
     <!-- <remoteMain :activeKey="props.activeKey"/> -->
     <BasicForm @register="registerForm" @onOk="handlePushSubmit" />
  </div><br/><br/>


  <div class="m-4">
    <remoteConfigDrawer @register="registerDrawer" @success="handleAddProxy"/>
    
    <!-- <BasicForm @register="registerForm" v-if="openDrawer"/> -->
    <span class="m-4">{{ t('dms.deviceConfig.remote_config_title') }}</span>&nbsp;&nbsp;&nbsp;
    <Button type="primary" @click="handleAddModal">
      {{ t('dms.deviceConfig.remote_config_add') }}
    </Button> &nbsp;&nbsp;&nbsp;
    <Button type="dashed" @click="generateFrpcIni">
      {{ t('dms.deviceConfig.remote_config_saveDownload') }}
    </Button>
    <br/><br/>
    <Table :columns="columns" :dataSource="listDataSource" >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <span>
          <a @click="handleDeleteProxy(record)" :style="{color:'red'}">删除</a>
        </span>
        </template>
        <template v-if="column.key === 'custom_domains'">
          <span>
          <a :href="joinProxyUrl(record.custom_domains)" target="_blank"  :style="{color:'bule'}">{{ joinProxyUrl(record.custom_domains) }}</a>
        </span>
        </template>
      </template>
    </Table>
    <PushModal @register="pushDrawer" />
  </div>
</template>
<script lang="ts" setup>
  import { onUnmounted, onMounted, watch, ref } from 'vue';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { useI18n } from 'vue-i18n';
  import { columns } from './remote';
  import type {  HttpProxyItem,ProxyInfo } from './remote';
  import { formSchema } from './remote';
  const { t } = useI18n();
  import { Button, Table,message} from 'ant-design-vue';
  import { useDrawer } from '@/components/Drawer';
  import  remoteConfigDrawer  from './remoteConfigDrawer.vue';
  import { pushTaskSync } from '@/api/dms/deviceTask';
  import { DeviceTaskReqEnum, DeviceTaskCodeEnum } from '@/utils/enum/deviceTask';
  import PushModal from '@/views/dms/deviceMessage/pushModal.vue';

  const props = defineProps({
    activeKey: {
      type: String,
      required: true
    }
  });

  const clientInfo = JSON.parse(localStorage.getItem('clientinfo') || "{}");
  const reaspData = ref<ProxyInfo>();
  const listDataSource = ref<HttpProxyItem[]>([]);

  const params = {
        requestType: DeviceTaskReqEnum.RequestTypeGet as number,
        saveProfile: DeviceTaskReqEnum.SaveProfileTypeOff as number,
        syncResult: DeviceTaskReqEnum.SaveProfileTypeOn as number, 
        taskCode: DeviceTaskCodeEnum.proxyCfg,
        taskType: DeviceTaskReqEnum.TaskTypeProxy as string,
        clientId: [clientInfo.clientId],
        taskContent: '',
      }


  // 主服务form ----------------------------------------------
  const [registerForm, { setFieldsValue, validate }] = useForm({
    labelWidth: 180,
    baseColProps: { span: 24 },
    layout: 'horizontal',
    autoAdvancedLine:2,
    schemas: formSchema,
    showResetButton: false,
    showSubmitButton: true,
    submitButtonOptions:{
      text: t('common.submit'),
      onClick: handlePushSubmit,
    },
    baseRowStyle:{
      marginBottom: '10px',
      width: '35%',
    },
  });

  // http代理的配置，更新到 listDataSource -----------------------------------------------------------------
  const [registerDrawer, { openDrawer }] = useDrawer();
  const [pushDrawer, { openDrawer:pushOpenDrawer }] = useDrawer();

  function handleAddModal() {
    openDrawer(true );
  }

  function handleDeleteProxy(record: any) {
    // console.log("handleDelete===>",record);
    listDataSource.value = listDataSource.value.filter(item => item.server_name !== record.server_name);
  }

  // 更新列http代理列表
  function handleAddProxy(formData: HttpProxyItem) {
    const newData = {
      nick_name: formData.nick_name,
      server_name: formData.server_name,
      local_addr: formData.local_addr,
      local_port: formData.local_port,
      protocol: formData.protocol,
      custom_domains: clientInfo.deviceSn,
    };
      // console.log("handleDelete===>",newData);
    listDataSource.value.push(newData);
  }

  // 根据listDataSource 生成 frpc.ini 配置 保存到本地
  function generateFrpcIni() {
      let iniContent = '';
      if (listDataSource.value.length <=0) {
            // message.error('配置列表为空');
        return
    }

      // 处理各个服务配置部分，例如[ssh]、[web]等
      listDataSource.value.forEach(item => {
          iniContent += `[${item.server_name}]\n`;
          iniContent += `type = ${item.protocol}\n`;
          iniContent += `local_ip = ${item.local_addr}\n`;
          iniContent += `local_port = ${item.local_port}\n`;
          iniContent += `remote_port = ${item.remote_port}\n`;
          iniContent += `custom_domains = ${item.custom_domains}.${reaspData.value?.remote}\n`;
          iniContent += '\n';
      });

    const blob = new Blob([iniContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = clientInfo.deviceSn+'_frpc.ini';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    message.success('保存成功');
  }

  // 获取,推送配置 ---------------------------------------
  async function pushGetConfig() {
    // if (clientInfo.isOnline === DeviceStatuwEnum.offOnline) {
    //   message.error('设备不在线');
    //   return
    // }
    message.info('已发起获取配置...');
    params.requestType = DeviceTaskReqEnum.RequestTypeGet as number

    try {
      const response = await pushTaskSync(params); 
      if (response.code === 0) {
        let config = JSON.parse(response.data as string);

        reaspData.value = config
        // client_proxy需要判断是否为空, 空时不能赋值，不然push会报错
        if (config.client_proxy !== null && config.client_proxy !== undefined) {
          listDataSource.value = config.client_proxy
        }
        
        // console.log('get remote config ===>', reaspData.value);
        await setFieldsValue({
          ...config,
        });
      } else {
      }
    } catch (error) {
    }
  }

  async function getResult() {
    // if (clientInfo.isOnline === DeviceStatuwEnum.offOnline) {
    //   message.error('设备不在线');
    //   return
    // }
    params.requestType = DeviceTaskReqEnum.RequestTypeResult as number
    try {
      
      const response = await pushTaskSync(params); 
    
      if (response.code === 0 && response.data !== undefined && response.data !== '') {
        let config = JSON.parse(response.data as string);
        // client_proxy需要判断是否为空, 空时不能赋值，不然push会报错
        if (config.client_proxy !== null && config.client_proxy !== undefined) {
          listDataSource.value = config.client_proxy
        }
        await setFieldsValue({
          ...config,
        });
      } 
    } catch (error) {
      // console.error('获取配置失败:', error);
    }
  }


  //提交推送
  async function handlePushSubmit() {
    const values = await validate();
 
    const body = {
      enabled: values.enabled,
      client_proxy: listDataSource.value
    }
    params.requestType = DeviceTaskReqEnum.RequestTypePush as number
    params.saveProfile = DeviceTaskReqEnum.SaveProfileTypeOn as number
    params.taskContent = JSON.stringify(body)
    pushOpenDrawer(true,params); 
  }

  function joinProxyUrl(domain:string) {
    return domain.includes('http') ? domain : `${reaspData.value?.http_proxy_prefix}://${domain}.${reaspData.value?.remote}:${reaspData.value?.http_proxy_port}`
  }

  // 自动请求结果------------------------------------------------
  let timer: NodeJS.Timeout | null = null;
  function startTimer() {
    if (timer) {
      clearInterval(timer);
    }
    timer = setInterval(getResult, DeviceTaskReqEnum.authGetResultTimer); // 默认 5秒
  }
  function clearTimer() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  onMounted(async () => {
    if (props.activeKey === 'remote') {
      startTimer(); 
      await pushGetConfig(); // 如果初始 activeKey 是 heartbeat，则调用获取设备数据的函数
    }
  });

  watch(
    () => props.activeKey,
    async (newVal) => {
      if (newVal === 'remote') {
        await pushGetConfig(); // 当 activeKey 变为 heartbeat 时，调用获取设备数据的函数
      } else {
        clearTimer(); // 否则，清除定时器
      }
    }
  );


  onUnmounted(() => {
    clearTimer(); // 清除定时器
  });

</script>

<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>