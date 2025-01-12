<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="t('dms.taskPush.taskTypProfile')"
    width="35%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref} from 'vue';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { useI18n } from 'vue-i18n';
  import { openNotificationWithIcon} from '@/utils/message';
  import {pushFormSchema} from './deviceMessage.data';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { pushTaskSync } from '@/api/dms/deviceTask';
  const { t } = useI18n();

  const paramsData = ref();
 
  const [registerForm, { resetFields, validate }] = useForm({
    labelWidth: 300,
    baseColProps: { span: 24 },
    layout: 'vertical',
    schemas: pushFormSchema,
    showActionButtonGroup: false,
  });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    await resetFields();
    setDrawerProps({ confirmLoading: false });

    paramsData.value = data;
  });


  async function handleSubmit() {
    const values = await validate();

    paramsData.value.saveProfile = values.isSaveProfile? 1 : 0;
    paramsData.value.profileName = values.profileName;
    paramsData.value.profileDesc = values.profileDesc;

    // console.log('pushTaskSync params ===>', paramsData.value);

    pushTaskSync(paramsData.value).then((result) => {
      if (result.code === 0) {
        openNotificationWithIcon('success',t('dms.taskPush.success'))
      } else {
        // openNotificationWithIcon('error',t('dms.taskPush.pushFail'),result.msg)
      }
    })
      
    closeDrawer();
  }


</script>
