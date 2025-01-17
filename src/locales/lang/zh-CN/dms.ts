
export default {
  deviceInfo: {
    tenantCode: '租房编码',
    name: '设备名称',
    deviceSn: '设备SN码',
    deviceMac: '设备MAC地址',
    loginName: '登录名',
    loginPasswd: '登录密码',
    cert: '证书',
    secret: '密钥',
    type: '类型',
    description: '描述',
    productCode: '所属产品',
    product: '所属产品型号',
    group: '所属分组',
    groupId: '所属分组',
    user: '所属用户',
    userId: '所属用户Id',
    firstLogin: '激活时间',
    lastLogin: '最近心跳时间',
    version: '软件版本',
    position: '坐标/位置',
    modemInfo: '模组信息',
    modemImei: '模组IMEI',
    iccid: 'SIM卡号',
    address: '安装地址',
    adcode: '安装地址编号',
    tags: '标签',
    isOnline: '在线状态',
    isEnable: '启用状态',
    expTime: '过期时间',
    removeOnline: '踢下线',
    addDeviceInfo: '添加新设备',

    importDeviceInfo: '导入设备',
    exportDeviceInfo: '导出设备',
    exportDeviceInfoTips: '导出当前查询条件的所有设备？ 最大 10000 条',
    selectFile: '选择文件(xlx,xlsx,csv)',
    editDeviceInfo: '编辑设备信息',
    deviceInfoList: '设备信息列表',
    
  },
  deviceTask: {
    taskCode: '任务代码',
    taskType: '任务类型',
    userId: '执行用户ID',
    userName: '执行用户名',
    deviceId: '设备',
    description: '描述',
    taskContent: '任务内容',
    taskResult: '反馈结果',
    addDeviceTask: '添加新任务',
    editDeviceTask: '编辑任务信息',
    deviceTaskList: '任务信息列表',
  
  },
  deviceGroupInfo: {
    groupId: '分组ID',
    parentId: '父分组ID',
    parentName: '父分组',
    userId: '所属用户ID',
    userName: '所属用户',
    name: '名称',
    code: '代号',
    description: '描述',
    tags: '标签',
    addDeviceGroupInfo: '添加新分组',
    editDeviceGroupInfo: '编辑分组信息',
    deviceGroupInfoList: '分组信息列表',
  },
  deviceGroupAuth: {
    status: 'Status',
    userId: 'UserId',
    groupId: 'GroupId',
    groupAuth: 'GroupAuth',
    addDeviceGroupAuth: '添加 DeviceGroupAuth',
    editDeviceGroupAuth: '编辑 DeviceGroupAuth',
    deviceGroupAuthList: 'DeviceGroupAuth 列表',
  },
  productInfo: {
    status: 'Status',
    productId: 'ProductId',
    productName: 'ProductName',
    productImg: 'ProductImg',
    productType: 'ProductType',
    authMethod: 'AuthMethod',
    deviceType: 'DeviceType',
    netType: 'NetType',
    autoRegister: 'AutoRegister',
    secret: 'Secret',
    modelCode: 'ModelCode',
    categoryId: 'CategoryId',
    brandId: 'BrandId',
    description: 'Description',
    tags: 'Tags',
    addProductInfo: '添加 ProductInfo',
    editProductInfo: '编辑 ProductInfo',
    productInfoList: 'ProductInfo 列表',
  },
  productCategory: {
    parentId: 'ParentId',
    name: 'Name',
    description: 'Description',
    addProductCategory: '添加 ProductCategory',
    editProductCategory: '编辑 ProductCategory',
    productCategoryList: 'ProductCategory 列表',
  },
  productOtaBackconfig: {
    name: 'Name',
    fileName: 'FileName',
    fileUrl: 'FileUrl',
    fileMd5: 'FileMd5',
    fileSize: 'FileSize',
    productId: 'ProductId',
    zoneType: 'ZoneType',
    saveType: 'SaveType',
    userId: 'UserId',
    userName: 'UserName',
    description: 'Description',
    addProductOtaBackconfig: '添加 ProductOtaBackconfig',
    editProductOtaBackconfig: '编辑 ProductOtaBackconfig',
    productOtaBackconfigList: 'ProductOtaBackconfig 列表',
  },
  productOtaFirmware: {
    name: 'Name',
    fileName: 'FileName',
    fileUrl: 'FileUrl',
    fileMd5: 'FileMd5',
    fileSize: 'FileSize',
    productId: 'ProductId',
    zoneType: 'ZoneType',
    saveType: 'SaveType',
    userId: 'UserId',
    userName: 'UserName',
    description: 'Description',
    addProductOtaFirmware: '添加 ProductOtaFirmware',
    editProductOtaFirmware: '编辑 ProductOtaFirmware',
    productOtaFirmwareList: 'ProductOtaFirmware 列表',
    productCodeNotSame: '批量OTA升级必须选择相同产品型号的设备',
  },
  productOtaProfile: {
    name: 'Name',
    type: 'Type',
    productId: 'ProductId',
    zoneType: 'ZoneType',
    userId: 'UserId',
    userName: 'UserName',
    description: 'Description',
    content: 'Content',
    addProductOtaProfile: '添加 ProductOtaProfile',
    editProductOtaProfile: '编辑 ProductOtaProfile',
    productOtaProfileList: 'ProductOtaProfile 列表',
    productCodeNotSame: '批量OTA推送飞行配置表必须选择相同产品型号的设备',
  },

  deviceMessage: {
    type_code: '记录类型',
    datetime: '时间范围',
    device_sn: '设备SN',
    device_mac: '设备MAC',
    device_name: '设备名',
    device_client_id:'客户端ID',
    lan_clients:'内网客户端',
    onlineRecordList: '上下线记录列表',
    status: '状态',
    timestamp: '时间',
    description: '描述',
    connected:'上线',
    disconnected:'下线',

    eventRecordList: '事件记录列表',
    event_type: '事件类型',
    event_level: '事件等级',
    event_content: '事件内容',
    flowRecordList: '心跳流量记录列表',
    flow_upload: '上行流量MB',
    flow_download: '下行流量MB',
    flow_total: '总流量MB',
    flow_upload_rate: '上行流量速率Kbps',
    flow_download_rate: '下行流量速率Kbps',

    taskRecordList: '远程下发记录列表',
    account:'执行用户',
    account_id:'执行用户ID',
    task_name:'任务名称',
    task_type:'任务类型',
    task_data_id:'任务数据ID',
    task_data:'任务数据',
    task_result:'任务结果',
    task_status:'任务状态',

    logRecordList: '日志记录列表',
    log_level: '日志等级',
    log_content: '日志内容',
    log_file: '日志文件',

    networkRecordList: '网络信号记录列表',
    network_type: '网络类型',
    network_csq: '网络信号强度CSQ',
    network_rsrp: '网络信号功率Rsrp',
    network_rsrq: '网络信号质量Rsrq',
    network_rssi: '网络信号强度Rssi',
    network_snr: '网络信号信噪比Snr',
  },

  taskPush :{
    confirm: '推送确认',
    success: '推送成功',
    pushFail: '推送失败',
    taskTypeReboot: '重启设备',
    taskTypeRenewReport: '踢出/重新上线',
    taskTypeReportLog: '上传日志',
    taskTypeLanConfig: '修改LAN局域网配置',
    taskTypeWifiConfig: '修改WIFI配置',
    taskTypeVpnConfig: '修改VPN配置',
    taskTypeProxyConfig: '修改代理配置',
    taskTypeUpgradeFirmware: 'OTA升级固件',
    taskTypeUpgradeProfile: 'OTA飞行配置',
    taskTypeUpgradeBackup: 'OTA升级配置文件',
    taskTypProfile: '配置推送',
    taskTypIsSaveProfile: '是否同步保存到飞行配置表？',
    taskTypProfileName: '标识名称',
    taskTypProfileDesc: '描述',
  },

  productBrand: {
    name: 'Name',
    logoUrl: 'LogoUrl',
    website: 'Website',
    description: 'Description',
    addProductBrand: '添加 ProductBrand',
    editProductBrand: '编辑 ProductBrand',
    productBrandList: 'ProductBrand 列表',
  },

  deviceConfig: {
    type: '类型',
    host: '域名/IP',
    username: '帐户名',
    password: '帐户密码',
    port: '端口',
    protocol: '协议',
    authType: '认证类型',
    pwdType: '加密类型',
    remoteLan: '远程网段',
    remoteMask: '远程网段掩码',
    remoteWan: '远程WAN',
    localLan: '本地LAN',
    localWan: '本地WAN',
    lanIp:'局域网IP',
    LanMask:'局域网掩码',
    lanGateway:'局域网网关',
    lanDns:'局域网DNS',
    dhcpEnable:'启用DHCP',
    dhcpStart:'DHCP开始地址',
    dhcpEnd:'DHCP结束地址',
    wanIp:'WAN IP',
    wanMask:'WAN 掩码',
    wanGateway:'WAN 网关',
    wanDns:'WAN DNS',
    wanType:'WAN 类型',
    wanMode:'WAN 模式',
    wanDhcp:'WAN DHCP',
    wanDhcpStart:'WAN DHCP 起始',
    SerialName:'串口名称',
    SerialPort:'串口端口',
    SerialBaud:'串口波特率',
    SerialData:'串口数据位',
    SerialStop:'串口停止位',
    SerialParity:'串口校验位',
    SerialFlow:'串口流控',
    SerialEnable:'串口使能',
    SerialRts:'串口RTS',
    SerialDtr:'串口DTR',
    SerialRtsCts:'串口RTS/CTS',
    SerialServer:'串口服务',
    WifiType:'WIFI类型',
    WifiSSID: 'WIFI名称',
    WifiPassword: 'WIFI密码',
    WifiEnable: 'WIFI启用',
    WifiAuthType: '认证方式',
    WifiChannel: 'WIFI信道',
    WifiIp: 'WIFIIP',
    WifiMask: 'WIFI掩码',
    WifiGateway: 'WIFI网关',
    Wifi24: '2.4G WIFI配置',
    Wifi58: '5G WIFI配置',

    remote_host: '远程主机',
    remote_port: '远程端口',
    remote_token: '密钥',
    remote_tls: 'TLS',
  
    remote_name: '服务名称',
    remote_common: '本地服务标识(不能重复-仅字母数字下划线)',
    remote_local_addr: '本地服务IP',
    remote_local_port: '本地服务端口',
    remote_remote_port: 'socket代理端口',
    remote_custom_domain: 'http代理访问地址',
    remote_protocol: '协议',
    remote_config_add: '创建终端配置',
    remote_config_saveDownload: '保存客户端配置到本地',
    remote_config_title: '设备终端下的代理配置无法推送，创建后请下载复制内容到设备对应的区域',
  }
};
