## 数据表设计

### 用户信息记录
```javascript
_id string
userId uuid
userName string
nickName string
password string 
photoUrl string
createdTime date
isEnable bool  --逻辑删除
```
### 讨论组（群聊）实体
```javascript
_id
groupId uuid
groupName string
groupDescription string
groupPhotoUrl string
ownerId uuid --对应userId
members [userId,userId]
createdTime date
isDisabled bool --逻辑删除
```