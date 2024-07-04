import {
  BungieMembershipType,
  DestinyProfileResponse,
  HttpClientConfig,
  ServerResponse,
  getProfile,
} from 'bungie-api-ts/destiny2';

export const $http = async (config: HttpClientConfig) => {
  return fetch(config.url);
};

export const test = async () => {
  const profileInfo: ServerResponse<DestinyProfileResponse> = await getProfile(
    $http,
    {
      components: [],
      destinyMembershipId: '',
      membershipType: BungieMembershipType.None,
    },
  );
};
