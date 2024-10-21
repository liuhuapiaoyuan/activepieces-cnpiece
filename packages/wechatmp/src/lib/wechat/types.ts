export type UserGetResp = {
    total: number;
    count: number;
    data: {
      openid: string[];
    };
    next_openid: string;
  };

export type UserTagGetResp = {
  count: number;
  data: {
    openid: string[];
  };
  next_openid: string;

}