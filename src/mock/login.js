const userMap = {
  admin: {
    role: ['admin'],
    token: 'admin',
    introduction: '我是超级管理员',
    avatar: 'https://wdl.wallstreetcn.com/48a3e1e0-ea2c-4a4e-9928-247645e3428b',
    name: '超级管理员小潘'
  },
  editor: {
    role: ['editor'],
    token: 'editor',
    introduction: '我是编辑',
    avatar: 'https://wdl.wallstreetcn.com/48a3e1e0-ea2c-4a4e-9928-247645e3428b',
    name: '普通编辑小张'

  },
  developer: {
    role: ['develop'],
    token: 'develop',
    introduction: '我是开发',
    avatar: 'https://wdl.wallstreetcn.com/48a3e1e0-ea2c-4a4e-9928-247645e3428b',
    name: '工程师小王'
  }
}
/*
export default {
  loginByEmail: config => {
    const { email } = config.params;

    return new Promise((resolve, reject) => {
      console.log(config.params.name)
      console.log('login===============')
      if (userMap[config.params.name.split('@')[0]]) {
        setTimeout(() => {
          resolve([200, {
            data : {name:'admin'}, msg : 'success', status :1, token : null
          }]);
        }, 500);
      } else {
        reject('账号不正确')
      }
    })
  },
  getInfo: config => {
    const { token } = config.params;
    return new Promise((resolve, reject) => {
      console.log('getInfo===============')
      if (userMap[token]) {
        setTimeout(() => {
          console.log('getInfo===2============')
          resolve([200, {
            data: userMap[token]
          }]);
        }, 100);
      } else {
        reject('获取失败')
      }
    })
  },
  logout: () => new Promise(resolve => {
    setTimeout(() => {
      resolve([200, { data: 'success' }]);
    }, 100);
  })
};
*/