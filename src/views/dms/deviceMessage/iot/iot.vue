<template>
  <div class="m-4">
    <BasicForm @register="registerForm" @onOk="handleSubmit" />
   

  </div>
</template>
<script lang="ts" setup>
  import { onMounted, watch } from 'vue';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { useI18n } from 'vue-i18n';
  import { formSchema } from './iot.data';
  import { getDeviceConfig,renewDeviceConfig } from '@/api/dms/deviceMessage';
  const { t } = useI18n();
  import { Modal,message } from 'ant-design-vue';
  
  const props = defineProps({
    activeKey: {
      type: String,
      required: true
    }
  });

  const clientInfo = JSON.parse(localStorage.getItem('clientinfo') || "{}")

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
      width: '50%',
    },
    // actionColOptions: { span: 24 },
    // labelAlign: 'left',
    
  });


  async function fetchDeviceData() {
    try {
      // const response = await getDeviceConfig({
      //   config_code: 80062,
      //   config_type: clientInfo.deviceMac,
      //   device_client_id: clientInfo.clientId
      // }); 
      // let config = JSON.parse(response.data as string);
      // console.log('Device vpn config:', config);

      // await setFieldsValue({
      //   ...config,
      // });

    } catch (error) {
      console.error('获取设备信息失败:', error);
    }
  }



  onMounted(async () => {
    console.log('mounted ===>',props.activeKey);
    if (props.activeKey === 'vpn') {
      await fetchDeviceData(); // 如果初始 activeKey 是 heartbeat，则调用获取设备数据的函数
    }
  });

  watch(
    () => props.activeKey,
    async (newVal) => {
      // console.log('heartbeat page activeKey changed:', newVal);
      if (newVal === 'vpn') {
        await fetchDeviceData(); // 当 activeKey 变为 heartbeat 时，调用获取设备数据的函数
      }
    }
  );

  async function handleSubmit() {
    const values = await validate();
    console.log('values:', values);

    Modal.confirm({
      title: t('common.push'),

      // icon: createVNode(ExclamationCircleOutlined),
      width: 800,
      async onOk() {
        const context = {
        config_code: 80062,
        config_type: clientInfo.deviceMac,
        device_client_id: clientInfo.clientId,
        config_content: JSON.stringify(values)
      }
        // const result = await renewDeviceConfig({ 
        //   clientId: [clientInfo.clientId], 
        //   taskType: DeviceTaskTypeEnum.OTA, 
        //   taskCode: 80008,
        //   taskContent: JSON.stringify(context) });
        // if (result.code === 0) {
        //   showDeleteButton.value = false;
        //   message.success('推送任务成功');
        //   // await reload();
        // }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

defineExpose({ fetchDeviceData });


</script>
