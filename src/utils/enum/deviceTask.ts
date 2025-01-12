

export enum DeviceTaskReqEnum  {
  TaskTypeOTA= 'ota',
  TaskTypeCONFIG= 'config',
  TaskTypeACTION= 'action',
  TaskTypeDEBUG= 'debug',
  TaskTypeLOG= 'log',
  TaskTypeOTHER= 'other',
  TaskTypeLan= 'lan',
  TaskTypeWifi= 'wifi',
  TaskTypeVpn= 'vpn',
  TaskTypeProxy= 'proxy',

  RequestTypeGet= 1,
  RequestTypePush = 2,
  RequestTypeResult = 3,
  RequestTypeProfile = 4,
  SaveProfileTypeOn = 1,
  SaveProfileTypeOff = 0,
  SyncTypeOn = 1,
  SyncTypeOff = 0,

  authGetResultTimer = 20000,  //自动获取结果的时间 5秒
}


export enum DeviceTaskCodeEnum  {
  reboot = 80001, //重启控制
  reser = 80002,  //恢复出厂默认值控制
  sysConfig = 80003,  //系统参数配置设置
  syslog = 80005, //上传日志
  callbackOnline = 80006,  //踢出重新上线
  heartbaetIime = 80007, //修改心跳周期
  upgradeFirmware = 80008, //升级固件
  upgradeBackup = 80009, //升级配置文件
  opkgPlugin = 80010, //安装插件

  lanCfg = 80020, //LAN地址设置
  dhcpCfg = 80021, //DHCPv4设置
  subSurf = 80024,  //下联设备上网使能控制
  resetLan = 80027, //重启LAN/DHCP服务
  wanMode = 80040, //WAN模式设置
  simCfg = 80042,  //SIM卡参数设置
  modemCfg = 80062, //模组拨号参数设置

  wifiCfg = 80061, //WiFi参数设置
  vpnCfg = 80062,  //Vpn参数设置(pptp/l2tp)
  proxyCfg = 80063,  //远程代理参数设置(frpc)

  ping = 80080, //Ping诊断请求
  uploadDhcpClients = 80081, //上传DHCP客户端分配的文件 udhcpc.leases, boc设备
  uploadConfig = 80082,//上传配置
  cmd = 80099,//Cmd命令执行
}

export enum DeviceStatuwEnum  {
  isOnline= 1,
  offOnline = 2,
}