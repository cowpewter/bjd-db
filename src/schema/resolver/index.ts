import Album from '@schema/resolver/Album';
import Comment from '@schema/resolver/Comment';
import CommentSource from '@schema/resolver/CommentSource';
import Company from '@schema/resolver/Company';
import Doll from '@schema/resolver/Doll';
import DollConfiguration from '@schema/resolver/DollConfiguration';
import DollPart from '@schema/resolver/DollPart';
import DollWishlist from '@schema/resolver/DollWishlist';
import FaceupArtist from '@schema/resolver/FaceupArtist';
import Image from '@schema/resolver/Image';
import Mutation from '@schema/resolver/Mutation';
import Query from '@schema/resolver/Query';
import ResinColor from '@schema/resolver/ResinColor';
import SocialMediaLink from '@schema/resolver/SocialMediaLink';
import User from '@schema/resolver/User';
import UserPart from '@schema/resolver/UserPart';

const resolvers = [
  Album,
  Comment,
  CommentSource,
  Company,
  Doll,
  DollConfiguration,
  DollPart,
  DollWishlist,
  FaceupArtist,
  Image,
  Mutation,
  Query,
  ResinColor,
  SocialMediaLink,
  User,
  UserPart,
];

export default resolvers;
