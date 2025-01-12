<template>
  <div>
    <BasicTable @register="registerTable">
    </BasicTable>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicTable, useTable } from '@/components/Table';
  import { useI18n } from 'vue-i18n';
  import { onlineColumns } from './record.data';
  import { getDeviceMessageRecord } from '@/api/dms/deviceMessage';

  const { t } = useI18n();

  const clientInfo = JSON.parse(localStorage.getItem('clientinfo') || "{}")

  import { FormSchema } from '@/components/Table';
  const searchFormSchema: FormSchema[] = [
    {
      field: 'status',
      label: '状态',
      component: 'Select',
      componentProps: {
        options: [
          { label: '全部', value: 99 },
          { label: '上线', value: 1 },
          { label: '下线', value: 0 },
        ],
      },
      colProps: { span: 4 },
    },
    {
      field: 'date_time',
      label: t('dms.deviceMessage.datetime'),
      component: 'RangePicker', // 使用 RangePicker 作为日期时间选择器
      componentProps: {
        showTime: true, // 显示时间选择器
        format: 'YYYY-MM-DD HH:mm:ss', // 日期时间格式
      },
      colProps: { span: 8},
    },
  ];

  const [registerTable, { reload }] = useTable({
      title: t('dms.deviceMessage.onlineRecordList'),
      api: getDeviceMessageRecord,
      columns:onlineColumns,
      formConfig: {
        labelWidth: 120,
        schemas: searchFormSchema,
      },
      useSearchForm: true,
      showTableSetting: true,
      bordered: true,
      showIndexColumn: false,
      clickToRowSelect: false,
      beforeFetch: (params) => {
        // console.log('clientInfo===>',clientInfo)
        params.type_code = 'online';
        params.device_sn = clientInfo.deviceSn;
        params.device_mac = clientInfo.deviceMac;
        params.device_client_id = clientInfo.clientId;
        console.log('clientInfo===>',params)
        return params;
      },
      afterFetch: (data) => {
        data.forEach((item: any) => {
          item.device_name = clientInfo.name;
          item.device_mac = clientInfo.deviceMac;
        });
        return data;
      },
    });

</script>

<style lang="less" scoped>
.device-link {
  color: #0960bd;  // 使用主题蓝色
  cursor: pointer; // 显示手型光标
  
  &:hover {
    color: #0077ff;
    text-decoration: underline;
  }
}
</style>