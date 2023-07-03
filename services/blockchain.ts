import { store } from '@/store'
import { ethers } from 'ethers'
import { globalActions } from '@/store/globalSlices'
import address from '@/artifacts/contractAddress.json'
import abi from '@/artifacts/contracts/AnswerToEarn.sol/AnswerToEarn.json'
import { AnswerProp, QuestionParams, QuestionProp } from '@/utils/interfaces'

const { setWallet, setAnswers, setQuestion, setQuestions } = globalActions
const ContractAddress = address.address
const ContractAbi = abi.abi
let ethereum: any
let tx: any

if (typeof window !== 'undefined') {
  ethereum = (window as any).ethereum
}

const toWei = (num: number) => ethers.utils.parseEther(num.toString())
const fromWei = (num: number) => ethers.utils.formatEther(num)

const getEthereumContract = async () => {
  const accounts = await ethereum?.request?.({ method: 'eth_accounts' })
  const provider = accounts?.[0]
    ? new ethers.providers.Web3Provider(ethereum)
    : new ethers.providers.JsonRpcProvider(process.env.NEXT_APP_RPC_URL)
  const wallet = accounts?.[0] ? null : ethers.Wallet.createRandom()
  const signer = provider.getSigner(accounts?.[0] ? undefined : wallet?.address)

  const contract = new ethers.Contract(ContractAddress, ContractAbi, signer)
  return contract
}

const connectWallet = async () => {
  try {
    if (!ethereum) return reportError('Please install Metamask')
    const accounts = await ethereum.request?.({ method: 'eth_requestAccounts' })
    store.dispatch(setWallet(accounts?.[0]))
  } catch (error) {
    reportError(error)
  }
}

const checkWallet = async () => {
  try {
    if (!ethereum) return reportError('Please install Metamask')
    const accounts = await ethereum.request?.({ method: 'eth_accounts' })

    // monitor chain change
    ethereum.on('chainChanged', () => {
      window.location.reload()
    })

    ethereum.on('accountsChanged', async () => {
      store.dispatch(setWallet(accounts?.[0]))
      await checkWallet()
    })

    if (accounts?.length) {
      store.dispatch(setWallet(accounts[0]))
    } else {
      store.dispatch(setWallet(''))
      reportError('Please connect wallet, no accounts found.')
    }
  } catch (error) {
    reportError(error)
  }
}

const getQuestions = async (): Promise<QuestionProp[]> => {
  const contract = await getEthereumContract()
  const questions = await contract.getQuestions()
  return structureQuestions(questions)
}

const getQuestion = async (id: number): Promise<QuestionProp> => {
  const contract = await getEthereumContract()
  const question = await contract.getQuestion(id)
  return structureQuestions([question])[0]
}

const createQuestion = async (data: QuestionParams) => {
  if (!ethereum) {
    reportError('Please install Metamask')
    return Promise.reject(new Error('Metamask not installed'))
  }

  try {
    const contract = await getEthereumContract()
    const { title, description, tags, prize } = data
    const tx = await contract.createQuestion(title, description, tags, {
      value: toWei(Number(prize)),
    })

    await tx.wait()
    const questions = await getQuestions()

    store.dispatch(setQuestions(questions))
    return Promise.resolve(tx)
  } catch (error) {
    reportError(error)
    return Promise.reject(error)
  }
}

const updateQuestion = async (id: number, data: QuestionParams) => {
  if (!ethereum) {
    reportError('Please install Metamask')
    return Promise.reject(new Error('Metamask not installed'))
  }

  try {
    const contract = await getEthereumContract()
    const { title, description, tags } = data
    const tx = await contract.updateQuestion(id, title, description, tags)

    await tx.wait()
    const question = await getQuestion(id)

    store.dispatch(setQuestion(question))
    return Promise.resolve(tx)
  } catch (error) {
    reportError(error)
    return Promise.reject(error)
  }
}

const deleteQuestion = async (id: number) => {
  if (!ethereum) {
    reportError('Please install Metamask')
    return Promise.reject(new Error('Metamask not installed'))
  }

  try {
    const contract = await getEthereumContract()
    const tx = await contract.deleteQuestion(id)

    await tx.wait()
    const question = await getQuestion(id)

    store.dispatch(setQuestion(question))
    return Promise.resolve(tx)
  } catch (error) {
    reportError(error)
    return Promise.reject(error)
  }
}

const createAnswer = async (id: number, answer: string) => {
  if (!ethereum) {
    reportError('Please install Metamask')
    return Promise.reject(new Error('Metamask not installed'))
  }

  try {
    const contract = await getEthereumContract()
    const tx = await contract.addAnswer(id, answer)

    await tx.wait()
    const question = await getQuestion(id)
    const answers = await getAnswers(id)

    store.dispatch(setQuestion(question))
    store.dispatch(setAnswers(answers))

    return Promise.resolve(tx)
  } catch (error) {
    reportError(error)
    return Promise.reject(error)
  }
}

const payWinner = async (qid: number, id: number) => {
  if (!ethereum) {
    reportError('Please install Metamask')
    return Promise.reject(new Error('Metamask not installed'))
  }

  try {
    const contract = await getEthereumContract()
    const tx = await contract.payWinner(qid, id)

    await tx.wait()
    const question = await getQuestion(id)
    const answers = await getAnswers(id)

    store.dispatch(setQuestion(question))
    store.dispatch(setAnswers(answers))

    return Promise.resolve(tx)
  } catch (error) {
    reportError(error)
    return Promise.reject(error)
  }
}

const getAnswers = async (id: number): Promise<AnswerProp[]> => {
  const contract = await getEthereumContract()
  const answers = await contract.getAnswers(id)
  return structureAnswers(answers) || []
}

const loadData = async () => {
  await getQuestions()
}

const reportError = (error: any) => {
  console.log(error)
}

const structureQuestions = (questions: any[]): QuestionProp[] =>
  questions
    .map((question) => ({
      id: Number(question.id),
      title: question.title,
      description: question.description,
      owner: question.owner.toLowerCase(),
      winner: question.winner.toLowerCase(),
      paidout: question.paidout,
      deleted: question.deleted,
      updated: Number(question.updated),
      created: Number(question.created),
      answers: Number(question.answers),
      tags: question.tags.split(',').map((tag: string) => tag.trim()),
      prize: fromWei(question.prize),
    }))
    .sort((a, b) => b.created - a.created)

const structureAnswers = (answers: any[]): AnswerProp[] =>
  answers
    .map((answer) => ({
      id: Number(answer.id),
      qid: Number(answer.qid),
      comment: answer.comment,
      owner: answer.owner.toLowerCase(),
      deleted: answer.deleted,
      created: Number(answer.created),
      updated: Number(answer.updated),
    }))
    .sort((a, b) => b.updated - a.updated)

export {
  connectWallet,
  checkWallet,
  loadData,
  getQuestions,
  getQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  createAnswer,
  getAnswers,
  payWinner,
}
