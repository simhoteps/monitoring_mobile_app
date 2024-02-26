export interface AuthModel {
  api_token: string;
  refreshToken?: string;
}

export interface AuthModel {
  api_token: string;
  refreshToken?: string;
}

export interface UserAddressModel {
  addressLine: string;
  city: string;
  state: string;
  postCode: string;
}

export interface UserCommunicationModel {
  email: boolean;
  sms: boolean;
  phone: boolean;
}

export interface ICurrentUserModel {
  email?: string;
  password?: string;
  first_name?: string;
  id: number;
  last_name?: string;
  token: string;
  user?: string;
}

export interface UserEmailSettingsModel {
  emailNotification?: boolean;
  sendCopyToPersonalEmail?: boolean;
  activityRelatesEmail?: {
    youHaveNewNotifications?: boolean;
    youAreSentADirectMessage?: boolean;
    someoneAddsYouAsAsAConnection?: boolean;
    uponNewOrder?: boolean;
    newMembershipApproval?: boolean;
    memberRegistration?: boolean;
  };
  updatesFromKeenthemes?: {
    newsAboutKeenthemesProductsAndFeatureUpdates?: boolean;
    tipsOnGettingMoreOutOfKeen?: boolean;
    thingsYouMissedSindeYouLastLoggedIntoKeen?: boolean;
    newsAboutStartOnPartnerProductsAndOtherServices?: boolean;
    tipsOnStartBusinessProducts?: boolean;
  };
}

export interface UserSocialNetworksModel {
  linkedIn: string;
  facebook: string;
  twitter: string;
  instagram: string;
}
export interface IShortUserModel {
  access?: string;
  id: number;
  refresh?: string;
  user?: string;
}

export interface UserModel {
  id: number;
  username: string;
  password: string | undefined;
  email: string;
  first_name: string;
  last_name: string;
  fullname?: string;
  occupation?: string;
  companyName?: string;
  phone?: string;
  roles?: Array<number>;
  pic?: string;
  language?: "en" | "de" | "es" | "fr" | "ja" | "zh" | "ru";
  timeZone?: string;
  website?: "https://keenthemes.com";
  emailSettings?: UserEmailSettingsModel;
  auth?: AuthModel;
  communication?: UserCommunicationModel;
  address?: UserAddressModel;
  socialNetworks?: UserSocialNetworksModel;
}

export interface SignInEnum {
  password: string;
  email: string;
}

export interface VerifcationModel {
  loading?: boolean;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  secondVerify?: boolean;
  setSecondVerify?: React.Dispatch<React.SetStateAction<boolean>>;
  setStatus?: (status?: any) => void;
  setSubmitting?: (isSubmitting: boolean) => void;
  email?: string;
  password?: string;
}

export interface IAlertsData {
  alerts: IAlertsType[];
  autoRefresh: boolean;
  lastTime: string;
  more: boolean;
  page: number;
  pageSize: number;
  pages: number;
  severityCounts: {
    critical: number;
    indeterminate: number;
    major: number;
    minor: number;
    warning: number;
  };
  status: string;
  statusCounts: { open: number };
  total: number;
}

export interface IAlertsType {
  attributes: {
    customer: string;
    eventAge: string;
    eventId: string;
    ip: string;
    thresholdInfo: string;
    triggerId: string;
    zabbixUrl: string;
  };
  correlate: [];
  createTime: string;
  customer: string;
  duplicateCount: number;
  environment: string;
  event: string;
  group: string;
  history: [];
  href: string;
  id: string;
  lastReceiveId: string;
  lastReceiveTime: string;
  origin: string;
  previousSeverity: string;
  rawData: any;
  receiveTime: string;
  repeat: boolean;
  resource: string;
  service: string[];
  severity: string;
  status: string;
  tags: string[];
  text: string;
  timeout: number;
  trendIndication: string;
  type: string;
  updateTime: string;
  value: string;
}

export interface INotifData {
  id: number;
  is_read: boolean;
  message: string;
  timestamp: Date;
  user: number;
}

export interface IPermmissionsData {
  customer_id: number;
  customer_name: string;
}

export interface ICustomer {
  label: string;
  value: number;
}
