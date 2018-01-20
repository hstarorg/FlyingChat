# 数据表设计

为了提高可用性和性能，也考虑到IM的具体场景，该项目选用 `MongoDB` 作为后端存储。

# Collections（集合，对应关系型DB中的表）

## sequences （序列表，用于存储一些自增编号啥的）

```json
{
  _id: ObjectId, // 集合主键
  key: string, // Key
  value: number // Value
}
```

## users（用户集合，存储用户相关信息）

```json
{
  _id: ObjectId, // 集合主键
  userId: number, // 用户编号，从10000开始，依次递增
  userName: string, // 用户名，唯一，注册时填写的用户名
  nickName: string, // 昵称，不唯一，注册时填写的昵称
  password: string, // 用户密码，采用hash加密存储
  email: string, // 用户的邮件地址，可用于找回密码
  phone: string, // 用户手机号，可用于找回密码
  avatarUrl: string, // 用户头像地址
  createDate: long, // 用户注册时间
  userStatus: string, // 用户状态，默认Active，可选InActive(禁用)
  groups: Array<{ // 用户加入的组
    tagName: string, // 标签名称
    groupList: Array<number> // groupId集合
  }>,
  friends: Array<{ // 好友列表
    userId: number, // 用户ID
    createDate: number // 创建时间
  }>,
  sessions: Array<{
    groupId: string, // groupId
  }>
}
```

## groups（群集合，存储群信息）

```json
{
  _id: ObjectId, // 集合主键
  groupId: string, // 群ID
  groupName: string, // 群名称
  groupDescription: string, // 群介绍
  avatarUrl: string, // 群头像地址
  createDate: long, // 群创建时间
  groupStatus: string, // 群状态
  ownerId: number, // 群主ID
  maxCount: number, // 群规模（成员人数）
  joinMode: string, // 加群方式（Public, NeedApprove, Private->允许所有人，需要认证，不允许加群）
  members: Array<number>, // 群成员
  isPrivate: boolean, // 是否是内部群（把两个人私聊做成一个两人群）
  chatRecords: Array<{ // 聊天记录数组
    userId: string, // 发言人
    createDate: long, // 发言时间
    content: string // 消息内容
  }> 
}
```
