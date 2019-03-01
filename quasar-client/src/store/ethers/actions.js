import { ethers } from 'ethers/index'
import Vue from 'vue'
import ethersConfig from './ethers.config'
export const EVENT_CHANNEL = 'ethers'
export const event = new Vue()
export const MSGS = {
  NOT_READY: 'Ethereum network not ready',
  NO_WALLET: 'No Ethereum wallet detected',
  NETWORK_TIMEOUT: 'Ethereum network timeout',
  INVALID_PROVIDER: 'Invalid provider type',
  ACCOUNT_CHANGED: 'Ethereum account changed',
  ETHERS_VUEX_INITIALIZED: 'Ethers vuex module initialized',
  ETHERS_VUEX_READY: 'Ethers vuex module ready'
}

export default {
  async connect (ctx) {
    try {
      let wallet
      console.log('connecting to ethers')
      let oldAddress = ctx.state.address
      let provider = new ethers.providers.JsonRpcProvider(ethersConfig.JSONRPC_URL)
      if (!provider) throw new Error(MSGS.NOT_READY)

      try {
        wallet = ethers.Wallet.fromMnemonic(ctx.state.mnemonic)
      } catch {
        console.log('Creating a wallet')
        wallet = ethers.Wallet.createRandom()
        ctx.commit('mnemonic', wallet.mnemonic)
      }

      const address = wallet.getAddress()
      const network = await provider.getNetwork()

      ctx.commit('connected', true)
      ctx.commit('error', null)
      ctx.commit('address', address)
      ctx.commit('user', address)
      ctx.commit('network', network)

      const msg = oldAddress && oldAddress !== address
        ? `Your Ethereum address/user has changed.
         Address: ${address}
         Network: ${network}
         Your ether balance: ${await provider.getBalance(address)}`
        : `You are connected to the Ethereum Network.
         Address: ${address}
         Network: ${network}
         Your ether balance: ${await provider.getBalance(address)}
         If you change your address or network, this app will update automatically.`
      console.log(msg)

      // Other vuex stores can wait for this
      event.$emit(EVENT_CHANNEL, MSGS.ETHERS_VUEX_READY)

      // now check for .eth address too
      // if (await hasEns()) {
      //   console.log('Net supports ENS. Checking...')
      //   ctx.commit('ens', await provider.lookupAddress(address))
      //   if (ens) {
      //     ctx.commit('user', ens)
      //   }
      // }
    } catch (err) {
      ctx.dispatch('disconnect', err)
    }
    console.log('done: connect')
  },
  async disconnect (ctx, err) {
    console.warn(ctx)
    const oldAddress = ctx.state.address

    ctx.commit('connected', false)
    ctx.commit('error', err)
    ctx.commit('address', '')
    ctx.commit('user', '')
    ctx.commit('network', '')
    ctx.commit('ens', null)

    const msg = err ? `There was an error: ${err.message}` : (oldAddress
      ? 'You have been disconnected from your Ethereum connection. Please check MetaMask, etc.'
      : 'You are not connected to an Ethereum node and wallet. Please check MetaMask, etc.')
    console.error(msg)
  },
  async logout (ctx) {
    ctx.commit('address', '')
    ctx.commit('user', '')
    console.info('You have been logged out from your Ethereum connection')
  },
  async init (ctx) {
    event.$on(EVENT_CHANNEL, async function (msg) {
      console.log('Ethers event received', msg)
      switch (msg) {
        case MSGS.NOT_READY:
          await ctx.dispatch('disconnect')
          break
        case MSGS.NO_WALLET:
          await ctx.dispatch('logout')
          break
        case MSGS.ACCOUNT_CHANGED:
          await ctx.dispatch('connect')
          break
      }
    })

    await ctx.dispatch('connect')

    event.$emit(EVENT_CHANNEL, MSGS.ETHERS_VUEX_INITIALIZED)
    console.log('Log in to your Ethereum wallet to see what it can do!')

    ctx.commit('initialized', true)
  }
}
