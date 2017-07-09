import {ChainStore, FetchChain, Login} from 'graphenejs-lib';
import {Apis, ChainConfig} from 'graphenejs-ws';

ChainConfig.networks.DACom = {
  core_asset: 'FLO',
  address_prefix: 'FLO',
  chain_id: '526880c720c677ef7b54f964fe68999d1e582a33c8636b0f3b4687d47ae2f67f'
}

let auth = {
  init() {
    return new Promise((res, rej) => {
      Apis.instance('ws://144.217.15.182:11011', true).init_promise.then(() => {
        ChainStore.init().then(() => {
          res()
        }, err => rej(err))
      })
    })
  },

  login(accountName, password) {
    FetchChain('getAccount', [accountName]).then(res => {
      let [account] = res

      let success = Login.checkKeys({
        accountName: accountName,
        password: password,
        auths: {
          active: account.get('active').toJS().key_auths
        }
      })

      if (success) {
        console.log('success')
      } else {
        console.log('err')
      }
    }, () => {
      console.info('Пользователь не существует')
    })
  }
}

auth.init().then(() => {
  auth.login('accName', 'password')
})
