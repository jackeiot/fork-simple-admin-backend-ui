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
  import { logsColumns, searchFormSchema } from './record.data';
  import { getDeviceMessageRecord } from '@/api/dms/deviceMessage';

  const { t } = useI18n();
  const clientInfo = JSON.parse(localStorage.getItem('clientinfo') || "{}")
  const [registerTable, { reload }] = useTable({
      title: t('dms.deviceMessage.logRecordList'),
      api: getDeviceMessageRecord,
      columns: logsColumns,
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
        params.type_code = 'log';
        params.device_sn = clientInfo.deviceSn;
        params.device_mac = clientInfo.deviceMac;
        params.device_client_id = clientInfo.clientId;
        return params;
      },
      afterFetch: (data) => {
        console.log('getDeviceMessageRecord==>',data)
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