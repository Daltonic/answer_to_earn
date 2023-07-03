const { ethers } = require('hardhat')
const fs = require('fs')

const toWei = (num) => ethers.utils.parseEther(num.toString())

async function main() {
  const servicePercent = 5
  const Contract = await ethers.getContractFactory('AnswerToEarn')
  const contract = await Contract.deploy(servicePercent)
  await contract.deployed()

  const title = 'How to convert a string to lowercase in Python?'
  const description = `I have a string variable in Python, and I want to convert
    it to lowercase. What is the best way to achieve this?
    Are there any built-in functions or methods available for this task?`
  const tags = 'python, string, lowercase'
  const prize = 0.1

  await contract.createQuestion(title, description, tags, {
    value: toWei(prize),
  })

  const address = JSON.stringify({ address: contract.address }, null, 4)

  fs.writeFile('./artifacts/contractAddress.json', address, 'utf8', (error) => {
    if (error) {
      console.log(error)
      return
    }
    console.log('Deployed contract address: ', contract.address)
  })
}

main().catch((error) => {
  console.log(error)
  process.exitCode = 1
})
