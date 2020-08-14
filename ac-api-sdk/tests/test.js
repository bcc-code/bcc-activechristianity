const SDK = require('../dist/index.js').default
const { expect, assert } = require('chai')
global.fetch = require('node-fetch');
const mocha = require('mocha')


assert.isOk(SDK)
const api_sdk = SDK({
  gql_api_url: "https://ac.day4.live/graphql"
})
assert.isOk(api_sdk.auth)
assert.isOk(api_sdk.blog)
assert.isOk(api_sdk.other)

describe('Authentication of user', function() {
  it('Should login and return user profile', async function() {
    const user = await api_sdk.auth.login("gerard@day4.no", "Vfr5tgh")
    expect(user).to.have.property('name');
    const profile = await api_sdk.auth.profile()
    assert.isOk(profile)
    assert.equal(profile.id, user.id)
    expect(profile).to.have.property('name');
  })

  it('Should register a new user and return the user profile', async function() {
    const user = await api_sdk.auth.register("Test User", "gerard2@day4.no", "q1w2e3r4")
    assert.isOk(user)
    expect(user).to.have.property('name');
    const profile = await api_sdk.auth.profile()
    assert.isOk(profile)
    assert.equal(profile.id, user.id)
    expect(profile.name).to.eq('Test User');
  })

  describe('User related tests', function() {
    const postIdToCheck = 204477

    describe('Make or update connection when reading post', function() {
      it('Post has been read by user', async function() {
        result = await api_sdk.blog.visitsPost(postIdToCheck);
        assert.isOk(result.visitsPost.success)
      })
      it('Post has been read by user and was updated', async function() {
        result = await api_sdk.blog.visitsPost(postIdToCheck);
        assert.isOk(result.visitsPost.userPostViews > 1)
      })
      it('Previously read post is also present in users history', async function() {
        result = await api_sdk.blog.history(10);
        expect(result.history)
        expect(result.history.find(ref => ref.id == postIdToCheck)).to.have.property('slug');
      })
    })

    describe('Testing time spent on reading', async function() {
      it('Return how long time a users has read a post', async function() {
        result = await api_sdk.blog.readingPost(postIdToCheck)
        assert.isTrue(result.readingPost.success)
        assert.isAtLeast(result.readingPost.timeRead, 0)
      })
      it('Return a list of all posts which user has started reading, but havent finished', async function() {
        result = await api_sdk.blog.unfinishedPosts()
        assert.isOk(result);
      })
    })

    const topicToCheck = 345
    describe('User follows topic', async function() {
      it('Toggle user to follow a topic', async function() {
        result = await api_sdk.blog.followTopic(topicToCheck, true)
        assert.isTrue(result.followTopic.success)
      })
      it('Check that the topic exists in followed topics', async function() {
        result = await api_sdk.blog.following()
        assert.isOk(result.following.topics)
        const theTopic = result.following.topics.find(ref => ref.id == topicToCheck)
        expect(theTopic).to.have.property('slug')
        assert.isOk(theTopic.slug)
      })
      it('Toggle user to unfollow a topic', async function() {
        result = await api_sdk.blog.followTopic(topicToCheck, false)
        assert.isTrue(result.followTopic.success)
      })
      it('Check that the topic no longer exists in followed topics', async function() {
        result = await api_sdk.blog.following()
        assert.isOk(result.following)
        if (result.following.topics)
          assert.isFalse(!!result.following.topics.find(ref => ref.id == topicToCheck))
      })
    })
  })
})