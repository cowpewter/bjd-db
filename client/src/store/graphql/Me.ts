import gql from 'graphql-tag';

export default gql`
query me {
  me {
    id
    username
    emailAddress
    isAdmin
    isMod
    subscriptions {
      security
      newsletter
      dollComment
      albumComment
    }
    profileImage {
      url
      thumbnail
    }
  }
}`;
