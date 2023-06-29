const { expect } = require('chai')
const { ethers } = require('hardhat')
const { expectRevert } = require('@openzeppelin/test-helpers')

const toWei = (num) => ethers.utils.parseEther(num.toString())
const fromWei = (num) => ethers.utils.formatEther(num)

describe('Contracts', () => {
  const serviceFee = 5
  const id = 1
  const aid = 1
  const title = 'How to convert a string to lowercase in Python?'
  const description = `I have a string variable in Python, and I want to convert
    it to lowercase. What is the best way to achieve this?
    Are there any built-in functions or methods available for this task?`
  const tags = 'python, string, lowercase'
  const prize = 0.1

  let contract, result
  beforeEach(async () => {
    const Contract = await ethers.getContractFactory('AnswerToEarn')
    ;[owner, commentor1, commentor2] = await ethers.getSigners()

    contract = await Contract.deploy(serviceFee)
    await contract.deployed()
  })

  describe('Question Management', () => {
    beforeEach(async () => {
      await contract.createQuestion(title, description, tags, {
        value: toWei(prize),
      })
    })

    it('Should verify that questions can be created successfully', async () => {
      result = await contract.getQuestions()
      expect(result).to.have.lengthOf(1)

      result = await contract.getQuestion(id)
      expect(result.title).to.be.equal(title)
      expect(result.description).to.be.equal(description)
      expect(result.tags).to.be.equal(tags)
      expect(fromWei(result.prize)).to.be.equal(prize.toString())

      await expectRevert(contract.createQuestion(title, description, tags), 'Insufficient amount')
    })

    it('Should verify update of title, description, and tags', async () => {
      const updatedTitle = 'This title has been updated'

      await expectRevert(
        contract.connect(commentor1).updateQuestion(id, updatedTitle, description, tags),
        'Unauthorized entity!'
      )

      await expectRevert(
        contract.updateQuestion(100, updatedTitle, description, tags),
        'Question not found'
      )

      await contract.updateQuestion(id, updatedTitle, description, tags)

      result = await contract.getQuestion(id)
      expect(result.title).to.be.equal(updatedTitle)

      await contract.connect(commentor1).addAnswer(id, 'This is an answer')

      await expectRevert(
        contract.updateQuestion(id, updatedTitle, description, tags),
        'Question already with answer(s)'
      )
    })

    it('Should verify that the owner of a question can delete it successfully', async () => {
      result = await contract.getQuestions()
      expect(result).to.have.lengthOf(1)

      await expectRevert(contract.deleteQuestion(100), 'Question not found')

      await contract.deleteQuestion(id)

      result = await contract.getQuestions()
      expect(result).to.have.lengthOf(0)

      result = await contract.getQuestion(id)
      expect(result.deleted).to.be.equal(true)
    })

    it('Should verify that with answers cannot be deleted', async () => {
      await contract.connect(commentor1).addAnswer(id, 'This is an answer')
      await expectRevert(contract.deleteQuestion(id), 'Question already with answer(s)')
    })
  })

  describe('Answer Management', () => {
    const comment = 'This is my answer'

    beforeEach(async () => {
      await contract.createQuestion(title, description, tags, {
        value: toWei(prize),
      })

      await contract.connect(commentor1).addAnswer(id, comment)
    })

    it('Should verify that an answer can be added successfully to an existing question', async () => {
      result = await contract.getAnswers(id)
      expect(result).to.have.lengthOf(1)

      result = await contract.getAnswer(id, aid)
      expect(result.comment).to.be.equal(comment)

      result = await contract.getQuestion(id)
      expect(Number(result.answers)).to.be.equal(1)

      await expectRevert(contract.addAnswer(id, ''), 'Answer must not be empty')
      await expectRevert(contract.addAnswer(100, comment), 'Question not found')
    })
  })

  describe('Paying winners', () => {
    beforeEach(async () => {
      await contract.createQuestion(title, description, tags, {
        value: toWei(prize),
      })

      await contract.connect(commentor1).addAnswer(id, 'Comment 1')
      await contract.connect(commentor2).addAnswer(id, 'Comment 2')
    })

    it('Should test the scenario where the owner pays the winner of a question', async () => {
      result = await contract.getQuestion(id)
      expect(result.paidout).to.be.equal(false)

      await expectRevert(contract.connect(commentor1).payWinner(id, aid), 'Unauthorized entity')
      await expectRevert(contract.payWinner(100, aid), 'Question not found')
      await expectRevert(contract.payWinner(id, 100), 'Answer not found')

      await contract.payWinner(id, aid)
      await expectRevert(contract.payWinner(id, aid), 'Question already paid out')

      result = await contract.getQuestion(id)
      expect(result.paidout).to.be.equal(true)
    })
  })

  describe('Paying winners', () => {
    beforeEach(async () => {
      await contract.createQuestion(title, description, tags, {
        value: toWei(prize),
      })

      await contract.connect(commentor1).addAnswer(id, 'Comment 1')
      await contract.connect(commentor2).addAnswer(id, 'Comment 2')
    })

    it('Should test the scenario where the owner pays the winner of a question', async () => {
      result = await contract.getQuestion(id)
      expect(result.paidout).to.be.equal(false)

      await expectRevert(contract.connect(commentor1).payWinner(id, aid), 'Unauthorized entity')
      await expectRevert(contract.payWinner(100, aid), 'Question not found')
      await expectRevert(contract.payWinner(id, 100), 'Answer not found')

      await contract.payWinner(id, aid)
      await expectRevert(contract.payWinner(id, aid), 'Question already paid out')

      result = await contract.getQuestion(id)
      expect(result.paidout).to.be.equal(true)
    })
  })

  describe('Change Fee', () => {
    it('Should verify that the owner can change the service fee successfully', async () => {
      result = await contract.serviceFee()
      expect(Number(result)).to.be.equal(serviceFee)

      await contract.changeFee(serviceFee + 2)

      result = await contract.serviceFee()
      expect(Number(result)).to.be.equal(serviceFee + 2)

      await expectRevert(
        contract.connect(commentor1).changeFee(serviceFee + 4),
        'Ownable: caller is not the owner'
      )
    })
  })
})
