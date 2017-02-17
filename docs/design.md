# 数据表设计

### 前置对象申明

```
type MsgObj {
  userId: number, // 发送者
  createDate: long, // 发送时间,
  message: string, // 消息内容
}
```

### 用户信息记录
```
{
  userId: number, // 用户编号，从1000开始
  nickname: string, // 昵称
  username: string, // 用户名
  password: string, // 密码
  emailAddress: string, // 邮箱
  createDate: long, // 注册时间
  isEnable: boolean, // 是否启用
  avatorUrl: string, // 头像地址
  groups: Array<number> // 所在的Group, groupId
}
```

### 讨论组（群聊）实体
```
{
  groupId: string, // 聊天组ID
  groupName: string, // 组名
  groupDescription: string, // 组介绍
  groupAvatorUrl: string, // 组logo
  ownerId: number, // 创建人
  createDate: long, // 创建时间
  isEnable: boolean, // 是否启用
  members: Array<number>, // 组成员，userId,
  messages: Array<MsgObj> // 聊天信息
}
```

### 历史聊天信息存储

```
{
  groupId: string, // 组ID
  messageYear: number, // 年
  messageMonth: number, // 月
  messages: Array<MsgObj> // 消息对象
}
```