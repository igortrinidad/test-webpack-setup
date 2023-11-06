import { loadPosts } from '../../src/loadPosts';
import { populateList } from '../../src/populateList';
import PostServiceApi from '../../src/services/api/PostServiceApi';

jest.mock('../../src/populateList');

describe('loadPosts', () => {
  let originalQuerySelector;
  let postsListElement;

  beforeAll(() => {
    originalQuerySelector = document.querySelector;
    postsListElement = document.createElement('div');
    postsListElement.id = 'posts-list';
    document.querySelector = jest.fn().mockReturnValue(postsListElement);
  });

  afterAll(() => {
    document.querySelector = originalQuerySelector;
  });

  it('should load posts and populate the list', async () => {
    PostServiceApi.get = jest.fn().mockResolvedValue([{ title: 'Post 1' }, { title: 'Post 2' }]);

    await loadPosts();

    expect(populateList).toHaveBeenCalledWith(postsListElement, [{ title: 'Post 1' }, { title: 'Post 2' }], 'li');
  });

  it('should throw an error if posts list is not found', () => {
    document.querySelector = jest.fn().mockReturnValue(null);

    expect(loadPosts).toThrowError('Posts list not found');
  });
});
