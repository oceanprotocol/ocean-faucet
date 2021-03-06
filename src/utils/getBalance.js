const { web3 } = require('./getWeb3')
const { getTokenInstance } = require('./getTokenInstance')
require('dotenv').config()

const getOceanBalance = async (address) => {
  try {
    const contract = await getTokenInstance(web3)
    // const account = await web3.eth.getAccounts()
    // console.log('account', account)
    const ballanceOcean = await contract.methods
      .balanceOf(String(address))
      .call()
    return ballanceOcean
  } catch (error) {
    console.log('Error 1', error)
  }
}

const getEthBalance = async (address) => {
  try {
    // const account = await web3.eth.getAccounts()
    // console.log('account', account)
    const ballanceEth = await web3.eth.getBalance(String(address))
    return ballanceEth
  } catch (error) {
    console.log('Error 2', error)
  }
}

const getFaucetGasBalance = async (account) => {
  const bal = await web3.eth.getBalance(account)

  let balance = web3.utils.fromWei(bal, 'ether')
  return Number(balance).toFixed(4)
}

const getFaucetBalance = async (account) => {
  let bal
  if (
    process.env.TOKEN_CONTRACT_ADDRESS !=
    '0x0000000000000000000000000000000000000000'
  ) {
    let tokenInst = getTokenInstance()
    bal = await tokenInst.methods.balanceOf(account).call()
  } else {
    bal = await web3.eth.getBalance(account)
  }
  let balance = web3.utils.fromWei(bal, 'ether')
  return Math.floor(balance)
}

module.exports = {
  getOceanBalance,
  getEthBalance,
  getFaucetBalance,
  getFaucetGasBalance
}
