import PostServiceApi from '../../src/services/api/PostServiceApi';

test('it should fetch posts', async () => {
  const posts = await PostServiceApi.get()
  expect(posts.length > 0).toBe(true)
});