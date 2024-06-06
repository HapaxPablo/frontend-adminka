import Cookies from "js-cookie";

import { ITokens } from "@/types/interface/user.interface";

export const saveTokensStorage = (data: ITokens) => {
  Cookies.set("accessToken", data.access);
  Cookies.set("refreshToken", data.refresh);
};

export const saveToStorage = (data: ITokens) => {
  saveToStorage(data);
};

export const removeTokensStorage = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
};

export const getTokenStorage = () => {
  return Cookies.get("accessToken");
};
