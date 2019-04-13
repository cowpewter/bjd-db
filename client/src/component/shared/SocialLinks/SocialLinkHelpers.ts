import CustomIcon from '@component/shared/CustomIcon';
import FaIcon from '@component/shared/FaIcon';

interface Details {
  iconComponent: React.SFC<any>;
  iconData: { [key: string]: string };
  label: string;
  useUrlForLabel: boolean;
}

const serviceLookup: { [key: string]: Details } = {
  website: {
    iconComponent: FaIcon,
    iconData: { icon: 'browser', type: 'light' },
    label: 'Website',
    useUrlForLabel: true,
  },
  doa: {
    iconComponent: CustomIcon,
    iconData: { icon: 'doa-wing' },
    label: 'Den of Angels',
    useUrlForLabel: false,
  },
  facebook: {
    iconComponent: FaIcon,
    iconData: { icon: 'facebook', type: 'brand' },
    label: 'Facebook',
    useUrlForLabel: false,
  },
  instagram: {
    iconComponent: FaIcon,
    iconData: { icon: 'instagram', type: 'brand' },
    label: 'Instagram',
    useUrlForLabel: false,
  },
  twitter: {
    iconComponent: FaIcon,
    iconData: { icon: 'twitter', type: 'brand' },
    label: 'Twitter',
    useUrlForLabel: false,
  },
  tumblr: {
    iconComponent: FaIcon,
    iconData: { icon: 'tumblr', type: 'brand' },
    label: 'Tumblr',
    useUrlForLabel: false,
  },
  etsy: {
    iconComponent: FaIcon,
    iconData: { icon: 'etsy', type: 'brand' },
    label: 'Etsy',
    useUrlForLabel: false,
  },
  youtube: {
    iconComponent: FaIcon,
    iconData: { icon: 'youtube', type: 'brand' },
    label: 'YouTube',
    useUrlForLabel: false,
  },
  pinterest: {
    iconComponent: FaIcon,
    iconData: { icon: 'pinterest', type: 'brand' },
    label: 'Pinterest',
    useUrlForLabel: false,
  },
  other: {
    iconComponent: FaIcon,
    iconData: { icon: 'link', type: 'light' },
    label: 'Other',
    useUrlForLabel: false,
  },
};

const validateUrl = (_: any, value: string, callback: Function) => {
  if (!value) {
    callback(new Error('Please enter a url'));
    return;
  }
  const prefix = /^http(s?):\/\//;
  if (!prefix.test(value)) {
    callback(new Error('Url must start with http:// or https://'));
    return;
  }
  // Really really basic url validation. like. so basic
  if (value.indexOf('.') === -1) {
    callback(new Error('Please enter a valid url'));
    return;
  }
  callback();
};

export default class SocialLinkHelpers {
  static get serviceLookup() {
    return serviceLookup;
  }

  static get validateUrl() {
    return validateUrl;
  }
}
