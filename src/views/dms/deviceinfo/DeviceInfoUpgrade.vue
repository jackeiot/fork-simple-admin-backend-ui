<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="t('dms.taskPush.taskTypeUpgradeFirmware')"
    width="90%"
    @ok="handleSubmit"
  >
    <BasicTable @register="registerTable" >
        <template #toolbar>
        </template>
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'push'">
            <Button
              type="primary"
              primary          
              @click="handlePush(record)"
            >
              {{ t('pms.productOtaFirmware.push') }}
            </Button>
          </template>
        </template>
      </BasicTable>
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, computed, unref ,createVNode} from 'vue';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { useI18n } from 'vue-i18n';
  import { Modal,message } from 'ant-design-vue';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue/lib/icons';
  import { BasicTable, useTable } from '@/components/Table';
  import { Button} from '@/components/Button';
  import { h } from 'vue';
  import { firmwareColumns, firmwareSearchFormSchema } from './deviceInfo.data';
  import { getProductOtaFirmwareList } from '@/api/pms/productOtaFirmware';
  import { pushTaskSync } from '@/api/dms/deviceTask';
  import { DeviceTaskReqEnum, DeviceTaskCodeEnum } from '@/utils/enum/deviceTask';

  const { t } = useI18n();

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    setDrawerProps({ confirmLoading: false });
    console.log("dev upgrade ===>",data);
    clientIds.value = data
  });

  const clientIds= ref<string[]>([]);
  const clientInfo = JSON.parse(localStorage.getItem('clientinfo') || "{}")


  const [registerTable, { reload }] = useTable({
    title: t('pms.productOtaFirmware.productOtaFirmwareList'),
    api: getProductOtaFirmwareList,
    columns: firmwareColumns,
    formConfig: {
      labelWidth: 160,
      schemas: firmwareSearchFormSchema,
    },
    useSearchForm: true,
    showTableSetting: false,
    bordered: true,
    showIndexColumn:true,
    showHeader:true,
    ellipsis:true,
    beforeFetch: (params) => {
      params.productCode = clientInfo.productCode;
      params.page = 1;
      params.pageSize = 9999;
      return params;
    },
    rowKey: 'id',
  });

  const resetCheckbox = ref(false);
  function modalContent(tips:string) {
    return h('div', { class: 'custom-class' }, [
      h('p', tips),
      h('lable', {},[
        // 显示复选框的标签
        h('span', {style: { color: 'red' }}, '不保留配置(勾选) '),
        h('input', {
              type: 'checkbox',
              name:'sss',
              style: { size: '14px' },
              checked: resetCheckbox.value,
              onChange: (e: any) => {
                console.log(e.target.checked);
                resetCheckbox.value = e.target.checked;
              },
              class: {
                  width: '20px',
                  height: '20px',
              }
            }, ),
      ]),

    ]);
  };

  async function handlePush(record: Recordable) {
    if (record.fileUrl === '' || record.fileUrl === null || record.fileUrl === undefined) {
      message.error('此升级包文件链接不存在!');
      return;
    }

    let tips = ''
    if (clientInfo.protocolType === "http") {
      tips = '当前设备的协议类型为http, 非实时推送，推送后需要等待设备的心跳拉取. '
    } else {}
    tips = tips + '确认向设备推送 此升级包？' + '\n' + record.fileName;

    Modal.confirm({
      title: t('dms.taskPush.confirm'),
      content: modalContent(tips),
      icon: createVNode(ExclamationCircleOutlined),
      width: 800,
      async onOk() {
        const context = {file_name: record.fileName, 
          url: record.fileUrl, 
          version:record.version, 
          md5:record.fileMd5, 
          reset: resetCheckbox.value?'1':'0'
        }
        const result = await pushTaskSync({
        requestType: DeviceTaskReqEnum.RequestTypePush as number,
        saveProfile: DeviceTaskReqEnum.SaveProfileTypeOff as number,
        syncResult: DeviceTaskReqEnum.SaveProfileTypeOff as number, 
        taskCode: DeviceTaskCodeEnum.upgradeFirmware,
        taskType: DeviceTaskReqEnum.TaskTypeOTA as string,
        clientId: clientIds.value,
        taskContent: JSON.stringify(context) 
      });

        if (result.code === 0) {
          closeDrawer();
          message.success('推送任务成功');
        }
        setDrawerProps({ confirmLoading: false });
      },
      onCancel() {
        setDrawerProps({ confirmLoading: false });
      },
    });
  }

  async function handleSubmit() {
    setDrawerProps({ confirmLoading: true });
    closeDrawer();
  }
</script>
