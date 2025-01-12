<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="50%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" >
      <template #customSlot="{}">
        <Upload
          name="file"
          list-type="picture"
          :max-count="1"
          :headers="headers"
          :before-upload="beforeUpload"
        >
          <a-button type="primary" name="file">
            <upload-outlined></upload-outlined>
            选择文件
          </a-button>
        </Upload>
        <div style="margin-top: 20px;"> 
           <a  style="text-decoration: underline;" :onclick="exportHandle">
            <FileExcelOutlined/>
            下载模版
          </a></div>
        <Loading :loading="uploading"  tip='导入中...' />
      </template>
    </BasicForm>

  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, computed, unref, reactive } from 'vue';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { importFormSchema } from './deviceInfo.data';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { useI18n } from 'vue-i18n';
  import { importDevices,getImportDevicesTemplate } from '@/api/dms/deviceInfo';
  import { BasicUpload,  } from '@/components/Upload';
  import { Loading } from '/@/components/Loading';
  import { FileExcelOutlined, UploadOutlined } from '@ant-design/icons-vue';
  import { message,Upload } from 'ant-design-vue';
  import type { UploadProps } from 'ant-design-vue';
  import type { UploadChangeParam } from 'ant-design-vue';
  import { saveAs } from 'file-saver';
  import * as XLSX from 'xlsx';

  const fileList = ref<UploadProps[]>([]);
  const fileData = ref<FileType>();
  const uploading = ref<boolean>(false);

  const headers = {
    authorization: 'authorization-text',
  };

  const beforeUpload: UploadProps['beforeUpload'] = file => {
    // console.log("beforeUpload==>",file);
    fileData.value = file
    // fileList.value = [...(fileList.value || []), file];
    return false;
  };


  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(true);
  const { t } = useI18n();

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 160,
    baseColProps: { span: 24 },
    layout: 'vertical',
    schemas: importFormSchema,
    showActionButtonGroup: false,
  });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    await resetFields();

    await setFieldsValue({
        ...data.record,
      });
  });

  const getTitle = computed(() =>
    !unref(isUpdate) ? t('dms.deviceInfo.importDeviceInfo') : t('dms.deviceInfo.importDeviceInfo'),
  );

  async function handleSubmit() {
    // console.log("formData==>",fileData.value)
    const values = await validate();
    if (values.groupId === null || values.groupId === undefined || values.groupId === 0 || fileData.value === null || fileData.value === undefined) {
      message.error('参数有误...');
      return
    }

    uploading.value = true
    importDevices({groupId: values.groupId, file: fileData.value}).then(res => {
      closeDrawer();
      fileData.value = null
      uploading.value  = false
      emit('success');
    })

    setDrawerProps({ confirmLoading: false });
  }


  

  // 导出
  async function exportHandle() {
    const data = [
            ["*产品Code*", "*MAC地址*", "设备别名(可选)", "IMEI号(可选)", "ICCID号(可选)", "备注(可选)"],
            ["JRdsvsd， 不清楚产品ID时可以先单独创建一个设备查看产品Code",
            "A463B70C949D",
            "测试设备",
            "353899260900001",
            "898600C92823F1500001",
            "设备导入示例模板, MAC地址需要唯一不重复,"]
          ];
   
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    try {
      saveAs(new Blob([wbout], { type: 'application/octet-stream' }), `设备导入模版(带*列必填).xlsx`);
    } catch (e) {
      console.error('Export failed: ', e);
    }
  }
   

</script>
