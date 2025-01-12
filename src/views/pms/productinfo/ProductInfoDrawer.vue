<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="35%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, computed, unref, nextTick } from 'vue';
  import {  BasicForm,  useForm } from '@/components/Form/index';
  import { formSchema } from './productInfo.data';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { useI18n } from 'vue-i18n';

  import { createProductInfo, updateProductInfo } from '@/api/pms/productInfo';

  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(true);
  const { t } = useI18n();


  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 160,
    baseColProps: { span: 24 },
    layout: 'vertical',
    schemas: formSchema,
    showActionButtonGroup: false,
  });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    await resetFields();// 现在可以安全地重置字段
    setDrawerProps({ confirmLoading: false });

    isUpdate.value = !!data?.isUpdate;

    if (unref(isUpdate)) {
      await setFieldsValue({
        ...data.record,
      });
    }

  });

  const getTitle = computed(() =>
    !unref(isUpdate) ? t('pms.productInfo.addProductInfo') : t('pms.productInfo.editProductInfo'),
  );

  async function handleSubmit() {
    const values = await validate();
    setDrawerProps({ confirmLoading: true });

    values['id'] = unref(isUpdate) ? Number(values['id']) : 0;

    let result = unref(isUpdate) ? await updateProductInfo(values) : await createProductInfo(values);
    if (result.code === 0) {
      closeDrawer();
      emit('success');
    }
    setDrawerProps({ confirmLoading: false });
  }
</script>
