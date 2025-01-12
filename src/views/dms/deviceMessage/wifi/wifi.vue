<template>
  <div class="m-4">
    <span style="margin-bottom: 20px; color: blue;" v-if="clientInfo.protocolType==='http'">Tips: HTTP协议的设备为异步获取结果, 推送后需要等待心跳返回</span><br>
    <br/>
    <span>{{ t('dms.deviceConfig.Wifi24') }}</span>
    <BasicForm @register="wifiForm" @onOk="handleW24Submit" />
    <hr>
    <span>{{ t('dms.deviceConfig.Wifi58') }}</span>
    <BasicForm @register="wifi58Form" @onOk="handleW58Submit" />
    <PushModal   @register="registerDrawer"/>
  </div>
</template>
<script lang="ts" setup>
  import { onMounted,onUnmounted, watch,ref } from 'vue';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { useI18n } from 'vue-i18n';
  import { formSchema,w58FormSchema } from './wifi.data';
  import { pushTaskSync } from '@/api/dms/deviceTask';
  const { t } = useI18n();
  import PushModal from '@/views/dms/deviceMessage/pushModal.vue';
  import { DeviceTaskReqEnum, DeviceTaskCodeEnum  } from '@/utils/enum/deviceTask';
  import { useDrawer } from '@/components/Drawer';
  import { message} from 'ant-design-vue';

  const props = defineProps({
    activeKey: {
      type: String,
      required: true
    }
  });

  const clientInfo = JSON.parse(localStorage.getItem('clientinfo') || "{}")

  const [registerDrawer, { openDrawer }] = useDrawer();

  const params = {
        requestType: DeviceTaskReqEnum.RequestTypeResult as number,
        saveProfile: DeviceTaskReqEnum.SaveProfileTypeOff as number,
        syncResult: DeviceTaskReqEnum.SaveProfileTypeOn as number, 
        taskCode: DeviceTaskCodeEnum.wifiCfg,
        taskType: DeviceTaskReqEnum.TaskTypeCONFIG as string,
        clientId: [clientInfo.clientId],
        taskContent: '',
      }

  // WIFI 24 .................
  const [wifiForm, { setFieldsValue, validate }] = useForm({
    labelWidth: 180,
    baseColProps: { span: 24 },
    layout: 'horizontal',
    autoAdvancedLine:2,
    schemas: formSchema,
    showResetButton: false,
    showSubmitButton: true,
    submitButtonOptions:{
      text: t('common.submit'),
      onClick: handleW24Submit,
    },
    baseRowStyle:{
      marginBottom: '10px',
      width: '35%',
    },
  });

  async function handleW24Submit() {
    const values = await validate();
    values.type = 'wifi24';

    console.log("wifi push params==>",values)
    if (values.enabled === undefined || values.enabled === true && values.ssid === undefined || values.ssid === '') {
      message.error('WIFI名称不能为空...');
      return
    }
    const p = params
    p.requestType = DeviceTaskReqEnum.RequestTypePush as number
    p.saveProfile = DeviceTaskReqEnum.SaveProfileTypeOn as number
    p.taskContent = JSON.stringify([values]);
    openDrawer(true,p);
  }


// WIFI 58 .................
  const [wifi58Form, { setFieldsValue: sw58, validate:vw58 }] = useForm({
    labelWidth: 180,
    baseColProps: { span: 24 },
    layout: 'horizontal',
    autoAdvancedLine:2,
    schemas: w58FormSchema,
    showResetButton: false,
    showSubmitButton: true,
    submitButtonOptions:{
      text: t('common.submit'),
      onClick: handleW58Submit,
    },
    baseRowStyle:{
      marginBottom: '10px',
      width: '35%',
    },
    // actionColOptions: { span: 24 },
    // labelAlign: 'left',
  });

  async function handleW58Submit() {
    const values = await vw58();
    console.log("wifi push params==>",values)
    if (values.enabled === undefined || values.enabled === true && values.ssid === undefined || values.ssid === '') {
      message.error('WIFI名称不能为空...');
      return
    }

    values.type = 'wifi58';
    const p = params
    p.requestType = DeviceTaskReqEnum.RequestTypePush as number
    p.saveProfile = DeviceTaskReqEnum.SaveProfileTypeOn as number
    p.taskContent = JSON.stringify([values]);
    openDrawer(true,p);
  }

// getResult -------------------------------------------
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
        await setFieldsValue({
          ...config.wifi,
        });

        await sw58({
          ...config.wifi5,
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
        let config = JSON.parse(response.data as string)
        await setFieldsValue({
          ...config.wifi,
        });

        await sw58({
          ...config.wifi5,
        });
      } 
    } catch (error) {
      // console.error('获取配置失败:', error);
    }
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
    if (props.activeKey === 'wifi') {
      startTimer(); 
      await pushGetConfig(); // 如果初始 activeKey 是 heartbeat，则调用获取设备数据的函数
    }
  });

  watch(
    () => props.activeKey,
    async (newVal) => {
      if (newVal === 'wifi') {
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
