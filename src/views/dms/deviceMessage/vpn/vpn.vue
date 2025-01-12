<template>
  <div class="m-4">
    <span style="margin-bottom: 20px; color: blue;" v-if="clientInfo.protocolType==='http'">Tips: HTTP协议的设备为异步获取结果, 推送后需要等待心跳返回</span><br>
    <br/>
    <BasicForm @register="registerForm" @onOk="handleSubmit" />
    <PushModal @register="pushDrawer" />
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, onUnmounted, watch } from 'vue';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { useI18n } from 'vue-i18n';
  import { formSchema } from './vpn.data';
  import { pushTaskSync } from '@/api/dms/deviceTask';
  const { t } = useI18n();
  import { message } from 'ant-design-vue';
  import PushModal from '@/views/dms/deviceMessage/pushModal.vue';
  import { useDrawer } from '@/components/Drawer';
  import { DeviceTaskReqEnum, DeviceTaskCodeEnum } from '@/utils/enum/deviceTask';

  const props = defineProps({
    activeKey: {
      type: String,
      required: true
    }
  });

  const clientInfo = JSON.parse(localStorage.getItem('clientinfo') || "{}")
  const [pushDrawer, { openDrawer }] = useDrawer();

  const params = {
    requestType: DeviceTaskReqEnum.RequestTypeResult as number,
        saveProfile: DeviceTaskReqEnum.SaveProfileTypeOff as number,
        syncResult: DeviceTaskReqEnum.SaveProfileTypeOn as number, 
        taskCode: DeviceTaskCodeEnum.vpnCfg,
        taskType: DeviceTaskReqEnum.TaskTypeCONFIG as string,
        clientId: [clientInfo.clientId],
        taskContent: '',
      }


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
      onClick: handleSubmit,
    },
    baseRowStyle:{
      marginBottom: '10px',
      width: '35%',
    },
  
  });


  async function getResult() {
    // if (clientInfo.isOnline === DeviceStatuwEnum.offOnline) {
    //   message.error('设备不在线');
    //   return
    // }
 
    try {
      const response = await pushTaskSync(params); 
      if (response.code === 0 && response.data !== undefined && response.data !== '') {
        let config = JSON.parse(response.data as string);
        await setFieldsValue({
          ...config,
        });
      } 
    } catch (error) {
      // console.error('获取配置失败:', error);
    }
  }

  async function pushGetConfig() {
    message.info('已发起获取配置...');

    params.requestType = DeviceTaskReqEnum.RequestTypeGet as number
    try {
      const response = await pushTaskSync(params); 
      if (response.code === 0 && response.data !== undefined && response.data !== '') {
        let config = JSON.parse(response.data as string);
        await setFieldsValue({
          ...config,
        });
      } 
    } catch (error) {
    }
  }

  async function handleSubmit() {
    const values = await validate();
    console.error('获取配置失败:', values);
    if (values.enabled === undefined || values.enabled  === true && values.remote_host === undefined || values.remote_host === '') {
      message.error('推送的配置不能为空...');
      return
    }
    params.requestType = DeviceTaskReqEnum.RequestTypePush as number
    params.saveProfile = DeviceTaskReqEnum.SaveProfileTypeOn as number
    params.taskContent = JSON.stringify(values)
    openDrawer(true,params); 
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
    if (props.activeKey === 'vpn') {
      startTimer(); 
      await pushGetConfig(); // 如果初始 activeKey 是 heartbeat，则调用获取设备数据的函数
    }
  });

  watch(
    () => props.activeKey,
    async (newVal) => {
      if (newVal === 'vpn') {
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
