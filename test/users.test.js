const request = require('supertest')
const app = require('../index')
const api = request(app)

describe('GET /users', () => {
  test('Status Code Users', async () => {
    const response = await api.get('/users').send()
    expect(response.status).toBe(200)
  })
  test('Status Code Login', async () => {
    const response = await api.get('/users/login').send()
    expect(response.status).toBe(200)
  })
})
